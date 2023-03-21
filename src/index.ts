import {State} from 'linkifyjs';
import * as Linkifyjs from 'linkifyjs';

// https://juejin.cn/post/7051083891431440391
export const ZH = /[\u4E00-\u9FFF\u3000-\u303F\uFF00-\uFFEF]/;
export const UWORD_EXCLUDE_ZH = /\p{L}(?![\u4E00-\u9FFF\u3000-\u303F\uFF00-\uFFEF])/;

export default function registerChinesePlugin(linkifyjs: typeof Linkifyjs) {
  linkifyjs.registerTokenPlugin('linkify-plugin-chinese', (start) => {
    const scanner = start.scanner;
    scanner.start.jr.some((state) => {
      if (state[1] && state[1].t === 'UWORD') {
        state[0] = UWORD_EXCLUDE_ZH; // 修改 UWORD 的正则
        state[1].jr[1][0] = UWORD_EXCLUDE_ZH; // 修改 UWORD 后嵌套的 的 UWORD 正则
        return true;
      }
    })

    scanner.start.j['台'].jr[1][0] = UWORD_EXCLUDE_ZH; // 修改 utlds 后的 UWORD 正则

    // 删除中文开头的 utlds
    Object.keys(scanner.start.j).forEach((char) => {
      if (ZH.test(char)) {
        delete scanner.start.j[char];
      }
    })

    scanner.start.jr.push([
      ZH,
      new State('ZH')
    ])
  })
}
