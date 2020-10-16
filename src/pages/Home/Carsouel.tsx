import React from 'react';
import { StyleSheet, View } from 'react-native';
import SnapCarsouel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination
} from 'react-native-snap-carousel';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { IPhoto } from '@/types/CommonTypes';
import { Navigator } from '@/utils/index';
import { Touchable } from '@/components/index';
import { GlobalStyles } from '@/theme/index';

const sliderWidth = GlobalStyles.screenWidth;
const itemWidth = GlobalStyles.widthPercent(90) + GlobalStyles.widthPercent(2) * 2;
export const sliderHeight = GlobalStyles.heightPercent(26);

const mapStateToProps = (state: RootState) => ({
  carsouel: state.home.carsouel,
  carsouelActiveIndex: state.home.carsouelActiveIndex
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  carsouel: IPhoto[];
}

class Carsouel extends React.Component<IProps> {
  componentDidMount() {
    this.getCarsouel();
  }

  getCarsouel = () => {
    this.props.dispatch({
      type: 'home/queryCarsouel'
    });
  };

  onSnapToItem = (index: number) => {
    this.props.dispatch({
      type: 'home/setState',
      payload: {
        carsouelActiveIndex: index
      }
    });
  };

  renderItem = (
    { item }: { item: IPhoto },
    parallaxProps?: AdditionalParallaxProps
  ) => {
    return (
      <Touchable activeOpacity={1} onPress={() => this.goPhotoDetail(item)}>
        <ParallaxImage
          source={{ uri: item.thumb.url + '?x-oss-process=style/thumb' }}
          style={styles.image}
          containerStyle={styles.imageContainer}
          // parallaxFactor={0.5}
          showSpinner
          spinnerColor="rgba(0, 0, 0, .3)"
          {...parallaxProps}
        />
      </Touchable>
    );
  };

  goPhotoDetail = (item: IPhoto) => {
    Navigator.goPage('PhotoDetail', { photo_id: item._id, modal: true });
  };

  render() {
    const { carsouel, carsouelActiveIndex } = this.props;
    return (
      <View>
        <SnapCarsouel
          data={carsouel}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={this.onSnapToItem}
          hasParallaxImages
          loop
          // autoplay
        />
        <View style={styles.paginationWrapper}>
          <Pagination
            containerStyle={styles.paginationContainer}
            dotContainerStyle={styles.dotContainner}
            dotStyle={styles.dot}
            activeDotIndex={carsouelActiveIndex}
            dotsLength={carsouel ? carsouel.length : 0}
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
    height: sliderHeight,
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
    backgroundColor: 'rgba(255, 255, 255, .9)'
  }
});

export default connector(Carsouel);
