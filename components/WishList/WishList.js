import React, {Component, useState} from 'react';
import {
    View,
    Platform,
    TextInput,
    StyleSheet,
    StatusBar,
    Dimensions,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    createStackNavigator,
    ActivityIndicator,
    Modal,
    TouchableHighlight,
    Alert,
    SafeAreaView,
    FlatList
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {wishListStyles} from './WishListStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {feedsStyles} from "../Feeds/feedsStyles";


const wishIcons = [
    require('../../assets/img/addinwish.png'),
    require('../../assets/img/addinwishactive.png')
];


export default class wishListScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wishList: [],
            wishListId: [],
        };
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
                .then((res) => {
                    this.setState({wishListId: res["0"].map((item) => item.id)});
                    this.setState({wishList: res["0"]})
                })
                .catch((e) => {
                    // console.log(e)
                })
        } catch (e) {
            // console.log(e)
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.getFavouriteItems();
        });
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
                .catch((e) => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }
    }


    // handleRemoveWish = () => {
    //
    //    this.state.articleData.map(item => {
    //         if (item.wishlist === false) {
    //             delete item.item
    //         }
    //     })
    //     this.setState({
    //         articleData: articleData
    //     })
    //     console.log(this.state.articleData)
    //
    // }
    //
    //
    //
    openSingleCar = (data) => {
        this.props.navigation.navigate('SingleCar', {
            params: data,
        })
    }

    render() {

        return (
            <View style={wishListStyles.wishListScreenMainView}>
                <View style={wishListStyles.wishTitleWrapper}>

                    <Text style={wishListStyles.wishTitle}>
                        Избранное
                    </Text>

                    <TouchableOpacity style={{
                        width: 30,
                        height: 30,
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Image style={{width: 4, height: 18}} source={require('../../assets/img/dots.png')}/>
                    </TouchableOpacity>
                </View>


                <SafeAreaView style={wishListStyles.safeArea}>

                    <FlatList
                        data={this.state.wishList}
                        renderItem={({item, index, separators}) => {
                            return <View style={wishListStyles.feedsCaritems}>


                                <View style={wishListStyles.feedsCarImgWrapper}>
                                    <Image style={wishListStyles.feedsCaritemsImg}
                                           source={{uri: `http://bowy.ru/storage/uploads/${item.image}`}}/>
                                    <TouchableOpacity style={wishListStyles.addinwish}
                                                      onPress={() => {
                                                          if (this.state.wishListId.includes(item.id)) {
                                                              this.setState(prev => ({wishListId: prev.wishListId.filter(items => item.id !== items)}))
                                                              this.removeFromFavourites(item.id)

                                                          } else {
                                                              this.addToFavourites(item.user_id, item.id)
                                                              this.setState((prev) => ({wishListId: [...prev.wishListId, item.id]}))
                                                          }


                                                      }}>
                                        <Image
                                            source={this.state.wishListId.includes(item.id) ? wishIcons[1] : wishIcons[0]}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={wishListStyles.feedsCarItemRight}>

                                    <TouchableOpacity onPress={() => this.openSingleCar(item)}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '700',
                                            color: '#424A55',
                                            marginBottom: 10
                                        }}>{item.headline}</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: '400',
                                            color: '#424A55',
                                            marginBottom: 13
                                        }}>{item.price}</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            fontWeight: '400',
                                            color: '#424A55',
                                            marginBottom: 5
                                        }}>{item.address}</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            fontWeight: '400',
                                            color: '#424A55',
                                            marginBottom: 5
                                        }}>
                                            {item.updated_at.split("").slice(0, 10).join("")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>


            </View>
        )
    }
}



