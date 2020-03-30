import React, {useEffect, useState} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import mainStyles from '../../../util/mainStyles';
import {getUnpaidSessions, addPayment} from '../students/api';
import {Input} from 'react-native-elements';
import {feesPerMonth} from '../../../app.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonCenter from '../../../components/ButtonCenter';

const AddPayment = (props) => {
    const [sessions, setSessions] = useState([]);
    const [numberOfPaidSessions, setNumberOfPaidSessions] = useState(0);
    const [error, setError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState('');
    useEffect(() => {
        async function fetchUnpaidSessions(studentId) {
            setLoading(true);
            try {
                let sessions = await getUnpaidSessions(studentId);
                setSessions(sessions);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUnpaidSessions(props.route.params.studentId);
    }, []);

    function handleChange(val) {
        setAmount(val);
        let paidSessions = Math.floor(Number(val / (feesPerMonth / 4)));
        setNumberOfPaidSessions(paidSessions);
        if (paidSessions > sessions.length) {
            setAmountError('Amount Paid Is More Than Expected');
        } else {
            setAmountError('');
        }
    }

    async function submit() {
        if (amountError) {
            return;
        }
        if (amount % (feesPerMonth / 4)) {
            setAmountError('Amount You\'ve Entered Has A Fraction, It Must Only Covers Session\'s Fees.');
            return;
        }
        let data = {
            student: props.route.params.studentId,
            sessions: sessionsToBePaid,
            amount,
            paymentDate: Date.now(),
        };
        try {
            let payment = await addPayment(data);
            props.navigation.navigate('GroupDetails', {
                shouldReload: true,
                groupId: props.route.params.groupId,
                title: props.route.params.title,

            });
        } catch (e) {
            setAmountError(e.message);
        }
    }

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

    let strikedSessionsView = [];
    let sessionsToBePaid = [];
    for (let i = 0; i < sessions.length; i++) {
        if (i < numberOfPaidSessions) {
            sessionsToBePaid.push(sessions[i]._id);
            strikedSessionsView.push((
                <View style={{...mainStyles.flexRow, alignItems: 'center'}} key={i}>
                    <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                        {(new Date(sessions[i].date)).toDateString()}
                    </Text>
                    <Icon
                        name="check-circle"
                        color="green"
                        size={15}
                        style={mainStyles.ml10}
                    />
                </View>
            ));
        } else {
            strikedSessionsView.push((
                <Text key={i}>{(new Date(sessions[i].date)).toDateString()}</Text>
            ));
        }
    }
    return (
        <View style={mainStyles.container}>
            <View>
                <Text style={mainStyles.label}>Unpaid Sessions</Text>
                <View>
                    {strikedSessionsView}
                </View>
            </View>
            <KeyboardAvoidingView behavior="padding">
                <Text style={mainStyles.label}>Add Payment</Text>
                <Input
                    keyboardType="number-pad"
                    placeholder="Enter the amount"
                    value={amount}
                    onChangeText={(val) => handleChange(val)}
                />
                {amountError ? (
                    <View style={{alignItems: 'center'}}>
                        <Text style={mainStyles.error}>{amountError}</Text>
                    </View>
                ) : (
                    <View/>
                )}
                <View style={mainStyles.mt20}>
                    <ButtonCenter
                        title="Pay"
                        iconName="cash"
                        onPress={submit}
                    />
                </View>
            </KeyboardAvoidingView>

        </View>
    );
};
export default AddPayment;
