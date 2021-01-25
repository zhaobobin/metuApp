/**
 * Search - 搜索
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { Touchable, SearchNavBar } from '@/components/index';
import { RootState } from '@/models/index';
import { GlobalStyles } from '@/theme/index';
import { Navigator } from '@/utils/index';
import Icon from '@/assets/iconfont';
import { SearchType, ISearchCate } from '@/types/SearchTypes';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

const CateList: ISearchCate[] = [
  { name: '影集', key: 'photo', route: 'PhotoIndex' },
  { name: '文章', key: 'article', route: 'ArticleIndex' },
  { name: '圈子', key: 'circle', route: 'CircleIndex' },
  { name: '话题', key: 'topic', route: 'TopicIndex' }
];

interface IProps extends ModelState {
  route: RouteProp<AppStackParamList, 'SearchScreen'>;
}

interface IState {
  type?: SearchType;
  keyword: string;
}

class Search extends React.Component<IProps, IState> {
  private inputKey;
  constructor(props: IProps) {
    super(props);
    this.inputKey = '';
    this.state = {
      type: props.route.params ? props.route.params.type : 'photo',
      keyword: ''
    };
  }

  goBack = () => {
    Navigator.goBack();
  };

  onChangeText = (keyword: string) => {
    // console.log(keyword);
  };

  onSelectCate = (type: SearchType) => {
    this.setState({
      type
    });
  };

  render() {
    const { type } = this.state;
    const currentCate = CateList.find(item => item.key === type);
    return (
      <View style={styles.container}>
        <SearchNavBar
          onChangeText={this.onChangeText}
          placeholder={`搜索${currentCate?.name}`}
        />
        <View style={styles.body}>
          <View style={styles.subTitle}>
            <Text style={styles.subTitleText}>搜索指定内容</Text>
          </View>
          <View style={styles.flex}>
            {CateList.map((item, index) => (
              <Touchable
                key={index}
                style={[
                  styles.flexItem,
                  type === item.key ? styles.currentCate : null
                ]}
                onPress={() => this.onSelectCate(item.key)}>
                <Text style={type === item.key ? styles.currentText : null}>
                  {item.name}
                </Text>
              </Touchable>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBar: {
    height: 20,
    backgroundColor: 'red'
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingLeft: 10,
    paddingRight: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: GlobalStyles.color.border,
    backgroundColor: '#fff'
  },
  navBarBack: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchWrapper: {
    flex: 1,
    paddingLeft: 15,
    borderRadius: 16,
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
    height: 34
  },
  body: {
    paddingVertical: 10
  },
  subTitle: {
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subTitleText: {
    fontSize: 15,
    color: '#999'
  },
  flex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  flexItem: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: GlobalStyles.color.border
  },
  currentCate: {
    backgroundColor: GlobalStyles.color.blue
  },
  currentText: {
    color: '#fff'
  }
});

export default connector(Search);
