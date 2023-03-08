import {State} from 'linkifyjs';
import * as Linkifyjs from 'linkifyjs';

// https://juejin.cn/post/7051083891431440391
export const ZH = /[^\x00-\xff]/u;
export const UWORD_EXCLUDE_ZH = /(?!^[^\x00-\xff]*$)^\p{L}*$/u;

export default function registerChinesePlugin(linkifyjs: typeof Linkifyjs) {
  linkifyjs.registerTokenPlugin('linkify-plugin-chinese', (start) => {
    const scanner = start.scanner;
    scanner.start.jr.some((state) => {
      if (state[1] && state[1].t === 'UWORD') {
        state[0] = state[0] = UWORD_EXCLUDE_ZH;
        return true;
      }
    })

    scanner.start.jr.push([
      ZH,
      new State('ZH')
    ])
  })
}
