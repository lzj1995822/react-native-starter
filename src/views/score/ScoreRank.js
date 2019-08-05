import React from 'react';
import {Button, StyleSheet, Text, View,TextInput,Alert,Modal,ActivityIndicator,Image,FlatList,Separator} from "react-native";
import {store} from '../../redux/store';

export default class ScoreRank extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
        }
    }

    scoreData(){

    }
    renderItem(item){
        return (
            <View key={item}>
                <Text key={item}>{item.text}</Text>
            </View>
        )
    }
    renderSeparator(){
        return <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE",
            }}
        />;
    }

    renderHeadComp(){
        return <Text>我是头</Text>
    }

    renderEndComp(){
        return <Text>我是end</Text>
    }
    keyExtractor(item, index){
        console.log(item);//这里的item就是data里的每一项
        console.log(index);//index就是每一项的索引
    }

    render() {
        const data = [
            {key:'a',text:'jiangzhixi'},
            {key:'b',text:'jiangdonlin'},
            {key:'c',text:'huqianlong'},
        ];
        return (
            <View>
                <Image source={require('../../static/img/blue.jpg')} style={{height:60}}/>
                <FlatList
                    data={data}
                    horizontal={false}
                    initialNumToRender={3}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeadComp}
                    ListFooterComponent={this.renderEndComp}
                    refreshing={true}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={this.keyExtractor}
                />

            </View>
        )
    }
}
