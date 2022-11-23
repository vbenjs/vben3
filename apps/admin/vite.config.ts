import { createViteConfig } from '@config/vite'
import { defineConfig, UserConfig } from 'vite'

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  const cfg = await createViteConfig(command, mode, process.cwd(), { preset: 'antd' })
  return cfg
})
