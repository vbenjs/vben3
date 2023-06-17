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
