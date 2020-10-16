import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Touchable, SearchNavBar } from '@/components/index';
import { Navigator } from '@/utils/index';
import { RootState } from '@/models/index';
import { GlobalStyles } from '@/theme/index';
import { ISearchCate } from '@/types/search/SearchState';

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

const CateList: ISearchCate[] = [
  { name: '影集', key: 'photo', route: 'PhotoIndex' },
  { name: '文章', key: 'article', route: 'ArticleIndex' },
  { name: '圈子', key: 'circle', route: 'CircleIndex' },
  { name: '话题', key: 'topic', route: 'TopicIndex' }
];

interface IProps extends ModelState {}

class Found extends React.Component<IProps> {
  goPage = (routeName: string) => {
    Navigator.goPage(routeName);
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchNavBar hideBack />
        <ScrollView style={styles.body}>
          <View style={styles.flex}>
            {CateList.map((item, index) => (
              <Touchable
                key={index}
                style={styles.flexItem}
                onPress={() => this.goPage(item.route)}>
                <Text>{item.name}</Text>
              </Touchable>
            ))}
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
    paddingVertical: 10
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
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: GlobalStyles.color.border
  }
});

export default connector(Found);
