// 配置文件
import MusicPlayer from 'components/MusicPlayer';
import DisplayImage from 'components/DisplayImage';
import Blogroll from 'components/Blogroll';
import { Link } from '@geist-ui/react';

/**
 * Blog Config 
 * - title:         博客标题
 * - desc:          博客描述
 * - avatar:        博客头像路径或url
 * - menu:          博客菜单
 *    - title:        菜单标题
 *    - outside:      站外链接(开启时，router中只有pathname生效)
 *    - router:       菜单router(请参考next.js文档)
 * - recordNumber:  备案号 (如果不需要，请将值设置为null)
 * - background:    是否需要keyboard wrapper作为背景 (试验功能，未开发完毕)
 */
export const BlogConfig = {
  title: "DeAnti",
  desc: "Same on the other side",
  avatar: "/avatar.jpg",
  menu: [
    {
      title: 'Home',
      router: {pathname: '/'}
    },{
      title: 'Article',
      router: {pathname: '/list'}
    },{
      title: 'Tags',
      router: {pathname: '/tags'}
    },{
      title: 'About',
      router: {
        pathname: '/about',
        query: {
          id: 0
        }
      }
    }
  ],
  baseURL: 'http://deanti.wang',
  recordNumber: '鄂ICP备18004914号',
  background: false
};

/**
 * Markdown to JSX Options
 */
export const md2jsxOptions = {
  overrides: {
    img: DisplayImage,
    a: Link,
    p: ({children, ...props}) => <div {...props} className={`p-div ${props.className || ''}`}>{children}</div>,
    MusicPlayer,
    Blogroll,
  }
};

/**
 * xss options
 */
export const xssOptions = {
  whiteList: {
    span: ['class'],
  },
};

/**
 * fetch BaseUrl
 */
export const baseUrl = "http://deanti.wang/api/";
// export const baseUrl = "http://localhost:3001/";

/**
 * debounce wait time (ms)
 */
export const debounceWait = 450;

/**
 * Back-To-Top Component Options
 * - offset:    the scrollTop to open component
 */
export const backTopOption = {
  offset: 50
};