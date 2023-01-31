import { green, red } from 'picocolors'
import { load as yamlLoad } from 'js-yaml'
import { readFile } from 'fs-extra'
import { IGNORE_WORKSPACE } from './constant'
import minimist = require('minimist')
import { execa } from 'execa'

export type WorkspacePackage = { name: string; version?: string; path: string }

export function error(err: any) {
  console.log(red(err))
}

export function succeed(msg: any) {
  console.log(green(msg))
}

/**
 * Get command line parameters
 * @param argvName
 */
export function commandArgv(argvName: string | undefined = undefined) {
  const argv = minimist(process.argv.slice(2))
  return argvName ? argv[argvName] || undefined : argv
}

/**
 * Read Workspace
 */
export async function readWorkspace() {
  const path = '../pnpm-workspace.yaml'
  try {
    const workspace = yamlLoad(await readFile(path, { encoding: 'utf8' }), {
      json: true,
    }) as any
    return workspace.packages as string[]
  } catch (e) {
    throw e
  }
}

export async function filterWorkspace() {
  try {
    const filterArgv = (await readWorkspace()).filter(
      (wr) => !IGNORE_WORKSPACE.includes(wr),
    )
    return filterArgv
      .map((argv) => ['--filter', '../' + argv])
      .flatMap((argv) => argv)
  } catch (e) {
    throw e
  }
}

export async function getWorkspacePackages(filterArgv = []) {
  const { stdout } = await execa(
    'pnpm',
    ['ls', '-r', '--depth', '-1', '--json'].concat(filterArgv),
  )
  if (!stdout) return []
  return JSON.parse(stdout) as WorkspacePackage[]
}
