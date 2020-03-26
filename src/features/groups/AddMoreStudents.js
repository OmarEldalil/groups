import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import mainStyles, {mainColorTheme} from '../../../util/mainStyles';
import {addMoreStudentsToGroup, getGradeUsers} from '../groups/api';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonCenter from '../../../components/ButtonCenter';

const AddMoreStudents = (props) => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getStudents() {
            setLoading(true);
            let apiStudents = await getGradeUsers(props.route.params.grade);
            setStudents(apiStudents.map(student => {
                return ({
                    ...student,
                    checked: (props.route.params.groupStudents.indexOf(student._id) > -1),
                });
            }));
            setLoading(false);
        }

        try {
            getStudents();
        } catch (e) {
            setError(e.message);
        }
    }, []);

    async function submit() {
        let data = {
            groupId: props.route.params.groupId,
            students: students.filter(s => s.checked).map(s => s._id),
        };
        try {
            let res = await addMoreStudentsToGroup(data);
            if (res.success) {
                return props.navigation.navigate('GroupDetails', {
                    groupId: props.route.params.groupId,
                    title: props.route.params.title,
                    shouldReload: true,
                });
            }
            throw Error('Some Error Occurred, Try Again Later.');

        } catch (e) {
            setError(e.message);
        }
    }

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
        <View style={mainStyles.container}>
            <Text style={mainStyles.label}>Select Students Of The Group</Text>
            {(!students.length) ? (
                <View style={mainStyles.center}>
                    <Text>No Students Found</Text>
                </View>
            ) : (<FlatList
                data={students}
                renderItem={({item, index}) => (
                    <View key={index}>
                        <CheckBox
                            title={item.name}
                            checkedColor={mainColorTheme}
                            checked={item.checked}
                            onPress={() => {
                                let newStudents = [...students];
                                newStudents[index].checked = !students[index].checked;
                                setStudents(newStudents);
                            }}
                        />
                    </View>
                )}/>)}
            <ButtonCenter
                iconName="rotate-3d"
                title="Update"
                onPress={() => submit()}
            />
        </View>
    );
};
export default AddMoreStudents;
