# linkify-plugin-chinese
针对中文语境超链特殊格式处理

具体 case，参照(测试用例)[./tests/linkify-plugin-chinese.spec.ts]

# install
```shell
    npm install linkifyjs linkify-html linkify-plugin-chinese --save
```

# usage
```javascript
import * as linkifyjs from 'linkifyjs';
import linkifyHtml from 'linkify-html';
import registerChinesePlugin from 'linkify-plugin-chinese';

registerChinesePlugin(linkifyjs);

// => 中文超链：<a href="https://www.baidu.com?a=1">https://www.baidu.com?a=1</a>，你好
const html = linkifyHtml('中文超链：https://www.baidu.com?a=1，你好');
```