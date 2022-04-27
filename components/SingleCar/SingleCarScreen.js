import React, {Component} from 'react';
import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform,
    NativeModules,
    ScrollView,
    Linking
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';

import {SliderBox} from "react-native-image-slider-box";

import {singleCarStyles} from './singleCarStyles';
import {feedsStyles} from "../Feeds/feedsStyles";
// import * as Svg from 'react-native-svg';

const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree"
            ],
            width: 0,
            slider_count: this.props.auto_data.slider.length,
            current_slide: 1
        };
    }

    // componentDidMount(){
    //     this.setState({
    //         auto_data: {},
    //     });
    // }


    // componentDidUpdate() {
    //     // const { navigation } = this.props;
    //     // this.focusListener = navigation.addListener("didFocus", () => {
    //     //    console.log('componentDidMount')
    //     // });
    //
    //     console.log('componentDidUpdate')
    //
    // }
    //
    // componentDidMount() {
    //     // const { navigation } = this.props;
    //     // this.focusListener = navigation.addListener("didFocus", () => {
    //     //    console.log('componentDidMount')
    //     // });
    //
    //     console.log('componentDidMount')
    //
    // }
    //
    // componentWillUnmount() {
    //     // Remove the event listener
    //     console.log('componentWillUnmount')
    //
    //     this.focusListener.remove();
    // }
    //
    handleBackButtonClick = () => {

        console.log(this.props);

        this.props.navigation.navigate('Feeds');
        // return true;
    };


    handleEditBtnClick = (data) => {
        this.props.navigation.navigate( "EditCar", {
                params: this.props.auto_data,
                navigation: JSON.stringify(this.props.navigation)
            }
        )
    };


    onLayout = e => {
        this.setState({
            width: e.nativeEvent.layout.width
        });
    };

    render() {


        return (

            <View style={{width: '100%', flex: 1}}>

                <View onLayout={this.onLayout} style={{width: '100%'}}>

                    <SliderBox images={this.props.auto_data.slider}
                               onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
                               currentImageEmitter={index => this.setState({
                                   current_slide: index + 1
                               })}
                               parentWidth={this.state.width}
                               sliderBoxHeight={300}
                               dotStyle={{width: 0}}
                    />

                    <TouchableOpacity style={{
                        width: 30,
                        height: 20,
                        zIndex: 55,
                        position: 'absolute',
                        left: 22,
                        top: STATUSBAR_HEIGHT + 22
                    }} onPress={() => {
                        this.handleBackButtonClick();
                    }}>
                        <Image style={{width: '100%', height: '100%'}}
                               source={require('../../assets/img/arrow_right.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: 20,
                            height: 20,
                            zIndex: 55,
                            position: 'absolute',
                            right: 30,
                            top: STATUSBAR_HEIGHT + 22
                        }}
                        onPress={this.handleEditBtnClick}>
                        <Image style={{width: '100%', height: '100%',}}
                               source={require('../../assets/img/refactor.png')}/>
                    </TouchableOpacity>

                    {/*<TouchableOpacity style={{width:20, height:20, zIndex:55, position:'absolute', right:78, top:STATUSBAR_HEIGHT+22}}>*/}
                    {/*    <Image style={{width:'100%', height:'100%'}} source={ require('../../assets/img/send_message.png')}/>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<TouchableOpacity style={{width:20, height:19, zIndex:55, position:'absolute', right:24, top:STATUSBAR_HEIGHT+22}}>*/}
                    {/*    <Image style={{width:'100%', height:'100%'}} source={ require('../../assets/img/single_car_wish.png')}/>*/}
                    {/*</TouchableOpacity>*/}

                    <View style={{
                        justifyContent: "center",
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 25,
                        width: '100%'
                    }}>
                        <View style={{
                            width: 44,
                            height: 24,
                            zIndex: 55,
                            backgroundColor: '#0000008a',
                            borderRadius: 8,
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Text style={{color: 'white'}}>
                                {this.state.current_slide} - {this.state.slider_count}
                            </Text>
                        </View>

                    </View>

                </View>

                <View style={singleCarStyles.whiteWrapper}>

                    <View style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: 'white',
                        width: this.state.width,
                        height: 20,
                        position: 'absolute',
                        top: -15,
                    }}><Text style={{display: 'none'}}>.</Text></View>

                    <ScrollView>
                        <Text style={singleCarStyles.autoTitle}>
                            {this.props.auto_data.title}
                        </Text>

                        <Text style={singleCarStyles.autoPrice}>
                            {this.props.auto_data.price}
                        </Text>

                        <Text style={singleCarStyles.autoAddress}>
                            {this.props.auto_data.address}
                        </Text>

                        <Text style={singleCarStyles.autoDate}>
                            {this.props.auto_data.date}
                        </Text>

                        <Text style={singleCarStyles.autoDescription}>
                            {this.props.auto_data.description}
                        </Text>

                        {/* info items*/}

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Марка автомобиля</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.props.auto_data.autoMark} </Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Тип кузова</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.props.auto_data.body_type} </Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Год выпуска</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.props.auto_data.yearOfIssue} </Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Коробка передач</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.props.auto_data.transmission}</Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Руль</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.props.auto_data.rull} </Text>
                            </View>

                        </View>

                        <View style={{
                            borderBottomWidth: 1,
                            borderColor: '#F0F3F9',
                            marginTop: 25,
                            marginBottom: 20
                        }}></View>


                        <View style={singleCarStyles.userWrapper}>

                            <View style={singleCarStyles.userImageWrapper}>
                                <Image style={singleCarStyles.userImage} source={this.props.auto_data.userImage}/>
                            </View>

                            <View>
                                <Text style={singleCarStyles.userName}>{this.props.auto_data.user_name}</Text>
                                <Text
                                    style={singleCarStyles.postCount}>{this.props.auto_data.post_count} объявлений</Text>
                            </View>
                        </View>


                    </ScrollView>

                    <View style={singleCarStyles.actionButtonsWrapper}>

                        <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={singleCarStyles.callButton}>
                            <TouchableOpacity style={singleCarStyles.callButtonToch} onPress={() => {
                                Linking.openURL('tel:' + this.props.auto_data.phone_number);
                            }}>
                                <Text style={{color: 'white'}}>
                                    Позвонить
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        <LinearGradient colors={['#63DAFF', '#33B5FF']} style={singleCarStyles.writeUser}>
                            <TouchableOpacity style={singleCarStyles.writeUserToch}>
                                <Text style={{color: 'white'}}>
                                    Написать
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>


                    </View>

                </View>

            </View>

        )

    }
}


