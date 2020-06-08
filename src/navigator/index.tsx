/**
 * index > BottomTabs > HomeTabs
 */
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators
} from '@react-navigation/stack';
import BottomTabs from '@/navigator/BottomTabs';
import { IPhoto } from '@/types/CommonTypes';
import PhotoDetail from '@/pages/Photo/PhotoDetail';
import UserDetail from '@/pages/User/UserDetail';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  PhotoDetail: {
    item: IPhoto;
  };
  UserDetail: {
    id: string;
  };
};
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default class Navigator extends React.Component {
  getPhotoDetailOptions = ({
    route
  }: {
    route: RouteProp<RootStackParamList, 'PhotoDetail'>;
  }) => {
    return {
      headerTitle: route.params.item.title
    };
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottonWidth: StyleSheet.hairlineWidth
                }
              })
            }
          }}>
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ headerTitle: '首页' }}
          />
          <Stack.Screen
            name="PhotoDetail"
            component={PhotoDetail}
            options={this.getPhotoDetailOptions}
          />
          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={{
              headerTitle: '用户详情'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
