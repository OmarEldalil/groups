import React from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, Picker, ScrollView, Button} from 'react-native';
import {CheckBox} from 'react-native-elements';
import * as Yup from 'yup';

import mainStyles, {mainColorTheme} from '../../../util/mainStyles';
import {feesPerMonth} from '../../../app.json';
import {createGroup, getGradeUsers} from './api';
import ButtonCenter from '../../../components/ButtonCenter';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const groupSchema = Yup.object().shape({
    time: Yup.number().min(0).max(23.99, 'Hours Must be from 1-12 and Minutes 0-59').required(),
    day: Yup.number().min(0).max(6).required(),
    academicYear: Yup.number().min(1970).max(2500),
    semester: Yup.number().min(1).max(2),
    grade: Yup.number().min(1).max(3),
    students: Yup.array().of(Yup.string()),
    feesPerMonth: Yup.number().default(feesPerMonth),
});

class AddGroup extends React.Component {
    state = {
        group: {
            day: '0',
            time: '',
            academicYear: '',
            semester: '1',
            grade: '1',
            students: [],
            feesPerMonth: feesPerMonth,
        },
        hours: '',
        minutes: '',
        dayTime: '1',
        allGradeStudents: [],
        errors: {},
        loading: false,

    };
    submitForm = async () => {
        try {
            let students = this.state.allGradeStudents.filter(student => {
                return student.isSelected;
            }).map(student => {
                return student._id;
            });
            this.setState({group: {...this.state.group, students}});
            await groupSchema.validate(this.state.group, {abortEarly: false});
            await createGroup(this.state.group);
            this.props.navigation.navigate('GroupsHome', {
                shouldAddGroup: true,
            });
        } catch (e) {
            let err = {};
            if (typeof e.inner !== 'undefined') {
                e.inner.forEach(error => {
                    err[error.path] = error.errors[0];
                });
            } else {
                err.network = e.message;
            }
            this.setState({errors: {...err}});
        }
    };

    fetchGradeUsers = async (grade) => {
        this.setState({loading: true});
        try {
            let students = await getGradeUsers(grade);
            students = students.map(student => {
                return {...student, isSelected: false};
            });
            this.setState({allGradeStudents: [...students]});
        } catch (e) {
            throw Error(e.message);
        }
    };

    async componentDidMount() {
        try {
            await this.fetchGradeUsers(this.state.group.grade);
        } catch (e) {
            this.setState(prevState => ({errors: {...prevState.errors, students: e.message}}));
        } finally {
            this.setState({loading: false});
        }
    }

    handleTimeSelection = () => {
        let time = Number(this.state.hours);
        if (this.state.dayTime && time !== 12) {
            time += 12;
        }
        if (!this.state.dayTime && time === 12) {
            time = 0;
        }
        let hourFraction = Number(this.state.minutes / 60);
        this.setState(prevState => ({group: {...prevState.group, time: (hourFraction + time).toString()}}));
    };

    handleGradeChangeAndGetItsStudents = async (itemValue, itemIndex) => {
        this.setState(prevState => ({group: {...prevState.group, grade: itemValue}}));
        try {
            await this.fetchGradeUsers(itemValue);
        } catch (e) {
            this.setState(prevState => ({errors: {...prevState.errors, students: e.message}}));
        } finally {
            this.setState({loading: false});
        }
    };

    render() {

        return (
            <ScrollView style={{marginTop: 10, marginHorizontal: 5}}>
                <KeyboardAvoidingView>
                    {/* WeekDay selection*/}
                    <View style={mainStyles.textInputWrapper}>
                        <Text style={mainStyles.label}>Select A Day</Text>
                        <Picker
                            selectedValue={this.state.group.day}
                            onValueChange={((itemValue, itemPosition) => {
                                this.setState(prevState => ({group: {...prevState.group, day: itemValue}}));
                            })}
                        >
                            {days.map((day, index) => (
                                <Picker.Item label={day} value={index} key={index}/>
                            ))}
                        </Picker>
                    </View>

                    {/* Time selection*/}
                    <View style={mainStyles.textInputWrapper}>
                        <Text style={mainStyles.label}>Select Time</Text>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <TextInput
                                style={{...mainStyles.textInput, flex: 1}}
                                keyboardType="number-pad"
                                placeholder="Hour(1-12)"
                                maxLength={2}
                                value={this.state.hours}
                                onChangeText={(hours) => {
                                    this.setState({hours});
                                    setImmediate(this.handleTimeSelection);
                                }}
                            />
                            <TextInput
                                style={{...mainStyles.textInput, marginLeft: 5, flex: 1}}
                                keyboardType="number-pad"
                                placeholder="Minutes(0-59)"
                                maxLength={2}
                                value={this.state.minutes}
                                onChangeText={(minutes) => {
                                    this.setState({minutes});
                                    setImmediate(this.handleTimeSelection);

                                }}
                            />
                            <Picker style={{flex: 0.7}}
                                    selectedValue={this.state.dayTime}
                                    onValueChange={(dayTime) => {
                                        this.setState({dayTime});
                                        setImmediate(this.handleTimeSelection);
                                    }}
                            >
                                <Picker.Item label="PM" value={1}/>
                                <Picker.Item label="AM" value={0}/>
                            </Picker>
                        </View>
                        {this.state.errors.time && (
                            <Text style={mainStyles.error}>{this.state.errors.time}</Text>
                        )}
                    </View>

                    {/* Academic Year Field*/}
                    <View style={mainStyles.textInputWrapper}>
                        <Text style={mainStyles.label}>Academic Year</Text>
                        <TextInput
                            style={mainStyles.textInput}
                            placeholder={'Academic Year'}
                            keyboardType="number-pad"
                            maxLength={4}
                            onChangeText={academicYear => {
                                this.setState(prevState => ({group: {...prevState.group, academicYear}}));
                            }}
                        />
                        {this.state.errors.academicYear && (
                            <Text style={mainStyles.error}>{this.state.errors.academicYear}</Text>
                        )}
                    </View>

                    {/* Semester Field*/}
                    <View style={mainStyles.textInputWrapper}>
                        <Text style={mainStyles.label}>Semester</Text>
                        <Picker
                            selectedValue={this.state.group.semester}
                            onValueChange={((itemValue, itemPosition) => {
                                this.setState(prevState => ({group: {...prevState.group, semester: itemValue}}));
                            })}
                        >
                            <Picker.Item label="First Term" value="1" key="1"/>
                            <Picker.Item label="Second Term" value="2" key="2"/>
                        </Picker>
                    </View>

                    {/* Grade Field*/}
                    <View style={mainStyles.textInputWrapper}>
                        <Text style={mainStyles.label}>Grade</Text>
                        <Picker
                            selectedValue={this.state.group.grade}
                            onValueChange={(itemValue, itemIndex) => (
                                this.handleGradeChangeAndGetItsStudents(itemValue, itemIndex)
                            )}>
                            <Picker.Item label="First Year" value="1" key="1"/>
                            <Picker.Item label="Second Year" value="2" key="2"/>
                            <Picker.Item label="Third Year" value="3" key="3"/>
                        </Picker>
                    </View>

                    {/* Students Field*/}
                    <View style={mainStyles.textInputWrapper}>
                        <Text style={mainStyles.label}>Students</Text>
                        {(this.state.loading) ? (<Text>Loading...</Text>) : (this.state.errors.students) ? (
                            <Text style={mainStyles.error}>{this.state.errors.students}</Text>
                        ) : (!this.state.allGradeStudents.length) ? (
                                <View style={mainStyles.center}>
                                    <Text>No Students</Text>
                                </View>) :
                            (
                                this.state.allGradeStudents.map((student, index) => (
                                    <View key={index} style={mainStyles.mt5}>
                                        <CheckBox
                                            key={index}
                                            checkedColor={mainColorTheme}
                                            onPress={() => {
                                                let students = [...this.state.allGradeStudents];
                                                students[index].isSelected = !students[index].isSelected;
                                                this.setState({allGradeStudents: students});
                                            }}
                                            checked={student.isSelected}
                                            title={student.name}
                                        />
                                    </View>
                                ))
                            )}
                    </View>

                    <View style={{...mainStyles.textInputWrapper, ...mainStyles.mt20, marginBottom: 10}}>
                        {this.state.errors.network && (
                            <View style={mainStyles.mb5}>
                                <Text style={mainStyles.error}>{this.state.errors.network}</Text>
                            </View>
                        )}
                        <ButtonCenter
                            onPress={()=>{ this.submitForm() }}
                            title="Add"
                            iconName="plus"
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

export default AddGroup;
