// Interface data format used to return a unified format
export interface requestParams {
  url: Recordable<any>
  body: Recordable<any>
  headers?: { authorization?: string }
  query: Recordable<any>
}

export const resultSuccess = <T = Recordable<any>>(
  result: T,
  { message = 'ok' } = {},
) => ({
  code: 0,
  result,
  message,
  type: 'success',
})

export const resultPageSuccess = <T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {},
) => {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  }
}

export const resultError = (
  message = 'Request failed.',
  { code = -1, result = null } = {},
) => ({
  code,
  result,
  message,
  type: 'error',
})

export const pagination = <T = any>(
  pageNo: number,
  pageSize: number,
  array: T[],
): T[] => {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}

// This function is used to obtain the token from the request data, please modify it according to the actual situation of the project
export const getRequestToken = ({
  headers,
}: requestParams): string | undefined => headers?.authorization

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'vben',
      realname: 'Vben Admin',
      email: 'test@gmail.com',
      phone: '13800138000',
      address: 'Xiamen City 77',
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
      email: 'test@gmail.com',
      phone: '13800138000',
      address: 'Xiamen City 77',
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
  ]
}
