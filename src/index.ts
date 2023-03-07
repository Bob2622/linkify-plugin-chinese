import { registerTokenPlugin, registerPlugin, State } from 'linkifyjs';
// import linkifyHtml from "linkify-html";

// export const ZH = /[\u4e00-\u9fa5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/u;
// export const UWORD_EXCLUDE_ZH = /(?!^[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]*$)^\p{L}*$/u;
// https://juejin.cn/post/7051083891431440391
export const ZH = /[^\x00-\xff]/u;
export const UWORD_EXCLUDE_ZH = /(?!^[^\x00-\xff]*$)^\p{L}*$/u;

registerTokenPlugin('chinese', ({ scanner }) => {
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
