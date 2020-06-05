import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {getSessionDetails} from './api';
import mainStyles, {groupsGradeBackgroundColors, mainColorTheme} from '../../../util/mainStyles';
import {Badge} from 'react-native-elements';

const SessionDetails = (props) => {
    const [session, setSession] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        async function fetchSessionDetails(sessionId) {
            try {
                setLoading(true);
                let session = await getSessionDetails(sessionId);
                setSession(session);
            } catch (e) {
                console.log(e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSessionDetails(props.route.params.sessionId);
    }, []);

    if (error) {
        return (
            <View style={mainStyles.center}>
                <Text style={mainStyles.error}>{error}</Text>
            </View>
        );
    }
    if (loading) {
        return (
            <View style={mainStyles.center}>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <ScrollView style={mainStyles.container}>
            <View style={mainStyles.section}>
                <View style={{...mainStyles.flexRow, ...mainStyles.rowSpaceBetween}}>
                    <Text style={{...mainStyles.label, fontSize: 25}}>Session Details</Text>
                    <Badge
                        value={session.group.grade}
                        badgeStyle={{
                            ...mainStyles.ml10,
                            backgroundColor: groupsGradeBackgroundColors[session.group.grade],
                        }}
                    />
                </View>
                <Text style={{fontSize: 12, marginLeft: 20, color: '#868686'}}>
                    {(new Date(session.date)).toDateString()}
                </Text>
            </View>
            <View style={mainStyles.section}>
                <Text style={{color: mainColorTheme, fontSize: 20, fontWeight: 'bold'}}>Students</Text>
                <View>
                    {session.attendees.map((attendee, index) => (
                        <View key={index} style={{...mainStyles.mt10, ...mainStyles.flexRow}}>
                            <Text>{attendee.student.name}</Text>
                            <Badge
                                value={attendee.paid ? 'Paid' : 'Unpaid'}
                                badgeStyle={mainStyles.ml10}
                                status={attendee.paid ? 'success' : 'error'}/>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};
export default SessionDetails;
