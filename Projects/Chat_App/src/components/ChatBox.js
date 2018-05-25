import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TextInput} from 'react-native';
import {Container,Header,Content,Footer,Form,Item,Label,Right,Left,Button,Fab,Title,Body,Text,Spinner,Icon,List,ListItem} from 'native-base';
import { ChatService } from '../store/middlewares/chatMiddleware';

class ChatBox extends Component{
    constructor(props){
        super(props)
        this.state={
            messageContent: ''
        }
    }
    componentDidUpdate(){
        console.log("Messages:",this.props.messages)
    }
    componentWillUnmount(){
        console.log("cmwilunmont")
    }
    sentMsg(){
        let date = new Date()
        let Message = {
            content: this.state.messageContent,
            sender: this.props.user.uid,
            reciever: this.props.selectedUser.uid,
            time: date.toLocaleString()
        }
        this.setState({
            messageContent: ''
        })
        this.props.sentMessage(Message, this.props.user.uid, this.props.selectedUser.uid)
    }
    chatName(){
        if(this.props.selectedUser !== null){
            return(
                <Header style={{backgroundColor:'#3366cc'}}>
                    <Body style={{alignItems:'center', flex: 1}}>
                        <Title style={{fontSize: 25, fontWeight: 'bold'}}>Chat With {this.props.selectedUser.name}</Title>
                    </Body>
                </Header>
            )
        }
    }
    renderMessages(){
        return this.props.messages.map((x,y) => {
            if(x.sender === this.props.user.uid){
                return(
                    <ListItem avatar key={y}>
                        <Left style={{flex:0}}>
                        </Left>
                        <Body>
                            <Text style={{textAlign: 'right', color:'#0066ff'}}>{this.props.user.name}</Text>
                            <Text style={{textAlign: 'right'}}>{x.content}</Text>
                            <Text note>{x.time}</Text>
                        </Body>
                        <Right>
                            <Icon name='md-person' />
                        </Right>
                    </ListItem>
                )
            }
            else{
                return(
                    <ListItem avatar key={y}>
                        <Left>
                            <Icon name='ios-person' />
                        </Left>
                        <Body>
                            <Text style={{color:'#ff0000'}}>{this.props.selectedUser.name}</Text>
                            <Text>{x.content}</Text>
                            <Text note style={{textAlign:'right'}}>{x.time}</Text>
                        </Body>
                        <Right style={{flex:0}}>
                        </Right>
                    </ListItem>
                )
            }
        })
    }
    renderButton(){
        if(this.state.messageContent === ''){
            return(
                <Button disabled style={{flex:1}} onPress={() => this.sentMsg()}>
                    <Text>Send</Text>
                </Button>
            )
        }
        else{
            return(
                <Button style={{flex:1}} onPress={() => this.sentMsg()}>
                    <Text>Send</Text>
                </Button>
            )
        }
    }
    render(){
        return(
            <Container>
                {this.chatName()}
                <Content>
                    <List>
                        {this.renderMessages()}
                    </List>
                </Content>
                <Footer>
                    <TextInput 
                    style={{flex: 4, backgroundColor: '#ffffff'}}
                    placeholder='Chat textbox'
                    value={this.state.messageContent}
                    onChangeText={(value) => this.setState({messageContent: value})}/>
                    {this.renderButton()}
                    
                </Footer>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.AuthReducer.user,
        selectedUser: state.ChatReducer.selectedUser,
        messages: state.ChatReducer.messages
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        sentMessage: (message, sender, reciever) => {
            return dispatch(ChatService.sendMessage(message, sender, reciever))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatBox)