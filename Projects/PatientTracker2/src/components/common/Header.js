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
        backgroundColor: '#0099cc',
        alignItems: 'center',
        borderColor: '#000000',
        borderBottomWidth: 3,
        position: 'relative',
        height: 60
    },
    textStyle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#ffffff'
    }
});