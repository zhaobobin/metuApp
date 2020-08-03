import React from 'react';
import { StyleSheet, View, Image, ViewStyle } from 'react-native';
import SnapCarsouel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination
} from 'react-native-snap-carousel';
import { screenWidth, wp, hp } from '@/utils/index';
import { IImage } from '@/types/CommonTypes';
import PhotoSwiperItem from './PhotoSwiperItem';

const sliderWidth = screenWidth;
const itemWidth = wp(100);
export const sliderHeight = hp(70);

interface IProps {
  images: IImage[];
  style?: ViewStyle;
}

interface IState {
  carsouelActiveIndex: number;
}

class PhotoSwiper extends React.Component<IProps, IState> {
  state = {
    carsouelActiveIndex: 0
  };

  onSnapToItem = (index: number) => {
    this.setState({
      carsouelActiveIndex: index
    });
  };

  renderItem = (
    { item }: { item: IImage },
    parallaxProps?: AdditionalParallaxProps
  ) => {
    return <PhotoSwiperItem item={item} parallaxProps={parallaxProps} />;
  };

  render() {
    const { images, style } = this.props;
    const { carsouelActiveIndex } = this.state;
    return (
      <View style={[styles.container, style]}>
        <SnapCarsouel
          data={images}
          style={styles.snapCarsouel}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={this.onSnapToItem}
          hasParallaxImages
          loop
        />
        <View style={styles.paginationWrapper}>
          <Pagination
            containerStyle={styles.paginationContainer}
            dotContainerStyle={styles.dotContainner}
            dotStyle={styles.dot}
            activeDotIndex={carsouelActiveIndex}
            dotsLength={images.length}
            inactiveDotScale={0.7}
            inactiveDotOpacity={0.4}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  snapCarsouel: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
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
    backgroundColor: 'rgba(255, 255, 255, .9)'
  }
});

export default PhotoSwiper;
