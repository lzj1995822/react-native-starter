import React from 'react';
import {FlatList, ScrollView, Text, View, StyleSheet} from "react-native";
import token from '../token';
const styles = StyleSheet.create({
    activityItem: {
        height: 60,
        backgroundColor: 'red'
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
        };
        this.fetchActivityData.bind(this);
        this.onLoadMore.bind(this);
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
                'authorization': token
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then(res => {
            this.setState({
                activityList: this.state.activityList.concat(res.content.content),
                totalPage: res.content.totalPages,
            })
        })
    }
    renderItem = (item) => {
        return (
            <View style={styles.activityItem}>
                <Text>{item.title}</Text>
                <Text>{item.month}</Text>
            </View>
        )
    };
    onLoadMore() {
        this.page++;
        this.fetchActivityData()
    }
    renderFooter() {
        console.log("footer")
        if (this.state.activityList.length/this.size === this.state.totalPage) {
            return <Text>暂无更多</Text>
        } else {
            return <Text>上划加载更多</Text>
        }
    }
    render() {
        return (
            <ScrollView>
                <FlatList
                    data={this.state.activityList}
                    onEndReached={() => this.onLoadMore()}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    renderItem={({item}) => this.renderItem(item)}
                />
                <Text>正在执行</Text>
            </ScrollView>
        )
    }
}