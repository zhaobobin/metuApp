import React from 'react';
import { StyleSheet, View } from 'react-native';
import SnapCarsouel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination
} from 'react-native-snap-carousel';
import { screenWidth, wp, hp } from '@/utils/index';

const sliderWidth = screenWidth;
const itemWidth = wp(90) + wp(2) * 2;
const imgHeight = hp(26);
const data = [
  'https://img.alicdn.com/tfs/TB1ig6sIkT2gK0jSZFkXXcIQFXa-520-280.jpg',
  'https://aecpm.alicdn.com/simba/img/TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg',
  'https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg',
  'https://aecpm.alicdn.com/simba/img/TB183NQapLM8KJjSZFBSutJHVXa.jpg',
  'https://img.alicdn.com/tfs/TB16EMmIhD1gK0jSZFKXXcJrVXa-520-280.jpg'
];

class Carsouel extends React.Component {
  state = {
    activeSlide: 0
  };

  onSnapToItem = (index: number) => {
    this.setState({
      activeSlide: index
    });
  };

  renderItem = (
    { item }: { item: string },
    parallaxProps?: AdditionalParallaxProps
  ) => {
    return (
      <ParallaxImage
        source={{ uri: item }}
        style={styles.image}
        containerStyle={styles.imageContainer}
        // parallaxFactor={0.5}
        showSpinner
        spinnerColor="rgba(0, 0, 0, .3)"
        {...parallaxProps}
      />
    );
  };

  pagination = () => {
    const { activeSlide } = this.state;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainner}
          dotStyle={styles.dot}
          activeDotIndex={activeSlide}
          dotsLength={data.length}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    );
  };

  render() {
    return (
      <View>
        <SnapCarsouel
          data={data}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={this.onSnapToItem}
          hasParallaxImages
          loop
          autoplay
        />
        {this.pagination()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: imgHeight,
    borderRadius: 8
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover'
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationContainer: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    position: 'absolute',
    top: -25
  },
  dotContainner: {
    marginHorizontal: 5
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, .9)',
  }
});

export default Carsouel;
