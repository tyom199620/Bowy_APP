import React, {Component, useState} from 'react';

import {
    View, Platform, TextInput, StyleSheet, StatusBar, Dimensions, ScrollView, Image,
    Text, TouchableOpacity, createStackNavigator, Modal, TouchableHighlight, Alert, FlatList, SafeAreaView
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';


import {feedsStyles} from './feedsStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";


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


        this.state = {
            wishListId: [],
            filterModalVisible: false,
            filterSortBy: null,
            filterCategory: null,
            locationCity: null,


            carCategoryOpen: false,
            carCategoryValue: null,
            carCategoryItems: [],

            regionCategoryOpen: false,
            regionCategoryValue: null,
            regionCategoryItems: [],

            cityListOpen: false,
            cityListValue: null,
            cityListItems: [],


            products: [],
            products1: [],

            usersID: [],
            loggedUserID: "",
            searchValue: "",
        };
    }



    getFavouriteItems = async () => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch("http://bowy.ru/api/favourites", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                },

            })
                .then(res => res.json())
                .then(res => {
                    this.setState({wishListId: res["0"].map((item) => item.id)});
                })
                .catch((e)=>{
                    console.log("errrrrrror")
                })
        } catch (e) {
            console.log(e)
        }
    }

    addToFavourites = async (userID, productID) => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch("http://bowy.ru/api/favourites", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                },
                body: JSON.stringify({user_id: userID, product_id: productID})
            })
                .then(res => res.json())
                .then((res) => {
                })
                .catch((e) => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }
    }

    removeFromFavourites = async (itemID) => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch(`http://bowy.ru/api/favourites/${itemID}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                })
                .catch((e) => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }
    }

    getProducts = async () => {
        try {

            let userID = await AsyncStorage.getItem("loggedUserID")
            let userToken = await AsyncStorage.getItem('userToken');
            let AuthStr = 'Bearer ' + userToken;
            fetch('http://bowy.ru/api/allproducts', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': AuthStr,
                },
            })
                .then((response) => response.json())
                .then((res) => {
                        this.setState({loggedUserID: userID})
                        this.setState({products: res.product_data})
                        this.setState({products1: res.product_data})
                    }
                )
                .catch((e) => {
                    console.log(e)
                })

        } catch (e) {
            /////////////
        }
    }

    getRegions = () => {
        fetch('http://bowy.ru/api/home')
            .then(res => res.json())
            .then((res) => {
                const carCategory = []
                res[1].forEach((item) => {
                    let picker = {}
                    picker.label = item.name
                    picker.value = item.name
                    picker.id = item.id
                    carCategory.push(picker)
                })
                this.setState({regionCategoryItems: carCategory})
            })
            .catch(() => {
                console.log("Hello")
            })
    }

    getCities = async (regionId) => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch(`http://bowy.ru/api/city`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                }
            })
                .then(response => response.json())
                .then((response) => {
                    console.log(response)
                    let arr = []
                    response[1]
                        .filter((item) => item.region_id === regionId)
                        .map((item) => {
                            let picker = {}
                            picker.label = item.name
                            picker.value = item.name
                            picker.id = item.id
                            arr.push(picker)
                        })
                    this.setState({cityListItems: arr})
                })
                .catch((e) => {
                    // console.log(e)
                })
        } catch (e) {
            // console.log(e)
        }
    }

    setModalVisible(visible) {
        this.setState(state => {
            return this.state.filterModalVisible = visible
        });
    }

    openSingleCar = (data) => {
        let obj = {info: data}
        this.props.navigation.navigate('SingleCar', {
            params: obj,
            navigation: JSON.stringify(this.props.navigation)
        })
    };

    getCategories = () => {
        fetch('http://bowy.ru/api/home')
            .then(res => res.json())
            .then((res) => {
                const carCategory = []
                res[0].forEach((item) => {
                    let picker = {}
                    picker.label = item.name
                    picker.value = item.id
                    picker.id = item.id
                    carCategory.push(picker)
                })
                this.setState({carCategoryItems: carCategory})
            })
            .catch((e) => {
                // console.log(e)
            })
    }

    searchItems = (value) => {
        const {products} = this.state
        const filteredProducts = []
        if (value.trim().length > 2) {
            products.forEach((item) => {
                if (item.car_model.toLowerCase().includes(value.trim().toLowerCase())) {
                    filteredProducts.push(item)
                } else if (item.address.toLowerCase().includes(value.trim().toLowerCase())) {
                    filteredProducts.push(item)
                } else if (item.description.toLowerCase().includes(value.trim().toLowerCase())) {
                    filteredProducts.push(item)
                } else if (item.headline.toLowerCase().includes(value.trim().toLowerCase())) {
                    filteredProducts.push(item)
                } else if (item.headline.toLowerCase().includes(value.trim().toLowerCase())) {
                    filteredProducts.push(item)
                }
                this.setState({products: filteredProducts})
            })
        } else {
            this.setState({products: this.state.products1})
        }
    }

    check = () => {

        const {products} = this.state
        let filteredProduct = JSON.parse(JSON.stringify(products))
        if (this.state.carCategoryValue) {
            filteredProduct = filteredProduct.filter((item) => {
                return Number(item.category_id) === Number(this.state.carCategoryValue)
            })
        }

        if (this.state.regionCategoryValue) {
            filteredProduct = filteredProduct.filter((item) => {
                return item.region === this.state.regionCategoryValue
            })
        }

        if (this.state.cityListValue) {
            filteredProduct = filteredProduct.filter((item) => {
                return item.city === this.state.cityListValue
            })

        }
        if (this.state.streetValue) {
            filteredProduct = filteredProduct.filter((item) => {
                return item.address.toLowerCase().includes(this.state.cityListValue.trim().toLowerCase())
            })

        }
        if (this.state.minCost) {
            filteredProduct = filteredProduct.filter((item) => {
                return Number(item.price) >= Number(this.state.minCost)
            })

        }
        if (this.state.maxCost) {
            filteredProduct = filteredProduct.filter((item) => {
                return Number(item.price) <= Number(this.state.maxCost)
            })

        }

        if (this.state.filterSortBy) {

            if (this.state.filterSortBy === "min_price") {
                filteredProduct = filteredProduct.sort((a, b) => Number(a.price) - Number(b.price))


            } else if (this.state.filterSortBy === "max_price") {
                filteredProduct = filteredProduct.sort((a, b) => Number(b.price) - Number(a.price))

            } else {
                JSON.parse(JSON.stringify(this.state.products1))
            }
        }
        this.setState({products: filteredProduct})
    }

    filterItems = async () => {

        try {
            await this.setState({products: JSON.parse(JSON.stringify(this.state.products1))})
            await this.check()
            await this.setState({filterModalVisible: false})
        } catch (e) {
            console.log("eeeeeeeeeeeeeeeeee")
        }


    }


    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.getProducts()
            this.getCategories()
            this.getRegions()
            this.getFavouriteItems()
        });
    }


    render() {
        return (
            <View style={feedsStyles.feedsScreenMainView}>
                {/*Search Filter form*/}

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.filterModalVisible}
                    style={{width: '100%'}}
                >
                    <View style={feedsStyles.modalContainer}>

                        <View style={feedsStyles.modalContainer2}>
                            <Text style={feedsStyles.modalContainerTitle}>Фильтры</Text>

                            <TouchableOpacity onPress={() => {
                                this.setState({filterModalVisible: false})
                                this.setState({products: this.state.products1})
                            }}>
                                <Image style={feedsStyles.closeModal}
                                       source={require('../../assets/img/close_modal.png')}/>
                            </TouchableOpacity>

                        </View>


                        <ScrollView style={feedsStyles.filterFieldsWrapper}>

                            <View style={feedsStyles.category1}>
                                <DropDownPicker
                                    open={this.state.carCategoryOpen}
                                    value={this.state.carCategoryValue}
                                    items={this.state.carCategoryItems}
                                    setOpen={() => {
                                        this.setState((state) => ({carCategoryOpen: !state.carCategoryOpen}))
                                    }}
                                    maxHeight={200}
                                    setValue={(call) => this.setState((value) => ({carCategoryValue: call(value)}))}
                                    placeholder="Категория"
                                    style={{
                                        width: '100%',
                                        borderWidth: 0,
                                        height: 55,
                                        backgroundColor: '#F0F4F8',
                                        marginBottom: 15,
                                    }}
                                    placeholderStyle={{color: "grey",}}
                                    onOpen={() => {
                                        this.setState({regionCategoryOpen: false})
                                        this.setState({cityListOpen: false})
                                    }}
                                    zIndex={10}
                                    listMode="SCROLLVIEW"
                                />


                                <DropDownPicker
                                    open={this.state.regionCategoryOpen}
                                    value={this.state.regionCategoryValue}
                                    items={this.state.regionCategoryItems}
                                    setOpen={() => {
                                        this.setState((state) => ({regionCategoryOpen: !state.regionCategoryOpen}))
                                    }}
                                    maxHeight={200}
                                    setValue={(call) => this.setState((value) => ({regionCategoryValue: call(value)}))}
                                    placeholder="Область"
                                    style={{
                                        width: '100%',
                                        borderWidth: 0,
                                        height: 55,
                                        borderColor: '#E0E5ED',
                                        backgroundColor: '#F0F4F8',
                                        borderRadius: 0,
                                        borderTopRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        borderBottomWidth: 1,

                                    }}
                                    language="RU"
                                    placeholderStyle={{color: "grey",}}
                                    onOpen={() => {
                                        this.setState({carCategoryOpen: false})
                                        this.setState({cityListOpen: false})
                                    }}
                                    listMode="SCROLLVIEW"
                                    zIndex={9}
                                    onSelectItem={(item) => {
                                        this.getCities(item.id)
                                    }}

                                />

                                <DropDownPicker
                                    open={this.state.cityListOpen}
                                    value={this.state.cityListValue}
                                    items={this.state.cityListItems}
                                    setOpen={() => {
                                        this.setState((state) => ({cityListOpen: !state.cityListOpen}))
                                    }}
                                    language="RU"
                                    maxHeight={200}
                                    setValue={(call) => this.setState((value) => ({cityListValue: call(value)}))}
                                    placeholder="Город"
                                    style={{
                                        width: '100%',
                                        borderWidth: 0,
                                        height: 55,
                                        borderColor: '#E0E5ED',
                                        backgroundColor: '#F0F4F8',
                                        borderRadius: 0,
                                        borderBottomWidth: 1,
                                    }}
                                    placeholderStyle={{color: "grey",}}
                                    onOpen={() => {
                                        this.setState({carCategoryOpen: false})
                                        this.setState({regionCategoryOpen: false})
                                    }}
                                    listMode="SCROLLVIEW"
                                    zIndex={8}
                                />

                                <TextInput
                                    style={[feedsStyles.costCategory, {
                                        borderBottomRightRadius: 15,
                                        borderBottomLeftRadius: 15,
                                        marginBottom: 15,

                                    }]}
                                    underlineColorAndroid="transparent"
                                    placeholder="Улица"
                                    value={this.state.streetValue}
                                    onChangeText={(streetValue) => this.setState({streetValue})}

                                />


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

                                <TextInput
                                    style={[feedsStyles.costCategory, {
                                        borderBottomWidth: 1,
                                        borderColor: "#E0E5ED",
                                        borderTopRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                    }]}
                                    underlineColorAndroid="transparent"
                                    placeholder="Цена от"
                                    keyboardType={"numeric"}
                                    value={this.state.minCost}
                                    onChangeText={(minCost) => this.setState({minCost})}
                                />


                                <TextInput
                                    style={[feedsStyles.costCategory, {
                                        borderBottomRightRadius: 15,
                                        borderBottomLeftRadius: 15,
                                    }]}
                                    underlineColorAndroid="transparent"
                                    placeholder="Цена до"
                                    keyboardType={"numeric"}
                                    value={this.state.maxCost}
                                    onChangeText={(maxCost) => this.setState({maxCost})}
                                />

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
                            <TouchableOpacity onPress={this.filterItems}>
                                <LinearGradient colors={['#34BE7C', '#2EB6A5']}
                                                style={feedsStyles.filterSearchButton}>

                                    <Text style={{color: 'white'}}>
                                        Показать {this.state.filteredProductCount} объявлений
                                    </Text>

                                </LinearGradient>
                            </TouchableOpacity>

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
                            value={this.state.searchValue}
                            onChangeText={(text) => {
                                this.setState({searchValue: text})
                                this.searchItems(text)
                            }}
                        />


                        <TouchableOpacity onPress={() => {
                            this.setModalVisible(!this.state.filterModalVisible);
                        }}>
                            <Image style={feedsStyles.textInputImgFilterIcon}
                                   source={require('../../assets/img/filter.svg')}/>
                        </TouchableOpacity>


                    </View>

                </View>

                <SafeAreaView style={feedsStyles.safeArea}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.products}
                        renderItem={({item}) => {

                            return <View style={feedsStyles.feedsCaritems}>


                                <View style={feedsStyles.feedsCarImgWrapper} key={item.id}>
                                    <Image style={feedsStyles.feedsCaritemsImg}
                                           source={{uri: `http://bowy.ru/storage/uploads/${item.image[0]?.image}`}}/>
                                    {Number(item.user_id) !== Number(this.state.loggedUserID) && <TouchableOpacity style={feedsStyles.addinwish}
                                                                                                                   onPress={() => {
                                                                                                                       if (this.state.wishListId.includes(item.id)) {
                                                                                                                           this.setState(prev => ({wishListId: prev.wishListId.filter(items => item.id !== items)}))
                                                                                                                           this.removeFromFavourites(item.id)

                                                                                                                       } else {
                                                                                                                           this.addToFavourites(item.user_id, item.id)
                                                                                                                           this.setState((prev) => ({wishListId: [...prev.wishListId, item.id]}))
                                                                                                                       }
                                                                                                                   }}>
                                        <Image
                                            source={this.state.wishListId.includes(item.id) ? wishIcons[1] : wishIcons[0]}/>
                                    </TouchableOpacity>}
                                </View>

                                <View style={feedsStyles.feedsCarItemRight}>

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
                                        }}>
                                            {item.updated_at.split("").slice(0, 10).join("")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }}
                        // keyExtractor={(item) => {
                        //     item.id
                        // }}
                    />
                </SafeAreaView>
            </View>
        )
    }
}
