import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
import {Card} from 'react-native-material-ui';

import {getGroups} from './api';

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default class GroupsHome extends React.Component {
    _isMounted = false;
    state = {
        loadingGroups: true,
        groups: [],
        error: '',
    };

    async componentDidMount() {
        this._isMounted = true;
        try {
            let groups = await getGroups();
            if (this._isMounted) {
                this.setState({groups: [...groups]});
            }
        } catch (e) {
            if (this._isMounted) {
                this.setState({error: e.message});
            }
        } finally {
            if (this._isMounted) {
                this.setState({loadingGroups: false});
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getDetails(group) {
        this.props.navigation.navigate('GroupDetail', {...group});
    }

    render() {
        if (this.state.loadingGroups) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Loading...</Text>
                </View>
            );
        }
        let content;

        if (this.state.error) {
            content = (
                <Text style={{color: 'red'}}>{this.state.error}</Text>
            );
        } else {
            content = (!this.state.groups.length) ? (<Text>No Groups Yet.</Text>) : (
                <FlatList
                    data={this.state.groups}
                    renderItem={({item, index, separator}) => (
                        <Card fullWidth onPress={() => this.getDetails({
                            title: `${item.day.name} ${item.time.forHumans}`,
                            groupDetails: item,
                        })}
                              key={item._id}>
                            <View style={styles.card}>
                                <Text style={styles.title}>{item.day.name} {item.time.forHumans}</Text>
                                <Text>{item.grade} ({item.students.length}) Student</Text>
                            </View>
                        </Card>
                    )}
                />
            );
        }
        return (
            <View style={{flex: 1}}>
                {content}
            </View>
        );
    }
}
