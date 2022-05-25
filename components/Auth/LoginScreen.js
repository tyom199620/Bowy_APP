import React, {Component} from 'react';
import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
    ScrollView
} from 'react-native';
import {Dimensions} from 'react-native';
// import { TextInput } from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import {FontAwesome} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {exp} from "react-native-reanimated";
import {AuthContext} from "../AuthContext/context"
import DropDownPicker from 'react-native-dropdown-picker';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: false,
            passwordError: false
        };
    }


    static contextType = AuthContext


    goToFeeds = () => {
        fetch('http://bowy.ru/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        })
            .then(response => response.json())
            .then(async (res) => {
                try {
                    if (res.data) {
                        if (res.data.email) {
                            this.setState({emailError: res.data.email[0]})
                        } else {
                            this.setState({emailError: false})
                        }
                        if (res.data.password) {
                            this.setState({passwordError: res.data?.password[0]})
                        } else {
                            this.setState({passwordError: false})
                        }
                        return
                    } else {
                        this.setState({emailError: false, passwordError: false})
                    }


                    if (res.error_message) {
                        this.setState({passwordError: res.error_message})
                        return;
                    } else {
                        this.setState({emailError: false, passwordError: false})
                    }


                    if (res.token) {
                        let token = res.token
                        await AsyncStorage.setItem("loggedUserID", `${res.user.id}`)
                        this.props.navigation.navigate("Feeds", {
                            token: token,
                        })

                        const foundUser = {
                            email: this.state.email,
                            password: this.state.password,
                            token: res.token
                        }
                        this.context.signIn(foundUser);

                        this.setState({
                            email: '',
                            password: '',
                            emailError: false,
                            passwordError: false,

                        })
                    } else {
                        console.log("error")
                    }
                } catch (e) {
                    console.log(e)
                }
            }).catch(() => {
            console.log("error")
        })
    }

    componentDidMount() {
        // console.log(this.windowWidth, this.windowHeight)
    }


    handleAuth = () => {
        this.props.navigation.navigate('Feeds')
    }

    goToRegister = () => {
        this.props.navigation.navigate('Register')
    }

    handleResetPassword = () => {
        this.props.navigation.navigate('ResetPassword')
    }


    render() {
        return (
            <View style={styles.container}>


                <Text style={styles.inputText}>
                    Вход или {"\n"}
                    регистрация
                </Text>


                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                    style={{flex: 1, width: "100%"}}
                >

                    <View>
                        {this.state.emailError !== false ?
                            <Text
                                style={{
                                    width: "70%",
                                    textAlign: "left",
                                    color: 'red',
                                    marginBottom: 3,
                                    fontSize: 12,
                                }}>
                                {this.state.emailError}
                            </Text> : null}
                        <TextInput
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                            placeholder='Логин'
                            style={styles.input}
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View>
                        {this.state.passwordError !== false ?
                            <Text style={{
                                width: "70%",
                                alignSelf: "flex-start",
                                color: 'red',
                                marginBottom: 3,
                                fontSize: 12,
                            }}>
                                {this.state.passwordError}
                            </Text> : null}
                        <TextInput
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                            secureTextEntry={true}
                            style={styles.input}
                            underlineColorAndroid='transparent'
                            placeholder="Пароль"
                        />
                    </View>


                    <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={styles.linearGradient}>

                        <TouchableOpacity style={styles.loginButton}
                            // onPress={this.onLogin.bind(this)}
                                          onPress={() => this.goToFeeds()}
                        >
                            <Text style={styles.loginButtonText}>Войти</Text>
                        </TouchableOpacity>

                    </LinearGradient>


                    <View style={styles.socLinksWrapper}>
                        <TouchableOpacity>
                            <Image style={styles.socLinkImg}
                                   source={require('../../assets/img/soc/google.png')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image style={styles.socLinkImg}
                                   source={require('../../assets/img/soc/vk.svg')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <FontAwesome name="odnoklassniki-square" size={30} color="orange"/>
                            {/*<Image style={styles.socLinkImg} source={require('../../assets/img/soc/Facebook.png')}></Image>*/}
                        </TouchableOpacity>


                    </View>


                    <Text style={styles.dontHaveAccount}>
                        Еще нет аккаунта?
                    </Text>

                    <TouchableOpacity style={styles.goToRegister} onPress={() => this.goToRegister()}>
                        <Text style={styles.goToRegisterText}>Зарегистрироваться</Text>
                    </TouchableOpacity>

                    <Text style={styles.dontHaveAccount}>
                        Забыли пароль?
                    </Text>
                    <TouchableOpacity style={styles.goToRegister} onPress={() => this.handleResetPassword()}>
                        <Text style={styles.goToRegisterText}>Восстановить Пароль</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight + 5,
        paddingHorizontal: 30,
    },
    contentContainer: {

        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: 240,
        height: 58,
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#f0f4f8',
    },
    inputText: {
        marginBottom: 20,
        width: "100%",
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 38.4,
        fontSize: 32,
        color: '#424A55',
        paddingTop: 20
    },
    loginButton: {
        fontSize: 14,
        color: 'white',
        width: 240,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'

    },
    loginButtonText: {
        color: 'white'
    },
    linearGradient: {
        borderRadius: 10,
        marginBottom: 30
    },
    dontHaveAccount: {
        marginTop: 60,
        fontWeight: 'normal',
        fontSize: 14,
        color: '#8B94A3'
    },
    goToRegister: {}, goToRegisterText: {
        color: '#34BE7C',
        marginTop: 12,
        fontWeight: 'bold',
        fontSize: 14,
    },
    socLinksWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 196
    },
    socLinkImg: {
        width: 32,
        height: 32
    }
});
