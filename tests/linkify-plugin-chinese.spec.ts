import {describe, expect, test} from '@jest/globals';
import linkifyHtml from 'linkify-html';
import {UWORD_EXCLUDE_ZH, ZH} from '../src/index';

describe('linkify-plugin-chinese module', () => {
  test('chinese char regexp', () => {
    // 中文
    expect(ZH.test('哈')).toEqual(true);

    // 中文符号
    expect(ZH.test('，')).toEqual(true);
    expect(ZH.test('《')).toEqual(true);
    expect(ZH.test('。')).toEqual(true);
    expect(ZH.test('》')).toEqual(true);
    expect(ZH.test('、')).toEqual(true);
    expect(ZH.test('？')).toEqual(true);
    expect(ZH.test('；')).toEqual(true);
    expect(ZH.test('：')).toEqual(true);
    expect(ZH.test('「')).toEqual(true);
    expect(ZH.test('』')).toEqual(true);
    expect(ZH.test('【')).toEqual(true);
    expect(ZH.test('】')).toEqual(true);
    expect(ZH.test('（')).toEqual(true);
    expect(ZH.test('）')).toEqual(true);

    // 非中文
    expect(ZH.test('A')).toEqual(false);
  });

  test('中文和中文符号自动截断链接', () => {
    // 中文
    expect(linkifyHtml('https://www.baidu.com?a=1你好')).toBe(`<a href=\"https://www.baidu.com?a=1\">https://www.baidu.com?a=1</a>你好`);
    expect(linkifyHtml('https://www.baidu.com?a=1，你好')).toBe(`<a href=\"https://www.baidu.com?a=1\">https://www.baidu.com?a=1</a>，你好`);

    expect(linkifyHtml('http://www.baidu.com?a=1，你好')).toBe(`<a href=\"http://www.baidu.com?a=1\">http://www.baidu.com?a=1</a>，你好`);

    expect(linkifyHtml('www.baidu.com?a=1，你好')).toBe(`<a href=\"http://www.baidu.com\">www.baidu.com</a>?a=1，你好`);
  });

  test('英文符号自动截断链接', () => {
    // 英文符号截断
    expect(linkifyHtml('https://www.baidu.com?a=1,你好')).toBe(`<a href=\"https://www.baidu.com?a=1\">https://www.baidu.com?a=1</a>,你好`);
    expect(linkifyHtml('http://www.baidu.com?a=1,你好')).toBe(`<a href=\"http://www.baidu.com?a=1\">http://www.baidu.com?a=1</a>,你好`);
    expect(linkifyHtml('www.baidu.com?a=1,你好')).toBe(`<a href=\"http://www.baidu.com\">www.baidu.com</a>?a=1,你好`);
  });

  test('空格自动截断链接', () => {
    // 英文符号截断
    expect(linkifyHtml('https://www.baidu.com?a=1 你好')).toBe(`<a href=\"https://www.baidu.com?a=1\">https://www.baidu.com?a=1</a> 你好`);
  });
});