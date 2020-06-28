import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import _ from 'lodash';
import { DragSortableView } from 'react-native-drag-sort';
import { MainStackNavigation } from '@/navigator/MainNavigation';
import { RootState } from '@/models/index';
import { ICategory } from '@/models/category';
import { color } from '@/theme/index';
import Touchable from '@/components/Touchable';
import HeaderRightButton from './HeaderRightButton';
import CategoryItem, { parentWidth, itemWidth, itemHeight } from './Item';

const fixedItems = [0, 1, 2];

const mapStateToProps = (state: RootState) => ({
  isEdit: state.category.isEdit,
  myCategory: state.category.myCategory,
  categorys: state.category.categorys
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: MainStackNavigation;
}

interface IState {
  myCategory: ICategory[];
}

class Category extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    props.navigation.setOptions({
      headerRight: () => <HeaderRightButton onPress={this.onPressButton} />
    });
    this.state = {
      myCategory: this.props.myCategory
    };
  }

  componentDidMount() {
    this.getCategory();
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'category/setState',
      payload: {
        isEdit: false
      }
    });
  }

  getCategory = () => {
    this.props.dispatch({
      type: 'category/queryCategory'
    });
  };

  // 编辑、完成
  onPressButton = () => {
    const { dispatch, navigation, isEdit } = this.props;
    const { myCategory } = this.state;
    dispatch({
      type: 'category/toggleButton',
      payload: {
        myCategory
      }
    });
    if (isEdit) {
      navigation.goBack();
    }
  };

  // 长按编辑
  onLongPress = () => {
    this.props.dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true
      }
    });
  };

  onPress = (item: ICategory, index: number, selected: boolean) => {
    const { isEdit } = this.props;
    const { myCategory } = this.state;
    if (isEdit && item.disabled !== true) {
      if (selected) {
        this.setState({
          myCategory: myCategory.filter(
            selectedItem => selectedItem.id !== item.id
          )
        });
      } else {
        this.setState({
          myCategory: myCategory.concat(item)
        });
      }
    }
  };

  onClickItem = (data: ICategory[], item: ICategory) => {
    this.onPress(item, data.indexOf(item), true);
  };

  renderSelectedItem = (item: ICategory, index: number) => {
    const { isEdit } = this.props;
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      <CategoryItem
        key={index}
        type="myCategory"
        data={item}
        disabled={disabled}
        isEdit={isEdit}
      />
    );
  };

  renderUnSelectedItem = (item: ICategory, index: number) => {
    const { isEdit } = this.props;
    return (
      <Touchable
        key={index}
        onLongPress={this.onLongPress}
        onPress={() => this.onPress(item, index, false)}>
        <CategoryItem type="categorys" isEdit={isEdit} data={item} />
      </Touchable>
    );
  };

  // 排序变化
  onDataChange = (data: ICategory[]) => {
    this.setState({
      myCategory: data
    });
  };

  render() {
    const { categorys, isEdit } = this.props;
    const { myCategory } = this.state;
    const classifyGroup = _.groupBy(categorys, item => item.classify);
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.classifyName}>我的分类</Text>
        <View style={styles.classifyView}>
          <DragSortableView
            dataSource={myCategory}
            fixedItems={fixedItems}
            renderItem={this.renderSelectedItem}
            sortable={isEdit}
            keyExtractor={item => item.id}
            onDataChange={this.onDataChange}
            parentWidth={parentWidth}
            childrenWidth={itemWidth}
            childrenHeight={itemHeight}
            onClickItem={this.onClickItem}
          />
        </View>
        <View>
          {Object.keys(classifyGroup).map(classify => (
            <View key={classify}>
              <Text style={styles.classifyName}>{classify}</Text>
              <View style={styles.classifyView}>
                {classifyGroup[classify].map(
                  (item: ICategory, index: number) => {
                    if (
                      myCategory.find(
                        selectedItem => selectedItem.id === item.id
                      )
                    ) {
                      return null;
                    }
                    return this.renderUnSelectedItem(item, index);
                  }
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  classifyName: {
    paddingHorizontal: 15,
    marginVertical: 15,
    fontSize: 16
  },
  classifyView: {
    paddingHorizontal: 10,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default connector(Category);
