import React, { Component } from 'react';
import { convertFormatedTimeToSeconds, percent } from '../../helpers/converter';
import History from '../../helpers/history';
import Seeker from '../seeker/seeker';
import HotSpot from '../hotspot/hotSpot';
import PlayPause from '../playPause/playPause';
import './video.css';
import seeker from '../seeker/seeker';

class Video extends Component {
  constructor(props) {
    super(props);

    this.history = new History();
    this.history.onChange(this.seekSpot.bind(this));

    this.state = {
      duarion: 0,
      currentPosition: 0,
      playing: false,
      seeking: false
    };

  }

  componentDidMount() {
    this.video.controls = false;

    this.video.addEventListener('timeupdate', () => {
      this.setState({ currentPosition: percent(this.video.currentTime, this.video.duration) });

      if (this.video.ended) {
        this.setState({ playing: false, currentPosition: 0 });
        this.history.update('/');
      }
    });

    this.video.addEventListener('loadedmetadata', () => {
      this.video.volume = .1;
      this.setState({ duration: this.video.duration });
    });

    this.video.addEventListener('seeked', () => {
      const interval = setTimeout(() => {
        this.setState({ playing: true });
        this.video.play();

        this.seeking.classList.remove('seeking-overlay--show');

        clearTimeout(interval);
      }, 300);
    });

  }

  seekSpot(time) {
    this.seek(percent(convertFormatedTimeToSeconds(time), this.video.duration));
  }

  seek(percent) {
    this.setState({ playing: false });
    this.video.pause();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.seeking.classList.add('seeking-overlay--show');
      });
    });

    const interval = setTimeout(() => {
      this.video.currentTime = (percent * this.video.duration) / 100;
      clearTimeout(interval);
    }, 100);

  }

  onHotSpotClick(spot, evt) {
    this.history.update(spot);
  }

  onPlayPauseClick(playing) {
    this.setState({ playing: playing });

    if (this.state.playing) {
      this.video.pause();
    } else {
      this.video.play();
    }
  }

  render() {
    return (
      <div className='player'>
        <div className='video-container'>
          <video className='video' ref={(video) => { this.video = video; }}>
            <source src={this.props.source} type='video/mp4' />
          </video>
          <div ref={(seeking) => { this.seeking = seeking; }} className='seeking-overlay'></div>
          <PlayPause onClick={this.onPlayPauseClick.bind(this)} playing={this.state.playing} />
        </div>
        <Seeker onSeek={this.seek.bind(this)} currentPosition={this.state.currentPosition} />
        <div className="hotSpot-container">
          {
            this.props.hotSpots.map((spot, index) => {
              return <HotSpot onClick={this.onHotSpotClick.bind(this)} containerWidth={document.querySelector('.sliders').offsetWidth} spot={spot} duration={this.state.duration} key={index} />
            })
          }
        </div>
      </div>
    );
  }
}

export default Video;
