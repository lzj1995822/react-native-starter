import React from 'react';
import WelcomePage from './navigation/WelcomePage';
import HomePage from './navigation/HomePage';

import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import Mine from "./user/Mine";
import Calendar from "../modules/calendar/CalendarView";
import Activity from './activity/Activity';
import Login from './Login';
import Cal from './cal/Cal';
import { View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const stack = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    },
    Activity: {
        screen: Activity,
        navigationOptions: {
            headerTitle: '基本活动'
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    }
},{
    initialRouteName: 'WelcomePage',
    //默认导航配置
    defaultNavigationOptions: {

    }
});
const tab = createBottomTabNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "首页",
        })
    },
    Calendar: {
        screen: Calendar,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "台账"
        })
    },
    Cal: {
        screen: Cal,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "统计"
        })
    },
    Mine: {
        screen: Mine,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "我的"
        })
    }
},{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;
            let iconSource;
            switch (routeName) {
                case 'HomePage':
                    iconSource = 'home';
                    break;
                case 'Calendar':
                    iconSource = 'calendar';
                    break;
                case 'Cal':
                    iconSource = 'linechart';
                    break;
                case 'Mine':
                    iconSource = 'user';
                    break;
            }
            return (
                <View>
                    <AntDesign
                        size={26}
                        name={iconSource}
                        style={{color: focused ? '#409eff' : 'grey'}}
                    />
                </View>
            );
        },

    })
});

export default createAppContainer(createSwitchNavigator({
    Init: stack,
    Main: tab,
}, {
    defaultNavigationOptions: {
        header: null
    }
}))