// 配置文件

import MusicPlayer from '../components/MusicPlayer';
import DisplayImage from '../components/DisplayImage';
import { Link } from '@zeit-ui/react';

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
 */
const BlogConfig = {
  title: "DeAnti",
  desc: "Same on the other side",
  avatar: "/static/avatar.jpg",
  menu: [
    {
      title: 'Home',
      // outside: true,
      router: {pathname: '/'}
    },{
      title: 'Article',
      router: {pathname: '/ArticleList'}
    },{
      title: 'Tags',
      router: {pathname: '/Tags'}
    },{
      title: 'About',
      router: {
        pathname: '/Article',
        query: {
          id: 0
        }
      }
    }
  ],
  recordNumber: "鄂ICP备18004914号-1"
};

/**
 * Md2Jsx Options
 */
const md2jsxOptions = {
  overrides: {
    img:  DisplayImage,
    a: {
      component: Link
    },
    p: ({children, ...props}) => {return (<div {...props}>{children}</div>)},
    MusicPlayer: {
      component: MusicPlayer
    }
  }
};

/**
 * xss options
 */
const xssOptions = {
  whiteList: {
    span: ["class"]
  }
};

/**
 * fetch BaseUrl
 */
const baseUrl = "http://blog.darkkris.xin/api/";

/**
 * debounce wait time (ms)
 */
const debounceWait = 450;

/**
 * Back-To-Top Component Options
 * - offset:    the scrollTop to open component
 */
const backTopOption = {
  offset: 50
};

export {
  BlogConfig,
  debounceWait,
  backTopOption,
  md2jsxOptions,
  xssOptions,
  baseUrl,
}