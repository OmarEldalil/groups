import React, {useEffect, useState} from 'react';
import {View, Text, TouchableHighlight, Linking, ScrollView} from 'react-native';
import mainStyles, {mainColorTheme, mainUnderlayColor} from '../../../util/mainStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStudentPaymentDetails} from './api';

const PaymentDetails = (props) => {
    const [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState({});
    const [error, setError] = useState('');
    useEffect(() => {
        async function fetchPaymentDetails(paymentId) {
            setLoading(true);
            try {
                let payment = await getStudentPaymentDetails(paymentId);
                setPayment(payment);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPaymentDetails(props.route.params.paymentId);
    }, []);

    if (loading) {
        return (
            <View style={mainStyles.center}>
                <Text>Loading...</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View style={mainStyles.center}>
                <Text style={mainStyles.error}>{error}</Text>
            </View>
        );
    }
    return (
        <ScrollView style={mainStyles.container}>
            <View style={mainStyles.section}>
                <View style={{...mainStyles.mb5, ...mainStyles.flexRow, alignItems: 'center'}}>
                    <Icon name="cash" size={20} color={mainColorTheme}/>
                    <Text style={{...mainStyles.label, fontSize: 25}}>Payment Details</Text>
                </View>
                <Text style={{fontSize: 12, marginLeft: 20, color: '#868686'}}>
                    {(new Date(payment.paymentDate)).toDateString()}
                </Text>
            </View>
            <Text style={{color: mainColorTheme, fontSize: 20, fontWeight: 'bold'}}>Student</Text>
            <View style={mainStyles.section}>
                <View style={mainStyles.rowCenter}>
                    <Icon name="account" size={15} color={mainColorTheme} style={{marginRight: 2}}/>
                    <Text style={{fontSize: 15, color: mainColorTheme, marginRight: 10}}>Name:</Text>
                    <Text>{payment.student.name}</Text>
                </View>
                <View style={{...mainStyles.rowCenter, ...mainStyles.mt10}}>
                    <Icon name="phone" size={15} color={mainColorTheme} style={{marginRight: 2}}/>
                    <Text style={{fontSize: 15, color: mainColorTheme, marginRight: 10}}>Phone:</Text>
                    <TouchableHighlight
                        underlayColor={mainUnderlayColor}
                        onPress={() => {
                            Linking.openURL(`tel:${payment.student.phone}`);
                        }}
                    >
                        <Text>{payment.student.phone}</Text>
                    </TouchableHighlight>
                </View>
            </View>
            <View style={mainStyles.section}>
                <View style={mainStyles.flexRow}>
                    <Text style={{color: mainColorTheme, fontSize: 20, fontWeight: 'bold'}}>Amount</Text>
                    <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>{payment.amount} L.E.</Text>
                </View>
            </View>
            <View>
                <Text style={{color: mainColorTheme, fontSize: 20, fontWeight: 'bold'}}>Sessions</Text>
                <View>
                    {payment.sessions.map((session, index) => (
                        <View key={index} style={mainStyles.mt10}>
                            <Text>{(new Date(session.date)).toDateString()}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};
export default PaymentDetails;
