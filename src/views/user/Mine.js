import React from 'react';
import { View, Text} from "react-native";
import style from "../styles/common";

export default class Mine extends React.Component {
    render() {
        return (
            <View>
                <Text style={style.header}>个人中心</Text>
                <Text>我的</Text>
            </View>
        )
    }
}