import React, { Component } from 'react';

import {
    View,
    Text,
    Modal,
    TouchableOpacity,
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
        }

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
        return (
            <View>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => { alert("Modal has been closed.") } }
                    >
                    <View style={{ flex: 1 }}>
                        <Animated.View style={{ opacity: this.state.fade_background }}>
                            <TouchableOpacity
                                onPressIn={() => this.toggle()}
                                activeOpacity={0.7}
                                onPress={this.props.onClose}
                                style={{
                                    position: "absolute",
                                    backgroundColor: "#000000",
                                    width: width,
                                    height: height,
                                }}>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View style={{
                            width: this.props.width,
                            marginLeft: this.state.offset,
                            backgroundColor: this.props.color,
                            flex: 1,
                            shadowColor: "#000000",
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            shadowOffset: {
                                height: 1,
                                width: 0
                            }
                        }}>
                            <View>
                                <Text>Hello</Text>
                                {this.props.menuContent}
                            </View>
                        </Animated.View>
                    </View>
                </Modal>
                {this.props.children}
            </View>
        );

    }
}