import { useEffect, createContext } from 'react';
import { useModal } from '@geist-ui/react';
// import Component
import Layout from 'components/Layout';
import ArticleBar from 'components/ArticleBar';
import SponsorModal from 'components/SponsorModal';
// import lib
import Markdown from 'markdown-to-jsx';
import hljs from 'highlightjs';
// import styles types options
import { BlogConfig, md2jsxOptions } from 'configs/options';
import { htmlEncode, stringFilter }  from "utils/format";
import fetch, { Status } from 'utils/fetch';
import type { Article } from 'types/Article';

declare global {
  interface Window {
    MathJax: any;
  }
}

type Props = {
  id: string | number;
  info: Article;
};

export const SponsorContext = createContext({
  visible: false,
  setVisible: undefined,
  bindings: undefined
});

const Article = ({ id, info }: Props): JSX.Element => {
  const { visible, setVisible, bindings } = useModal();

  const mdText: string = info?.content || ''; // 文章内容
  const articleInfo = { // 文章信息
    url: `${BlogConfig.baseURL}/Article?id=${id}`,
    title: info?.title || '',
    summary: stringFilter(mdText, false).replace(/\r*\n/g, ""),
    img: '',
  };

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block: HTMLElement) => hljs.highlightBlock(block));
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, document.getElementById("need-latex-render")])
  }, []);

  return (
    <Layout title={`${info.title} - DeAnti Blog`}>
      <div className={"article"}>
        {
          <SponsorContext.Provider value={{visible, setVisible, bindings}}>
            <ArticleBar className={"-function-bar"} info={articleInfo}/>
            <SponsorModal/>
          </SponsorContext.Provider>
        }
        <Markdown options={md2jsxOptions} id={"need-latex-render"}>
          {mdText}
        </Markdown>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ res, params }) {
  const id = params?.id || 1;
  const result = await fetch('/Article/findById', 'GET', { id });

  if (result.statusCode === Status.Success && result.data) {
    return {
      props: {
        info: { ...result.data },
        id,
      },
    };
  }
  
  if (!res) {
    Router.push('/404');
  } else {
    res.writeHead(301, { Location: '404' });
    res.end();
  }
  return {
    props: {
      info: {},
      id,
    }
  };
}

export default Article;
