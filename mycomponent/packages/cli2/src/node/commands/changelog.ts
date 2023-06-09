import conventionalChangelog from 'conventional-changelog'
import fse from 'fs-extra'
import { createSpinner } from 'nanospinner'//The simplest and tiniest terminal spinner for Node.js
import { resolve as resolvePath } from 'path'//用于返回绝对地址
import { CWD } from '../shared/constant.js'

const { createWriteStream } = fse

export interface ChangelogCommandOptions {//
  file?: string
  releaseCount?: number
}

export function changelog({ releaseCount = 0, file = 'CHANGELOG.md' }: ChangelogCommandOptions = {}): Promise<void> {
  const s = createSpinner('Generating changelog').start()

  return new Promise((resolve) => {
    conventionalChangelog({//从 git 元数据生成更改日志
      preset: 'angular',
      releaseCount,
    })//conventionalChangelog([options, [context, [gitRawCommitsOpts, [parserOpts, [writerOpts]]]]])
      .pipe(createWriteStream(resolvePath(CWD, file)))
      .on('close', () => {
        s.success({ text: 'Changelog generated success!' })
        resolve()//promise的resolve表示成功
      })
  })
}
