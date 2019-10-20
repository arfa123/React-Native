import React from "react";
import {
    View,
    Animated,
    Text,
    PanResponder,
    ScrollView,
    Dimensions
} from "react-native";

var {height, width} = Dimensions.get('window');

class Main extends React.Component{
    constructor(props){
        super(props);
        const position = new Animated.Value(0);
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, {dy}) => {
               console.log(dy/100);
                // Animated.event(
                //     [{ nativeEvent: { contentOffset: { dy: this.state.position }}}]
                // )\
                // this.state.position.setValue(dy);
               Animated.timing(this.state.position, {toValue: dy/1000}).start();
            }
         });
         this.state = { panResponder, position };
    }
    animationInterpolate = () => {
        return {
            translateY: this.state.position.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 200],
              extrapolate: 'clamp'
            })
          }
    }
    render(){
        const translateY = this.animationInterpolate().translateY;
        console.log("render: ", translateY);
        return(
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <View style={{flex: 0.1, backgroundColor: "gray"}}></View>
                <ScrollView style={{flex: 1, backgroundColor: "yellow"}} contentContainerStyle={{flexGrow: 1}}>
                    <View style={{height: height * 0.4, backgroundColor: "red"}}>

                    </View>
                    <View style={{flexGrow: 1, backgroundColor: "blue"}}>
                        <Animated.View 
                            style={[{backgroundColor: "green", position: "absolute", top: translateY, height: "50%", width: "50%"}, 
                            // {transform: [{translateY}]}
                        ]}
                        {...this.state.panResponder.panHandlers}
                        >
                            {/* <View style={{width: "100%"}}>
                                <Text style={{}}>Text</Text>
                            </View> */}
                        </Animated.View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Main;