import { MockMethod } from 'vite-plugin-mock'
import {
  resultError,
  resultPageSuccess,
  resultSuccess,
} from '@vben/utils/mock-util'

// export function createFakeTableData() {
//   return {
//     items: [
//       {
//         userId: '1',
//         username: 'vben',
//         realname: 'Vben Admin',
//         avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
//         desc: 'manager',
//         password: '123456',
//         accessToken: 'fakeToken1',
//         address:'呼伦贝尔市',
//         startTime:'1997-01-26 10:45:00',
//         endTime:'2022-08-08 17:02:15',
//         roles: [
//           {
//             name: 'Super Admin',
//             value: 'super',
//           },
//         ],
//       },
//       {
//         userId: '2',
//         username: 'test',
//         password: '123456',
//         realname: 'test user',
//         avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
//         desc: 'tester',
//         accessToken: 'fakeToken2',
//         address:'鹤壁市',
//         startTime:'2010-07-29 09:23:46	',
//         endTime:'1998-02-27 02:14:58',
//         roles: [
//           {
//             name: 'Tester',
//             value: 'test',
//           },
//         ],
//       },
//     ],
//     total: 2,
//   }
// }

const fakeTableData = (() => {
  const result: any[] = []
  for (let i = 1; i <= 100; i++) {
    result.push({
      userId: `${i}`,
      username: '@cname',
      password: '@natural',
      realname: '@name',
      avatar: `https://i.pravatar.cc/50?img=${i}`,
      desc: '@word',
      accessToken: '@guid',
      address: '@city',
      startTime: `@datetime()`,
      endTime: '@datetime',
      'roles|1-2': [
        {
          name: 'Admin',
          value: 'admin',
        },
        {
          name: 'superAdmin',
          value: 'superAdmin',
        },
        {
          name: 'Tester',
          value: 'test',
        },
      ],
    })
  }
  return result
})()

const fakeTreeTableData = (() => {
  const result: any[] = []
  for (let i = 1; i <= 5; i++) {
    result.push(
      {
        id: `${i}`,
        parentId: null,
        userName: '@cname',
        address: '@city',
        startTime: '@datetime()',
        endTime: '@datetime()',
        description: '@word',
      },
      {
        id: '@id',
        'parentId|1-5': 1,
        userName: '@cname',
        address: '@city',
        startTime: '@datetime()',
        endTime: '@datetime()',
        description: '@word',
      },
    )
  }

  return result
})()

const mockOperatorData = (() => {
  const result: any[] = []
  for (let i = 1; i <= 50; i++) {
    result.push({
      userId: `${i}`,
      operatorName: '@cname',
      record: '@word(10)',
      createTime: `@datetime()`,
      updateTime: '@datetime',
    })
  }
  return result
})()

export default [
  // mock user login
  {
    url: '/basic-api/demo/table',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess(fakeTableData)
    },
  },
  {
    url: '/basic-api/demo/useTable',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultPageSuccess(body.page, body.pageSize, fakeTableData)
    },
  },
  {
    url: '/basic-api/demo/treeTable',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(fakeTreeTableData)
    },
  },
  {
    url: '/basic-api/demo/operator',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(mockOperatorData)
    },
  },
] as MockMethod[]
