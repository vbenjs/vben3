import { resultError, resultSuccess, resultPageSuccess } from '../util.ts'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import Mock from 'mockjs'

const mockDeptTreeData = (() => {
  const result: any[] = []
  result.push(
    {
      key: 0,
      label: '华北',
      children: [
        {
          key: '0-1',
          label: '财务部',
          children: [{ key: '0-1-1', label: '资产管理' }],
        },
        {
          key: '0-2',
          label: '产品部',
          children: [{ key: '0-2-1', label: '销售' }],
        },
        {
          key: '0-3',
          label: '研发部',
          children: [{ key: '0-3-1', label: '开发' }],
        },
        {
          key: '0-4',
          label: '行政部',
        },
      ],
    },
    {
      key: 1,
      label: '华南',
      children: [
        {
          key: '1-1',
          label: '财务部',
          children: [{ key: '1-1-1', label: '资产管理' }],
        },
        {
          key: '1-2',
          label: '产品部',
          children: [{ key: '1-2-1', label: '销售' }],
        },
        {
          key: '1-3',
          label: '研发部',
          children: [{ key: '1-3-1', label: '开发' }],
        },
        {
          key: '1-4',
          label: '行政部',
        },
      ],
    },
  )
  return result
})()

const mockDeptUserData = (() => {
  const fakeData = Mock.mock({
    'items|30': [
      {
        'id|+1': 1,
        name: '@cname',
        nickName: '@name',
        email: '@email',
        createTime: '@datetime',
        'role|1': [
          {
            name: '部门经理',
            value: 'manager',
          },
          {
            name: '员工',
            value: 'employee',
          },
        ],
        'dept|1': [
          {
            name: '财务部',
            value: 'finance',
          },
          {
            name: '产品部',
            value: 'producte',
          },
          {
            name: '研发部',
            value: 'developement',
          },
        ],
        remark: '@cword(5, 10)',
      }
    ]
  })
  const result = fakeData.items;
  return result
})()

const mockRoleListData = (() => {
  const fakeData = Mock.mock({
    'items|50': [
      {
        'roleId|+1': 1,
        roleName: `@cname()`,
        roleValue: `@name`,
        'sort|+1': 2,
        'state|1': [
          {
            name: '启用',
            value: '1',
          },
          {
            name: '停用',
            value: '0',
          },
        ],
        createTime: `@datetime`,
        remark: `@cword(5, 10)`,
      }
    ]
  })
  const result = fakeData.items;
  return result;
})()

const mockDeptTreeList = (() => {
  const fakeData = Mock.mock({
    items: [
      {
        id: '1',
        parentId: null,
        deptName: '华北',
        sort: 0,
        'state|1': [
          {
            name: '启用',
            value: '1',
          },
          {
            name: '停用',
            value: '0',
          },
        ],
        createTime: new Date(),
        remark: 'remark',
      },
      {
        id: '1-1',
        parentId: '1',
        deptName: '财务部',
        sort: 0,
        'state|1': [
          {
            name: '启用',
            value: '1',
          },
          {
            name: '停用',
            value: '0',
          },
        ],
        createTime: '@datetime',
        remark: '财务',
      },
      {
        id: '1-1-1',
        parentId: '1-1',
        deptName: '资产管理',
        sort: 0,
        'state|1': [
          {
            name: '启用',
            value: '1',
          },
          {
            name: '停用',
            value: '0',
          },
        ],
        createTime: '@datetime()',
        remark: '资产',
      },
    ]
  })
  const result = fakeData.items;
  return result
})()

export default defineFakeRoute([
  {
    url: '/basic-api/demo/deptTreeList',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess(mockDeptTreeData)
    },
  },
  {
    url: '/basic-api/demo/deptUserList',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultPageSuccess(body.page, body.pageSize, mockDeptUserData)
    },
  },
  {
    url: '/basic-api/demo/roleList',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultPageSuccess(body.page, body.pageSize, mockRoleListData)
    },
  },
  {
    url: '/basic-api/demo/account/department',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess(mockDeptTreeList)
    },
  },
  {
    url: '/basic-api/user/sessionTimeout',
    method: 'post',
    statusCode: 401,
    response: () => {
      return resultError()
    },
  },
  {
    url: '/basic-api/user/tokenExpired',
    method: 'post',
    statusCode: 200,
    response: () => {
      return resultError('Token Expired!', {
        code: 401,
      })
    },
  },
])
