import React from 'react';
import {StyleSheet} from 'react-native';

export const mainColorTheme = '#e91e63';

const mainStyles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    textInputWrapper: {
        marginTop: 10,
        paddingHorizontal: 15,
    },
    headerRightIconContainer: {
        marginRight: 20,
        borderRadius: 50,
    },
    headerRightIcon: {
        color: mainColorTheme,
        fontSize: 35,
        borderRadius: 50,
    },
    card: {
        marginTop: 5,
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 3,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#e91e63',
    },
});

export default mainStyles;
