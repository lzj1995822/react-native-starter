import React from 'react';
import {Button, StyleSheet, Text, View,TextInput,Alert} from "react-native";
import { InputItem,  Icon ,List ,Toast} from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";

const styleScope = StyleSheet.create({
    inputName: {
        height: 60,
        width:140,
        marginBottom:20,
        textAlignVertical: 'bottom'
    },
    inputPassword: {
        height: 60,
        width:140,
        marginBottom:20,
    }
})

export default class Login extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            password:'',
        }
        this.submit = this.submit.bind(this);
    }

    submit() {
        let url = "http://122.97.218.162:21018/api/identity/sysUser/login"
        console.log(this.state)
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: this.state.name,
                password: this.state.password})
        }).then((response) => response.json()).then((resJson) => {
            if(resJson.code == 200){
                this.timer = setTimeout(() => {
                    const { navigation } = this.props;
                    navigation.navigate("Main");
                    clearTimeout(this.timer);
                }, 1000)
            }
            return resJson.data;
        }).catch((error) => {
            console.error(error)
        })
    }

    render() {
        return (
            <View>
                <List renderHeader={'用户登录'}>
                    <InputItem
                        clear
                        value={this.state.name}
                        onChange={(value: any) => {
                            this.setState({
                                name: value,
                            });
                        }}
                        placeholder="输入用户名"
                    >
                        <Text>用户名</Text>
                    </InputItem>

                <InputItem
                    clear
                    type="password"
                    value={this.state.password}
                    onChange={(value: any) => {
                        this.setState({
                            password: value,
                        });
                    }}
                    placeholder="输入密码"
                >
                    <Text>密码</Text>
                </InputItem>

                </List>
                <Button
                    style={{marginTop:20}}
                    onPress={this.submit}
                    title="登录"
                />
            </View>
        )
    }
}
