/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppView from './src/views/AppView';

AppRegistry.registerComponent(appName, () => AppView);
