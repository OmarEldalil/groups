import React from 'react';
import {View, Text, TextInput, Button, Picker, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import mainStyles, {mainColorTheme} from '../../../util/mainStyles';
import {createStudent} from './api';
import ButtonCenter from '../../../components/ButtonCenter';

class AddStudent extends React.Component {
    studentSchema = Yup.object().shape({
        name: Yup.string().required('Name is Required'),
        password: Yup.string(),
        phone: Yup.string().length(11).matches(/^\d+$/, 'Phone Must be Only Numbers').required(),
        grade: Yup.number().oneOf([1, 2, 3]),
        type: Yup.number().oneOf([1, 2]).default(1),
    });
    state = {
        student: {
            name: '',
            password: '',
            phone: '',
            grade: '1',
            type: '1',
        },
        error: '',
    };

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView>
                    <Formik
                        initialValues={this.state.student}
                        validationSchema={this.studentSchema}
                        onSubmit={async (values) => {
                            try {
                                await createStudent(values);
                                this.props.navigation.navigate('StudentsHome', {
                                    shouldAddStudent: true,
                                });
                            } catch (e) {
                                this.setState({error: e.message});
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                            <View>
                                <View style={mainStyles.textInputWrapper}>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                                        <Text style={mainStyles.label}>Name </Text>
                                        <Text style={{marginTop: 5, color: mainColorTheme, fontSize: 9}}>*</Text>
                                    </View>
                                    <TextInput
                                        style={{...mainStyles.textInput}}
                                        placeholder={'Enter Student\'s Name'}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                    />
                                    {(errors.name) ? (<View style={mainStyles.center}>
                                        <Text style={mainStyles.error}>{errors.name}</Text>
                                    </View>) : <Text></Text>}
                                </View>
                                <View style={mainStyles.textInputWrapper}>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                                        <Text style={mainStyles.label}>Phone </Text>
                                        <Text style={{marginTop: 5, color: mainColorTheme, fontSize: 9}}>*</Text>
                                    </View>
                                    <TextInput
                                        style={{...mainStyles.textInput}}
                                        keyboardType="numeric"
                                        placeholder={'Enter Student\'s Phone'}
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                        value={values.phone}
                                    />
                                    {(errors.phone) ? (<View style={mainStyles.center}>
                                        <Text style={mainStyles.error}>{errors.phone}</Text>
                                    </View>) : <Text></Text>}
                                </View>

                                <View style={mainStyles.textInputWrapper}>
                                    <Text style={mainStyles.label}>Password</Text>
                                    <TextInput
                                        style={{...mainStyles.textInput}}
                                        secureTextEntry={true}
                                        autoCorrect={false}
                                        placeholder={'Enter Student\'s Password'}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    {(errors.password) ? (<View style={mainStyles.center}>
                                        <Text style={mainStyles.error}>{errors.password}</Text>
                                    </View>) : <Text></Text>}
                                </View>

                                <View style={mainStyles.textInputWrapper}>
                                    <Text style={mainStyles.label}>Grade</Text>
                                    <Picker
                                        selectedValue={values.grade}
                                        onValueChange={handleChange('grade')}>
                                        <Picker.Item label="First Year" value="1" key="1"/>
                                        <Picker.Item label="Second Year" value="2" key="2"/>
                                        <Picker.Item label="Third Year" value="3" key="3"/>
                                    </Picker>
                                    {(errors.grade) ? (<View style={mainStyles.center}>
                                        <Text style={mainStyles.error}>{errors.grade}</Text>
                                    </View>) : <Text></Text>}
                                </View>
                                <View style={mainStyles.mb5}>
                                    {this.state.error ? (
                                        <View
                                            style={{alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                                            <Text style={{...mainStyles.error}}>
                                                {this.state.error}
                                            </Text>
                                        </View>
                                    ) : (<View></View>)}
                                    <ButtonCenter
                                        onPress={handleSubmit}
                                        title="Add"
                                        iconName="plus"
                                    />
                                </View>
                            </View>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

export default AddStudent;
