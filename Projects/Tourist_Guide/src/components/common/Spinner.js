import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export const Spinner = (props) => {
    return(
        <View style={styles.containerStyle}>
            <ActivityIndicator  
            color={'blue' || props.color}
            size={'large' || props.size}
            />
        </View>
    )
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}