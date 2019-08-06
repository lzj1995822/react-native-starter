import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, ScrollView, ImageBackground} from "react-native";
import { Flex, Carousel, List, NoticeBar, SearchBar } from '@ant-design/react-native';
import NavigationBar from '../navigation/NavigationBar';
import NavigationUtils from '../navigation/NavigationUtils';
import token from '../token';
const Item = List.Item;
const Brief = Item.Brief;

import style from '../styles/common';
import color from '../styles/color';
import {store} from "../../redux/store";
const THEME_COLOR = color.THEME_COLOR;

const styleScope = StyleSheet.create({
    listImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    btnList: {
        marginTop: 20,
        paddingTop: 10,
        paddingLeft: 6,
        paddingRight: 6,
    },
    btnLabel: {
        paddingTop: 8,
        fontSize: 14
    },
    brief: {
        fontSize: 12,
    },
    newsItem: {
        fontSize: 14,
        color: '#444',
        marginBottom: 5,
        marginTop: 5,
    }
});
const carouselStyles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        borderRadius: 8,
        overflow: 'hidden'
    },
    containerVertical: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
    },
    text: {
        color: '#fff',
        fontSize: 36,
    },
});


export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            partyBuildNews: [],
            notice: {}
        };
        this.fetchPartyBuild = this.fetchPartyBuild.bind(this);
        this.fetchNotice = this.fetchNotice.bind(this);
    }
    componentDidMount() {
        // this.fetchPartyBuild().then((news) => {
        //     this.fetchNotice().then((notice) => {
        //         this.setState({
        //             partyBuildNews: news,
        //             notice: notice
        //         })
        //     })
        // })
    }
    fetchPartyBuild() {
        let url = 'http://www.jrxf.gov.cn/wz/getWz';
        let params = { fflid: '6', flid: null, page: 1, pageSize: 5};
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((response) => response.json()).then((resJson) => {
            return resJson.data;
        }).catch((error) => {
            console.error(error)
        })
    }
    fetchNotice() {
        let url = 'http://122.97.218.162:21018/api/identity/information/page?page=0&size=1&sort=createdAt,desc';
        let tokenNew =  store.getState().token.value
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': tokenNew
            },
            body: JSON.stringify({})
        }).then((response) => response.json()).then((resJson) => {
            return resJson.content.content.length === 1 && resJson.content.content[0];
        }).catch((error) => {
            console.error(error)
        })
    }
    renderPartyBuildNews() {
        let newsItems = this.state.partyBuildNews.map((item)=>{
            return <Item key={item.id} data-seed="logId" >
                <Text style={styleScope.newsItem}>{item.bt}</Text>
                <Brief style={styleScope.brief}>组织部  {item.ydl}阅读  {item.createtime}</Brief>
            </Item>
        });
        return <List renderHeader={'党建新闻'}>{newsItems}</List>
    }
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        };
        let navigationBar = <NavigationBar linerGradient={true} title='首页' statusBar={statusBar} style={{backgroundColor: THEME_COLOR}}/>;
        NavigationUtils.navigation = this.props.navigation;
        return (
            <View style={{flex: 1, backgroundColor: 'rgb(245, 245, 249)'}}>
                {navigationBar}
                <SearchBar style={{backgroundColor: 'white'}} defaultValue="" placeholder="搜索" />

                <ScrollView
                    style={{ flex: 1, padding: 15 }}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{marginBottom: 15}}>
                        <NoticeBar  mode="link" marqueenProps={{loop: true, style: {}}}>
                            {this.state.notice.title}
                        </NoticeBar>
                    </View>
                    <Carousel
                        style={carouselStyles.wrapper}
                        dotStyle={{width: 8,height:4, backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
                        dotActiveStyle={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}
                        selectedIndex={2}
                        autoplay
                        infinite>
                        <View
                            style={carouselStyles.containerHorizontal}
                        >
                            <ImageBackground source={require('../../../assets/images/carousel/example.png')} style={{width: '100%', height: '100%', resizeMode:'cover'}}>

                            </ImageBackground>
                        </View>
                        <View
                            style={[carouselStyles.containerHorizontal]}
                        >
                            <ImageBackground source={require('../../../assets/images/carousel/example1.png')} style={{width: '100%', height: '100%', resizeMode:'cover'}}>

                            </ImageBackground>
                        </View>
                        <View
                            style={[
                                carouselStyles.containerHorizontal,
                            ]}
                        >
                            <ImageBackground source={require('../../../assets/images/carousel/example3.png')} style={{width: '100%', height: '100%', resizeMode:'cover'}}>

                            </ImageBackground>
                        </View>
                    </Carousel>
                    {/*按钮集合展示区*/}
                    <Flex justify="between" align="center" style={styleScope.btnList}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate("Activity")}>
                            <View style={{textAlign: 'center'}}>
                                <Image source={require('../../../assets/images/inactive/activity.png')} style={styleScope.listImage}/>
                                <Text style={styleScope.btnLabel}>活动管理</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {console.log(this.props.navigation);this.props.navigation.navigate("Activity")}}>
                            <View style={{textAlign: 'center'}}>
                                <Image source={require('../../../assets/images/inactive/position.png')} style={styleScope.listImage}/>
                                <Text style={styleScope.btnLabel}>阵地展示</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Activity")}>
                            <View style={{textAlign: 'center'}}>
                                <Image source={require('../../../assets/images/background.png')} style={styleScope.listImage}/>
                                <Text style={styleScope.btnLabel}>进度汇总</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Activity")}>
                            <View style={{textAlign: 'center'}}>
                                <Image source={require('../../../assets/images/background.png')} style={styleScope.listImage}/>
                                <Text style={styleScope.btnLabel}>通知公告</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ScoreRank")}>
                            <View style={{textAlign: 'center'}}>
                                <Image source={require('../../../assets/images/background.png')} style={styleScope.listImage}/>
                                <Text style={styleScope.btnLabel}>积分排名</Text>
                            </View>
                        </TouchableOpacity>
                    </Flex>
                    <View style={{marginTop: 15}}>
                        {this.renderPartyBuildNews()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}



