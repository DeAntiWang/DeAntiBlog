import { xssOptions } from '../configs/options';

export const htmlEncode = (html: string) => {
  const temp = document.createElement("div");
  
  if (temp.textContent) {
    temp.textContent = html;
  } else {
    temp.innerText = html;
  }

  return temp.innerHTML;
};

export const dateFormat = (timeStr: string): string => {
  const time: Date = new Date(timeStr);
  const year = time.getFullYear(),
        month = time.getMonth()+1,
        day = time.getDate();
  return `${year}-${month}-${day}`;
};

export const stringFilter = (str: string, inHtml: boolean = true): string => {
  // 链式工作，顺序不可替换
  const codeReplace = inHtml?'<span class="-in-desc-code">(请文中查看代码)</span>':''

  const ret = str.replace(/\r\n/g, "\n")  // 预处理
    .replace(/\<MusicPlayer([\s\S]*)\/\>/g, "")  // 音乐播放器
    .replace(/(#+)([^\n]*)/g, "$2: ") // 标题
    .replace(/!\[([\s\S]*?)\]\(([\s\S]*?)\)/g, "")  // 图片
    .replace(/\[([\s\S]*?)\]\([\s\S]*?\)/g, "$1") // 链接
    .replace(/\n(&gt;|\>)\s?(.*)/g, "$2")  // 引用（有问题）
    .replace(/(\*\*\*|___)(.*?)\1/g, "$2") // 斜体粗体混合
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // 粗体
    .replace(/(\*|_)(.*?)\1/g, "$2") // 斜体
    .replace(/\~\~(.*?)\~\~/g, "$1") // 删除线
    .replace(/```([^`\n]*)```/g, "$1")  // 行内代码
    .replace(/```([\s\S]*?)```[\s]?/g, codeReplace)  // 代码块
    .replace(/^-+$/g, "") // 分割线
    .replace(/^[\s]*[-\*\+] +(.*)/g, "$1") // 无序列表
    .replace(/^[\s]*[0-9]+\.(.*)/g, "$1") // 有序列表
    .replace(/\$\$(.*)\$\$/, codeReplace)  // latex公式
    .replace(/\$(.*)\$/, codeReplace);  // latex行内公式
  const xss = require('xss');
  return xss(ret, xssOptions);
}