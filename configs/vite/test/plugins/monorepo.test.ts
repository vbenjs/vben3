import { expect, test, describe } from 'vitest';
import path from 'path';
import { createAlias } from '../../src/plugins/monorepo';
import { ResolverFunction } from 'vite';

const TEST_TITLE = '【测试MonoRepoResolverPlugin】'
const buildTestPkgPath = (pkgRoot: string = process.cwd()) => {
  const demoPkgPath = path.resolve(pkgRoot, './configs/vite/test/plugins/testpkg')
  return [
    demoPkgPath,
    path.resolve(demoPkgPath, './index.ts')
  ]
}

describe('【测试MonoRepoResolverPlugin】', () => {
  test(`正常创建alias`, async () => {
    const aliasConfig = createAlias({}, { command: 'serve', mode: 'test' }, {
      find: '#',
      replacement: 'src'
    });
    expect(aliasConfig).toBeTruthy()
    expect(aliasConfig.customResolver).toBeTypeOf('function')
  })
  
  const aliasConfig = createAlias({}, { command: 'serve', mode: 'test' }, {
    find: '#',
    replacement: 'src'
  });
  const customResolver = aliasConfig.customResolver as ResolverFunction

  describe('测试customResolver解析组件路径', () => {
    test(`正常解析testpkg/src/test.ts`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/test', importerId, null)).contains('test/plugins/testpkg/src/test.ts')
    })
    
    test(`找不到组件`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(() => customResolver.call(null, 'src/notfound', importerId)).toThrowError(/find none files at/)
    })
    
    test(`组件中存在index.ts和index.vue, 解析到index.ts`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/vue&ts', importerId)).contains('testpkg/src/vue&ts/index.ts')
    })
  })
});