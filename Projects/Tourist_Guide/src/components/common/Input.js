import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export const Input = (props) => {
    return(
        <View style={[styles.viewStyle, props.containerStyle]}>
            <Text style={[styles.textStyle, props.labelStyle]}>
                {props.label}
            </Text>
            <TextInput 
            value={props.value}
            autoCorrect={false}
            secureTextEntry={props.secureTextEntry}
            style={[styles.textInputStyle, props.inputStyle]}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            autoCapitalize={props.autoCapitalize}
            onFocus={props.onFocus}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: 'red',
        padding: 10,
        fontSize: 18,
        flex:1
    },
    textInputStyle: {
        padding: 10,
        flex:2,
        color: 'blue',
        fontSize: 18,
        lineHeight: 23
    },
    viewStyle: {
        flexDirection: 'row',
        flex:1,
        height: 40,
        alignItems: 'center'
    }
})