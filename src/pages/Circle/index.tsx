import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { MainStackNavigation } from '@/navigator/MainNavigation';
import { RootState } from '@/models/index';
import { SearchNavBar } from '@/components/index';

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: MainStackNavigation;
}

class Circle extends React.Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <SearchNavBar type="circle" placeholder="搜索圈子" />
        <ScrollView style={styles.body}>
          <View>
            <Text>热门圈子</Text>
          </View>
          <View>
            <Text>兴趣圈子</Text>
          </View>
          <View>
            <Text>摄影学习圈子</Text>
          </View>
          <View>
            <Text>校园圈子</Text>
          </View>
          <View>
            <Text>地域圈子</Text>
          </View>
          <View>
            <Text>圈子动态</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});

export default connector(Circle);
