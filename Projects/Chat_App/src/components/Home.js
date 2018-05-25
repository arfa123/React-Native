import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BackHandler, AsyncStorage} from 'react-native';
import {Container,Header,Content,Form,Item,Label,Right,Left,Button,Title,Body,Text,Spinner,Drawer,Icon} from 'native-base';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import {firebaseApp} from '../firebaseApp';
import {ChatService} from '../store/middlewares/chatMiddleware';
import {logoutSuccess, logoutReject} from '../store/actions/authAction';

class Home extends Component{
    constructor(props){
        super(props)
    }
    componentWillUnmount(){
        console.log("cmwilunmont")
    }
    componentWillMount(){
        if(this.props.isLogedIn !== true){
            this.props.navigation.navigate('auth')
        }
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
            return true
        })
    }
    componentDidMount(){
        this.props.getUsersList()
    }
    componentDidUpdate(){
        if(this.props.isLogedIn !== true){
            this.props.navigation.navigate('auth')
        }
    }
    closeDrawer(){
        this.drawer._root.close()
    }
    openDrawer(){
        this.drawer._root.open()
    }
    signOut(){
        firebaseApp.auth().signOut()
        .then(() => {
            AsyncStorage.removeItem('user')
            .then((res) => {
                console.log("async:",res)
            })
            this.props.signout()
            BackHandler.exitApp()
        })
        .catch((error) => {
            this.props.signoutFailed(error)
        })
    }
    renderChatBox(){
        if(this.props.selectedUser !== null){
            return(
                <ChatBox />
            )
        }
    }
    render(){
        return(
            <Drawer 
            ref={(ref) => this.drawer = ref}
            content={<ChatList closeDrawer={() => this.closeDrawer()}/>}
            onClose={() => this.closeDrawer()}
            styles={{drawer: {backgroundColor: "#3466cb"}}}>
                <Container>
                    <Header>
                        <Left style={{flex: 1}}>
                            <Button transparent onPress={() => this.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body style={{alignItems:'center', flex: 2}}>
                            <Title style={{fontSize: 40, fontWeight: 'bold'}}>CHAT APP</Title>
                        </Body>
                        <Right style={{flex: 1}}>
                            <Button onPress={() => this.signOut()}>
                                <Icon name='ios-log-out' />
                            </Button>
                        </Right>
                    </Header>
                    {this.renderChatBox()}
                </Container>
            </Drawer>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.AuthReducer.user,
        isLogedIn: state.AuthReducer.isLogin,
        error: state.AuthReducer.errorMessage,
        users: state.ChatReducer.usersList,
        selectedUser: state.ChatReducer.selectedUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        signout: () => {
            return dispatch(logoutSuccess)
        },
        signoutFailed: (error) => {
            return dispatch(logoutReject(error))
        },
        getUsersList: () => {
            return dispatch(ChatService.getUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);