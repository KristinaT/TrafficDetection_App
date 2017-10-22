/**
 * Created by kristinataneva on 8/8/17.
 */
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Picker,Header } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { Tile, List, ListItem } from 'react-native-elements';
const API_KEY="AIzaSyDgNd9_cIt48ilo7LvREm_VcGI9-XwYAeo";
const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json';
import translit from 'latin-to-cyrillic';


class Me extends Component {


    //handleSettingsPress = () => {
    //    this.props.navigation.navigate('Settings');
    //};
    state = {
        trafficOptions: 'Nezgoda',
        latitude: null,
        longitude: null,
        fullAddress:null
    };

    async getFromLatLng(lat, lng) {

        const latLng = `${lat},${lng}`;
        const url = `${googleApiUrl}?key=${API_KEY}&latlng=${encodeURI(latLng)}`;
        //console.log("LatLng ", url);
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
            },
            address:this.state.fullAddress
        };
      //  console.log("User Data for sending " + data.name,data.location.lat, data.location.long + data.fullAddress);

        const URL = "http://localhost:3000/traffic";
        const params = {name: this.state.trafficOptions , latitude: this.state.latitude, longtitude: this.state.longitude, address:this.state.fullAddress};
        console.log("User Data for sending " + this.state.latitude, this.state.longitude, this.state.fullAddress);

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
    //translitAddress(){
    //    const result=translit(this.state.fullAddress);
    //    if(result==null){
    //        return '';
    //    }
    //    else {
    //        return result;
    //    }
    //}

    render() {
        const getUserLocation =this.getFromLatLng(this.state.latitude,this.state.longitude);
     //   const translitted = translit(this.state.fullAddress);
    return (
        <View style={styles.main}>

            <View style={styles.flex2}>
            <Text style={styles.text}>Изберете тип на застој: </Text>
            <Picker style={styles.picker} itemStyle={{height: 100,  backgroundColor:'#e0e0eb'}} selectedValue ={this.state.trafficOptions} onValueChange = {this.updateTraffic}>
                <Picker.Item label="Сообраќајна незгода" value="Nezgoda" />
                <Picker.Item label="Работа на патот" value="Rabota na patot" />
                <Picker.Item label="Блокиран сообраќај" value="Blokada" />
                <Picker.Item label="Непознато" value="Nepoznato" />
            </Picker>
            </View>

            <View style={styles.flex1}>
                <View style={styles.locationText}>
                    <Text style={styles.locationText1}>Вашата моментална локација е: </Text>
                    <Text style={styles.locationText2}> {this.state.fullAddress}</Text>
                </View>
                <View style={styles.locationText}>
                    <Button
                        title="Испрати" onPress={()=>this.sendData()}
                        raised
                        icon={{name: 'send', type: 'font-awesome'}}
                        buttonStyle={{backgroundColor: '#8cc152', borderRadius: 3, width:300}}
                        textStyle={{textAlign: 'center'}}
                    />
                </View>
            </View>

        </View>
    );
    }
};

const styles = StyleSheet.create({
    main:{
        alignSelf: 'center',
        flex: 1,
    },
    flex2:{
        flex: 0.3
    },
    text: {
        padding:0,
        marginTop:30,
        marginBottom:10,
        alignSelf: 'center',
        fontSize: 20
    },
    picker:{
        height:200

    },
    flex1:{
        flex:0.3,
        alignSelf: 'center',
    },
    flex3:{
        flex: 0.4,
        alignSelf: 'center',
        justifyContent:'center',
        paddingLeft:20,
        paddingRight:20
    },
    picker:{
        borderStyle:'solid'
    },
    locationText:{
        flex:1,
        flexDirection: 'column'
    },
    locationText1:{
        flex:0.3,
        fontSize:20,
        alignSelf: 'center',
    },
    locationText2:{
        flex:0.7,
        fontSize:20,
        alignSelf: 'center',
        fontWeight:'bold',
    }
})


export default Me;
