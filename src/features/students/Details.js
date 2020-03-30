import React from 'react';
import {Text, View, TouchableHighlight, ScrollView, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import mainStyles, {mainColorTheme, mainUnderlayColor} from '../../../util/mainStyles';
import {getStudentDetails} from './api';
import {Badge, Divider} from 'react-native-elements';

export default class StudentDetail extends React.Component {
    state = {
        error: '',
        loading: true,
        student: {},
    };

    async fetchStudentDetail(_id) {
        try {
            this.setState({loading: true});
            let student = await getStudentDetails(_id);
            this.setState({student});
        } catch (e) {
            this.setState({error: e.message});
        } finally {
            this.setState({loading: false});
        }
    }

    async componentDidMount() {
        let params = this.props.route.params;
        if (typeof params !== 'undefined' && params.student) {
            await this.fetchStudentDetail(this.props.route.params.student._id);
        } else {
            this.setState({error: 'No Student Selected'});
        }
    }

    render() {
        if (this.state.error) {
            return (
                <View style={mainStyles.center}>
                    <Text style={mainStyles.error}>{this.state.error}</Text>
                </View>
            );
        }

        return ((this.state.loading) ? (
            <View style={mainStyles.center}>
                <Text>Loading...</Text>
            </View>
        ) : (
            <ScrollView style={mainStyles.container}>
                <View style={{borderBottomWidth: 1}}>
                    <Text style={mainStyles.label}>{this.state.student.name}</Text>
                    <Text style={{fontSize: 13, color: '#a5a5a5'}}>{this.state.student.grade}</Text>
                </View>

                <View style={{...mainStyles.mt20, ...mainStyles.rowSpaceAround}}>
                    <TouchableHighlight
                        underlayColor={'#b9b9b9'}
                        onPress={() => {
                            Linking.openURL(`tel:${this.state.student.phone}`);
                        }}
                    >
                        <View
                            style={{...mainStyles.flexRow}}
                        >
                            <Icon name={'phone'} size={25} color={mainColorTheme}/>
                            <Text style={{fontSize: 15, marginLeft: 5}}>{this.state.student.phone}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={mainUnderlayColor}
                        onPress={() => {
                            Linking.openURL(`sms:${this.state.student.phone}`);
                        }}
                    >
                        <View
                            style={{...mainStyles.flexRow}}
                        >
                            <Icon name={'cellphone-text'} size={25} color={mainColorTheme}/>
                            <Text style={{fontSize: 15, marginLeft: 5}}>{this.state.student.phone}</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={mainStyles.mt20}>
                    <Text style={{...mainStyles.heading2, color: mainColorTheme}}>Payment History</Text>
                    <View style={mainStyles.mt20}>
                        {this.state.student.payments && ((!this.state.student.payments.length) ? (
                            <View style={mainStyles.center}>
                                <Text style={mainStyles.center}>No Payments Yet!</Text>
                            </View>
                        ) : this.state.student.payments.map((payment, index) => (
                            <TouchableHighlight
                                key={index}
                                style={{...mainStyles.flexRow, ...mainStyles.mb5}}
                                onPress={() => {
                                    this.props.navigation.navigate('PaymentDetails', {
                                        title: payment.paymentDate,
                                        paymentId: payment._id,
                                    });
                                }}
                                underlayColor="#e5e5e5"
                            >
                                <View>
                                    <View style={{...mainStyles.flexRow, paddingVertical: 5}}>
                                        <Text>{`${(new Date(payment.paymentDate)).toDateString()}`}</Text>
                                        <Badge status="primary" badgeStyle={{
                                            backgroundColor: mainColorTheme,
                                            padding: 5,
                                            marginLeft: 10,
                                        }}
                                               value={payment.amount}/>
                                    </View>
                                    <Divider/>
                                </View>
                            </TouchableHighlight>
                        )))}
                    </View>
                </View>
            </ScrollView>
        ));
    }
}
