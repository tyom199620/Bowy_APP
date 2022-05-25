import React, {Component} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Alert, StatusBar} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {editCarStyles} from "../EditCar/EditCarStyles";


export default class EditPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {

            confirmCode: '',
            password: "",
            resetPassword: "",

            confirmCodeError: null,
            passwordError: null,
            resetPasswordError: null,


        }


    }

    changePassword = () => {
        fetch("http://bowy.ru/api/restore-password", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                random_int: this.state.confirmCode,
                password: this.state.password,
                password_confirmation: this.state.resetPassword
            })
        })
            .then(res => res.json())
            .then((res) => {
                if (res.status){
                    this.setState({
                        confirmCode: '',
                        password: "",
                        resetPassword: "",
                    })
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.inputText}>
                    Восстановить пароль?
                </Text>

                <View style={styles.inputComponent}>
                    <TextInput
                        value={this.state.confirmCode}
                        onChangeText={(confirmCode) => this.setState({confirmCode})}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="Код подтверждения"
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="Пароль"
                        secureTextEntry={true}
                    />
                    <TextInput
                        value={this.state.resetPassword}
                        onChangeText={(resetPassword) => this.setState({resetPassword})}
                        secureTextEntry={true}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="Повторить пароль"
                    />
                    <TouchableOpacity style={{width: "90%", alignItems: "center"}} onPress={this.changePassword}>
                        <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={styles.linearGradient}>

                            <Text style={{textAlign: 'center', color: 'white'}}>
                                Продолжить
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View>

                </View>
            </View>
        )
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
    inputText: {
        width: "100%",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#424A55',
        paddingTop: 20,
        marginBottom: 20
    },
    inputComponent: {
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    input: {
        width: "90%",
        height: 58,
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#f0f4f8',
    },
    linearGradient: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 5,
    }
})