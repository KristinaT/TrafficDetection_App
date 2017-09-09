/**
 * Created by kristinataneva on 9/9/17.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView
} from 'react-native';

class HttpRequests extends Component {
    state={
        data:''
    };
    componentDidMount=()=>{
        //var myRequest = new Request('http://localhost:3000/traffic');
        //var myURL = myRequest.url;
        //var myMethod = myRequest.method;
        //var myCred = myRequest.credentials;
        //
        //fetch(myRequest)
        //    .then(function(response) {
        //        if(response.status == 200) {
        //            console.log(response.json);
        //            return response.json();
        //        }
        //        else throw new Error('Something went wrong on api server!');
        //    })
        //    .then(function(response) {
        //        console.debug(response);
        //        // ...
        //    })
        //    .catch(function(error) {
        //        console.error(error);
        //    });

        fetch('http://localhost:3000/traffic', {
            method: 'GET'
        })
            .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);

            this.setState({
                data: responseJson
            })
        })
        .catch((error) => {
            console.error(error);
        });

    };
    render(){
        return (
            <View>
                <Text>
                    {this.state.data.body}
                </Text>
            </View>
        )
    }
}

export default HttpRequests;
