import { createPinia } from 'pinia'
import { createPersistPlugin, createStorageName } from '@vben/utils'

// When developing locally, vite may have circular dependency errors, which are difficult for us to avoid.
// This problem often occurs with router instances and pinia instances.
// This file can break the circular dependency and solve the problem.

const pinia = createPinia()
// Persistence plugin, modified from open source, adding namespace support
pinia.use(
  createPersistPlugin({ namespace: createStorageName(import.meta.env) }),
)

export { pinia }
