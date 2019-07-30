import React from 'react';
import { View, Text} from "react-native";
import style from "../styles/common";
import LinearGradient from "react-native-linear-gradient";
import color from '../styles/color';

export default class Mine extends React.Component {
    render() {
        return (
            <View>
              <LinearGradient colors={color.headerColors} locations={[ 0.1, 0.7, 1 ]} start={{ x : 0.0, y : 1.0 }} end={{ x : 1.0, y : 1.0 }}>
                <Text style={style.header}>个人中心</Text>
              </LinearGradient>
              <Text>我的</Text>
            </View>
        )
    }
}