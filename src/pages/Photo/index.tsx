/**
 * PhotoIndex
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Touchable, SearchNavBar } from '@/components/index';
import { Navigator } from '@/utils/index';
import { RootState } from '@/models/index';
import { color } from '@/theme/index';

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class PhotoIndex extends React.Component<IProps> {
  goPage = (routeName: string) => {
    Navigator.goPage(routeName);
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchNavBar type="photo" />
        <ScrollView style={styles.body}>
          <View>
            <Text>PhotoIndex</Text>
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
  }
});

export default connector(PhotoIndex);
