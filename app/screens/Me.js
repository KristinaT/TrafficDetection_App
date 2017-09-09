/**
 * Created by kristinataneva on 8/8/17.
 */
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Picker,Header, Button } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';

class Me extends Component {


    //handleSettingsPress = () => {
    //    this.props.navigation.navigate('Settings');
    //};
    state = {
        trafficOptions: 'soobrakjajka',
        latitude: null,
        longitude: null,
    };

    //geocoder starts
    //const test={
    //    lat:state.latitude,
    //    lng:state.longitude
    //};

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
        );
    };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    };

    updateTraffic = (trafficOptions) =>{
        this.setState({trafficOptions:trafficOptions});
    };


    sendData() {
        const data={
            name:this.state.trafficOptions,
            location:{
                lat:this.state.latitude,
                long:this.state.longitude
            }
        };
        console.log(data.name,data.location.lat,data.location.long);

        const URL = "http://localhost:3000/traffic";
        const params = {name: this.state.trafficOptions , latitude: this.state.latitude, longtitude: this.state.longitude};

        //fetch("http://localhost:3000/traffic", {method: "POST", body: JSON.stringify({name: this.state.trafficOptions , latitude: this.state.latitude, longtitude: this.state.longitude})})
        //    .then((response) => response.json())
        //    .done();


        fetch( URL, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json', // <-- Specifying the Content-Type
            }),
            body: JSON.stringify(params) // <-- Post parameters
        })
            .then((response) => response.text())
            .then((responseText) => {
                alert(responseText);
            })
            .catch((error) => {
                console.error(error);
            });

    }


    render() {
    return (
        <View>
            <View style={styles.flex2}>
            <Text style={styles.text}>Изберете тип на застој: </Text>
            <Picker style={styles.picker} itemStyle={{height: 90}} selectedValue ={this.state.trafficOptions} onValueChange = {this.updateTraffic}>
                <Picker.Item label="Сообраќајна незгода" value="Accident" />
                <Picker.Item label="Работа на патот" value="Road Construction" />
                <Picker.Item label="Блокиран сообраќај" value="Traffic Jam" />
                <Picker.Item label="Непознато" value="Unknown" />
            </Picker>
            </View>

            <View style={styles.flex1}>
            <Text style={{ paddingBottom:15}}>Вашата моментална локација е: <Text>Рилски Конгрес 28 </Text> </Text>
            <Button title="Испрати" onPress={()=>this.sendData()}/>
            </View>

        </View>
    );
    }
};

const styles = StyleSheet.create({
    main:{
        alignSelf: 'center',
    },
    flex2:{
        flex: 2
    },
    text: {
        padding:0,
        marginTop:30,
        marginBottom:10,
        alignSelf: 'center',
    },
    picker:{
        margin:0,
        padding:0,
        backgroundColor:'#f2ffe6',
        height:200

    },
    flex1:{
        flex:1,
        padding:0,
        position:"relative",
        top: 400,
        alignSelf: 'center',
    },
    picker:{
        height:54,
    }
})


export default Me;
