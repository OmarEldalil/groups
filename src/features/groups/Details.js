import React from 'react';
import {Text, View} from 'react-native';
import mainStyles from '../../../util/mainStyles';

export default class GroupDetail extends React.Component {
    render() {
        return (
            <View style={mainStyles.center}>
                <Text>{this.props.route.params.groupDetails.day.name}</Text>
            </View>
        );
    }
}
