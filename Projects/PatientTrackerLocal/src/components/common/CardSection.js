import React from 'react';
import {View} from 'react-native';

export const CardSection = (props) => {
    return(
        <View style={styles}>
            {props.children}
        </View>
    )
}

const styles = {
    margin: 5,
    borderBottomWidth: 2,
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#FFD700',
    position: 'relative',
}