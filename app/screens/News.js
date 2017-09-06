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
import { posts } from '../config/data2';

class News extends Component {
    onLearnMore = (post) => {
        this.props.navigation.navigate('NewsDetail', post);
    };

    render() {
        return (
            <ScrollView>
                <List>
                    {posts.map((post) => (
                        <ListItem
                            key={post.postId}
                            title={post.address}
                            subtitle={post.name}
                            onPress={() => this.onLearnMore(post)}
                        />
                    ))}
                </List>
            </ScrollView>
        );
    }
}

//ORIGINAL THAT WORKS
//class Feed extends Component {
//    onLearnMore = (user) => {
//        this.props.navigation.navigate('UserDetail', user);
//    };
//
//    render() {
//        return (
//            <ScrollView>
//                <List>
//                    {users.map((user) => (
//                        <ListItem
//                            key={user.login.username}
//                            roundAvatar
//                            avatar={{ uri: user.picture.thumbnail }}
//                            title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
//                            subtitle={user.email}
//                            onPress={() => this.onLearnMore(user)}
//                        />
//                    ))}
//                </List>
//            </ScrollView>
//        );
//    }
//}

export default News;