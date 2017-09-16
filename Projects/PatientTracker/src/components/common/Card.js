import React from 'react';
import {View} from 'react-native';

export const Card = (props) => {
    return(
        <View style={styles}>
            {props.children}
        </View>
    )
}

const styles = {
    backgroundColor: "#ADD8E6",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#4682B4',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
}