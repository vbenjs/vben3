import { expect, test, describe } from 'vitest';
import path from 'path';
import { createAlias, findNearestPackageData } from '../../src/plugins/monorepo';
import { ResolverFunction } from 'vite';

const buildTestPkgPath = (pkgRoot: string = process.cwd()) => {
  const demoPkgPath = path.resolve(pkgRoot, './configs/vite/test/plugins/testpkg')
  return [
    demoPkgPath,
    path.resolve(demoPkgPath, './index.ts')
  ]
}

describe('findNearestPackageData无法获取包', async () => {
  test('findNearestPackageData无法获取包', () => {
    const importerId = path.resolve('/', './not_exist')
    const ret = findNearestPackageData(importerId);
    expect(ret).toBeNull()
  })
})

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
    test(`正常解析testpkg/src/test的形式`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/test', importerId, null)).contains('test/plugins/testpkg/src/test.ts')
    })

    test(`正常解析testpkg/src/test.ts的形式`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/test.ts', importerId, null)).contains('test/plugins/testpkg/src/test.ts')
    })

    test(`组件中存在index.ts和index.vue, 解析到index.ts`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/vue&ts', importerId)).contains('testpkg/src/vue&ts/index.ts')
    })

    test('单个Vue文件的解析', async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/SingleVue', importerId)).contains('test/plugins/testpkg/src/SingleVue.vue')
    })
    
    test('文件夹下index.vue文件的解析', async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/justvue', importerId)).contains('test/plugins/testpkg/src/justvue/index.vue')
    })
    
    test('匹配组件文件夹的时候忽略大小写', async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/casesensitive', importerId)).contains('test/plugins/testpkg/src/casesensitive/index.ts')
    })

    test('匹配组件文件的时候忽略大小写', async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/singleCasesensitive', importerId)).contains('test/plugins/testpkg/src/singleCaseSensitive.vue')
    })

    test('匹配组件index的时候忽略大小写', async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/upcaseindex', importerId)).contains('test/plugins/testpkg/src/upcaseindex/Index.ts')
    })

    test(`找不到组件`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(() => customResolver.call(null, 'src/notfound', importerId)).toThrowError(/find none files at/)
    })

    test(`找到不认识格式的组件`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(() => customResolver.call(null, 'src/notype', importerId)).toThrowError(/\/index.\(ts\|js\), please check it./)
    })
})

  describe('测试包内互相引用', () => {
    test('测试test.ts中解析vue&ts的index', () => {
      const [demoPkgPath] = buildTestPkgPath()
      const importerId = path.resolve(demoPkgPath, './src/test.ts')
      expect(customResolver.call(null, 'src/vue&ts', importerId)).contains('testpkg/src/vue&ts/index.ts')
    })
  })
});
