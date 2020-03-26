import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import mainStyles, {mainColorTheme} from '../../../util/mainStyles';
import {addSessionToGroup} from './api';
import ButtonCenter from '../../../components/ButtonCenter';

export default function AddSession(props) {
    const [date, setDate] = useState((new Date()));
    const [error, setError] = useState('');
    const [students, setStudents] = useState(props.route.params.students);
    const [showDatePickerField, setShowDatePickerField] = useState(false);
    const [loading, setLoading] = useState(false);

    const sessionSchema = Yup.object().shape({
        date: Yup.date().required(),
        attendees: Yup.array().of(Yup.string()),
    });
    const submit = async () => {
        try {
            setLoading(true);
            let selectedStudents = students.filter(student => student.checked).map(student => ({student: student._id}));
            let session = {
                date,
                groupId: props.route.params.groupId,
                attendees: selectedStudents,
            };
            await sessionSchema.validate(session);
            let res = await addSessionToGroup(session);
            if (res.success) {
                return props.navigation.navigate('GroupDetails', {
                    groupId: props.route.params.groupId,
                    title: props.route.params.title,
                    shouldReload: true,
                });
            }
            throw Error('Group is Not Found');
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(true);
        }
    };
    return (
        <View style={mainStyles.container}>
            <View style={mainStyles.mb5}>
                <View style={{...mainStyles.flexRow, alignItems: 'center'}}>
                    <Text style={mainStyles.label}>Select Session Date</Text>
                    <Button
                        icon={(
                            <Icon name="calendar" size={20} color={mainColorTheme}/>
                        )}
                        type="clear"
                        buttonStyle={{borderColor: mainColorTheme}}
                        onPress={() => setShowDatePickerField(true)}
                    />
                </View>
                <Text>{date.toDateString()}</Text>
                {showDatePickerField && (<DateTimePicker
                    value={date}
                    timeZoneOffsetInMinutes={0}
                    mode="date"
                    display="default"
                    onChange={((event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setShowDatePickerField(false);
                        setDate(currentDate);
                    })}
                />)}
            </View>
            <View style={mainStyles.mb5}>
                <Text style={mainStyles.label}>Students Who Attend</Text>
                {(!students.length) ? (
                        <View style={{...mainStyles.mt5, alignItems: 'center'}}>
                            <Text>No Students Found.</Text>
                        </View>
                    ) :
                    <ScrollView>
                        {students.map((student, index) => (
                            <CheckBox
                                key={index}
                                title={student.name}
                                checked={student.checked}
                                checkedColor={mainColorTheme}
                                onPress={() => setStudents(students.map((s, i) => {
                                    if (i === index) {
                                        s.checked = !s.checked;
                                    }
                                    return s;
                                }))}
                            />
                        ))}
                    </ScrollView>
                }
                {error ? (<View>
                    <Text style={mainStyles.error}>{error}</Text>
                </View>) : (<Text></Text>)}
                <ButtonCenter
                    title={'Add'}
                    iconName="plus"
                    onPress={() => submit()}
                    disabled={loading}
                />
            </View>
        </View>
    );
}
