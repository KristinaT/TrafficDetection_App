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


    }


    render() {
    return (
        <View>
            <View style={styles.flex2}>
            <Text style={styles.text}>Изберете тип на застој: </Text>
            <Picker style={styles.picker} itemStyle={{height: 90,fontWeight:"bold"}} selectedValue ={this.state.trafficOptions} onValueChange = {this.updateTraffic}>
                <Picker.Item label="Сообраќајна незгода" value="soobrakjaka" />
                <Picker.Item label="Работа на патот" value="rabota" />
                <Picker.Item label="Блокиран сообраќај" value="blokada" />
                <Picker.Item label="Непознато" value="nepoznato" />
            </Picker>
            </View>

            <View style={styles.flex1}>
            <Text style={{fontSize:20, paddingBottom:15}}>Вашата моментална локација е: <Text style={{fontWeight:"bold",whiteSpace:"pre",alignSelf: 'center'}}>Рилски Конгрес 28 </Text> </Text>
            <Button title="Испрати" onPress={()=>this.sendData()}/>
            </View>

        </View>
    );
    }
};

const styles = StyleSheet.create({
    main:{
        fontSize: 20,
        alignSelf: 'center',
    },
    flex2:{
        flex: 2
    },
    text: {
        padding:0,
        marginTop:30,
        marginBottom:10,
        fontSize: 20,
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
        fontSize: 20,
        alignSelf: 'center',
    },
    picker:{
        height:54,
    }
})


export default Me;