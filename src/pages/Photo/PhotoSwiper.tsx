import React from 'react';
import { StyleSheet, View } from 'react-native';
import SnapCarsouel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination
} from 'react-native-snap-carousel';
import { screenWidth, wp, hp } from '@/utils/index';
import { IImage } from '@/types/CommonTypes';

const sliderWidth = screenWidth;
const itemWidth = wp(100);
export const sliderHeight = hp(50);

interface IProps {
  images: IImage[];
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
    { item }: { item: string },
    parallaxProps?: AdditionalParallaxProps
  ) => {
    return (
      <ParallaxImage
        source={{ uri: item + '?x-oss-process=style/thumb' }}
        style={styles.image}
        containerStyle={styles.imageContainer}
        parallaxFactor={0}
        showSpinner
        spinnerColor="rgba(0, 0, 0, .3)"
        {...parallaxProps}
      />
    );
  };

  render() {
    const { carsouelActiveIndex } = this.state;
    const { images } = this.props;
    const data = [];
    for (let i in images) {
      data.push(images[i].url);
    }

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
        />
        <View style={styles.paginationWrapper}>
          <Pagination
            containerStyle={styles.paginationContainer}
            dotContainerStyle={styles.dotContainner}
            dotStyle={styles.dot}
            activeDotIndex={carsouelActiveIndex}
            dotsLength={data.length}
            inactiveDotScale={0.7}
            inactiveDotOpacity={0.4}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: sliderHeight
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
    backgroundColor: 'rgba(255, 255, 255, .9)'
  }
});

export default PhotoSwiper;
