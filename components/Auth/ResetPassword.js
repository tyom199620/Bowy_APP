import React, {Component} from 'react';
import axios from "axios";

import {Text, View, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';


export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailFlag: true,
            invalid: 'Данное поле необходимо заполнить',

            resetPasswordCode: false,
            resetCode: ''
        }
    }


    goToRegister = () => {
        this.props.navigation.navigate('Register')

        this.setState({
            resetPasswordCode: false,
            email: '',
            emailFlag: true
        })
    }


    handleCheckRegex = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.email) === true) {

            this.setState({
                emailFlag: false,
                resetPasswordCode: false,
            })
        } else {
            this.setState({
                emailFlag: true,
                resetPasswordCode: true,

            })
            alert("Код восстонавления отправлень на ваш адресс")
        }
        console.log(this.state.emailFlag)
    }


    sendEmail = () => {
        fetch("http://bowy.ru/api/code-sending", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email})
        })
            .then(res => res.json())
            .then((res) => {
                if (res.success){
                    this.props.navigation.navigate('EditPassword')
                }
            }).catch((e) => {
            console.log("errror")
        })
    }

    render() {
        return (
            <SafeAreaView
                style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white'}}>
                <View style={{marginTop: 170}}>
                    <Text style={styles.text}>Восстановить {"\n"}
                        Пароль</Text>
                </View>
                <View>
                    {this.state.emailFlag === true ?
                        <TextInput
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                            maxLength={45}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder='Введите Email адресс'
                        />
                        :
                        <View>

                            <TextInput
                                value={this.state.email}
                                onChangeText={(email) => this.setState({email})}
                                maxLength={45}
                                style={styles.errorMessage}
                                underlineColorAndroid="transparent"
                                placeholder='Введите Емайл адресс'
                            />
                            <Text style={{
                                color: 'red',
                                fontSize: 10,
                                marginBottom: 10,
                                textAlign: "center"
                            }}>{this.state.invalid}</Text>
                        </View>
                    }
                    <View>

                        {this.state.resetPasswordCode === true ?
                            <TextInput
                                value={this.state.resetCode}
                                onChangeText={(resetCode) => this.setState({resetCode})}
                                maxLength={5}
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder='Введите код'
                            /> : null}
                    </View>

                    <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={styles.linerGradient}>
                        <TouchableOpacity style={styles.button} onPress={this.sendEmail}>
                            <Text style={{color: 'white'}}>
                                Отправить Код {"\n"}
                                Подтверждения
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={styles.linerGradient}>
                    <TouchableOpacity style={styles.button} onPress={() => this.goToRegister()}>
                        <Text style={{color: 'white'}}>
                            Регистрация
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>


            </SafeAreaView>


        );
    }
}
const styles = StyleSheet.create({
    input: {
        width: 240,
        height: 58,
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#f0f4f8',
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 38.4,
        marginBottom: 40,
        fontSize: 32,
        color: '#424A55'
    },
    button: {
        fontSize: 14,
        color: 'white',
        width: 240,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',

    },
    linerGradient: {
        borderRadius: 10,
        marginBottom: 30
    },
    errorMessage: {
        width: 240,
        height: 58,
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#f0f4f8',
        borderColor: 'red',
        borderWidth: 1
    }

})
