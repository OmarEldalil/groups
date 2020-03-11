import React from 'react';

import {View, StyleSheet} from 'react-native';

import {Button, Toolbar, Icon} from 'react-native-material-ui';

import axios from 'axios';

import CustomCard from '../components/CustomCard';


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 70,
        color: '#000',
        textAlign: 'center',
    },
    btn: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 200,
    },
    cardView: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
    },
    loaderContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class App extends React.Component {
    constructor() {
        super();
        this._isMounted = false;
    }

    state = {
        counter: 0,
        showToolbar: true,
        txt: 'press',
        loading: true,
        groups: [],
    };

    showSideMenu = async () => {
        await this.setState(prevState => {
            counter: prevState.counter++;
        });
        this.setState({txt: `Pressed #${this.state.counter} times`});
    };

    async componentDidMount() {
        try {
            this._isMounted = true;
            let groups = (await axios.get('http://192.168.0.20:3000/groups')).data;
            if (this._isMounted) {
                this.setState({groups});
                this.setState({loading: false});
            }
        } catch (e) {
            console.log((e));
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    {this.state.showToolbar && (
                        <Toolbar leftElement="menu" centerElement="Title"
                                 rightElement={{menu: {icon: 'more-vert', labels: ['Edit', 'Remove']}}}
                                 onRightElementPress={(label) => {
                                     console.log(label);
                                 }}
                                 onLeftElementPress={this.showSideMenu}
                        />
                    )}
                </View>
                {(this.state.loading) ? (
                    <View style={{flex: 7, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="loop" style={styles.loading}/>
                    </View>
                ) : (
                    <View style={{flex: 7}}>
                        {this.state.groups.map(group => (
                            <CustomCard name={group.grade}
                                        affiliation={`${group.day.name}  ${group.time.forHumans}`}
                                        showSideMenu={this.showSideMenu} card={styles.cardView}
                                        key={group.id}/>
                        ))}
                        <View style={styles.btn}>
                            <Button
                                raised
                                primary text={this.state.txt}
                                onPress={this.showSideMenu}
                                icon="add"
                            />
                        </View>
                    </View>
                )}
            </View>

        );
    }

}

export default App;
