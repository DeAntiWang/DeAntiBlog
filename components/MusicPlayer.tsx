import { useRef, useState, useEffect } from 'react';
import { Card, Spinner } from '@geist-ui/react';
import { pauseIcon, playIcon } from '../static/svgs';
import "../styles/MusicPlayer.scss";

interface Prop {
  imgSrc: string,
  src: string,
  title: string,
  singer: string
}

export default function MusicPlayer(props: Prop) {
  const [isPlay, setPlayState] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [canplay, setCanplay] = useState(false);

  const audioDom = useRef();

  const onClick = () => {
    const audio: any = audioDom.current;
    const nowPlay = isPlay;

    if(canplay) {
      if (nowPlay) audio.pause();
      else audio.play();

      setPlayState(!nowPlay);
    }
  }

  useEffect(() => {
    const audio: any = audioDom.current;
    setLoading(true);
      audio.load();

      audio.addEventListener('canplay', () => {
        setCanplay(true);
        setLoading(false);
        onClick();
      });

      audio.addEventListener('ended', () => {
        audio.pause();
        setPlayState(false);
      })
  }, []);

  return (
    <div className={"music-player-container"}>
      <Card
        className={"music-player"}
        style={{padding: 0, overflow: "hidden"}}
        shadow
      >
        <div className={"music-player-content"}>
          <audio ref={audioDom}
            id={props.title.replace(/\s+/g,"")+"-audio"}
            className={"audio"}
            style={{display: "none"}}
          >
            <source src={props.src}/>
          </audio>
          <img className={"music-player-img"} src={props.imgSrc} width="100" height="100"/>
          <button className="play-button" onClick={onClick}>
            { isPlay ? pauseIcon : playIcon }
          </button>
          <div className={"music-player-info"}>
            <div className={"music-player-title"}>
              { props.title }
              { isLoading ? <Spinner/> : <></>}
            </div>
            <div className={"music-player-sub-title"}>{props.singer}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}