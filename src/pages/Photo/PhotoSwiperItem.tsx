import React from 'react';
import { StyleSheet, Image, ViewStyle } from 'react-native';
import {
  ParallaxImage,
  AdditionalParallaxProps
} from 'react-native-snap-carousel';
import { IImage } from '@/types/CommonTypes';
import { GlobalStyles } from '@/theme/index';

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
        const itemHeight = Math.floor(
          (GlobalStyles.screenWidth * height) / width
        );
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
      width: GlobalStyles.screenWidth,
      height: itemHeight,
      marginTop: (GlobalStyles.screenHeight - itemHeight) / 2
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
