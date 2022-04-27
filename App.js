import * as React from 'react';
import {
    Button,
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert
} from 'react-native';
import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WishListComponent from './components/WishList/WishList';
import FeedsScreenComponent from './components/Feeds/FeedsScreen';
import LoginComponent from './components/Auth/LoginScreen';
import RegisterComponent from './components/Auth/RegisterScreen';
import SingleCarComponent from './components/SingleCar/SingleCarScreen';
import ProfileComponent from './components/Profile/ProfileScreen';
import ChatComponent from './components/Chats/Chat';
import AddCarComponent from "./components/AddCar/AddCar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from './components/AuthContext/context';
import { StackActions } from '@react-navigation/native';



import SingleMessageComponent from "./components/SingleMessage/SingleMessageScreen";

import ResetPasswordComponent from "./components/Auth/ResetPassword";
import EditCarComponent from "./components/EditCar/EditCarScreen";


import {LinearGradient} from 'expo-linear-gradient';
import {useEffect} from "react";


function SettingsScreen({route, navigation}) {
    const {user} = route.params;
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
            <Text>Settings Screen</Text>
            <Text>userParam: {JSON.stringify(user)}</Text>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
}


function SingleCarScreen({route, navigation}) {
    const {params} = route.params;
    return (
        <SingleCarComponent auto_data={params} navigation={navigation}/>
    );
}

function FeedsScreen({navigation}) {
    return (
        <FeedsScreenComponent navigation={navigation}/>
    );
}

function WishListScreen({navigation}) {
    return (
        <WishListComponent navigation={navigation}/>
    );
}

function ResetPassword({navigation}) {
    return (
        <ResetPasswordComponent navigation={navigation}/>
    )
}

// function AddAutoScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
//             <Text>Add Auto</Text>
//         </View>
//     );
// }

function AddCarScreen({navigation}) {
    return (
        <AddCarComponent navigation={navigation}/>
    )
}

function ChatScreen({navigation}) {
    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'white' }}>
        //     <Text>ChatScreen</Text>
        // </View>

        <ChatComponent navigation={navigation}/>
    );
}

function ProfileScreen({navigation}) {
    return (

        <ProfileComponent navigation={navigation}/>

    );
}

function LoginScreen({navigation}) {
    return (
        <LoginComponent navigation={navigation}/>
    );
}

function RegisterScreen({navigation}) {
    return (
        <RegisterComponent navigation={navigation}/>
    );
}


function EditCarScreen({route, navigation}) {
    const {params} = route.params;
    return (
        <EditCarComponent auto_data={params} navigation={navigation}/>
    );
}

function SingleMessageScreen({navigation}) {
    return (
        <SingleMessageComponent navigation={navigation}/>
    );
}

export default function App() {
    const popAction = StackActions.pop(1);

    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const initialLoginState = {
        isLoading: true,
        userEmail: null,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userEmail: action.email,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (foundUser) => {
            // setIsLoading(true);
            const userToken = foundUser.token.toString();
            const userEmail = foundUser.email;


            try {
                await AsyncStorage.setItem('userToken', userToken);
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGIN', email: userEmail, token: userToken});
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
                setIsLoading(false);

            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGOUT'});
        },
        signUp: () => {
            // setIsLoading(false);
        }
    }), []);

    React.useEffect(() => {
        setTimeout(async () => {

            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                setIsLoading(false);

            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
        }, 1000);
    }, []);


// const Stack = createStackNavigator();

    const Tab = createBottomTabNavigator();


    const tabBarStyle = {
        height: 90,
        backgroundColor: 'white',
        elevation: 0,
        borderTopColor: 'white',
        width: Dimensions.get('window').width - 50,
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
    };


        return (
            <AuthContext.Provider value={authContext}>


                <NavigationContainer>

                    <Tab.Navigator
                        initialRouteName="Login"
                        screenOptions={({route}) => ({
                            tabBarShowLabel: false,
                            headerShown: false,
                            tabBarActiveTintColor: '#2EB6A5',
                            tabBarInactiveTintColor: 'gray',
                            tabBarStyle: tabBarStyle,
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName;

                                switch (route.name) {
                                    case 'Feeds':
                                        iconName = focused ? require('./assets/img/search_active.png') : require('./assets/img/search.png');
                                        return <Image style={{width: 30, height: 30}} source={iconName}/>;
                                        break;

                                    case 'WishList':
                                        iconName = focused ? require('./assets/img/heart_active.png') : require('./assets/img/heart.png');
                                        return <Image style={{width: 33, height: 30}} source={iconName}/>;
                                        break;

                                    case 'Chat':
                                        iconName = focused ? require('./assets/img/chat_active.png') : require('./assets/img/chat.png');
                                        return <Image style={{width: 30, height: 30}} source={iconName}/>;
                                        break;

                                    case 'Profile':
                                        iconName = focused ? require('./assets/img/profile_active.png') : require('./assets/img/profile.png');
                                        return <Image style={{width: 30, height: 30}} source={iconName}/>;
                                        break;
                                    default:
                                }

                            }
                        })}
                    >

                        <Tab.Screen name='ResetPassword' component={ResetPasswordComponent}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'}
                                    })}/>

                        <Tab.Screen name="Feeds" component={FeedsScreen}/>
                        <Tab.Screen name="WishList" component={WishListScreen}
                                    options={{
                                        title: 'Избранное',
                                        headerShown: false,
                                        headerTitleStyle: {
                                            // paddingLeft: 6,
                                        },
                                    }}
                        />
                        {/*boxShadow:'0px 4px 30px #30b99966'*/}

                        <Tab.Screen name='AddCarComponent' component={AddCarScreen}
                                    options={{
                                        tabBarIcon: ({color}) => (
                                            <View
                                                style={{width: 50, flex: 1, marginTop: -30, justifyContent: 'center'}}>
                                                <Image style={{width: 56, height: 56}}
                                                       source={require('./assets/img/add_auto1.png')}/>
                                            </View>
                                        )
                                    }}
                        />


                        {/*<Tab.Screen name="AddAuto" component={AddAutoScreen}*/}
                        {/*    options={{*/}
                        {/*        tabBarIcon: ({ color}) => (*/}
                        {/*            <View style={{width:50,flex: 1,marginTop:-30,justifyContent: 'center'  }}>*/}
                        {/*                    <Image style={{width: 56,height: 56 }} source={require('./assets/img/add_auto1.png')}/>*/}
                        {/*            </View>*/}
                        {/*        )*/}
                        {/*    }}*/}
                        {/*/>*/}


                        <Tab.Screen name="Chat" component={ChatScreen}/>
                        <Tab.Screen name="Profile" component={ProfileScreen}/>


                        <Tab.Screen name="SingleCar" component={SingleCarScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'}
                                    })}/>
                        <Tab.Screen name="Login" component={LoginScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'}
                                    })}
                        />
                        <Tab.Screen name="Register" component={RegisterScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'}
                                    })}
                        />

                        <Tab.Screen name="SingleMessage" component={SingleMessageScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'}
                                    })}/>

                        <Tab.Screen name="EditCar" component={EditCarScreen}
                                    options={({route}) => ({
                                        tabBarButton: () => null,
                                        tabBarStyle: {display: 'none'}
                                    })}/>

                    </Tab.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        );
    }

