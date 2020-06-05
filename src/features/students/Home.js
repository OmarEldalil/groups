import React from 'react';
import {ScrollView, Text, TouchableHighlight, View} from 'react-native';
import {getStudents} from './api';
import mainStyles, {groupsGradeBackgroundColors} from '../../../util/mainStyles';

export default class StudentsHome extends React.Component {

    state = {
        loading: false,
        error: '',
        students: [],
    };

    fetchStudents = async () => {
        this.setState({loading: true});
        try {
            let students = await getStudents();
            this.setState({students});
        } catch (e) {
            this.setState({error: e.message});
        } finally {
            this.setState({loading: false});
        }
    };

    async componentDidMount() {
        this.fetchStudents();
        this.props.navigation.addListener('focus', (event) => {
            let params = this.props.route.params;
            if (typeof params !== 'undefined' && params.shouldAddStudent) {
                this.fetchStudents();
                params.shouldAddStudent = false;
            }
        });
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
            <ScrollView>
                {(this.state.students.map((student, index) => (
                    <TouchableHighlight
                        onPress={() => {
                            this.props.navigation.navigate('StudentDetails', {student});
                        }}
                        key={index}
                    >
                        <View style={{...mainStyles.card, backgroundColor: groupsGradeBackgroundColors[student.grade]}}>
                            <Text style={mainStyles.bold}>{student.name}</Text>
                            <Text>{student.grade}</Text>
                        </View>
                    </TouchableHighlight>
                )))}
            </ScrollView>
        );
    }
}
