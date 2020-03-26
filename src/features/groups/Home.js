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
    state = {
        loading: true,
        groups: [],
        error: '',
    };

    listener = null;

    fetchGroups = async () => {
        this.setState({loading: true});
        try {
            let groups = await getGroups();
            this.setState({groups: [...groups]});
        } catch (e) {
            this.setState({error: e.message});
        } finally {
            this.setState({loading: false});
        }

    };

    async componentDidMount() {
        await this.fetchGroups();
        this.listener = this.props.navigation.addListener('focus', async () => {
            let params = this.props.route.params;
            if (typeof params !== 'undefined' && params.shouldAddGroup) {
                params.shouldAddGroup = false;
                await this.fetchGroups();
            }
        });
    }

    componentWillUnmount() {
        this.props.navigation.removeListener(this.listener);
    }

    getDetails({group, title}) {
        this.props.navigation.navigate('GroupDetails', {title, groupId: group._id});
    }

    render() {
        if (this.state.loading) {
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
                    <TouchableHighlight
                        style={{...mainStyles.card, paddingHorizontal: 20}}
                        onPress={() => this.getDetails({
                            title: `${item.day.name} ${item.time.forHumans}`,
                            group: item,
                        })}
                        underlayColor={'#b9b9b9'}
                    >
                        <View key={item._id} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 2}}>
                                <Text style={styles.title}>{item.day.name} {item.time.forHumans}</Text>
                                <Text>{item.grade} ({item.students.length}) Student</Text>
                            </View>
                            <View style={{flex: 1.2, alignItems: 'flex-start'}}>
                                <Text
                                    style={{fontSize: 14}}>{(item.semester === 1) ? 'First' : 'Second'} Term/{item.academicYear}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}
