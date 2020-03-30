import React from 'react';
import {ScrollView, Text, TouchableHighlight, View} from 'react-native';
import mainStyles, {mainColorTheme} from '../../../util/mainStyles';
import {getGroupDetails} from './api';
import {Badge, Button, Divider, Icon} from 'react-native-elements';

export default class GroupDetail extends React.Component {
    state = {
        group: {},
        error: '',
        loading: false,
    };

    fetchGroupDetails = async (groupId) => {
        this.setState({loading: true});
        try {
            let group = await getGroupDetails(groupId);
            this.setState({group});
        } catch (e) {
            throw Error(e.message);
        } finally {
            this.setState({loading: false});
        }
    };

    async componentDidMount() {
        try {
            if (!(this.props.route && this.props.route.params && this.props.route.params.groupId)) {
                throw Error('Group is Not Found');
            }
            this.props.navigation.addListener('focus', async () => {
                try {
                    if (this.props.route.params && this.props.route.params.shouldReload) {
                        this.props.route.params.shouldReload = false;
                        await this.fetchGroupDetails(this.props.route.params.groupId);
                    }
                } catch (e) {
                    this.setState({error: e.message});
                }
            });
            await this.fetchGroupDetails(this.props.route.params.groupId);
        } catch (e) {
            this.setState({error: e.message});
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={mainStyles.center}>
                    <Text>Loading...</Text>
                </View>
            );
        }
        return this.state.error ? (
            <View style={mainStyles.center}>
                <Text style={mainStyles.error}>{this.state.error}</Text>
            </View>
        ) : (
            <ScrollView style={mainStyles.container}>
                <View style={mainStyles.section}>
                    <View style={{...mainStyles.flexRow, marginVertical: 10, alignItems: 'center'}}>
                        <Text style={mainStyles.label}>Students</Text>
                        <Icon
                            name={'add-circle'}
                            color={mainColorTheme}
                            size={30}
                            iconStyle={{marginLeft: 5}}
                            onPress={() => {
                                this.props.navigation.navigate('AddMoreStudents', {
                                    groupId: this.state.group._id,
                                    grade: this.state.group.grade,
                                    title: this.props.route.params.title,
                                    groupStudents: this.state.group.students.map(s => s._id),
                                });
                            }}
                        />
                    </View>
                    {(this.state.group.students && this.state.group.students.length) ? (
                        this.state.group.students.map((student, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    ...mainStyles.mt5,
                                    paddingVertical: 5,
                                }}
                            >
                                <View style={mainStyles.flexRow}>
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.props.navigation.navigate('StudentDetails', {
                                                student,
                                                shouldUpdate: true,
                                            });
                                        }}
                                    >
                                        <Text style={{fontSize: 20}}>{student.name}</Text>
                                    </TouchableHighlight>
                                </View>
                                {(student.totalUnpaidSessions) ? (
                                    <View style={mainStyles.flexRow}>
                                        <Badge
                                            status={(student.totalUnpaidSessions < 4) ? 'warning' : 'error'}
                                            value={student.totalUnpaidSessions}
                                            // badgeStyle={{padding: 5, ...mainStyles.ml10}}
                                        />
                                        <Button
                                            title="Pay"
                                            buttonStyle={{
                                                backgroundColor: mainColorTheme, ...mainStyles.ml10,
                                                padding: 5,
                                            }}
                                            titleStyle={{fontSize: 15, marginLeft: 5}}
                                            icon={
                                                <Icon name={'payment'} size={15} color={'white'}/>
                                            }
                                            onPress={() => {
                                                this.props.navigation.navigate('AddPayment', {
                                                    studentId: student._id,
                                                    groupId: this.state.group._id,
                                                    title: this.props.route.params.title,

                                                });
                                            }}

                                        />
                                    </View>
                                ) : (<View></View>)}

                            </View>
                        ))
                    ) : (
                        (<View style={mainStyles.center}><Text>No Students Yet.</Text></View>)
                    )}
                </View>
                <View>
                    <View style={{...mainStyles.flexRow, marginVertical: 10, marginBottom: 15, alignItems: 'center'}}>
                        <Text style={mainStyles.label}>Sessions</Text>
                        <Icon
                            name={'add-circle'}
                            color={mainColorTheme}
                            size={30}
                            iconStyle={{marginLeft: 5}}
                            onPress={() => {
                                this.props.navigation.navigate('AddSession', {
                                    groupId: this.state.group._id,
                                    gradeId: this.state.group.grade,
                                    title: this.props.route.params.title,
                                    students: this.state.group.students.map(student => ({...student, checked: false})),
                                });
                            }}
                        />
                    </View>
                    {(this.state.group.sessions && this.state.group.sessions.length) ? (
                        this.state.group.sessions.map((session, index) => (
                            <TouchableHighlight
                                key={index}
                                style={{...mainStyles.flexRow, ...mainStyles.mb5}}
                                onPress={() => {
                                    this.props.navigation.navigate('SessionDetails', {
                                        sessionId: session._id,
                                    });
                                }}
                                underlayColor="#e5e5e5"
                            >
                                <View>
                                    <View style={{...mainStyles.flexRow, paddingVertical: 5}}>
                                        <Text>{`${(new Date(session.date)).toGMTString()}`}</Text>
                                    </View>
                                    <Divider/>
                                </View>
                            </TouchableHighlight>
                        ))

                    ) : (
                        (<View style={mainStyles.center}><Text>No Sessions Yet.</Text></View>)
                    )}
                </View>
            </ScrollView>
        );
    }
}
