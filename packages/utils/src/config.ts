import type { GlobEnvConfig, GlobConfig } from '@vben/types'
import { version } from '../package.json'

/**
 * Get the configuration file variable name
 * @param env
 */
export function getAppConfigFileName(env: Record<string, any>) {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '')
}

export function getGlobalConfig(
  env: Record<string, any>,
): Readonly<GlobConfig> {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME } =
    getAppConfig(env)

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
  }
  return glob as Readonly<GlobConfig>
}

function createStorageKeyPrefix(env: Record<string, any>) {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppConfig(env)
  return `${VITE_GLOB_APP_SHORT_NAME}_${env.MODE}`.toUpperCase()
}

// Generate cache key according to version
export function createStorageName(env: Record<string, any>) {
  return `${createStorageKeyPrefix(env)}${`_${version}`}_`.toUpperCase()
}

function getAppConfig(env: Record<string, any>) {
  const ENV_NAME = getAppConfigFileName(env)

  const ENV = (
    env.DEV
      ? // Get the global configuration (the configuration will be extracted independently when packaging)
        env
      : window[ENV_NAME]
  ) as GlobEnvConfig

  const { VITE_GLOB_APP_SHORT_NAME } = ENV

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    console.warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    )
  }

  return ENV
}
