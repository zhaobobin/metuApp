import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { RootState } from '@/models/index';
import { LeftBackButton, Button } from '@/components/index';
import { GlobalStyles } from '@/theme/index';
import { ICircleItem } from '@/types/CircleTypes';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['circle/queryCircleDetail'],
  circleDetail: state.circle.circleDetail
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<AppStackParamList, 'CircleDetail'>;
}

interface IState {
  headerIconColor: string;
}

class CircleDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      headerIconColor: '#fff'
    };
  }

  componentDidMount() {
    const { route } = this.props;
    this.queryCircleDetail(route.params.circle_id);
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'circle/clearCircleDetail'
    });
  }

  queryCircleDetail = (circle_id: string) => {
    this.props.dispatch({
      type: 'circle/queryCircleDetail',
      payload: {
        circle_id
      }
    });
  };

  // join circle
  handleClickCircleJoinBtn = () => {};

  getParallaxRenderConfig = () => {
    const { circleDetail } = this.props;
    const { headerIconColor } = this.state;
    const config = {
      renderBackground: () => (
        <View key="background">
          <Image
            source={{
              uri: circleDetail?.avatar_url,
              width: GlobalStyles.screenWidth,
              height: PARALLAX_HEADER_HEIGHT
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              width: GlobalStyles.screenWidth,
              backgroundColor: 'rgba(0,0,0,.4)',
              height: PARALLAX_HEADER_HEIGHT
            }}
          />
        </View>
      ),
      renderForeground: () => (
        <View key="parallax-header" style={styles.parallaxHeader}>
          <View style={styles.circleName}>
            <Text style={styles.whiteText}>#{circleDetail?.name}</Text>
          </View>
          <View style={styles.circleDesc}>
            <Text style={styles.whiteText}>
              description {circleDetail?.description}
            </Text>
          </View>
          <View style={styles.circleInfo}></View>
          <View style={styles.circleJoinBtn}>
            <Button
              title="加入"
              ghost
              onPress={this.handleClickCircleJoinBtn}
            />
          </View>
        </View>
      ),
      renderStickyHeader: () => (
        <View key="sticky-header" style={styles.stickySection}>
          <Text style={styles.stickySectionText}>{circleDetail?.name}</Text>
        </View>
      ),
      renderFixedHeader: () => (
        <View key="fixed-header" style={styles.fixedSection}>
          <LeftBackButton color={headerIconColor} />
        </View>
      )
    };
    return config;
  };

  onChangeHeaderVisibility = (visible: boolean) => {
    const { headerIconColor } = this.state;
    const iconColor = visible ? '#fff' : '#333';
    if (iconColor !== headerIconColor) {
      this.setState({
        headerIconColor: iconColor
      });
    }
  };

  renderContentView = () => {
    return (
      <View style={{ height: 500 }}>
        <Text>Scroll me</Text>
      </View>
    );
  };

  render() {
    const renderConfig = this.getParallaxRenderConfig();
    return (
      <ParallaxScrollView
        backgroundColor="#fff"
        contentBackgroundColor="#fff"
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundScrollSpeed={10}
        onChangeHeaderVisibility={this.onChangeHeaderVisibility}
        {...renderConfig}>
        {this.renderContentView()}
      </ParallaxScrollView>
    );
  }
}

const PARALLAX_HEADER_HEIGHT = 300;
const TOP = Platform.OS === 'ios' ? 20 + (GlobalStyles.is_IphoneX ? 24 : 0) : 0;
const STICKY_HEADER_HEIGHT =
  Platform.OS === 'ios'
    ? GlobalStyles.nav_bar_height_ios + TOP
    : GlobalStyles.nav_bar_height_android;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: GlobalStyles.screenWidth,
    height: PARALLAX_HEADER_HEIGHT
  },
  parallaxHeader: {
    paddingTop: 100,
    paddingBottom: 15,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    paddingTop: TOP + 6,
    alignItems: 'center',
    position: 'relative'
  },
  stickySectionText: {
    color: '#333',
    fontSize: 20
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingTop: TOP - 14,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  circleName: {
    marginBottom: 10
  },
  circleDesc: {
    marginBottom: 10
  },
  circleInfo: {
    marginBottom: 20
  },
  circleJoinBtn: {},
  whiteText: {
    color: '#fff'
  }
});

export default connector(CircleDetail);
