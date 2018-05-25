import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Heading = (props) => {
    return(
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.headingText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        alignItems: 'center',
        borderColor: '#000000',
        position: 'relative'
    },
    textStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000'
    }
})