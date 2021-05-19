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

export const MathJaxConfig = () => {
  return `
    MathJax.Hub.Config({
      skipStartupTypeset: true,
      jax: ["input/TeX", "output/SVG"],
      extensions: ["tex2jax.js", "toMathML.js"],
      messageStyle: "none", // 隐藏加载过程
      TeX: {
        extensions: ["noUndefined.js", "autoload-all.js", "AMSmath.js", "AMSsymbols.js", "mediawiki-texvc.js"],
        mhchem: { legacy: false },
        MAXBUFFER: 10*1024,
        preview: 'none', // 隐藏加载过程
      },
      SVG: {
        useGlobalCache: false,
        merrorStyle: {
          fontSize:"90%", color:"red", background:"",
          border: "1px solid red", padding:"2px"
        },
        scale: 100, 
        minScaleAdjust: 80,
        blacker: 0,
        matchFontHeight: false,
        undefinedFamily: "STIXGeneral, 'PingFang SC', serif"
      },
      showProcessingMessages: false,
      tex2jax: {
        displayMath: [['$$', '$$'], ['$$\\n', '\\n$$'], ['$$\\r\\n', '\\r\\n$$']],
        inlineMath: [['$','$']],
        processEscapes: true,
        preview: "none",
        skipTags: ["script","noscript","style","textarea","pre","code", "span"],
        processClass: "md-inline-math|inline-math-export-jax|math-in-toc|need-latex-render"
      },
      menuSettings: {
        inTabOrder: false
      },
      showMathMenu: false,
      positionToHash: false
    });
    MathJax.Hub.processSectionDelay = 0;
    MathJax.Hub.processUpdateTime = 25;
    MathJax.Hub.processUpdateDelay = 0;
    MathJax.Hub.Queue(["setRenderer", MathJax.Hub, "SVG"]);
    MathJax.Hub.Register.StartupHook("TeX autoload-all Ready", function () {
      var MACROS = MathJax.InputJax.TeX.Definitions.macros;
      MACROS.color = "Color";
      delete MACROS.colorbox;
      delete MACROS.fcolorbox;
    });
  `;
}