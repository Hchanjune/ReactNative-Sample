/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import EntryPoint from "./src/EntryPoint";

AppRegistry.registerComponent(appName, () => EntryPoint);
