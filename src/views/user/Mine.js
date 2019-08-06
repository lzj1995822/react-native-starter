import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet,  Alert, Modal} from "react-native";
import color from '../styles/color';
import NavigationBar from "../navigation/NavigationBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import Badge from "@ant-design/react-native/es/badge/index";
import { List, Flex, InputItem, Button} from "@ant-design/react-native";
import {Tag} from "beeshell";
import token from '../token';
const THEME_COLOR = color.THEME_COLOR;
const Item = List.Item;

const styles = StyleSheet.create({
    avator: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: '#fff',
        borderWidth: 3,
    },
    userName: {
        fontSize: 28,
        color: '#555',
        fontWeight: 'bold',
        paddingTop: 20
    },
    latestLoginTime: {
        fontSize: 12,
        paddingLeft: 5
    }
});

export default class Mine extends React.Component {
    constructor() {
        super();
        this.state = {
            password:'',
            rePassword:'',
            modalVisible: false,
            visible:false,
        };
    }

  /*  state = {

    };*/

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    showAlert() {
        Alert.alert(
          '',
          '是否确认重置密码？',
          [
              {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '确认', onPress: () => this.resetPsw()},
          ],
        )
    }
    resetPsw(){
        let userUrl='http://122.97.218.162:21018/api/identity/sysUser/'+'d5c3cbd7-7344-4c45-8871-560ab57dbdbd'+'id';
        return fetch(userUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            },
        }).then((response) => response.json()).then((resJson) => {
            let user = resJson.content;
            user.password = null;
            let url = 'http://122.97.218.162:21018/api/identity/sysUser/'+'d5c3cbd7-7344-4c45-8871-560ab57dbdbd'+'id';
            return fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(user)
            }).then( (response) => {
                console.log(response);
              }).catch((error) => {
                console.error(error)
            });
        }).catch((error) => {
            console.error(error)
        })
    }
    editPsw(psw){
        let userUrl='http://122.97.218.162:21018/api/identity/sysUser/'+'d5c3cbd7-7344-4c45-8871-560ab57dbdbd'+'id';
        return fetch(userUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            },
        }).then((response) => response.json()).then((resJson) => {
            let user = resJson.content;
            user.password = psw;
            let url = 'http://122.97.218.162:21018/api/identity/sysUser/'+'d5c3cbd7-7344-4c45-8871-560ab57dbdbd'+'id';
            return fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(user)
            }).then( (response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error)
            });
        }).catch((error) => {
            console.error(error)
        })
    }
    confirmPsw(password,rePassword){
        if(password==''||rePassword==''){
           Alert.alert("","信息未填写完整",  [{text: '我知道了', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}]);
        }
        if(password!==rePassword){
            Alert.alert("","密码不一致，请重新输入",  [{text: '我知道了', onPress: () =>this.setState({password:'',rePassword:''}), style: 'cancel'}]);
        }
        else{
            this.editPsw(password);
        }

    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        };
        let rightButton =
            <TouchableOpacity style = {{flexDirection: 'row'}}>
                <View style={{padding: 10}}>
                    <Badge dot={true}>
                        <AntDesign
                            size={26}
                            name={'bells'}
                            style={{color: '#fff'}}
                        />
                    </Badge>
                </View>
            </TouchableOpacity>;
        let leftButton =
          <TouchableOpacity style = {{flexDirection: 'row'}}>
              <View style={{padding: 10}}>
                  <AntDesign
                    size={26}
                    name={'left'}
                    style={{color: '#fff'}}
                    onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}
                  />
              </View>
          </TouchableOpacity>;
        let navigationBar = <NavigationBar rightButton={rightButton} linerGradient={true} title='个人中心' statusBar={statusBar} style={{backgroundColor: THEME_COLOR}}/>;
        let pswNavigationBar = <NavigationBar leftButton={leftButton} linerGradient={true} title='修改密码' statusBar={statusBar} style={{backgroundColor: THEME_COLOR}}/>;
        return (
            <View>
                {navigationBar}
                <ImageBackground
                    source={require('../../../assets/images/mine_bg.png')}
                    style={{height: 300, width: '100%',alignItems: 'center',justifyContent: 'center'}}
                    resizeMode="cover"
                >
                    <Flex direction='row'  align='stretch' style={{alignItems: 'center',paddingBottom:50}}>
                        <View style={{flex: 0.33,alignItems: 'flex-end'}}>
                            <Image source={require('../../../assets/images/dq.png')} style={styles.avator}/>
                        </View>
                        <View style={{marginLeft: 40,flex: 0.66}}>
                            <Flex>
                                 <Text style={styles.userName}>句容市委</Text>
                                {/*<View style={{borderColor: 'blue',display: 'inline-block'}}>*/}
                                <Tag textStyle={{color: '#fff'}} style={{backgroundColor: '#67c23a', height: 22, marginTop: 28, marginLeft:10, borderColor: '#67c23a'}}>管理员</Tag>
                                {/*</View>*/}
                            </Flex>
                            <Flex style={{height: 35}} align='end'>
                                <AntDesign
                                    size={18}
                                    name={'mobile1'}
                                />
                                <Text style={{ paddingLeft: 5}}> 13032535789</Text>
                            </Flex>
                            <Flex style={{height: 40}} align='end'>
                                <AntDesign
                                    size={18}
                                    name={'clockcircleo'}
                                />
                                <Text style={styles.latestLoginTime}> 最近登录于2019-09-09 12:27:01</Text>
                            </Flex>
                        </View>
                    </Flex>
                </ImageBackground>
                <List renderHeader=' '>
                    <Item thumb={<AntDesign size={18} name={'reload1'} style={{marginRight: 10,marginLeft: 0}}/>}
                           arrow="horizontal" onPress={this.showAlert.bind(this)}>
                        <Text>密码重置</Text>
                    </Item>
                    <Item thumb={<AntDesign size={18} name={'edit'} style={{marginRight: 10,marginLeft: 0}}/>}
                          arrow="horizontal" onPress={() => {this.setModalVisible(true);}}>
                        <Text>密码修改</Text>
                    </Item>
                    <Item thumb={<AntDesign size={18} name={'back'} style={{marginRight: 10,marginLeft: 0}}/>}
                          arrow="horizontal">
                        <Text>问题反馈</Text>
                    </Item>
                    <Item thumb={<AntDesign size={18} name={'file1'} style={{marginRight: 10,marginLeft: 0}}/>}
                          arrow="horizontal" extra={<Text style={{fontSize: 12}}>版本号 1.1.0</Text>}>
                        <Text>关于句容党建</Text>
                    </Item>
                </List>
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => {alert("Modal has been closed.");}}>
                    {pswNavigationBar}
                    <InputItem clear type="password" value={this.state.password} placeholder="请输入密码"
                               onChange={value => {
                                    this.setState({
                                        password: value,
                                    });
                               }}
                    >
                        密码
                    </InputItem>
                    <InputItem clear type="password" value={this.state.rePassword} placeholder="再次输入密码"
                               onChange={value => {
                                   this.setState({
                                       rePassword: value,
                                   });
                               }}
                    >
                        确认密码
                    </InputItem>
                    <Button type="primary" style={{marginRight: 10,marginLeft:10 }} onPress={() => {this.confirmPsw(this.state.password,this.state.rePassword)}}>确认</Button>

                </Modal>
            </View>
        )
    }
}