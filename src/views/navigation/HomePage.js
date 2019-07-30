import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Button} from "react-native";
import style from '../styles/common';
import color from '../styles/color';

export default class HomePage extends React.Component {
    render() {
        return (
            <View>
                <LinearGradient colors={color.headerColors} locations={[ 0.1, 0.7, 1 ]} start={{ x : 0.0, y : 1.0 }} end={{ x : 1.0, y : 1.0 }}>
                  <Text style={style.header}>首页</Text>
                </LinearGradient>
                <Button title={'基本活动'} onPress={() => this.props.navigation.navigate("Activity")}>基本活动</Button>
            </View>
        )
    }
}



