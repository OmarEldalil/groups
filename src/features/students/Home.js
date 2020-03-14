import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {getStudents} from './api';
import mainStyles from '../../../util/mainStyles';

export default class StudentsHome extends React.Component {

    state = {
        loading: false,
        error: '',
        students: [],
    };

    async componentDidMount() {
        this.setState({loading: true});
        try {
            let students = await getStudents();
            this.setState({students});
        } catch (e) {
            this.setState({error: e.message});
        } finally {
            this.setState({loading: false});
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={mainStyles.center}>
                    <Text>Loading...</Text>
                </View>
            );
        }
        return (this.state.error) ? (
            <View style={mainStyles.center}>
                <Text style={{color: 'red'}}>{this.state.error}</Text>
            </View>
        ) : (!this.state.students.length) ? (
            <View style={mainStyles.center}>
                <Text>No Students Yet.</Text>
            </View>
        ) : (
            <View>
                {(this.state.students.map((student, index) => (
                    <TouchableHighlight
                        onPress={() => {
                            this.props.navigation.navigate('StudentDetail', {student});
                        }}
                        key={index}
                    >
                        <View style={mainStyles.card}>
                            <Text style={mainStyles.bold}>{student.name}</Text>
                            <Text>{student.grade}</Text>
                        </View>
                    </TouchableHighlight>
                )))}
            </View>
        );
    }
}
