import React, {Component} from 'react';
import {Container,Header,Content,List,ListItem,Text} from 'native-base';


class ChatList extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <Container>
                <Header />
                <Content>
                    <List>
                        <ListItem>
                            <Text>Simon Mignolet</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Nathaniel Clyne</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

export default ChatList;