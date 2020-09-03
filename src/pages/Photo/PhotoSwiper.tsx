import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import SnapCarsouel, {
  AdditionalParallaxProps,
  Pagination
} from 'react-native-snap-carousel';
import { screenWidth, wp, hp, getBottomSpace } from '@/utils/index';
import { IImage } from '@/types/CommonTypes';
import PhotoSwiperItem from './PhotoSwiperItem';

const sliderWidth = screenWidth;
const itemWidth = wp(100);
export const sliderHeight = hp(70);
const bottomSpace = getBottomSpace();

interface IProps {
  images: IImage[];
  title?: string;
  style?: ViewStyle;
  pagination?: boolean;
}

interface IState {
  carsouelActiveIndex: number;
}

class PhotoSwiper extends React.Component<IProps, IState> {
  static defaultProps = {
    pagination: true
  };

  state = {
    carsouelActiveIndex: 0
  };

  componentWillReceiveProps(nextProps: IProps) {
    if(nextProps.title !== this.props.title) {
      this.setState({
        carsouelActiveIndex: 0
      });
    }
  }

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
    const { images, title, style, pagination } = this.props;
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
        {pagination && (
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
        )}
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            {carsouelActiveIndex + 1} / {images.length}
          </Text>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  titleView: {
    height: 50,
    position: 'absolute',
    left: 0,
    bottom: bottomSpace + 30,
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  titleText: {
    marginRight: 15,
    color: '#fff',
    fontSize: 14
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
