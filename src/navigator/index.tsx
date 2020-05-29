import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
  HeaderTitle
} from '@react-navigation/stack';
import BottomTabs from '@/navigator/BottomTabs';
import Detail from '@/pages/Home/Detail';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Detail: {
    id: number | string;
  };
};
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'center',
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
            name="Detail"
            component={Detail}
            options={{
              headerTitle: '详情'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
