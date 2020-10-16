/**
 * TopicIndex
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { SearchNavBar } from '@/components/index';
import { Navigator } from '@/utils/index';
import { RootState } from '@/models/index';
import { GlobalStyles } from '@/theme/index';

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class TopicIndex extends React.Component<IProps> {
  goPage = (routeName: string) => {
    Navigator.goPage(routeName);
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchNavBar type="topic" />
        <ScrollView style={styles.body}>
          <View>
            <Text>TopicIndex</Text>
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

export default connector(TopicIndex);
