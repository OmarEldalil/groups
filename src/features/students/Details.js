import React from 'react';
import {Text, View} from 'react-native';
import mainStyles from '../../../util/mainStyles';

export default class StudentDetail extends React.Component {
    render() {
        return (
            <View style={mainStyles.center}>
                <Text>{this.props.route.params.student.name}</Text>
            </View>
        );
    }
}
