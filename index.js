import React, { Component } from 'react';

import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    PanResponder,
    Dimensions,
    StyleSheet,
    Animated,
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class SideMenu extends Component {

    constructor(props) {

        super(props);

        this.state = {
            visible: false,
            fade_background: new Animated.Value(0),
            offset: new Animated.Value(-250),
            pan: new Animated.ValueXY()
        }

        this.is_opening = true;

    }

    componentWillMount() {

        this._panResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (e, gestureState) => {
                // Set the initial value to the current state
                this.initialEvent = e.nativeEvent;

                this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
                this.state.pan.setValue({ x: 0, y: 0 });
            },

            onPanResponderMove: (e, gestureState) => {

                let initialX = this.initialEvent.pageX;
                let currentX = e.nativeEvent.pageX;

                //console.log(e.nativeEvent);
                let dx = currentX - initialX;
                if (dx > 0) {
                    dx = 0;
                }

                Animated.timing(
                    this.state.offset,
                    {
                        toValue: dx,
                        duration: 0,
                    }
                ).start();

                if (this.lastDx) {

                }

                if (this.lastDx && Math.abs(currentX - initialX) > 20) {
                    //We want to determine the direction of the movement and see if it has moved more than 20px
                    console.log("change",dx - this.lastDx);
                    this.is_opening = (dx - this.lastDx >= 0) ? true : false;
                    //console.log("is opening",is_opening);
                }else{
                    this.is_opening = true;
                }

                //Save the last delta for the next movement to determine if opening or closing
                this.lastDx = dx;

            },

            onPanResponderRelease: (e, {vx, vy}) => {

                this.state.pan.flattenOffset();
                
                //When we release the finger we check if it is opening or not
                this.animateMenu(!this.is_opening);
                if (!this.is_opening) {
                    setTimeout(() => {
                        this.setState({
                            visible: false,
                        })
                    },300);
                }

            }
        });

    }

    toggle() {

        var wasVisible = this.state.visible;

        //If it was visible then ve set a timeout to destroy the modal
        if (wasVisible) {

            setTimeout(() => {
                this.setState({
                    visible: !wasVisible,
                });
            }, 300);

        } else {
            //If it was not visible the we open up the modal first
            this.setState({
                visible: !wasVisible,
            });
        }

        this.animateMenu(wasVisible);

    }

    animateMenu(wasVisible) {

        //Animate the fade effect
        Animated.timing(
            this.state.fade_background,
            {
                toValue: wasVisible ? 0 : 0.6,
                duration: 300,
            }
        ).start();

        //Animate thse sliding effect
        Animated.timing(
            this.state.offset,
            {
                toValue: wasVisible ? -250 : 0,
                duration: 300,
            }
        ).start();

    }


    render() {

        // Destructure the value of pan from the state
        let { pan } = this.state;

        // Calculate the x and y transform from the pan value
        let [translateX, translateY] = [pan.x, pan.y];

        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        let menuPan = { transform: [{ translateX }, { translateY }] };

        return (
            <View>

                {/*The side menu modal box/container*/}
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => { alert("Modal has been closed.") } }
                    >


                    <Animated.View
                        {...this._panResponder.panHandlers}
                        style={{ flex: 1 }}>

                        {/*Opaque background*/}
                        <Animated.View style={{ opacity: this.state.fade_background }}>
                            <TouchableOpacity
                                onPress={() => this.toggle()}
                                activeOpacity={1}
                                onPress={this.props.onClose}
                                style={styles.background_layer}>
                            </TouchableOpacity>
                        </Animated.View>

                        {/*The actual side menu content */}
                        <Animated.View

                            style={[{
                                width: this.props.width,
                                marginLeft: this.state.offset,
                                backgroundColor: this.props.color,
                            }, styles.sideMenu, menuPan]}>
                            {this.props.menuContent}
                        </Animated.View>

                    </Animated.View>


                </Modal>

            </View>
        );

    }
}

const styles = StyleSheet.create({
    background_layer: {
        position: "absolute",
        backgroundColor: "#000000",
        width: width,
        height: height,
    },
    sideMenu: {
        flex: 1,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
})