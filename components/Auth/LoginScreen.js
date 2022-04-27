import React, {Component} from 'react';
import {Text, Alert, Button, View, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
// import { TextInput } from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import {FontAwesome} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {exp} from "react-native-reanimated";
import {AuthContext} from "../AuthContext/context"
import DropDownPicker from 'react-native-dropdown-picker';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            req: {
                email: '',
                password: '',
                currentUser: false
            },
            error_message: false
        };
    }

    static contextType = AuthContext


    go = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === true) {
            alert('valid');
        } else {
            alert();
        }

    }


    goToFeeds = () => {
        fetch('http://bowy.ru/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        })
            .then(response => response.json())
            .then((response) => {
                if (response.token) {
                    let token = response.token
                    this.props.navigation.navigate("Feeds", {
                        token: token,
                    })




                    const foundUser = {
                        email: this.state.email,
                        password: this.state.password,
                        token: response.token
                    }
                    this.context.signIn(foundUser);
                } else {
                    console.log("error")
                    // error-i kod@ grel
                }
            }).catch(() => {
            console.log("error")
        })
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
                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    placeholder='Логин'
                    style={styles.input}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder="Пароль"
                />
                {this.state.currentUser === true ?
                    <Text style={{width: "70%", textAlign: "center", color: 'red', marginBottom: 10}}>
                        Введите действительный адрес электронной почты и пароль
                    </Text> : null}

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
                               source={require('../../assets/img/soc/vk.png')}></Image>
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

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
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
        width: 220,
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 38.4,
        marginBottom: 40,
        fontSize: 32,
        color: '#424A55'
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
