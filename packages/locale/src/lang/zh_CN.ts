import { genMessage } from '../helper'

const modules = import.meta.glob('./zh-CN/**/*.ts', { eager: true })

export default {
  message: genMessage(modules, 'zh-CN'),
}
