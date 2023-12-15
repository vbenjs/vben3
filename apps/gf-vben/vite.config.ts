import { createViteConfig } from '@config/vite'
import { defineConfig, UserConfig } from 'vite'

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  return await createViteConfig(command, mode, process.cwd())
})
