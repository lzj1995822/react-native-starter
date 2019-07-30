import React from 'React';
import {
    View,
    Text
} from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
class Page1 extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    This is Page1, To Post!
                </Text>
            </View>
        )
    }
}
class Page2 extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    This is Page2, To Post!
                </Text>
            </View>
        )
    }
}
const bottomBar = createBottomTabNavigator({
    Page1: {
        screen: Page1,
        navigationOptions: ({ navigation }) => ({
            title: 'Page1',
            headerTitle: 'Page1'
        })
    }
},{});
const bottomBar2 = createBottomTabNavigator({
    Page1: {
        screen: Page1,
        navigationOptions: ({ navigation }) => ({
            title: 'Page1',
            headerTitle: 'Page1'
        })
    }
},{});
const stack = createStackNavigator({
    Home: {
        screen: createAppContainer(bottomBar),
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            headerTitle: 'Home'
        })
    },
    Page2: {
        screen: Page2
    }
},{});


export default createAppContainer(bottomBar2);