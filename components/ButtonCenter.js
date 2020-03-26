import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {mainColorTheme} from '../util/mainStyles';

const ButtonCenter = (props) => {
    return (
        <View style={{alignItems: 'center'}}>
            <Button
                disabled={props.disabled || false}
                icon={(
                    <Icon
                        name={props.iconName}
                        size={20}
                        color={mainColorTheme}/>
                )}
                title={props.title}
                type="outline"
                buttonStyle={{borderColor: mainColorTheme}}
                titleStyle={{color: mainColorTheme, marginLeft: 5}}
                onPress={props.onPress}
            />
        </View>
    );
};

ButtonCenter.propTypes = {
    onPress: PropTypes.func,
    iconName: PropTypes.string,
    title: PropTypes.string
};

export default ButtonCenter;
