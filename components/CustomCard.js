import React from 'react';
import {Text, View} from 'react-native';
import {Avatar, Card} from 'react-native-material-ui';

class CustomCard extends React.Component {
    render(){
        return (
            <Card onPress={this.props.showSideMenu}>
                <View style={this.props.card}>
                    <Avatar style={{flex: 2}} icon="add" size={50}/>
                    <View style={{flex: 8}}>
                        <Text style={{fontWeight: 'bold'}}>{this.props.name}</Text>
                        <Text>{this.props.affiliation}</Text>
                    </View>
                </View>
            </Card>
        );
    }
}

export default CustomCard;
