import React from 'react';
import {StyleSheet} from 'react-native';

export const mainColorTheme = '#e91e63';
export const mainUnderlayColor = '#b9b9b9';

const mainStyles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: mainColorTheme,
    },
    rowSpaceAround: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
    error: {
        color: 'red',
        paddingTop: 5,
    },
    heading2: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
    },
    mt20: {
        marginTop: 20,
    },
    mt5: {
        marginTop: 5,
    },
    mt10: {
        marginTop: 10,
    },
    ml10: {
        marginLeft: 10,
    },
    mb5: {
        marginBottom: 5,
    },
    flexRow: {
        flexDirection: 'row',
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems:'center'
    },
    container: {
        marginTop: 5,
        paddingHorizontal: 10,
    },
});

export default mainStyles;
