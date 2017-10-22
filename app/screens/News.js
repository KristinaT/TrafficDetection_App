/**
 * Created by kristinataneva on 8/8/17.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
const translit = require('latin-to-cyrillic');

class News extends Component {
    onLearnMore = (data) => {
        this.props.navigation.navigate('NewsDetail', data);
    };

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            refreshing: false,
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/traffic', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                this.setState({
                    datas: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    shouldComponentUpdate(nextProps, nextState) {
        //console.log(nextProps, nextState);
        //console.log(this.props, this.state);

        return true;
    }

    renderData = () => {
       // console.log(this.state.datas," datas");
        console.log("povikano");
       // const test= translit(data.name);
        return(
            this.state.datas.map(data => (
            <ListItem
                key= {data.id}
                title= {translit(data.name)}
                subtitle={translit(data.address)}
                onPress={() => this.onLearnMore(data)}
            />
            ))
        );
    };
    _onRefresh() {
        this.setState({refreshing: true});
        this.componentDidMount();
        this.renderData();
        this.setState({refreshing: false});

    }

    render() {
        console.log(this.state);
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    />}>
                    <List>
                        {this.renderData()}
                    </List>
            </ScrollView>
        );
    }
}
export default News;
