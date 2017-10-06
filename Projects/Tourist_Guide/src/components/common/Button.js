import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export const Button = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>
                {props.children}
            </Text>
        </TouchableOpacity>
    )
}
 const styles = StyleSheet.create({
     textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        padding: 10
     },
     buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 2,
        borderWidth: 2,
        borderColor: '#007aff',
        margin: 5,
     }
 })