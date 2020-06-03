/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import 'react-native-gesture-handler';
import App from './src/index';
import { name as appName } from './app.json';
console.disableYellowBox = true;
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

AppRegistry.registerComponent(appName, () => App);
