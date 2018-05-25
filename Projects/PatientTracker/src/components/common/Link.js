import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export const Link = (props) => {
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
        color: '#0000FF',
        fontSize: 16,
    },
    buttonStyle: {

    }
})