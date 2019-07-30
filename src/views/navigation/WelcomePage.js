import React from 'react';
import { View, Text} from "react-native";

export default class WelcomePage extends React.Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            const { navigation } = this.props;
            navigation.navigate("Main");
        }, 100)
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
    render() {
        return (
            <View>
                <Text>欢迎页面</Text>
            </View>
        )
    }
}