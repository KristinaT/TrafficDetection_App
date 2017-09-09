/**
 * Created by kristinataneva on 8/8/17.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

class News extends Component {
    onLearnMore = (data) => {
        this.props.navigation.navigate('NewsDetail', data);
    };

    constructor(props) {
        super(props);
        this.state = {
            datas: []
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

    renderData = () => {
       // console.log(this.state.datas," datas");
        return(
            this.state.datas.map(data => (
            <ListItem
                key= {data.id}
                title= {data.name}
                onPress={() => this.onLearnMore(data)}
            />
            ))
        );
    };

    render() {
        console.log(this.state);
        return (
            <ScrollView>
                <List>
                    {this.renderData()}
                </List>
            </ScrollView>
        );
    }
}
export default News;
