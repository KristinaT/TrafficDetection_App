/**
 * Created by kristinataneva on 8/8/17.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {Icon} from 'react-native-elements';
import NewsDetail from '../screens/NewsDetail';

import News from '../screens/News';
import Me from '../screens/Me';


export const FeedStack = StackNavigator({
    News: {
        screen: News,
        navigationOptions: {
            title: 'Сообраќаен застој'
        },
    },
    NewsDetail: {
        screen: NewsDetail,
        navigationOptions: {
            title: 'Детали за вест' //({ state }) => `${state.params.name.first.toUpperCase()} ${state.params.name.last.toUpperCase()}`
        //({ navigation }) => ({ title: ({ state }) => `${state.params.name.first.toUpperCase()} ${state.params.name.last.toUpperCase()}` })
        }

    }
})
    export const PostStack = StackNavigator({
    Me: {
        screen: Me,
        navigationOptions: {
            title: 'Додади вест'
        },
    },
})

export const Tabs = TabNavigator({
   News:{
        screen: FeedStack, // it was Feed but after adding stacjnavigator in the feed screen we need to replase it wuth FeedStack, //component that should actually be rendered
        navigationOptions: {
            tabBarLabel: 'Новости',
            tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor}/>

        }
   },
    AddPost:{
        screen: PostStack,
        navigationOptions: {
            tabBarLabel: 'Додади вест',
            tabBarIcon: ({ tintColor }) => <Icon name="playlist-add" size={35} color={tintColor}/>
        }
    }
});
