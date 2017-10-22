import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import MapView from 'react-native-maps';
const translit = require('latin-to-cyrillic');



class NewsDetail extends Component {
    render() {
        const { name, latitude, longtitude, address } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longtitude),
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034
                    }}>
                    <MapView.Marker
                        coordinate={{latitude: parseFloat(latitude),
                        longitude: parseFloat(longtitude)}}>
                    </MapView.Marker>
                </MapView>
                <View style={styles.text}>
                <Text>  <Text style={{fontWeight: "bold"}}>Тип на застој:</Text> {translit(name)} </Text>
                <Text>   <Text style={{fontWeight: "bold"}}> Адреса: </Text> {translit(address)}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                <Button color="#cc0000" title="Потврди"></Button>
                <Button color="#2eb82e" title="Разрешено"></Button>
                </View>


            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 90,

    },
    text:{
        marginBottom:0,
        alignItems: 'center'
    }
});

//class UserDetail extends Component {
//    render() {
//        const { picture, name, email, phone, login, dob, location } = this.props.navigation.state.params;
//
//        return (
//            <ScrollView>
//                <Tile
//                    imageSrc={{ uri: picture.large}}
//                    featured
//                    title={`${name.first.toUpperCase()} ${name.last.toUpperCase()}`}
//                    caption={email}
//                />
//
//                <List>
//                    <ListItem
//                        title="Email"
//                        rightTitle={email}
//                        hideChevron
//                    />
//                    <ListItem
//                        title="Phone"
//                        rightTitle={phone}
//                        hideChevron
//                    />
//                </List>
//
//                <List>
//                    <ListItem
//                        title="Username"
//                        rightTitle={login.username}
//                        hideChevron
//                    />
//                </List>
//
//                <List>
//                    <ListItem
//                        title="Birthday"
//                        rightTitle={dob}
//                        hideChevron
//                    />
//                    <ListItem
//                        title="City"
//                        rightTitle={location.city}
//                        hideChevron
//                    />
//                </List>
//            </ScrollView>
//        );
//    }
//}

export default NewsDetail;
