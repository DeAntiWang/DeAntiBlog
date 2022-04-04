import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, Spinner } from '@geist-ui/react';
import styles from 'styles/MusicPlayer.module.scss';

type Props = {
  imgSrc: string;
  src: string;
  title: string;
  singer: string;
};

const MusicPlayer = (props: Props): JSX.Element => {
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
    <div className={styles.musicPlayerContainer}>
      <Card className={styles.musicPlayer} style={{padding: 0, overflow: "hidden"}} shadow>
        <div className={styles.musicPlayerContent}>
          <audio ref={audioDom}
            id={`${props.title.replace(/\s+/g, '')}-audio`}
            className={'audio'}
            style={{display: "none"}}
          >
            <source src={props.src} />
          </audio>
          <Image className={styles.musicPlayerImg} src={props.imgSrc} width="100" height="100" />
          <button className={`${styles.playButton} ${isPlay ? styles.pauseIcon : styles.playIcon}`} onClick={onClick}></button>
          <div className={styles.musicPlayerInfo}>
            <div className={styles.musicPlayerTitle}>
              { props.title }
              { isLoading ? <Spinner /> : <></> }
            </div>
            <div className={styles.musicPlayerSubTitle}>{props.singer}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MusicPlayer;
