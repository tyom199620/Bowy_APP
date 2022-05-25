import React, {Component, useState} from 'react';
import {
    View,
    StatusBar,
    TextInput,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    NativeModules,
    Platform
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {ProfileStyles} from './ProfileStyles';
import EditCarScreen from "../EditCar/EditCarScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../AuthContext/context";
import {singleCarStyles} from "../SingleCar/singleCarStyles";

const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;




export default class ProfileComponent extends Component {
    constructor(props) {

        super(props);

        this.state = {
            userData: {},

            userActiveProducts: [],
            userNoActiveProducts: [],

            activeTab: true,
            noActiveTab: false,

            fioRename: false,
            numberRename: false,
            emailRename: false,
            locationRename: false,


            settingComponentVisibility: false

        };
    }

    static contextType = AuthContext

    hideSettings = () => {
        this.setState((prev) => ({settingComponentVisibility: !prev.settingComponentVisibility}))
    }

    openSingleCar = (data) => {
        this.props.navigation.navigate('SingleCar', {
            params: data,
        })
    }

    getUserProducts=(productList)=>{
        return <View style={ProfileStyles.scrollView}>
            <FlatList
                extraData={this.state}
                data={productList}
                renderItem={({item}) => {
                    return (
                        <View style={ProfileStyles.profileCaritems}>

                            <View style={ProfileStyles.profileCarImgWrapper}>
                                <Image style={{width: 170, height: 130}}
                                       source={{uri: `http://bowy.ru/storage/uploads/${item.image[0].image}`}}
                                />
                            </View>

                            <View style={ProfileStyles.profileCarItemRight}>
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
                                    }}>{item.updated_at.split("").slice(0, 10).join("")}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )
                }}
                keyExtractor={(item) => {
                    return item.id
                }}
            />

        </View>
    }

    exitFromProfile = async () => {
        try {
            await AsyncStorage.clear()
            this.props.navigation.navigate("Login")
            this.setState({settingComponentVisibility: false})
        } catch (e) {
            console.log(e)
        }
    }

    handleBackButtonClick = () => {
        this.props.navigation.navigate('Feeds');
    }

    openTab = (activeTab, noActiveTab) => {

        this.setState({
            activeTab: activeTab,
            noActiveTab: noActiveTab
        });

    };



    getUserData = async () => {
        try {
            let userID = await AsyncStorage.getItem("loggedUserID")
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch(`http://bowy.ru/api/announcement-unlogged/12`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(res => res.json())
                .then((res) => {
                    this.setState({userData: res[0]})
                    res[0].products.forEach((item) => {
                        if (item.status) {
                            this.setState(prevState => ({userActiveProducts: [...prevState.userActiveProducts, item]}));
                        } else {
                            this.setState(prevState => ({userNoActiveProducts: [...prevState.userNoActiveProducts, item]}));
                        }
                    })
                })
                .catch((e) => {
                    console.log("then")
                })
        } catch (e) {
            console.log("catch")
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.getUserData()
        });
    }


    render() {
        return (
            <View style={ProfileStyles.profileScreenMainView}>

                <View style={ProfileStyles.profileTitleWrapper}>

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


                        <TouchableOpacity style={{marginLeft: 44, zIndex: 100}} onPress={this.hideSettings}>

                            <Image style={ProfileStyles.profileSetting}
                                   source={require('../../assets/img/profileSetting.png')}/>
                        </TouchableOpacity>
                    </View>

                    {this.state.settingComponentVisibility &&
                        <View style={[ProfileStyles.settingView, {top: STATUSBAR_HEIGHT + 5}]}>
                            <TouchableOpacity onPress={this.deleteProduct}><Text>Изменить
                                данные</Text></TouchableOpacity>
                            <TouchableOpacity style={{paddingTop: 5, zIndex: 10}}
                                              onPress={this.exitFromProfile}><Text>Выйти</Text></TouchableOpacity>
                        </View>}

                </View>

                <View style={ProfileStyles.profileUserInfo}>

                    <View style={ProfileStyles.profilePhotoWrapper}>
                        <Image style={{width: 80, height: 80}}
                               source={{uri: "http://bowy.ru/storage/uploads/" + this.state.userData.image}}/>
                    </View>

                    <View style={ProfileStyles.profileUserInfoTwoWrapper}>
                        {/*userName*/}
                        {this.state.fioRename === false
                            ?
                            <View style={{flexDirection: 'row'}}>
                                <Text style={ProfileStyles.userName}>{this.state.userData.name}
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
                                    value={this.state.userData.name}
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
                            <Text style={ProfileStyles.profileNumber}>{this.state.userData.id}</Text>
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
                                        style={{color: '#424A55', fontSize: 14}}>{this.state.userData.number}</Text>
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
                                        value={this.state.userData.number}
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
                                    }}>{this.state.userData.email}</Text>
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
                                        value={this.state.userData.email}
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


                {this.state.activeTab === true ? this.getUserProducts(this.state.userActiveProducts) : this.getUserProducts(this.state.userNoActiveProducts)}


            </View>
        )
    }
}



