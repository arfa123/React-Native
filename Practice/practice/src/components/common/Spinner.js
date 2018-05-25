import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export const Spinner = (props) => {
    return(
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={props.size || 'large'}/>
        </View>
    )
}

const styles = {
    spinnerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}