import { htmlEncode } from '../common/format';

enum Platform {
  QQ = 0,
  QQ_ZONE,
  WEIXIN,
  PYQ
}

interface ShareInfo {
  title: string;
  desc: string;
  image_url?: string;
  share_url: string;
  platform?: Platform;
}

// const _window: any = window;

function tencentShare(shareInfo: ShareInfo, callback: Function) {
  // 分享链接长度不能超过120字节，并且必须跟页面URL同一个域名，否则设置不生效
  // 分享的图片最小需要200 * 200，否则分享到QQ空间时会被过滤掉
  // 设置完分享内容后，可通过API调用唤起QQ的分享面板，免去引导的过程
  // _window.mqq.data.setShareInfo(shareInfo, callback);
  // _window.mqq.ui.showShareMenu();
}

export const shareQQ = (shareInfo: ShareInfo, callback?: Function) => {
  // tencentShare(
  //   Object.assign({}, shareInfo, { platform: Platform.QQ }),
  //   (...param: any) => {
  //     console.log(...param)
  //   }
  // );
  // const shareURL = `https://connect.qq.com/widget/shareqq/index.html` +
  //   `?url=${htmlEncode(shareInfo.share_url)}` + 
  //   `&title=${htmlEncode(shareInfo.title)}` + 
  //   `&summary=${htmlEncode(shareInfo.desc)}` + 
  //   `&pics=${htmlEncode(shareInfo.image_url)}`;
  // window.open(shareURL);
};

export const shareQQZone = () => {

};

export const shareWeixin = () => {

};

export const sharePYQ = () => {

};

export const shareWeibo = () => {
  // <html xmlns:wb="http://open.weibo.com/wb">
  // <script src="https://tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8"></script>
  // <wb:share-button addition="simple" type="icon"></wb:share-button>
};