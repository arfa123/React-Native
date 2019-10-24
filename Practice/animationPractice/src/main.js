import React from "react";
import {
    View,
    Animated,
    Text,
    PanResponder,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native";

var {height, width} = Dimensions.get('window');

class Main extends React.Component{
    constructor(props){
        super(props);
        const position = new Animated.Value(1);
        this.state = { position, scrollEnabled: false };
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => {
            //     if(this.state.position.__getValue() == 0) return false;
            // },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if(this.state.position.__getValue() == 0) {
                    this.setState({scrollEnabled: true})
                    return false
                };
                return !(gestureState.dx === 0 && gestureState.dy === 0);
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderGrant: (evt, {dy}) => {
                console.log("onPanResponderGrant: ", this.state.position.__getValue())
                this.state.position.setOffset(this.state.position.__getValue());
                this.state.position.setValue(0);
            },
            onPanResponderMove: (event, {dy}) => {
               console.log("onPanResponderMove: ", dy);
               Animated.timing(this.state.position, {toValue: dy/100, duration: 0}).start();
            },
            onPanResponderRelease: (evt, {dy}) => {
                console.log("onPanResponderRelease: ", dy)
                this.state.position.flattenOffset();
                if(dy > 0){
                    if(dy > 50){
                        Animated.spring(this.state.position, {toValue: 1, duration: 0}).start();
                    }
                    else{
                        Animated.spring(this.state.position, {toValue: 0, duration: 0}).start();
                    }
                }
                else{
                    if(dy < -50){
                        Animated.spring(this.state.position, {toValue: 0, duration: 0}).start();
                    }
                    else{
                        Animated.spring(this.state.position, {toValue: 1, duration: 0}).start();
                    }
                }
            }
         });
         this.state.panResponder = panResponder;
    }
    animationInterpolate = () => {
        this.state.position.extractOffset();
        return {
            translateY: this.state.position.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 200],
              extrapolate: 'clamp'
            })
          }
    }
    render(){
        const translateY = this.animationInterpolate().translateY;
        console.log("render: ", this.state.position);
        return(
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <View style={{flex: 0.1, backgroundColor: "gray"}}></View>
                <ScrollView style={{flex: 1, backgroundColor: "yellow"}} contentContainerStyle={{flexGrow: 1}}>
                    <View style={{height: height * 0.4, backgroundColor: "red"}}>

                    </View>
                    <View style={{flexGrow: 1, backgroundColor: "blue"}}>
                        <Animated.View 
                            style={{backgroundColor: "green", position: "absolute", top: translateY, width: "100%", height: 400}}
                        {...this.state.panResponder.panHandlers}
                        >
                            <TouchableOpacity onPress={() => {
                                if(this.state.position.__getValue() == 1){
                                    Animated.spring(this.state.position, {toValue: 0, duration: 0}).start();
                                } else {
                                    Animated.spring(this.state.position, {toValue: 1, duration: 0}).start();
                                }
                            }}>
                                <Text>Drag</Text>
                            </TouchableOpacity>
                            <ScrollView 
                            // style={{height: 500}} 
                            scrollEnabled={this.state.scrollEnabled}>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>gfdgfdgf</Text>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                                <Text>Hello</Text>
                            </ScrollView>
                        </Animated.View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Main;