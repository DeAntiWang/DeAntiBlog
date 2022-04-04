interface Article {
  id: string | number; // 编号
  title: string; // 标题
  content: string; // 文章内容
  tag: string; // 标签
  edit_time: Date | number; // 最后编辑时间
  time: Date | number; // 发表时间
}

export type { Article };
