import { genMessage } from '../helper'

const modules = import.meta.glob('./en/**/*.ts', { eager: true })

export default {
  message: genMessage(modules, 'en'),
}
