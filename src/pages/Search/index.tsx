/**
 * Search - 搜索
 */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Touchable } from '@/components/index';
import { RootState } from '@/models/index';
import { color } from '@/theme/index';
import { isIphoneX, Navigator } from '@/utils/index';
import Icon from '@/assets/iconfont';

const is_IphoneX = isIphoneX();

const mapStateToProps = (state: RootState) => ({
  loading: state.loading
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class Search extends React.Component<IProps> {
  private inputKey;
  constructor(props: IProps) {
    super(props);
    this.inputKey = '';
  }

  goBack = () => {
    Navigator.goBack();
  }

  _renderStatusBar = () => {
    let statusBar = null;
    if (Platform.OS === 'ios' && !is_IphoneX) {
      statusBar = (
        <View style={styles.statusBar} />
      );
    }
    return statusBar;
  }

  _renderNavBar = () => {
    return (
      <View style={styles.navBar}>
        <Touchable style={styles.navBarBack} onPress={this.goBack}>
          <Icon name="icon-close" size={30} color="#666" />
        </Touchable>
        <View style={styles.searchWrapper}>
          <Icon name="icon-search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            ref="input"
            placeholder="搜索"
            onChangeText={text => (this.inputKey = text)}
            style={styles.textInput}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._renderStatusBar()}
        {this._renderNavBar()}
        <ScrollView style={styles.body}>
          <Text>Search1</Text>
          <Text>Search2</Text>
          <Text>Search3</Text>
          <Text>Search4</Text>
          <Text>Search5</Text>
          <Text>Search6</Text>
          <Text>Search7</Text>
          <Text>Search8</Text>
          <Text>Search9</Text>
          <Text>Search10</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: 20,
    backgroundColor: '#fff'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: color.border
  },
  navBarBack: {
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchWrapper: {
    flex: 1,
    paddingLeft: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.1)'
  },
  searchIcon: {
    marginRight: 10
  },
  textInput: {
    flex: 1,
    alignSelf: 'center',
    height: 30
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },

});

export default connector(Search);
