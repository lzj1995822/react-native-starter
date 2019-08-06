import React from 'react';
import {Button, StyleSheet, Text, View,TextInput,Alert,Modal,ActivityIndicator} from "react-native";
import { InputItem,  Icon ,List ,Toast} from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import blueVersion from "../styles/colors";
import {store} from '../redux/store';

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
    },
    overMes:{
        height: 50,
        backgroundColor:blueVersion.grey,
        opacity:0.8,
        textAlign:'center',
        display:'flex'

    }
})


export default class Login extends React.Component {


    constructor(props: any) {
        super(props);
        this.redux = store;
        this.state = {
            name: '',
            password:'',
            modalVisible: false,
            showMessage:'登陆成功',
            token:''
        }

        this.submit = this.submit.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    submit() {
        let url = "http://122.97.218.162:21018/api/identity/sysUser/login";
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: this.state.name,
                password: this.state.password,
                isMobile: 1,
            })
        }).then((response) => response.json()).then((resJson) => {
            if(resJson.code == 200){
                this.redux.dispatch({
                    type: 'SET_TOKEN',
                    value: resJson.content.token
                })
                this.redux.dispatch({
                    type: 'SET_USER',
                    value: resJson.content.user
                })
                this.setState({showMessage:'登陆成功'})
                this.setModalVisible(true)
                this.timer = setTimeout(() => {
                    const { navigation } = this.props;
                    navigation.navigate("Main");
                    clearTimeout(this.timer);
                }, 1000)
            }else {
                this.setState({showMessage:'用户名或密码错误'})
                this.setModalVisible(true)
                setTimeout(()=>{
                    this.setModalVisible(false)
                },1500)
            }
            return resJson.data;
        }).catch((error) => {
            this.setState({showMessage:'网络错误'})
            this.setModalVisible(true)
            setTimeout(()=>{
                this.setModalVisible(false)
            },1500)
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
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={styleScope.overMes}>
                        <Text style={{textAlign: 'center',fontSize:20,marginTop:10,color:'white'}}>{this.state.showMessage}</Text>
                    </View>
                </Modal>
            </View>
        )
    }
}


