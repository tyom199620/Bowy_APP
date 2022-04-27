import React, {Component, useState} from 'react';

import {
    View, Platform, TextInput, StyleSheet, StatusBar, Dimensions, ScrollView, Image,
    Text, TouchableOpacity, createStackNavigator, Modal, TouchableHighlight, Alert,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import DropDownPicker from "react-native-custom-dropdown";

import Icon from 'react-native-vector-icons/Feather';
import RangeSlider, {Slider} from 'react-native-range-slider-expo';

import {feedsStyles} from './feedsStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        wishlist: false,
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
        id: 4,
        wishlist: true,
        description: desc,
        image: require('../../assets/img/cars/4.png'),
        userImage: require('../../assets/img/user.png'),
        slider: ["https://source.unsplash.com/1024x768/?nature", "https://source.unsplash.com/1024x768/?water", "https://source.unsplash.com/1024x768/?girl", "https://source.unsplash.com/1024x768/?tree"],
        title: 'Аренда авто,под залог4',
        price: '1 350 ₽',
        address: 'Проспект Мира 24',
        date: 'Сегодня в 11:45',
        autoMark: 'BMW',
        body_type: 'Седан',
        yearOfIssue: '2019',
        transmission: 'Автоматическая',
        rull: 'Левый',
        user_name: 'Сергей',
        post_count: 13,
        phone_number: '37477695677'
    },
    {
        id: 5,
        wishlist: true,
        description: desc,
        image: require('../../assets/img/cars/1.png'),
        userImage: require('../../assets/img/user.png'),
        slider: ["https://source.unsplash.com/1024x768/?nature", "https://source.unsplash.com/1024x768/?water", "https://source.unsplash.com/1024x768/?girl", "https://source.unsplash.com/1024x768/?tree"],
        title: 'Аренда авто,под залог5',
        price: '1 450 ₽',
        address: 'Проспект Мира 25',
        date: 'Сегодня в 10:45',
        autoMark: 'Mitsubishi',
        body_type: 'Седан',
        yearOfIssue: '2021',
        transmission: 'Механика',
        rull: 'Правый',
        user_name: 'Виталий',
        post_count: 15,
        phone_number: '37477695677'
    },
    {
        id: 6,
        wishlist: false,
        description: desc,
        image: require('../../assets/img/cars/2.png'),
        userImage: require('../../assets/img/user.png'),
        slider: ["https://source.unsplash.com/1024x768/?nature", "https://source.unsplash.com/1024x768/?water", "https://source.unsplash.com/1024x768/?girl", "https://source.unsplash.com/1024x768/?tree"],
        title: 'Аренда авто,под залог6',
        price: '1 550 ₽',
        address: 'Проспект Мира 26',
        date: 'Сегодня в 9:45',
        autoMark: 'Kia',
        body_type: 'Седан',
        yearOfIssue: '2018',
        transmission: 'Автоматическая',
        rull: 'Левый',
        user_name: 'Петр',
        post_count: 177,
        phone_number: '37477695677'
    },
    {
        id: 7,
        wishlist: true,
        description: desc,
        image: require('../../assets/img/cars/3.png'),
        userImage: require('../../assets/img/user.png'),
        slider: ["https://source.unsplash.com/1024x768/?nature", "https://source.unsplash.com/1024x768/?water", "https://source.unsplash.com/1024x768/?girl", "https://source.unsplash.com/1024x768/?tree"],
        title: 'Аренда авто,под залог7',
        price: '1 650 ₽',
        address: 'Проспект Мира 27',
        date: 'Сегодня в 8:45',
        autoMark: 'Opel',
        body_type: 'Седан',
        yearOfIssue: '2017',
        transmission: 'Механика',
        rull: 'Правый',
        user_name: 'Анна',
        post_count: 19,
        phone_number: '37477695677'
    },
    {
        id: 8,
        wishlist: false,
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
    },
];

const wishIcons = [
    require('../../assets/img/addinwish.png'),
    require('../../assets/img/addinwishactive.png')
];

const sortByValues = [
    {
        key: 'default',
        text: 'По умолчанию',
    },
    {
        key: 'date',
        text: 'По дате',
    },
    {
        key: 'min_price',
        text: 'Дешевле',
    },
    {
        key: 'max_price',
        text: 'Дороже',
    }
];


export default class FeedsScreenComponent extends Component {

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
            filterModalVisible: false,
            filterSortBy: null,
            filterCategory: null,
            locationCity: null,
            value: 0,

            products: [],
        };
    }

    // getProducts = async () => {
    //     try {
    //         let userToken = await AsyncStorage.getItem('userToken');
    //         let AuthStr = 'Bearer ' + userToken;
    //
    //
    //         fetch('http://185.46.11.159/BowyLaravel/public/api/products', {
    //             method: "GET",
    //
    //         })
    //             .then((response) => {
    //                 console.log(response, 'resp')
    //             this.setState({
    //                 products: response
    //             })
    //         })}catch (e){
    //         /////////////
    //     }
    // }

    componentDidMount() {
        //  this.getProducts().then(r => console.log('OK'))
    }

    setModalVisible(visible) {
        this.setState(state => {
            return this.state.filterModalVisible = visible
        });
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
    };

    openSingleCar = (data) => {

        // data.navigation = this.props.navigation
        // console.log(data)
        this.props.navigation.navigate('SingleCar', {
            params: data,
            navigation: JSON.stringify(this.props.navigation)
        })
    };

    render() {
        console.log(this.state.products)
        return (
            <View style={feedsStyles.feedsScreenMainView}>

                {/*Search Filter form*/}

                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.filterModalVisible}
                    style={{width: '100%'}}
                >
                    <View style={feedsStyles.modalContainer}>

                        <View style={feedsStyles.modalContainer2}>
                            <Text style={feedsStyles.modalContainerTitle}>Фильтры</Text>

                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.filterModalVisible);
                            }}>
                                <Image style={feedsStyles.closeModal}
                                       source={require('../../assets/img/close_modal.png')}/>
                            </TouchableOpacity>

                        </View>


                        <ScrollView style={feedsStyles.filterFieldsWrapper}>

                            <DropDownPicker

                                items={[
                                    {label: 'Категория', value: null},
                                    {label: 'На продажу', value: '1'},
                                    {label: 'В аренду', value: '2'},
                                    {label: 'В кредит', value: '3'},
                                ]}
                                defaultValue={this.state.filterCategory}
                                containerStyle={{height: 45}}
                                style={{
                                    backgroundColor: '#F0F4F8',
                                    borderWidth: 0,
                                    width: '100%',

                                }}
                                placeholder='Категория'
                                labelStyle={{
                                    color: '#8B94A3',
                                }}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                    // width:'100%',
                                    // borderBottomColor: "#a2abc25c",
                                    // borderBottomWidth: 1,
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => this.setState({
                                    filterCategory: item.value
                                })}
                            />
                            <View style={feedsStyles.locationWrapper}>

                                <DropDownPicker
                                    items={[
                                        {label: 'Город', value: null},
                                        {label: 'Ереван', value: '1'},
                                        {label: 'Москва', value: '2'},
                                        {label: 'Санкт-Питербург', value: '3'},
                                    ]}
                                    defaultValue={this.state.locationCity}
                                    containerStyle={{height: 45}}
                                    style={{
                                        backgroundColor: '#F0F4F8',
                                        borderWidth: 0,
                                        borderBottomWidth: 1,
                                        width: '103%',
                                        borderBottomColor: "#a2abc25c",
                                        paddingLeft: 0,
                                        position: 'relative',

                                    }}
                                    placeholder='Город'
                                    labelStyle={{
                                        color: '#8B94A3',
                                    }}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                        paddingLeft: 7,
                                        width: '100%',
                                        // borderBottomColor: "#a2abc25c",
                                        // borderBottomWidth: 1,
                                    }}

                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => this.setState({
                                        locationCity: item.value
                                    })}
                                />
                                <DropDownPicker
                                    items={[
                                        {label: 'Город', value: null},
                                        {label: 'Ереван', value: '1'},
                                        {label: 'Москва', value: '2'},
                                        {label: 'Санкт-Питербург', value: '3'},
                                    ]}
                                    defaultValue={this.state.locationCity}
                                    containerStyle={{height: 45}}
                                    style={{
                                        backgroundColor: '#F0F4F8',
                                        borderWidth: 0,
                                        borderBottomWidth: 1,
                                        width: '103%',
                                        borderBottomColor: "#a2abc25c",
                                        paddingLeft: 0,
                                        position: 'relative',

                                    }}
                                    placeholder='Регион'
                                    labelStyle={{
                                        color: '#8B94A3',
                                    }}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                        paddingLeft: 7,
                                        width: '100%',
                                        // borderBottomColor: "#a2abc25c",
                                        // borderBottomWidth: 1,
                                    }}

                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => this.setState({
                                        locationCity: item.value
                                    })}
                                />

                                <View style={feedsStyles.streetWrapper}>
                                    <TextInput
                                        style={feedsStyles.textInputStyle}
                                        underlineColorAndroid="transparent"
                                        placeholder="Улица"
                                    />
                                </View>

                                {/*<Slider min={0} max={40} step={1}*/}
                                {/*        valueOnChange={value => this.setState({*/}
                                {/*            value: value*/}
                                {/*        })}*/}
                                {/*        initialValue={12}*/}
                                {/*        knobColor='red'*/}
                                {/*        valueLabelsBackgroundColor='black'*/}
                                {/*        inRangeBarColor='purple'*/}
                                {/*        outOfRangeBarColor='orange'*/}
                                {/*        style={{zIndex:5}}*/}
                                {/*/>*/}

                            </View>

                            <View style={feedsStyles.minMaxPriceWrapper}>

                                <View style={feedsStyles.minPriceWrapper}>
                                    <TextInput
                                        style={feedsStyles.textInputStyle}
                                        underlineColorAndroid="transparent"
                                        placeholder="Цена от"
                                    />
                                </View>

                                <View style={feedsStyles.maxPriceWrapper}>
                                    <TextInput
                                        style={feedsStyles.textInputStyle}
                                        underlineColorAndroid="transparent"
                                        placeholder="Цена до"
                                    />
                                </View>

                            </View>

                            <View style={feedsStyles.sortByWrapper}>

                                <Text style={feedsStyles.sortByTitile}>
                                    Сортировать
                                </Text>

                                {sortByValues.map(res => {
                                    return (
                                        <View key={res.key} style={feedsStyles.rbWrapper}>
                                            <TouchableOpacity style={{
                                                justifyContent: 'flex-start',
                                                width: '100%',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                height: 20

                                            }}
                                                              onPress={() => {
                                                                  this.setState({
                                                                      filterSortBy: res.key,
                                                                  });
                                                                  console.log(res.key)
                                                              }}>

                                                <TouchableOpacity style={feedsStyles.rbStyle}>
                                                    {this.state.filterSortBy === res.key &&
                                                    <View style={feedsStyles.selected}/>}
                                                </TouchableOpacity>
                                                <Text style={feedsStyles.filterSortLabel}>{res.text}</Text>

                                            </TouchableOpacity>

                                        </View>
                                    );
                                })}

                            </View>

                            <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={feedsStyles.filterSearchButton}>
                                <TouchableOpacity>
                                    <Text style={{color: 'white'}}>
                                        Показать 120 объявлений
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>

                        </ScrollView>


                    </View>
                </Modal>


                {/*Search form*/}

                <View style={feedsStyles.textInputWrapperStyle}>

                    <View style={feedsStyles.textInputContainerStyle}>

                        <TouchableOpacity>
                            <Image style={feedsStyles.textInputImg}
                                   source={require('../../assets/img/search_input_icon.png')}/>
                        </TouchableOpacity>

                        <TextInput
                            style={feedsStyles.textInputStyle}
                            underlineColorAndroid="transparent"
                            placeholder="Поиск авто"
                        />

                        <View style={feedsStyles.searchLine}></View>

                        <TouchableOpacity onPress={() => {
                            this.setModalVisible(!this.state.filterModalVisible);
                        }}>
                            <Image style={feedsStyles.textInputImgFilterIcon}
                                   source={require('../../assets/img/filter.png')}/>
                        </TouchableOpacity>

                    </View>

                </View>

                <ScrollView style={feedsStyles.scrollView}>

                    {articleData.map((article, index) => (
                        <View key={article.id} style={feedsStyles.feedsCaritems}>

                            <View style={feedsStyles.feedsCarImgWrapper}>
                                <Image style={feedsStyles.feedsCaritemsImg} source={article.image}/>
                                <TouchableOpacity style={feedsStyles.addinwish}
                                                  onPress={() => this.onToggleArray(article)}>
                                    <Image
                                        source={this.state.wishlist.includes(article.id) ? wishIcons[1] : wishIcons[0]}/>
                                </TouchableOpacity>
                            </View>

                            <View style={feedsStyles.feedsCarItemRight}>
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
