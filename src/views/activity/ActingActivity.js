import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Modal, Button} from "react-native";
import token from '../token';
import Card from "@ant-design/react-native/es/card/index";
import WingBlank from "@ant-design/react-native/es/wing-blank/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import Flex from "@ant-design/react-native/es/flex/Flex";
import {Progress} from "@ant-design/react-native";
import color from '../styles/color';
import NavigationBar from "../navigation/NavigationBar";
import { store } from '../../redux/store';
const THEME_COLOR = color.THEME_COLOR;
const styles = StyleSheet.create({
    activityItem: {
    }
})
export default class ActingActivity extends React.Component {
    constructor() {
        super();
        this.page = 1;
        this.size = 13;
        this.state = {
            activityList: [],
            totalPage: 0,
            modalVis: false,
            currentRow: {}
        };
        this.fetchActivityData.bind(this);
        this.onLoadMore.bind(this);
        this.renderModal.bind(this);
        this.showModal.bind(this);
    }
    componentDidMount() {
        this.fetchActivityData();
    }
    fetchActivityData() {
        let url = `http://122.97.218.162:21018/api/identity/parActivity/page?page=${this.page - 1}&size= ${this.size}`;
        let params = {
            currentStatus: "ACTIVE"
        };
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': store.getState().token.value
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then(res => {
            console.log("footer");
            this.setState({
                activityList: this.state.activityList.concat(res.content.content),
                totalPage: res.content.totalPages,
            })
        })
    }
    showModal(item) {
        console.log("modal");
        this.setState({
            modalVis: true,
            currentRow: item
        })
        console.log(this.state.modalVis, "modalVis")
    }
    renderItem = (item) => {
        let logo = item.taskType === 'Party' ? require('../../../assets/images/party-logo.png') : require('../../../assets/images/learning-logo.png');
        return (
                <View style={styles.activityItem} key={item.id}>
                    <TouchableOpacity onPress={() => {this.showModal()}}>
                        <WingBlank size="lg">
                            <Card style={{marginTop: 15, marginBottom: 15, fontSize: 14}} >
                                <Card.Header
                                    title={item.title}
                                    thumb={<Image source={logo} style={{marginLeft: -8,marginRight: 6}}/>}
                                    extra={<Flex justify="end">
                                        <AntDesign name='calendar' size={18}/>
                                        <Text> {item.month}</Text>
                                    </Flex>}
                                />
                                <Card.Body>
                                    <Text style={{paddingTop: 10,paddingLeft: 15, paddingRight: 15}}>{item.context || "暂无内容"}</Text>
                                </Card.Body>
                                <Card.Footer
                                    content={
                                        <Flex>
                                            <View style={{ marginRight: 10, height: 4, flex: 1 }}>
                                                <Progress percent={Math.round(Number(item.totalPercent) * 1000)/10} />
                                            </View>
                                            <Text style={{width: 40}}>{Math.round(Number(item.totalPercent) * 1000)/10}%</Text>
                                        </Flex>
                                    }
                                    extra=""
                                />
                            </Card>
                        </WingBlank>
                    </TouchableOpacity>
                </View>
        )
    };
    onLoadMore() {
        this.page++;
        this.fetchActivityData()
    }
    renderFooter() {
        if (this.state.activityList.length/this.size === this.state.totalPage) {
            return <Text>暂无更多</Text>
        } else {
            return <Text>上划加载更多</Text>
        }
    }
    renderModal(item) {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        };
        let navigationBar = <NavigationBar leftButton={
            <TouchableOpacity onPress={() => {this.setState({modalVis: false})}}>
                <AntDesign name='left' size={26} style={{color: 'white'}} />
            </TouchableOpacity>}
           linerGradient={true} title='活动详情1' statusBar={statusBar} style={{backgroundColor: THEME_COLOR}}/>;
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVis}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
                {navigationBar}
                {/*<Flex>*/}
                    {/*<Flex.Item>*/}
                        <Text>活动</Text>
                <Button title={"返回"} onPress={() => {this.setState({modalVis: false})}} />
                        {/*<Text>{item.title}</Text>*/}
                    {/*</Flex.Item>*/}
                {/*</Flex>*/}
            </Modal>
        )
    }
    render() {
        return (
            <View>
                <ScrollView style={{backgroundColor: 'rgb(245, 245, 249)'}}>
                    <FlatList
                        style={{flex: 1, backgroundColor: 'rgb(245, 245, 249)'}}
                        data={this.state.activityList}
                        onEndReachedThreshold={100}
                        onEndReached={() => {this.onLoadMore()}}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        renderItem={({item}) => this.renderItem(item)}
                    />
                </ScrollView>
                {this.renderModal(this.state.currentRow)}
            </View>
        )
    }
}