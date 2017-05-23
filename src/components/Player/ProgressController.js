import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Animated, PanResponder, Slider, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CircularSlider from './CircularSlider'
const AnimatedSlider = Animated.createAnimatedComponent(CircularSlider);

class ProgressController extends Component {

  seekTimeout_ = 0;

  constructor(props, context, ...args) {
    super(props, context, ...args);
    this.state = {
      moving: false,
      angleLength: 0//new Animated.Value(Math.PI * 2)
    };
    //Animated.spring(
    //  this.state.angleLength,
    //  {
    //    toValue: 0,
    //    tension: 0,
    //    friction: 3
    //  }
    //).start();
  }

  notifyPercentChange(newPercent, paused) {
    let {onNewPercent} = this.props;
    if (onNewPercent instanceof Function) {
      onNewPercent(newPercent, paused);
    }
  }

  getAngle(percent) {
    return percent * (2 * Math.PI) / 100;
  }

  getPercent(a) {
    return a * (100 / (2 * Math.PI));
  }

  onUpdate = ({angleLength}) => {

    this.setState({
      moving: true,
      angleLength
    })

    //Animated.spring(
    //  this.state.angleLength,
    //  {
    //    toValue: angleLength,
    //    tension: 0,
    //    friction: 3
    //  }
    //).start();


    const percent = this.getPercent(angleLength);
    clearTimeout(this.seekTimeout_)
    this.seekTimeout_ = setTimeout(() => {
      this.setState({
        moving: false
      })
    }, 300);
    this.notifyPercentChange(percent)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.percent !== nextProps.percent && !this.state.moving) {
      const angleLength = this.getAngle(nextProps.percent);
      //Animated.spring(
      //  this.state.angleLength,
      //  {
      //    toValue: angleLength,
      //    tension: 0,
      //    friction: 3
      //  }
      //).start();
      this.setState({
        angleLength
      })
    }
  }

  render() {
    const {
      angleLength
    } = this.state;
    return <AnimatedSlider
      startAngle={0}
      angleLength={angleLength}
      onUpdate={this.onUpdate.bind(this)}
      segments={30}
      radius={60}
      strokeWidth={20}
      gradientColorFrom={'#00aeec'}
      gradientColorTo={'#00aeec'}
      bgCircleColor='#fbfbfb'>
    </AnimatedSlider>
  }
}

ProgressController.propTypes = {
  currentTime: PropTypes.number,
  percent: PropTypes.number,
  onNewPercent: PropTypes.func,
  duration: PropTypes.number
};

export default ProgressController;
