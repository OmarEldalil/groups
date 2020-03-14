import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight} from 'react-native';

import {getGroups} from './api';
import mainStyles from '../../../util/mainStyles';

const styles = StyleSheet.create({
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

    fetchGroups = async () => {
        try {
            let groups = await getGroups();
            if (this._isMounted) {
                if (this.state.error) {
                    this.setState({error: ''});
                }
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

    };

    async componentDidMount() {
        this._isMounted = true;
        this.props.navigation.addListener('focus', () => {
            if (this.state.error || !this.state.groups.length) {
                this.setState({loadingGroups: true});
                this.fetchGroups();
            }
        });
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
                <View style={mainStyles.center}>
                    <Text>Loading...</Text>
                </View>
            );
        }
        return (this.state.error) ? (
            <View style={mainStyles.center}>
                <Text style={{color: 'red'}}>{this.state.error}</Text>
            </View>
        ) : (!this.state.groups.length) ? (
            <View style={mainStyles.center}>
                <Text>No Groups Yet.</Text>
            </View>
        ) : (
            <FlatList
                data={this.state.groups}
                renderItem={({item, index, separator}) => (
                    <View key={item._id}>
                        <TouchableHighlight style={mainStyles.card}
                                            onPress={() => this.getDetails({
                                                title: `${item.day.name} ${item.time.forHumans}`,
                                                groupDetails: item,
                                            })}
                                            underlayColor={'#b9b9b9'}
                        >
                            <View>
                                <Text style={styles.title}>{item.day.name} {item.time.forHumans}</Text>
                                <Text>{item.grade} ({item.students.length}) Student</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                )}
            />
        );
    }
}
