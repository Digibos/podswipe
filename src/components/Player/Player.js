import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, PanResponder } from 'react-native';
import ProgressController from './ProgressController';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
//import { shallowEqual } from 'react-pure-render'

let FORWARD_DURATION = 7;

class Player extends Component {

  constructor(props, context, ...args) {
    super(props, context, ...args);
    this.state = {paused: false, muted: this.props.muted, song: this.props.song, volume: this.props.volume, percent: 0};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.song !== this.props.song) {
      this.setState({
        song: nextProps.song
      })
      console.log('song changed :', nextProps.song.uri);
    }
  }

  onVideoEnd() {
    this.Player.seek(0);
    this.setState({key: new Date(), currentTime: 0, paused: true, percent: 0});
  }

  onVideoLoad(e) {
    this.setState({
      currentTime: e.currentTime,
      duration: e.duration,
      percent: this.getCurrentTimePercentage(e.currentTime, e.duration) * 100
    });
  }

  onProgress(e) {
    this.setState({
      currentTime: e.currentTime,
      percent: this.getCurrentTimePercentage(e.currentTime, this.state.duration) * 100
    });
  }

  playOrPauseVideo(paused) {
    this.setState({paused: !paused});
  }

  onBackward(currentTime) {
    let newTime = Math.max(currentTime - FORWARD_DURATION, 0);
    this.Player.seek(newTime);
    this.setState({currentTime: newTime})
  }

  onForward(currentTime, duration) {
    if (currentTime + FORWARD_DURATION > duration) {
      this.onVideoEnd();
    } else {
      let newTime = currentTime + FORWARD_DURATION;
      this.Player.seek(newTime);
      this.setState({currentTime: newTime, percent: this.getCurrentTimePercentage(currentTime, duration) * 100});
    }
  }

  getCurrentTimePercentage(currentTime, duration) {
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    } else {
      return 0;
    }
  }

  onProgressChanged(newPercent, paused) {
    let {duration} = this.state;
    let newTime = newPercent * duration / 100;
    this.setState({currentTime: newTime, percent: newPercent, paused: paused});
    this.Player.seek(newTime);
  }

  render() {
    let {currentTime, duration, paused, muted, song, percent, volume} = this.state;

    if (!song) {
      return <View />;
    }
    return <View style={styles.fullScreen} key={this.state.key}>

      <ProgressController
        style={styles.sliderView}
        duration={duration}
        currentTime={currentTime}
        percent={percent}
        onNewPercent={this.onProgressChanged.bind(this)}
      />

      <View style={styles.videoView}>
        <Video ref={Player => this.Player = Player}
               onEnd={this.onVideoEnd.bind(this)}
               onLoad={this.onVideoLoad.bind(this)}
               onProgress={this.onProgress.bind(this)}
               source={song}
               paused={paused}
               muted={muted}
               volume={Math.max(Math.min(1, volume), 0)}
               resizeMode='contain'
        />
        <TouchableOpacity style={styles.videoContainer}
                          onPress={this.playOrPauseVideo.bind(this, paused)}>
          <Icon style={styles.videoIcon} name={`ios-${paused ? 'play' : 'pause'}`}
                size={60} color='#fff'/>

        </TouchableOpacity>
      </View>
    </View>;
  }
}

let styles = StyleSheet.create({
  fullScreen: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  videoView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 50,
    overflow: 'hidden',
    top: 25,
    left: 25,
    bottom: 25,
    right: 25
  },
  sliderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  videoIcon: {
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    width: 90,
    height: 90,
    paddingTop: 15,
    borderRadius: 50,
  }
});

Player.propTypes = {
  muted: PropTypes.bool,
  song: PropTypes.object,
  volume: PropTypes.number
};

Player.defaultProps = {
  muted: true,
  song: {},
  volume: 1
};

export default Player;
