import type { Alias, ConfigEnv, Plugin, UserConfig } from 'vite';
import fs from 'fs'
import path from 'path'
import { globSync } from 'glob'
import { TreeNode } from '@vben/utils';
import { split, slice, indexOf, isEmpty, find } from 'lodash-es';
import { bold, cyan, gray, green } from 'picocolors';

export type Options = Omit<Alias, 'customResolver'>
/**
 * 创建别名解析规则
 * 
 * @param config 
 * @param env 
 * @param options 
 * @returns 
 */
export const createAlias = (config: UserConfig, env: ConfigEnv, options: Options): Alias => {
  const componentCache = new TreeNode<string>();
  return {
    ...options,
    customResolver(updatedId, importerId, resolveOptions) {
      const pathSegs = split(importerId, path.sep).filter(p => p !== '')
      const paths = slice(pathSegs, 0, indexOf(pathSegs, 'src'))
      const cacheNode = componentCache.findByPath([...paths], true);
      if (cacheNode) {
        const pkgBasePath = path.resolve(path.sep, path.join(...[...cacheNode.treePath, cacheNode.path]))
        const pkgPath = path.join(pkgBasePath, 'package.json')
        if (!fs.existsSync(pkgPath)) {
          throw new Error(`MonoRepoResolverPlugin can not resolve Module at: ${pkgBasePath}`)
        }
        // 分割别名对应的相对路径路径。代码实际导入的时候都会使用'/'，不需要使用Path.seg
        const relPaths = slice(split(updatedId, '/').filter(p => p !== ''))
        // 从缓存的包路径节点继续向下查找对应的组件路径
        const pkgNode = cacheNode.findByPath(relPaths, true);
        if (pkgNode) {
          if (isEmpty(pkgNode.val)) {
            // 如果缓存的路径节点没有值，说明还没有解析过，需要解析
            const parsedComPath = path.join(...[pkgBasePath, ...relPaths])
            let realPath
            if (fs.existsSync(parsedComPath)) {
              // import路径存在，确定是文件还是文件夹，分别处理
              if (fs.statSync(parsedComPath).isDirectory()) {
                // 如果导入的是文件夹，文件加载应该有index.xxx的入口文件
                const components = globSync(`${parsedComPath}${path.sep}index.*`)
                if (components.length === 1) {
                  realPath = components[0]
                } else {
                  const fileTsOrJs = find(components, (c) => c.endsWith('.ts') || c.endsWith('.js'))
                  if (fileTsOrJs) {
                    realPath = fileTsOrJs
                  } else {
                    throw new Error(
                      `MonoRepoResolverPlugin can not resolve Module <${updatedId}> at: ${importerId}, find ${components.length === 0 ? 'none' : 'multiple'
                      } files at: ${parsedComPath}, please check it. components: ${components}`
                    );
                  }
                }
              } else {
                // 如果导入的是文件，直接使用
                realPath = parsedComPath
              }
            } else {
              // import文件不存在，需要进一步处理，尝试直接搜索相关文件
              const components = globSync(`${parsedComPath}.*`)
              if (components.length === 1) {
                realPath = components[0]
              } else {
                throw new Error(
                  `MonoRepoResolverPlugin can not resolve Module <${updatedId}> at: ${importerId}, find ${components.length === 0 ? 'none' : 'multiple'
                  } files at: ${parsedComPath}, please check it. components: ${components}`
                );
              }
            }
            pkgNode.val = realPath
            console.debug(`${bold(cyan('[MonoRepoResolverPlugin]'))} ${green(`resolve Component from "${updatedId}" to ${pkgNode?.val} at:`)} ${gray(importerId)}`);
          }
          return pkgNode.val;
        } else {
          throw new Error(`MonoRepoResolverPlugin can not resolve Module <${updatedId}> at: ${importerId}, cache module subtree is empty`)
        }
      } else {
        throw new Error(`MonoRepoResolverPlugin can not resolve Module at: ${importerId}, cache module tree is empty`)
      }
    },
  }
}
/**
 * 导出Vite插件
 * 
 * @param rawOptions 
 * @returns 
 */
export default function configMonoRepoResolverPlugin(
  rawOptions: Options = {
    find: '#',
    replacement: 'src'
  }
): Plugin {
  return {
    name: 'MonoRepoResolver',
    config: (config, env) => ({
      resolve: {
        alias: [
          createAlias(config, env, rawOptions),
        ],
      },
    }),
  };
}
