import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess } from '@vben/utils/mock-util'

export function createFakeTableData() {
  return {
    items: [
      {
        userId: '1',
        username: 'vben',
        realname: 'Vben Admin',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
        desc: 'manager',
        password: '123456',
        accessToken: 'fakeToken1',
        roles: [
          {
            name: 'Super Admin',
            value: 'super',
          },
        ],
      },
      {
        userId: '2',
        username: 'test',
        password: '123456',
        realname: 'test user',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
        desc: 'tester',
        accessToken: 'fakeToken2',
        roles: [
          {
            name: 'Tester',
            value: 'test',
          },
        ],
      },
    ],
    total: 2,
  }
}

export default [
  // mock user login
  {
    url: '/basic-api/demo/table',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess(createFakeTableData())
    },
  },
] as MockMethod[]
