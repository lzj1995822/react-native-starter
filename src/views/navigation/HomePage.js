import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Button} from "react-native";
import style from '../styles/common';
import color from '../styles/color';

export default class HomePage extends React.Component {
    render() {
        return (
            <View>
                    <Text style={style.header}>首页</Text>
                <LinearGradient color={color.headerColors} start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }} locations={[0, 0.75]} >
                </LinearGradient>
                <Button title={'基本活动'} onPress={() => this.props.navigation.navigate("Activity")}>基本活动</Button>
            </View>
        )
    }
}



