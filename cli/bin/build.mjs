import execa from 'execa'
import { createSpinner } from 'nanospinner'
import { resolve } from 'path'

const CWD = process.cwd()
const TPKG_CLI = resolve(CWD, './packages/trycli')
const PKG_SHARED = resolve(CWD, './packages/webpack-shared')


export const buildTCli = () => execa('pnpm', ['build'], { cwd: TPKG_CLI })
export const buildShared = () => execa('pnpm', ['build'], { cwd: PKG_SHARED })
export async function runTask(taskName, task) {
  const s = createSpinner(`Building ${taskName}`).start()
  try {
    await task()
    s.success({ text: `Build ${taskName} completed!` })
  } catch (e) {
    s.error({ text: `Build ${taskName} failed!` })
    console.error(e.toString())
  }
}

export async function runTaskQueue() {
  await runTask('shared', buildShared)
  await runTask('tcli', buildTCli)
}
