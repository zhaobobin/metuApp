import React from 'react';
import { StyleSheet, View, Image, ViewStyle } from 'react-native';
import SnapCarsouel, {
  ParallaxImage,
  AdditionalParallaxProps
} from 'react-native-snap-carousel';
import { screenWidth, screenHeight } from '@/utils/index';
import { IImage } from '@/types/CommonTypes';

interface IProps {
  item: IImage;
  parallaxProps?: AdditionalParallaxProps;
  style?: ViewStyle;
}

interface IState {
  itemHeight: number;
}

class PhotoSwiperItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      itemHeight: 0
    };
  }

  componentDidMount() {
    const { item } = this.props;
    const imgUrl = item.url + '?x-oss-process=style/thumb';
    Image.getSize(
      imgUrl,
      (width: number, height: number) => {
        const itemHeight = Math.floor((screenWidth * height) / width);
        this.setState({
          itemHeight
        });
      },
      () => {}
    );
  }

  render() {
    const { itemHeight } = this.state;
    if (!itemHeight) {
      return null;
    }
    const { item, parallaxProps } = this.props;
    const imgUrl = item.url + '?x-oss-process=style/thumb';
    const containerStyle = {
      width: screenWidth,
      height: itemHeight,
      marginTop: (screenHeight - itemHeight) / 2
    };
    return (
      <ParallaxImage
        source={{ uri: imgUrl }}
        style={styles.image}
        containerStyle={containerStyle}
        parallaxFactor={0}
        showSpinner
        spinnerColor="rgba(0, 0, 0, .3)"
        {...parallaxProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover'
  }
});

export default PhotoSwiperItem;
