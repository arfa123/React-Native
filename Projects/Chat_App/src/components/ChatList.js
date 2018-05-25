import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container,Header,Content,Form,Item,Input,Label,Right,Left,Button,Title,Body,Text,List,ListItem,Icon} from 'native-base';
import {ChatService} from '../store/middlewares/chatMiddleware';
import {userSelected} from '../store/actions/chatActions';

class ChatList extends Component{
    constructor(props){
        super(props)
    }
    startChat(x){
        this.props.userSelect(x)
        this.props.getMsg(x.uid,this.props.user.uid)
        this.props.closeDrawer()
    }
    renderUsers(){
        return this.props.users.filter((x,y) => {
            return x.uid !== this.props.user.uid
        }).map((x,y) => {
            return(
                <ListItem avatar key={y}>
                    <Left>
                        <Icon name='person' />
                    </Left>
                    <Body>
                        <Text>{x.name}</Text>
                        <Text note>{x.email}</Text>
                    </Body>
                    <Right>
                        <Button onPress={() => this.startChat(x)}>
                            <Text>Chat</Text>
                        </Button>
                    </Right>
                </ListItem>
            )
        })
    }
    render(){
        return(
            <Container>
                <Header style={{backgroundColor: '#3399ff'}}>
                    <Left style={{flex: 0}} />
                    <Body style={{alignItems:'center', flex: 1}}>
                        <Title style={{fontSize: 30, fontWeight: 'bold'}}>Users list</Title>
                    </Body>
                    <Right style={{flex: 0}}/>
                </Header>
                <Content>
                    <List>
                        {this.renderUsers()}
                    </List>
                </Content>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        user: state.AuthReducer.user,
        users: state.ChatReducer.usersList,

    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        userSelect: (user) => {
            return dispatch(userSelected(user))
        },
        getMsg: (x,uid) => {
            return dispatch(ChatService.getMessages(x,uid))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatList);