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
import {Ionicons} from '@expo/vector-icons';
import {SliderBox} from "react-native-image-slider-box";

import {singleCarStyles} from './singleCarStyles';
import {feedsStyles} from "../Feeds/feedsStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Svg from 'react-native-svg';

const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;


const wishIcons = [
    require('../../assets/img/addinwish.png'),
    require('../../assets/img/addinwishactive.png')
];


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            current_slide: 1,
            autoData: {},
            userData: {},
            userID: "",
            userAnnouncements: "",
            imageList: [],
            settingComponent: false,
            wishListId: [],
        };
    }


    getInfo = async () => {
        try {
            await this.setState({autoData: this.props.auto_data.info})
            await this.setState({imageList: ["http://bowy.ru/storage/uploads/" + this.props.auto_data.info?.image[0]?.image]})

            fetch(`http://bowy.ru/api/announcement-unlogged/${this.props.auto_data.info.user_id}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    this.setState({userData: res[0]})
                })
                .catch((e) => {
                    console.log(e)
                })

        } catch (e) {
            //////////////
        }

    }

    addToFavourites = async (userID, productID) => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch("http://bowy.ru/api/favourites", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                },
                body: JSON.stringify({user_id: userID, product_id: productID})
            })
                .then(res => res.json())
                .then((res) => {
                })
                .catch((e) => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }
    }
    removeFromFavourites = async (itemID) => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch(`http://bowy.ru/api/favourites/${itemID}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                },
            })
                .then((res) => res.json())
                .catch((e) => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }
    }

    getFavouriteItems = async () => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch("http://bowy.ru/api/favourites", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                },

            })
                .then(res => res.json())
                .then(res => {
                    this.setState({wishListId: res["0"].map((item) => item.id)});
                })
        } catch (e) {
            console.log(e)
        }
    }

    hideSettings = () => {
        this.setState((prev) => ({settingComponent: !prev.settingComponent}))
    }


    componentDidMount() {

        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.getInfo()
            this.getUserID()
            this.getFavouriteItems()
        });


    }

    getUserID = async () => {
        try {
            const ID = await AsyncStorage.getItem("loggedUserID")
            this.setState({userID: ID})
        } catch (e) {

        }
    }


    componentWillUnmount() {

    }

    handleBackButtonClick = () => {


        this.props.navigation.navigate('Feeds');
        // return true;
    };




    onLayout = e => {
        this.setState({
            width: e.nativeEvent.layout.width
        });
    };

    deleteProduct = async () => {

        Alert.alert("", "вы уверены что хотите удалить", [
            {
                text: "Да", onPress: async () => {
                    try {

                        let userToken = await AsyncStorage.getItem("userToken")
                        let AuthStr = "Bearer " + userToken
                        fetch("http://bowy.ru/api/products/" + this.state.autoData.id, {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': AuthStr,
                            },
                        })
                            .then(res => res.json())
                            .then((res) => {
                                if (res.success) {
                                    this.setState({settingComponent: false})
                                    this.props.navigation.navigate("Feeds")
                                }
                            })
                    } catch (e) {

                    }
                }
            },
            {
                text: "Нет", onPress: () => {
                    this.setState({settingComponent: false})
                }
            }


        ])


    }


    editProduct = () => {
        this.props.navigation.navigate("EditCar", {
                params: this.state.autoData,
                navigation: JSON.stringify(this.props.navigation)
            }
        )
    }

    render() {
        return (

            <View style={{width: '100%', flex: 1}}>

                <View onLayout={this.onLayout} style={{width: '100%'}}>

                    <SliderBox images={this.state.imageList}
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


                    {Number(this.state.userID) === Number(this.state.userData.id) ?
                        <TouchableOpacity onPress={this.hideSettings} style={{
                            width: 30,
                            height: 30,
                            zIndex: 55,
                            position: 'absolute',
                            right: 20,
                            top: STATUSBAR_HEIGHT + 22
                        }}>
                            <Ionicons name="ios-settings-sharp" size={24} color="white"
                                      style={{width: '100%', height: '100%'}}/>
                        </TouchableOpacity> : null}


                    {Number(this.state.userID) !== Number(this.state.userData.id) ? <TouchableOpacity
                        style={{
                            width: 30,
                            height: 19,
                            zIndex: 55,
                            position: 'absolute',
                            right: 20,
                            top: STATUSBAR_HEIGHT + 22
                        }}
                        onPress={() => {
                            if (this.state.wishListId.includes(this.state.autoData.id)) {
                                this.setState(prev => ({wishListId: prev.wishListId.filter(items => this.state.autoData.id !== items)}))
                                this.removeFromFavourites(this.state.autoData.id)

                            } else {
                                this.setState((prev) => ({wishListId: [...prev.wishListId, this.state.autoData.id]}))
                                this.addToFavourites(this.state.autoData.user_id, this.state.autoData.id)
                            }
                        }}>
                        <Image
                            source={this.state.wishListId.includes(this.state.autoData.id) ? wishIcons[1] : wishIcons[0]}/>
                    </TouchableOpacity> : null}


                    {this.state.settingComponent &&
                        <View style={[singleCarStyles.settingView, {top: STATUSBAR_HEIGHT + 50}]}>
                            <TouchableOpacity onPress={this.deleteProduct}><Text>Удалить публикацию</Text></TouchableOpacity>
                            <TouchableOpacity style={{paddingTop: 5}} onPress={this.editProduct}><Text>Изменить данные</Text></TouchableOpacity>
                        </View>}


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
                                {this.state.current_slide} - {this.state.imageList.length}
                            </Text>
                        </View>

                    </View>

                </View>

                <View style={singleCarStyles.whiteWrapper}>


                    <ScrollView>
                        <Text style={singleCarStyles.autoTitle}>
                            {this.state.autoData?.headline}
                        </Text>

                        <Text style={singleCarStyles.autoPrice}>
                            {this.state.autoData?.price}
                        </Text>

                        <Text style={singleCarStyles.autoAddress}>
                            {this.state.autoData?.address}
                        </Text>

                        <Text style={singleCarStyles.autoDate}>
                            {this.state.autoData?.updated_at?.split("").slice(0, 10).join("")}
                        </Text>

                        <Text style={singleCarStyles.autoDescription}>
                            {this.state.autoData?.description}
                        </Text>

                        {/*    /!* info items*!/*/}

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Марка автомобиля</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.state.autoData?.car_model} </Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Тип кузова</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.state.autoData?.body_type} </Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Год выпуска</Text>
                            </View>

                            <View>
                                <Text
                                    style={singleCarStyles.infoValue}>{this.state.autoData?.year_of_issue} </Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Коробка передач</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.state.autoData?.transmission}</Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Руль</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.state.autoData?.rudder} </Text>
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
                                <Image style={singleCarStyles.userImage}
                                       source={{uri: `http://bowy.ru/storage/uploads/${this.state.userData.image}`}}
                                />
                            </View>

                            <View>
                                <Text style={singleCarStyles.userName}>{this.state.userData.name}</Text>
                                <Text
                                    style={singleCarStyles.postCount}>{this.state.userData.products?.length} объявлений</Text>
                            </View>
                        </View>


                    </ScrollView>

                    <View style={singleCarStyles.actionButtonsWrapper}>

                        <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={singleCarStyles.callButton}>
                            <TouchableOpacity style={singleCarStyles.callButtonToch} onPress={() => {
                                Linking.openURL('tel:' + this.state.userData.number);
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


