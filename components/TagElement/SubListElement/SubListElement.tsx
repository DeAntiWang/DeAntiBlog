import Link from 'next/link';

export default function SubListElement(val: any, index: number) {
  return (
    <li key={"tag-li_"+index}>
      <Link href={{pathname: "/Article", query: {id: val.id}}} key={val.title+val.id}>
        <div className={"article-in-tag"}>
          <div className={"article-title-in-tag"}>{val.title}</div>
        </div>
      </Link>
    </li>
  )
}