import React, { Component } from 'react';
import createHistory from "history/createBrowserHistory"
import logo from './logo.svg';
import './App.css';
import './star';
import { Star } from './star';

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duarion: 0,
      currentTime: 0,
      spot: '0:00'
    };

    this.hotspots = [
      {
        time: '0:10',
        description: 'AAAAAAA AAAAAAAA',
        thumb: '/thumb0.jpg',
        name: 'AAAA'
      },
      {
        time: '1:20',
        description: 'BBBBBBB BBBBBBBBBB',
        thumb: '/thumb1.jpg',
        name: 'BBBBB'

      },
      {
        time: '3:20',
        description: 'CCCCCCCC CCCCCCCCC',
        thumb: '/thumb2.jpg',
        name: 'CCCCCC'

      },
      {
        time: '4:20',
        description: 'DDDDDDDD DDDDDDDD',
        thumb: '/thumb3.jpg',
        name: 'DDDDD'
      }
    ]
  }

  componentDidMount() {
    this.video.controls = false;
    //this.video.play();

    this.history = createHistory();

    // Get the current location.
    const location = this.history.location;

    // Listen for changes to the current location.
    this.history.listen((location, action) => {
      if(location.state) {
        this.seekSpot(location.state.spot)
      }
    })

    this.video.addEventListener('loadstart', () => {
      console.log('loadstart')
    })
    this.video.addEventListener('load', () => {
      console.log('load')

    })
    this.video.addEventListener('loadend', () => {
      console.log('loadend')
    })
    this.video.addEventListener('readystatechange', () => {
      console.log('readystatechange')
    })

    this.video.addEventListener('playing', () => {
      console.log('playing')
    })

    this.video.addEventListener('play', () => {
      console.log('play')
    })

    this.video.addEventListener('seeked', () => {
      console.log('seeked')
    })

    this.video.addEventListener('seeking', () => {
      console.log('seeking')
    })

    this.video.addEventListener('timeupdate', () => {
      const percent = (this.video.currentTime / this.video.duration) * 100;
      this.current.style = `transform: scaleX(${percent / 100})`;
    })

    this.video.addEventListener('volumechange', () => {
      console.log('volumechange')
    })

    this.video.addEventListener('loadeddata', () => {
      console.log('loadeddata')
    })
    this.video.addEventListener('loadedmetadata', () => {
      console.log('loadedmetadata')
      console.log(this.video.duration);
      this.video.volume = .1;
      this.setState({ duration: this.video.duration });
    })

    this.btnPlay.addEventListener('click', () => {
      this.video.play();
    })

    this.btnPause.addEventListener('click', () => {
      this.video.pause();
    })

    this.slider.addEventListener('click', (evt) => {
      this.seek((evt.layerX / evt.currentTarget.offsetWidth) * 100);
    })
  }

  seekSpot(time) {
    const seconds = this.convertFormatedTimeToSeconds(time);
    const percent = (seconds / this.video.duration) * 100;
    this.seek(percent);
  }

  seek(percent) {
    this.video.currentTime = (percent * this.video.duration) / 100;
  }

  getSpotPosition(time, duration) {
    const seconds = this.convertFormatedTimeToSeconds(time);
    const percent = (seconds / duration) * 100;
    const posX = (percent * 360) / 100;
    console.log(this.video);
    return { transform: `translateX(${posX}px)` };
  }
  convertFormatedTimeToSeconds(time) {
    return time.split(':').reduce((acc, time) => (60 * acc) + +time);
  }
  onClick(index, evt) {
    this.history.push(`${this.hotspots[index].name}`, { spot: this.hotspots[index].time })

  }
  render() {
    return (
      <div className="player">
        <video ref={(video) => { this.video = video; }}>
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div ref={(slider) => { this.slider = slider; }} className="sliders">
          <div className="bg"></div>
          <div ref={(current) => { this.current = current; }} className="current"></div>
          {
            this.hotspots.map((spot, index) => {
              return <div className="spot" onClick={this.onClick.bind(this, index)} key={index} style={this.getSpotPosition(spot.time, this.state.duration)}>
                <Star/>
                <div className="thumb">
                  <img src={spot.thumb} width={200} height={150} />
                  <p>{spot.description}</p>
                </div>
              </div>
            })
          }
        </div>

        <button ref={(btnPlay) => { this.btnPlay = btnPlay }}>play</button>
        <button ref={(btnPause) => { this.btnPause = btnPause }}>pause</button>
      </div>
    );
  }
}

export default Video;