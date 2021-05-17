import * as React from 'react';
import { Card, Spinner } from '@geist-ui/react';
import style from "styles/MusicPlayer.module.scss";

interface Prop {
  imgSrc: string,
  src: string,
  title: string,
  singer: string
}

interface  State {
  isPlay: boolean,
  isLoading: boolean,
  canplay: boolean
}

export default class MusicPlayer extends React.Component<Prop, State> {
  public constructor(props: Prop) {
    super(props);
    this.state = {
      isPlay: false,
      isLoading: false,
      canplay: false
    };
  }

  private audio: any = null;

  private onClick() {
    const nowPlay = this.state.isPlay;
    if(this.audio===null) {
      // 第一次点击播放
      this.setState({
        isLoading: true
      });
      this.audio = new Audio(this.props.src);
      this.audio.load();

      this.audio.addEventListener('canplay', () => {
        this.setState({
          canplay: true,
          isLoading: false
        });
        this.onClick();
      });

      this.audio.addEventListener('ended', () => {
        this.audio.pause();
        this.setState({
          isPlay: false
        });
      })
    }

    if(this.state.canplay) {

      if (nowPlay) {
        this.audio.pause();
      } else {
        this.audio.play();
      }

      this.setState({
        isPlay: !nowPlay,
      })
    }
  }

  public render() {
    const pauseIcon = (
      <svg
        viewBox="0 0 1024 1024"
        width="50"
        height="50"
      >
        <defs>
          <linearGradient id={style["hover"] || "hover"} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEFBA" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        <path
          d="M512 42.667008C254.733312 42.667008 42.665984 254.736384 42.665984 512s212.067328 469.331968 469.331968 469.331968c257.26464 0 469.334016-212.067328 469.334016-469.331968 0-257.26464-212.069376-469.334016-469.334016-469.334016M512 1024C228.692992 1024 0 795.307008 0 512 0 228.692992 228.692992 0 512 0c283.307008 0 512 228.692992 512 512 0 283.307008-228.692992 512-512 512"
        />
        <path
          d="M384 341.332992h85.332992v341.332992H384zM554.667008 341.332992H640v341.332992h-85.332992z"
        />
      </svg>
    );

    const playIcon = (
      <svg
        viewBox="0 0 1025 1024"
        width="50"
        height="50"
      >
        <defs>
          <linearGradient id={style["hover"] || hover} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEFBA" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        <path
          d="M512 42.667008C254.733312 42.667008 42.665984 254.736384 42.665984 512s212.067328 469.331968 469.331968 469.331968c257.26464 0 469.334016-212.067328 469.334016-469.331968 0-257.26464-212.069376-469.334016-469.334016-469.334016M512 1024C228.692992 1024 0 795.307008 0 512 0 228.692992 228.692992 0 512 0c283.307008 0 512 228.692992 512 512 0 283.307008-228.692992 512-512 512"
        />
        <path
          d="M631.883776 496.1024c10.61888 7.949312 10.61888 23.846912 0 31.7952L405.23776 678.93248C394.61888 686.880768 384 681.582592 384 668.33408V355.667968c0-13.249536 10.619904-18.548736 21.23776-10.600448l226.646016 151.03488z"
        />
      </svg>
    );

    return (
      <div className={"music-player-container"}>
        <Card
          className={"music-player"}
          style={{padding: 0, overflow: "hidden"}}
          shadow
        >
          <div className={"music-player-content"}>
            {/*<audio*/}
              {/*id={this.props.title.replace(/\s+/g,"")+"-audio"}*/}
              {/*className={"audio"}*/}
              {/*src={this.props.src}*/}
            {/*/>*/}
            <img className={"music-player-img"} src={this.props.imgSrc} width="100" height="100"/>
            <button className="play-button" onClick={this.onClick.bind(this)}>
              {this.state.isPlay?pauseIcon:playIcon}
            </button>
            <div className={"music-player-info"}>
              <div className={"music-player-title"}>
                {this.props.title}
                {this.state.isLoading?<Spinner />:<></>}
              </div>
              <div className={"music-player-sub-title"}>{this.props.singer}</div>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}