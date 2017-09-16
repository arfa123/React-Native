import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Header = (props) => {
    return(
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.headerText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#DA70D6',
        // justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000000',
        borderBottomWidth: 3,
        // shadowColor: 'red',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000000'
    }
});