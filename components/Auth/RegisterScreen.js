
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
            confirm_password_error: null,
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

        let req = {name: name, password: password, email: email, number: number, password_confirmation: password_confirmation}

        if (password !== password_confirmation) {
            this.setState({
                confirm_password_error: true
            })
            return false;
        }



        try {
            fetch('http://bowy.ru/api/registration', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // req
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    email: email,
                    number: number,
                    password_confirmation: password_confirmation
                })
            })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    if (response.data?.name || response.data?.email || response.data?.number || response.data?.password || response.data?.password_confirmation) {
                        this.setState({
                            name_error: response.data?.name?.join(""),
                            email_error: response.data?.email?.join(""),
                            phone_error: response.data?.number?.join(""),
                            password_error: response.data?.password?.join(""),
                            confirm_password_error: response.data?.password_confirmation?.join("")
                        })
                    } else {
                        this.setState({
                            name_error: null,
                            email_error: null,
                            phone_error: null,
                            password_error: null,
                        })
                    }


                    if (response.success) {
                        this.setState({
                            name: '',
                            email: '',
                            number: '',
                            password: '',
                            password_confirmation: '',
                            successMessage: true,
                        })

                        setTimeout(()=>{
                            this.props.navigation.navigate('Login')
                            this.setState({successMessage: false})
                        }, 2000)
                    }
                })
        } catch (error) {
            console.log(error, 'Catch error');
        }
    }


    // changeBox = () => {
    //     let api = fetch
    //     let url = `http://bowy.ru/api/registration`;
    //     let {name, password, email, confirm_password, number} = this.state;
    //     try {
    //         let userToken = AsyncStorage.getItem('userToken');
    //         let AuthStr = 'Bearer ' + userToken;
    //         api(url, {
    //                 method: "POST",
    //                 headers: {
    //                     'Authorization': AuthStr,
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                     name: name,
    //                     password: password,
    //                     email: email,
    //                     confirm_password: confirm_password,
    //                     number: number,
    //                 },
    //                 body: JSON.stringify({name, password, confirm_password, email, number})
    //             }
    //         ).then((response) => {
    //             return JSON.parse(response)
    //         })
    //             .then((response) => {
    //                 console.log(response, 'then resp')
    //             })
    //     } catch (error) {
    //         console.log(error, 'Catch error');
    //
    //     }
    // }


    // handleRegistration = () => {
    //     let {fioFlag, emailFlag, numberFlag, passwordFlag, confirmPasswordFlag, registered} = this.state;
    //
    //     //  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if (this.state.email < 6) {
    //         this.setState({
    //             emailFlag: true
    //         })
    //     } else {
    //         this.setState({
    //             emailFlag: false
    //         })
    //     }
    //     // const number = /^[0-9\-\+]{9,15}$/
    //     if (this.state.number < 6) {
    //         this.setState({
    //             numberFlag: true
    //         })
    //     } else {
    //         this.setState({
    //             numberFlag: false
    //         })
    //     }
    //     let {password} = this.state;
    //     if (password.length < 6) {
    //         this.setState({
    //             passwordFlag: true
    //         })
    //
    //     } else {
    //         this.setState({
    //             passwordFlag: false
    //         })
    //     }
    //     if (this.state.confirm_password === '' || this.state.password !== this.state.confirm_password) {
    //         this.setState({
    //             confirmPasswordFlag: true
    //         })
    //     } else {
    //         this.setState({
    //             confirmPasswordFlag: false
    //         })
    //     }
    //
    //     if (this.state.name.length < 5) {
    //         this.setState({
    //             fioFlag: true
    //         })
    //
    //     } else {
    //         this.setState({
    //             fioFlag: false
    //         })
    //     }
    //
    //
    //     if (!emailFlag && !passwordFlag && !fioFlag && !numberFlag && !confirmPasswordFlag) {
    //         this.setState({
    //             registered: true,
    //
    //         })
    //         this.changeBox()
    //         this.goToFeeds()
    //
    //     } else {
    //         alert("Заполните все поля")
    //         this.setState({
    //             registered: false,
    //
    //         })
    //     }
    //     // console.log(registered)
    //
    // }

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
            confirm_password_error: null,
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

                        <Text style={{color: 'red', fontSize: 10, marginBottom: 10, textAlign: "center"}}>{this.state.name_error}</Text>
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

                        <Text style={{color: 'red', fontSize: 10, marginBottom: 10, textAlign: 'center'}}>{this.state.email_error}</Text>
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
                        <Text style={{color: 'red', fontSize: 10, marginBottom: 10, textAlign: 'center'}}>{this.state.phone_error}</Text>
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
                        <Text style={{color: 'red', fontSize: 10, marginBottom: 10, textAlign: 'center'}}>{this.state.password_error}</Text>
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
                {!this.state.confirm_password_error ?
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
                        <Text style={{color: 'red', fontSize: 10, marginBottom: 10, textAlign: 'center'}}>{this.state.confirm_password_error}</Text>
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
    success:{
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
