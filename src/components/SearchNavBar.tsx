/**
 * SearchNavBar
 */
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Navigator } from '@/utils/index';
import { Touchable } from '@/components/index';
import { color } from '@/theme/index';
import Icon from '@/assets/iconfont';
import { SearchType } from '@/types/search/SearchState';

interface IProps {
  type?: SearchType;
  placeholder?: string;
  onChangeText?: (keyword: string) => void;
}

const SearchNavBar: React.FC<IProps> = props => {
  const { type, placeholder, onChangeText } = props;
  const goBack = () => {
    Navigator.goBack();
  };
  const goSearchPage = () => {
    Navigator.goPage('SearchScreen', { type });
  };
  return (
    <View style={styles.navBar}>
      <Touchable style={styles.navBarBack} onPress={goBack}>
        <Icon
          name={type ? 'icon-arrow-lift' : 'icon-close'}
          size={30}
          color="#666"
        />
      </Touchable>
      <View style={styles.searchWrapper}>
        <Icon
          name="icon-search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder={placeholder || '搜索'}
          style={styles.textInput}
          onChangeText={onChangeText}
        />
        {type && <Touchable style={styles.mask} onPress={goSearchPage} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingLeft: 10,
    paddingRight: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: color.border,
    backgroundColor: '#fff'
  },
  navBarBack: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusBar: {
    height: 20,
    backgroundColor: '#fff'
  },
  searchWrapper: {
    flex: 1,
    paddingLeft: 15,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.1)',
    position: 'relative'
  },
  searchIcon: {
    marginRight: 10
  },
  textInput: {
    flex: 1,
    alignSelf: 'center',
    height: 34
  },
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

export default SearchNavBar;
