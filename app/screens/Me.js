/**
 * Created by kristinataneva on 8/8/17.
 */
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Picker,Header, Button } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
//import Geocoder from 'react-native-geocoding';
import Geocoder from 'react-native-geocoding';
const API_KEY="AIzaSyDgNd9_cIt48ilo7LvREm_VcGI9-XwYAeo";
const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json';

class Me extends Component {


    //handleSettingsPress = () => {
    //    this.props.navigation.navigate('Settings');
    //};
    state = {
        trafficOptions: 'soobrakjajka',
        latitude: null,
        longitude: null,
        fullAddress:null
    };

    //geocoder starts
    //const test={
    //    lat:state.latitude,
    //    lng:state.longitude
    //};

//GEOCODER TEST

    async getFromLatLng(lat, lng) {
        //if (!this.apiKey) {
        //    return Promise.reject(new Error("Provided API key is invalid"));
        //}

        //if (!lat || !lng) {
        //    return Promise.reject(new Error("Provided coordinates are invalid"));
        //}

        const latLng = `${lat},${lng}`;
        const url = `${googleApiUrl}?key=${API_KEY}&latlng=${encodeURI(latLng)}`;
        console.log("LatLng ", url);
        return this.handleUrl(url);
    }
    async handleUrl(url) {
        const response = await fetch(url).catch(
            error => {
                return Promise.reject(new Error("Error fetching data"));
            }
        );

        const json = await response.json().catch(
            error => {
                return Promise.reject(new Error("Error parsing server response"));
            }
        );

        if (json.status === 'OK') {
            const name=json.results[0].address_components[1].long_name;
            const number = json.results[0].address_components[0].long_name;
            const fullAddress=name+" "+number;
            console.log("Momentalna adresa: ",fullAddress.toString());
            this.state.fullAddress = fullAddress;
            //return fullAddress;
        }
        else {
            return Promise.reject(new Error(`Server returned status code ${json.status}`));
        }
    }
// GEOCODER TEST END

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
        console.log("User Data for sending" + data.name,data.location.lat,data.location.long);

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
        var bla =this.getFromLatLng(this.state.latitude,this.state.longitude);
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
            <Text style={{ paddingBottom:15}}>Вашата моментална локација е: <Text> {this.state.fullAddress}</Text> </Text>
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
