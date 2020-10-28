/**
 * SearchNavBar
 */
import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Navigator } from '@/utils/index';
import { Touchable } from '@/components/index';
import { InputText } from '@/components/Form';
import { GlobalStyles } from '@/theme/index';
import Icon from '@/assets/iconfont';
import { SearchType } from '@/types/SearchTypes';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 0 : 20;

interface IProps {
  type?: SearchType;
  hideBack?: boolean;
  placeholder?: string;
  onChangeText?: (keyword: string) => void;
}

const SearchNavBar: React.FC<IProps> = props => {
  const { type, hideBack, placeholder, onChangeText } = props;
  const goBack = () => {
    Navigator.goBack();
  };
  const goSearchPage = () => {
    Navigator.goPage('SearchScreen', { type });
  };
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {hideBack ? null : (
          <Touchable style={styles.navBarBack} onPress={goBack}>
            <Icon
              name={type ? 'icon-arrow-lift' : 'icon-close'}
              size={30}
              color="#666"
            />
          </Touchable>
        )}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: GlobalStyles.statusBarHeight,
    backgroundColor: '#fff'
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: GlobalStyles.color.border
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT
  },
  navBarBack: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchWrapper: {
    flex: 1,
    marginHorizontal: 15,
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
    height: 34,
    padding: 0
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
