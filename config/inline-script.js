export const baiduSEO = () => {
  return `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?d790d9f864c6f0f4152f1186bb72c282";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  `;
}

export const zhanzhangStatistics = () => {
  return `
    (function(){
      var bp = document.createElement('script');
      var curProtocol = window.location.protocol.split(':')[0];
      if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
      else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(bp, s);
    })();
  `;
}

export const titleGame = () => {
  return `
    (function() {
      let OriginTitile = "DeAnti Blog";
      let titleTime, leaveTime, flag=false;
      document.addEventListener('visibilitychange', function() {
          if (document.hidden) {
              clearTimeout(leaveTime);
              leaveTime = setTimeout(() => {
                  document.title = '_( ﾟДﾟ)ﾉ 页面崩溃了??';
                  flag=true;
                  clearTimeout(titleTime);
              }, 10000);
          } else {
              clearTimeout(leaveTime);
              if(flag) {
                  document.title = '(つェ⊂)咦!又好了!';
                  flag = false;
              }
              titleTime = setTimeout(function() {
                  document.title = OriginTitile;
              },1000);
          }
      });
    })();
  `;
}