import React, {Component, useState} from 'react';
import {
    View,
    Platform,
    TextInput, StyleSheet, StatusBar, Dimensions, ScrollView, Image, Text, TouchableOpacity, createStackNavigator,
    Modal, TouchableHighlight, Alert
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {wishhListStyles} from './WishListStyles';

const desc = 'Идейные соображения высшего порядка, \n' +
    'а также укрепление и развитие структуры \n' +
    'играет важную роль в формировании \n' +
    'модели развития.';

const articleData = [
    {
        id: 1,
        wishlist: true,
        description: desc,
        image: require('../../assets/img/cars/1.png'),
        userImage: require('../../assets/img/user.png'),
        slider: [require('../../assets/img/cars/1.png'), require('../../assets/img/cars/3.png'), require('../../assets/img/cars/4.png')],
        title: 'Аренда авто,под залог1',
        price: '1 290 ₽',
        address: 'Лиговский проспект 11',
        date: 'Сегодня в 12:00'
    },
    {
        id: 2,
        wishlist: true,
        description: desc,
        image: require('../../assets/img/cars/2.png'),
        userImage: require('../../assets/img/user.png'),
        slider: ["https://source.unsplash.com/1024x768/?nature", "https://source.unsplash.com/1024x768/?water", "https://source.unsplash.com/1024x768/?girl", "https://source.unsplash.com/1024x768/?tree"],
        title: 'Аренда авто,под залог2',
        price: '1 150 ₽',
        address: 'Проспект Мира 22',
        date: 'Сегодня в 13:45',
        autoMark: 'Vollkswagen',
        body_type: 'Седан',
        yearOfIssue: '2021',
        transmission: 'Автоматическая',
        rull: 'Левый',
        user_name: 'Дмитрий',
        post_count: 10,
        phone_number: '37477695677'
    },
    {
        id: 3,
        wishlist: true,
        description: desc,
        image: require('../../assets/img/cars/3.png'),
        userImage: require('../../assets/img/user.png'),
        slider: ["https://source.unsplash.com/1024x768/?nature", "https://source.unsplash.com/1024x768/?water", "https://source.unsplash.com/1024x768/?girl", "https://source.unsplash.com/1024x768/?tree"],
        title: 'Аренда авто,под залог3',
        price: '1 250 ₽',
        address: 'Проспект Мира 23',
        date: 'Сегодня в 12:45',
        autoMark: 'Mercedes',
        body_type: 'Седан',
        yearOfIssue: '2020',
        transmission: 'Механика',
        rull: 'Правый',
        user_name: 'Артем',
        post_count: 117,
        phone_number: '37477695677'
    },
    {
        id: 8,
        wishlist: true,
        description: desc,
        image: require('../../assets/img/cars/4.png'),
        userImage: require('../../assets/img/user.png'),
        slider: ["https://source.unsplash.com/1024x768/?nature", "https://source.unsplash.com/1024x768/?water", "https://source.unsplash.com/1024x768/?girl", "https://source.unsplash.com/1024x768/?tree"],
        title: 'Аренда авто,под залог8',
        price: '1 750 ₽',
        address: 'Проспект Мира 28',
        date: 'Сегодня в 7:45',
        autoMark: 'Jaguar',
        body_type: 'Седан',
        yearOfIssue: '2016',
        transmission: 'Автоматическая',
        rull: 'Левый',
        user_name: 'Александр',
        post_count: 18,
        phone_number: '37477695677'
    },];

const wishIcons = [
    require('../../assets/img/addinwishactive.png')
];


export default class wishListScreen extends Component {

    constructor(props) {
        super(props);
        this.wishlist = [];

        for (let i = 0; i < articleData.length; i++) {
            if (articleData[i].wishlist === true) {
                this.wishlist.push(articleData[i].id);
            }
        }
        this.state = {
            wishlist: this.wishlist,
            articleData: articleData
        };
    }


    onToggleArray = (item, index) => {
        this.setState(state => {
            const wishlist = state.wishlist.includes(item.id)
                ? state.wishlist.filter(i => i !== item.id) // remove item
                : [...state.wishlist, item.id]; // add item

            return {
                wishlist,
            };
        });
    }

    handleRemoveWish = () => {

       this.state.articleData.map(item => {
            if (item.wishlist === false) {
                delete item.item
            }
        })
        this.setState({
            articleData: articleData
        })
        console.log(this.state.articleData)

    }



    openSingleCar = (data) => {
        this.props.navigation.navigate('SingleCar', {
            params: data,
        })
    }

    render() {

        return (
            <View style={wishhListStyles.wishhListScreenMainView}>
                <View style={wishhListStyles.wishTitleWrapper}>
                    <Text style={wishhListStyles.wishTitle}>
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

                <ScrollView style={wishhListStyles.scrollView}>

                    {articleData.map((article, index) => (
                        <View key={article.id} style={wishhListStyles.wishhListCaritems}>

                            <View style={wishhListStyles.wishhListCarImgWrapper}>
                                <Image style={wishhListStyles.wishhListCaritemsImg} source={article.image}/>
                                <TouchableOpacity style={wishhListStyles.addinwish}
                                                  onPress={() => this.onToggleArray(article)}>

                                    <Image source={wishIcons[0]}/>
                                </TouchableOpacity>
                            </View>

                            <View style={wishhListStyles.wishhListCarItemRight}>
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
                </ScrollView>
            </View>
        )
    }
}



