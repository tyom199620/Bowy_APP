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
    KeyboardAvoidingView
} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';


export default class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            name: '',
            email: '',
            number: '',
            password: '',
            password_confirmation: '',

            name_error: null,
            email_error: null,
            phone_error: null,
            password_error: null,
            password_confirmation_error: null,
            successMessage: null


        };
    }

    // handleRegistration=()=>{
    //     // navigation.navigate("Fee")
    //     this.props.navigation.navigate('Feeds')
    //
    // }

    handleRegistration = async () => {
        let {name, password, email, number, password_confirmation} = this.state;

        let req = {
            name: name,
            password: password,
            email: email,
            number: number,
            password_confirmation: password_confirmation
        }


        try {
            fetch('http://bowy.ru/api/registration', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req)
            })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    console.log(response)

                    if (response.data) {
                        if (response.data.name) {
                            this.setState({name_error: response.data.name[0]})
                        } else {
                            this.setState({name_error: null,})
                        }

                        if (response.data.email) {
                            this.setState({email_error: response.data.email[0]})
                        } else {
                            this.setState({email_error: null,})
                        }

                        if (response.data.number) {
                            this.setState({phone_error: response.data.number[0]})
                        } else {
                            this.setState({phone_error: null,})
                        }

                        if (response.data.password) {
                            this.setState({password_error: response.data.password[0]})
                        } else {
                            this.setState({password_error: null,})
                        }

                        if (response.data.password_confirmation) {
                            this.setState({password_confirmation_error: response.data.password_confirmation[0]})
                        } else {
                            this.setState({password_confirmation_error: null,})
                        }
                    }


                    if (response.success) {
                        this.setState({
                            name: '',
                            email: '',
                            number: '',
                            password: '',
                            password_confirmation: '',
                            successMessage: true,

                            name_error: null,
                            email_error: null,
                            phone_error: null,
                            password_error: null,
                            password_confirmation_error: null
                        })

                        setTimeout(() => {
                            this.props.navigation.navigate('Login')
                            this.setState({successMessage: false})
                        }, 2000)
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        } catch (error) {
            console.log(error, 'Catch error');
        }
    }


    //
    // goToFeeds = () => {
    //     if (this.state.registered === true) {
    //         this.props.navigation.navigate('Feeds');
    //         this.setState({
    //             name: '',
    //             email: '',
    //             number: '',
    //             password: '',
    //             confirm_password: '',
    //         })
    //     }
    // }
    //

    goToLogin = () => {
        this.setState({
            name: '',
            email: '',
            number: '',
            password: '',
            confirm_password: '',

            name_error: null,
            email_error: null,
            phone_error: null,
            password_error: null,
            password_confirmation_error: null
        })

        this.props.navigation.navigate('Login');
    }


    // // onLogin() {
    // //     const {email, password} = this.state;
    // //     Alert.alert('Credentials', `${email} + ${password}`);
    // // }

    render() {
        return (

            <View style={styles.container}>

                <Text style={styles.inputext}>
                    Вход или {"\n"}
                    регистрация
                </Text>


                {this.state.successMessage && <Text style={styles.success}>Вы успешно зарегистрировались!</Text>}


                {!this.state.name_error ? <TextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name})}
                        placeholder='ФИО'
                        maxLength={45}
                        style={styles.input}
                        underlineColorAndroid="transparent"

                    />
                    :
                    <View>

                        <Text style={{
                            color: 'red',
                            fontSize: 10,
                            marginBottom: 3,
                            alignSelf: 'flex-start'
                        }}>{this.state.name_error}</Text>
                        <TextInput
                            value={this.state.name}
                            onChangeText={(name) => this.setState({name})}
                            placeholder='ФИО'
                            maxLength={45}
                            style={styles.errorMessage}
                            underlineColorAndroid="transparent"
                        />
                    </View>}


                {!this.state.email_error ? <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email})}
                        placeholder='Почта'
                        maxLength={45}
                        style={styles.input}
                        underlineColorAndroid="transparent"
                    /> :
                    <View>

                        <Text style={{
                            color: 'red',
                            fontSize: 10,
                            marginBottom: 3,
                            alignSelf: 'flex-start'
                        }}>{this.state.email_error}</Text>
                        <TextInput
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                            placeholder='Почта'
                            maxLength={45}
                            style={styles.errorMessage}
                            underlineColorAndroid="transparent"
                        />
                    </View>}


                {!this.state.phone_error ? <TextInput
                        value={this.state.number}
                        onChangeText={(number) => this.setState({number})}
                        placeholder='Номер телефона'
                        maxLength={45}
                        keyboardType='numeric'
                        style={styles.input}
                        underlineColorAndroid="transparent"
                    /> :
                    <View>
                        <Text style={{
                            color: 'red',
                            fontSize: 10,
                            marginBottom: 3,
                            alignSelf: 'flex-start'
                        }}>{this.state.phone_error}</Text>
                        <TextInput
                            value={this.state.number}
                            onChangeText={(number) => this.setState({number})}
                            placeholder='Номер телефона'
                            maxLength={45}
                            keyboardType='numeric'
                            style={styles.errorMessage}
                            underlineColorAndroid="transparent"
                        />

                    </View>}

                {!this.state.password_error ?
                    <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                        secureTextEntry={true}
                        maxLength={45}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="Пароль"
                    /> :
                    <View>
                        <Text style={{
                            color: 'red',
                            fontSize: 10,
                            marginBottom: 3,
                            alignSelf: 'flex-start'
                        }}>{this.state.password_error}</Text>
                        <TextInput
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                            secureTextEntry={true}
                            maxLength={45}
                            style={styles.errorMessage}
                            underlineColorAndroid='transparent'
                            placeholder="Пароль"
                        />
                    </View>}


                {!this.state.password_confirmation_error ?
                    <TextInput
                        value={this.state.password_confirmation}
                        onChangeText={(password_confirmation) => this.setState({password_confirmation})}
                        secureTextEntry={true}
                        maxLength={45}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="Повторить пароль"
                    /> :
                    <View>
                        <Text style={{
                            color: 'red',
                            fontSize: 10,
                            marginBottom: 3,
                            alignSelf: 'flex-start'
                        }}>{this.state.password_confirmation_error}</Text>
                        <TextInput
                            value={this.state.password_confirmation}
                            onChangeText={(password_confirmation) => this.setState({password_confirmation})}
                            secureTextEntry={true}
                            maxLength={45}
                            style={styles.errorMessage}
                            underlineColorAndroid='transparent'
                            placeholder="Повторить пароль"
                        />
                    </View>
                }
                <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={styles.linearGradient}>

                    <TouchableOpacity style={styles.loginButton} onPress={this.handleRegistration}>
                        <Text style={styles.loginButtonText}>Регистрация</Text>
                    </TouchableOpacity>

                </LinearGradient>

                <Text style={styles.dontHaveAccount}>
                    У вас уже есть аккаунт?
                </Text>

                <TouchableOpacity style={styles.goToRegister} onPress={() => this.goToLogin()}>
                    <Text style={styles.goToRegisterText}>Войти</Text>
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
        paddingTop: 60
    },
    input: {
        width: 240,
        height: 58,
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#f0f4f8',
    },
    success: {
        color: "green",
        fontSize: 20,
        marginBottom: 25,
        lineHeight: 38.4,
        fontWeight: "bold",
        alignSelf: "center"
    },
    inputext: {
        width: 220,
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 38.4,
        marginBottom: 20,
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
    },
    dontHaveAccount: {
        marginTop: 50,
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
});


// this.setState({
//     name: '',
//     email: '',
//     number: '',
//     password: '',
//     confirm_password: '',
// });
// req: {
//     name: this.state.name,
//     email: this.state.email,
//     number: this.state.number,
//     password: this.state.password,
//     confirm_password: this.state.confirm_password,
// },
