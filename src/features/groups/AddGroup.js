import React from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, Picker, ScrollView} from 'react-native';
import NumberInput from '../../../components/NumberInput';
import mainStyles from '../../../util/mainStyles';

import {getGradeUsers, getGroups} from './api';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class AddGroup extends React.Component {
    state = {
        time: '',
        day: '',
        hours: '',
        minutes: '',
        dayTime: '1',
        grade: '1',
        academicYear: '',
        semester: '',
        students: [],
        feesPerMonth: '',
    };
    _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;
        try {
            let students = await getGradeUsers(this.state.grade);
            if (this._isMounted) {
                this.setState({students: [...students]});
            }
        } catch (e) {
            alert(e);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        this.setState({time: (hourFraction + time).toString()});
    };

    handleGradeChangeAndGetItsStudents = async (itemValue, itemIndex) => {
        this.setState({grade: itemValue});
        try {
            let students = await getGradeUsers(itemValue);
            if (this._isMounted) {
                this.setState({students: [...students]});
            }
        } catch (e) {
            alert(e);
        }
    };

    alertErrors = (errors) => {
        if (errors.length) {
            alert(errors[0]);
        }
    };

    render() {

        return (
            <ScrollView style={{marginTop: 10, marginHorizontal: 5}}>
                <KeyboardAvoidingView behavior="padding">
                    {/* WeekDay selection*/}
                    <Text style={mainStyles.label}>Select A Day</Text>
                    <Picker
                        selectedValue={this.state.day}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({day: itemValue})
                        }>
                        {days.map((day, index) => (
                            <Picker.Item label={day} value={index} key={index}/>
                        ))}
                    </Picker>

                    {/* Time selection*/}
                    <Text style={mainStyles.label}>Select Time</Text>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <NumberInput style={{...mainStyles.textInput, flex: 1.7}}
                                     keyboardType="number-pad"
                                     placeholder="Hour from 0 to 12"
                                     maxLength={2}
                                     name={'Hours'}
                                     min={1}
                                     max={12}
                                     value={this.state.hours}
                                     onChangeText={(hours, errors) => {
                                         this.alertErrors(errors, 'hours');
                                         this.setState({hours: errors.length ? '' : hours});
                                         setImmediate(this.handleTimeSelection);
                                     }}
                        />
                        <NumberInput style={{...mainStyles.textInput, marginLeft: 5, flex: 2}}
                                     keyboardType="number-pad"
                                     placeholder="Minutes from 0 to 59"
                                     maxLength={2}
                                     name={'Minutes'}
                                     min={0}
                                     max={59}
                                     value={this.state.minutes}
                                     onChangeText={(minutes, errors) => {
                                         this.alertErrors(errors);
                                         this.setState({minutes: errors.length ? '' : minutes});
                                         setImmediate(this.handleTimeSelection);
                                     }}
                        />
                        <Picker style={{flex: 1}}
                                selectedValue={this.state.dayTime}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({dayTime: itemValue});
                                    setImmediate(this.handleTimeSelection);
                                }}
                        >
                            <Picker.Item label="PM" value={1}/>
                            <Picker.Item label="AM" value={0}/>
                        </Picker>
                    </View>

                    {/* Academic Field*/}
                    <Text style={mainStyles.label}>Academic Year</Text>
                    <TextInput
                        style={mainStyles.textInput}
                        placeholder={'Academic Year'}
                        keyboardType="number-pad"
                        onChangeText={(val) => {
                            this.setState({academicYear: val});
                        }}
                        maxLength={4}
                    />

                    {/* Semester Field*/}
                    <Text style={mainStyles.label}>Semester</Text>
                    <Picker
                        selectedValue={this.state.semester}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({semester: itemValue})
                        }>
                        <Picker.Item label="First Term" value="1" key="1"/>
                        <Picker.Item label="Second Term" value="2" key="2"/>
                    </Picker>

                    {/* Grade Field*/}
                    <Text style={mainStyles.label}>Grade</Text>
                    <Picker
                        selectedValue={this.state.grade}
                        onValueChange={(itemValue, itemIndex) => this.handleGradeChangeAndGetItsStudents(itemValue, itemIndex)}>
                        <Picker.Item label="First Year" value="1" key="1"/>
                        <Picker.Item label="Second Year" value="2" key="2"/>
                        <Picker.Item label="Third Year" value="3" key="3"/>
                    </Picker>

                    {/* Academic Field*/}
                    <Text style={mainStyles.label}>Students</Text>
                    {(!this.state.students.length) ? (
                            <View style={mainStyles.center}>
                                <Text>No Students</Text>
                            </View>) :
                        (
                            this.state.students.map((student, index) => (
                                <Text key={index}>{student.name}</Text>
                            ))
                        )}
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

export default AddGroup;
