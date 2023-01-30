import { PersistedStateFactoryOptions } from 'pinia-plugin-persistedstate'

export function persistGlobalConfig(
  keyPrefix: string,
): PersistedStateFactoryOptions {
  return {
    storage: sessionStorage,
    key: (id) => `${keyPrefix}_${id}`,
  }
}
