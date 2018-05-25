import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Drawer,Text} from 'native-base';
import ChatList from './ChatList';

class Home extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <Drawer 
            ref={(ref) => this.drawer = ref}
            content={<ChatList />}>
                <Text>HelloWorld!</Text>
            </Drawer>
        )
    }
}

export default Home;