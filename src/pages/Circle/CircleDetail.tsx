import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '@/navigator/AppNavigation';
import Icon from '@/assets/iconfont';
import { RootState } from '@/models/index';
import { Navigator, Storage, ENV } from '@/utils/index';
import { Loading, Button, Touchable } from '@/components/index';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['circle/queryCircleDetail'],
  circleDetail: state.circle.circleDetail
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<AppStackParamList, 'CircleDetail'>;
}

class CircleDetail extends React.Component<IProps> {
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

  goBack = () => {
    Navigator.goBack();
  };

  handleClickCircleJoinBtn = () => {};

  render() {
    const { loading, circleDetail } = this.props;
    return (
      <ParallaxScrollView
        backgroundColor="blue"
        contentBackgroundColor="pink"
        parallaxHeaderHeight={300}
        renderForeground={() =>
          circleDetail ? (
            <View style={styles.head}>
              <View style={styles.headBack}>
                <Touchable onPress={this.goBack}>
                  <Icon name="icon-close" size={30} color={'#fff'} />
                </Touchable>
              </View>
              <View style={styles.circleName}>
                <Text>#{circleDetail.name}</Text>
              </View>
              <View style={styles.circleDesc}>
                <Text>description {circleDetail.description}</Text>
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
          ) : null
        }>
        <View style={{ height: 500 }}>
          <Text>Scroll me</Text>
        </View>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  head: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(190, 200, 200)'
  },
  headBack: {
    // marginHorizontal: Platform.OS === 'android' ? 0 : 8
  },
  circleName: {},
  circleDesc: {},
  circleInfo: {},
  circleJoinBtn: {}
});

export default connector(CircleDetail);
