import React, {Component, useState} from 'react';
import {
    View,
    Platform,
    TextInput, StyleSheet, StatusBar, Dimensions, ScrollView, Image, Text, TouchableOpacity, createStackNavigator,
    Modal, TouchableHighlight, Alert, useWindowDimensions
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {ProfileStyles} from './ProfileStyles';
import EditCarScreen from "../EditCar/EditCarScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../AuthContext/context";

const userActivePosts = [
    {
        id: 1,
        wishlist: true,
        image: require('../../assets/img/cars/1.png'),
        slider: [require('../../assets/img/cars/1.png'), require('../../assets/img/cars/3.png'), require('../../assets/img/cars/4.png')],
        title: 'Аренда авто,под залог1',
        price: '1 290 ₽',
        address: 'Лиговский проспект 11',
        date: 'Сегодня в 12:00'
    },
    {
        id: 2,
        wishlist: true,
        image: require('../../assets/img/cars/2.png'),
        slider: [],
        title: 'Аренда авто,под залог2',
        price: '1 150 ₽',
        address: 'Проспект Мира 22',
        date: 'Сегодня в 13:45'
    },
    {
        id: 3,
        wishlist: true,
        image: require('../../assets/img/cars/2.png'),
        slider: [],
        title: 'Аренда авто,под залог2',
        price: '1 150 ₽',
        address: 'Проспект Мира 22',
        date: 'Сегодня в 13:45'
    },
    {
        id: 4,
        wishlist: true,
        image: require('../../assets/img/cars/3.png'),
        slider: [],
        title: 'Аренда авто,под залог3',
        price: '1 785 ₽',
        address: 'Улица Пушкина 3',
        date: 'Сегодня в 09:00'
    },
];

const userNoActivePosts = [
    {
        id: 5,
        wishlist: true,
        image: require('../../assets/img/cars/1.png'),
        slider: [require('../../assets/img/cars/1.png'), require('../../assets/img/cars/3.png'), require('../../assets/img/cars/4.png')],
        title: 'NO Аренда авто,под залог1',
        price: '1 290 ₽',
        address: 'Лиговский проспект 11',
        date: 'Сегодня в 12:00'
    },
    {
        id: 6,
        wishlist: true,
        image: require('../../assets/img/cars/2.png'),
        slider: [],
        title: 'NO Аренда авто,под залог2',
        price: '1 150 ₽',
        address: 'Проспект Мира 22',
        date: 'Сегодня в 13:45'
    },
    {
        id: 7,
        wishlist: true,
        image: require('../../assets/img/cars/2.png'),
        slider: [],
        title: 'NO Аренда авто,под залог2',
        price: '1 150 ₽',
        address: 'Проспект Мира 22',
        date: 'Сегодня в 13:45'
    },
    {
        id: 8,
        wishlist: true,
        image: require('../../assets/img/cars/3.png'),
        slider: [],
        title: 'NO Аренда авто,под залог3',
        price: '1 785 ₽',
        address: 'Улица Пушкина 3',
        date: 'Сегодня в 09:00'
    },
];

const wishIcons = [
    require('../../assets/img/addinwishactive.png')
];


export default class ProfileComponent extends Component {
    constructor(props) {

        super(props);

        this.state = {
            userName: 'Дмитрий Антонович',
            userPhoneNumber: '+7 928 245 15 20',
            userEmailAddress: 'mail@gmail.com',
            userLocation: 'сочи',

            activeTab: true,
            noactiveTab: false,

            fioRename: false,
            numberRename: false,
            emailRename: false,
            locationRename: false,

        };
    }

    static contextType = AuthContext



    openSingleCar = (data) => {
        this.props.navigation.navigate('SingleCar', {
            params: data,
        })
    }

    handleBackButtonClick = () => {
        this.props.navigation.navigate('Feeds');
    }


    openTab = (activeTab, noactiveTab) => {

        this.setState({
            activeTab: activeTab,
            noactiveTab: noactiveTab
        });

        console.log(this.state.activeTab)
        console.log(this.state.noactiveTab)
    };


    render() {
        return (
            <View style={ProfileStyles.profileScreenMainView}>
                <ScrollView style={{width: "100%"}}>

                    <View style={ProfileStyles.prifileTitleWrapper}>

                        <TouchableOpacity style={ProfileStyles.wishTitle} onPress={() => {
                            this.handleBackButtonClick(EditCarScreen);
                        }}>
                            <Image style={ProfileStyles.returnBack}
                                   source={require('../../assets/img/profile_back.png')}/>
                        </TouchableOpacity>

                        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity>
                                <Image style={ProfileStyles.profileNot}
                                       source={require('../../assets/img/profile_not.png')}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{marginLeft: 44}}>
                                <Image style={ProfileStyles.profileSetting}
                                       source={require('../../assets/img/profileSetting.png')}/>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={ProfileStyles.profileUserInfo}>

                        <View style={ProfileStyles.profilePhotoWrapper}>
                            <Image style={ProfileStyles.profilePhoto}
                                   source={require('../../assets/img/profile_image.png')}/>
                        </View>

                        <View style={ProfileStyles.profileUserInfoTwoWrapper}>
                            {/*userName*/}
                            {this.state.fioRename === false
                                ?
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={ProfileStyles.userName}>{this.state.userName}
                                        <TouchableOpacity onPress={() => this.setState({fioRename: true})}>
                                            <Image
                                                source={require('../../assets/img/refactor.png')}
                                                style={{marginLeft: 15}}
                                            />
                                        </TouchableOpacity>
                                    </Text>
                                </View>
                                :
                                <View style={{flexDirection: 'row'}}>
                                    <TextInput
                                        value={this.state.userName}
                                        style={ProfileStyles.refactorInput}
                                        onChangeText={(userName) => this.setState({userName})}
                                    />
                                    <TouchableOpacity onPress={() => this.setState({fioRename: false})}>
                                        <Image
                                            style={{width: 22, height: 22, alignItems: 'center', marginLeft: 10}}
                                            source={require('../../assets/img/save.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }

                            <View style={ProfileStyles.profileUserInfoTwo}>
                                <Text style={ProfileStyles.profileNumberLabel}>Номер профиля</Text>
                                <Text style={ProfileStyles.profileNumber}>38295982</Text>
                            </View>
                        </View>

                    </View>

                    <View style={ProfileStyles.profileInfoWrapper}>


                        <View style={ProfileStyles.profileInfo}>
                            {/*Number*/}
                            {this.state.numberRename === false ?
                                <View style={ProfileStyles.userInfoItem}>
                                    <View style={{flexDirection: 'row', width: '90%'}}>
                                        <Image style={ProfileStyles.profileCall}
                                               source={require('../../assets/img/call.png')}/>
                                        <Text
                                            style={{color: '#424A55', fontSize: 14}}>{this.state.userPhoneNumber}</Text>
                                    </View>

                                    <View style={{justifyContent: 'flex-end'}}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({numberRename: true})}>
                                            <Image
                                                source={require('../../assets/img/refactor.png')}
                                                style={{marginLeft: 15,}}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View> :
                                <View style={{width: '100%', flexDirection: 'row'}}>
                                    <View style={{width: '90%', flexDirection: 'row'}}>
                                        <Image style={ProfileStyles.profileCall}
                                               source={require('../../assets/img/call.png')}/>
                                        <TextInput
                                            value={this.state.userPhoneNumber}
                                            style={ProfileStyles.refactorInput}
                                            keyboardType="numeric"
                                            onChangeText={(userPhoneNumber) => this.setState({userPhoneNumber})}
                                        />
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => this.setState({numberRename: false})}>
                                            <Image
                                                style={{width: 22, height: 22, alignItems: 'center', marginLeft: 10}}
                                                source={require('../../assets/img/save.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>}

                            {/*Email*/}
                            {this.state.emailRename === false ?
                                <View style={ProfileStyles.userInfoItem}>
                                    <View style={{flexDirection: 'row', width: '90%'}}>
                                        <Image style={ProfileStyles.profileMail}
                                               source={require('../../assets/img/mail.png')}/>
                                        <Text style={{
                                            color: '#424A55',
                                            fontSize: 14
                                        }}>{this.state.userEmailAddress}</Text>
                                    </View>
                                    <View style={{justifyContent: 'flex-end'}}>
                                        <TouchableOpacity onPress={() => this.setState({emailRename: true})}>
                                            <Image
                                                source={require('../../assets/img/refactor.png')}
                                                style={{marginLeft: 15}}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View> :
                                <View style={{width: '100%', flexDirection: 'row'}}>
                                    <View style={{width: '90%', flexDirection: 'row'}}>
                                        <Image style={ProfileStyles.profileMail}
                                               source={require('../../assets/img/mail.png')}/>
                                        <TextInput
                                            value={this.state.userEmailAddress}
                                            style={ProfileStyles.refactorInput}
                                            onChangeText={(userEmailAddress) => this.setState({userEmailAddress})}
                                        />
                                    </View>

                                    <TouchableOpacity onPress={() => this.setState({emailRename: false})}>
                                        <Image
                                            style={{width: 22, height: 22, alignItems: 'center', marginLeft: 10}}
                                            source={require('../../assets/img/save.png')}
                                        />
                                    </TouchableOpacity>
                                </View>}

                            {/*userLocation*/}

                            {this.state.locationRename === false ?
                                <View style={ProfileStyles.userInfoItem}>
                                    <View style={{flexDirection: 'row', width: '90%'}}>
                                        <Image style={ProfileStyles.profileLocation}
                                               source={require('../../assets/img/location.png')}/>
                                        <Text style={{
                                            color: '#424A55',
                                            fontSize: 14
                                        }}>{this.state.userLocation}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({locationRename: true})}>
                                        <Image
                                            source={require('../../assets/img/refactor.png')}
                                            style={{marginLeft: 15}}
                                        />
                                    </TouchableOpacity>
                                </View> :
                                <View style={{width: '100%', flexDirection: 'row'}}>
                                    <View style={{width: '90%', flexDirection: 'row'}}>
                                        <Image style={ProfileStyles.profileLocation}
                                               source={require('../../assets/img/location.png')}/>
                                        <TextInput
                                            value={this.state.userLocation}
                                            style={ProfileStyles.refactorInput}
                                            onChangeText={(userLocation) => this.setState({userLocation})}
                                        />
                                    </View>

                                    <TouchableOpacity onPress={() => this.setState({locationRename: false})}>
                                        <Image
                                            style={{
                                                width: 22,
                                                height: 22,
                                                alignItems: 'center',
                                                marginLeft: 10
                                            }}
                                            source={require('../../assets/img/save.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>

                    </View>

                    <View style={ProfileStyles.tabsWrapper}>

                        <TouchableOpacity style={ProfileStyles.tabWrapper} onPress={() => {
                            this.openTab(true, false);
                        }}>
                            <Text style={ProfileStyles.tabLabel}>Активные</Text>
                            <View style={this.state.activeTab === true ? ProfileStyles.tabLine : {}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity style={ProfileStyles.tabWrapper} onPress={() => {
                            this.openTab(false, true);
                        }}>
                            <Text style={ProfileStyles.tabLabel}>Неактивные</Text>
                            <View style={this.state.noactiveTab === true ? ProfileStyles.tabLine : {}}></View>
                        </TouchableOpacity>

                    </View>


                    {this.state.activeTab === true ?

                        <View style={ProfileStyles.scrollView}>


                            {userActivePosts.map((article, index) => (
                                <View key={article.id} style={ProfileStyles.profileCaritems}>

                                    <View style={ProfileStyles.profileCarImgWrapper}>
                                        <Image style={ProfileStyles.profileCaritemsImg} source={article.image}/>
                                    </View>

                                    <View style={ProfileStyles.profileCarItemRight}>
                                        <TouchableOpacity onPress={() => this.openSingleCar(article)}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: '700',
                                                color: '#424A55',
                                                marginBottom: 10
                                            }}>{article.title}</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: '400',
                                                color: '#424A55',
                                                marginBottom: 13
                                            }}>{article.price}</Text>
                                            <Text style={{
                                                fontSize: 10,
                                                fontWeight: '400',
                                                color: '#424A55',
                                                marginBottom: 5
                                            }}>{article.address}</Text>
                                            <Text style={{
                                                fontSize: 10,
                                                fontWeight: '400',
                                                color: '#424A55',
                                                marginBottom: 5
                                            }}>{article.date}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            ))}

                        </View>

                        :

                        <View style={ProfileStyles.scrollView}>


                            {userNoActivePosts.map((article, index) => (
                                <View key={article.id} style={ProfileStyles.profileCaritems}>

                                    <View style={ProfileStyles.profileCarImgWrapper}>
                                        <Image style={ProfileStyles.profileCaritemsImg} source={article.image}/>
                                    </View>

                                    <View style={ProfileStyles.profileCarItemRight}>
                                        <TouchableOpacity onPress={() => this.openSingleCar(article)}>
                                            <Text style={ProfileStyles.carsInfo}>{article.title}</Text>
                                            <Text style={ProfileStyles.carsInfo}>{article.price}</Text>
                                            <Text style={ProfileStyles.carsInfo}>{article.address}</Text>
                                            <Text style={ProfileStyles.carsInfo}>{article.date}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            ))}

                        </View>


                    }

                    {/*this.state.activeTab === true */}


                </ScrollView>
            </View>
        )
    }
}



