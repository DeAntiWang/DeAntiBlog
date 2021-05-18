import { useEffect } from 'react'
import { BlogConfig } from '../configs/options';
import '../styles/Footer.scss';

interface Prop {
  type: "whole-screen" | "left-side"
}

export default function Footer(props: Prop) {
  useEffect(() => {
    // Always do navigations after the first render
    document.getElementById("footer").className = props.type + "-footer";
  }, [])

  const nowYear = new Date().getFullYear();

  return (
      <div id={"footer"} className={props.type + "-footer"}>
        <span className={"footer-row"}>
          Copyright&nbsp;{nowYear}&nbsp;<span dangerouslySetInnerHTML={{__html: "&#169"}}/>&nbsp;Developed by DeAnti-
        </span>
        {
          BlogConfig.recordNumber!==null?
            (<span className={`footer-row record-number`}>{BlogConfig.recordNumber}</span>)
            :(<></>)
        }
      </div>
  )
}