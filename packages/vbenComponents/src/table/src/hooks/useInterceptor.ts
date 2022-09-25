//VXE事件拦截
import VXETable from 'vxe-table'
export const useInterceptor = () => {
  VXETable.interceptor.add('event.clearActived', (params, event) => {
    // 比如点击了某个组件的弹出层面板之后，此时被激活单元格不应该被自动关闭，通过返回 false 可以阻止默认的行为。
    const keyword = ['n-date', 'n-time', 'n-select']
    for (const path of params.$event.path) {
      for (const key of keyword) {
        if (path.className && path.className.indexOf(key) > -1) {
          return false
        }
      }
    }
    // console.log(params.$event.path)
    return true
  })
  // console.log('拦截器完成')
}
