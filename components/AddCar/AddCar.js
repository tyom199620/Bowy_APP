import React, {Component} from 'react';
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, Modal} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {EvilIcons} from '@expo/vector-icons';


import {addCarStyle} from './AddCarStyles';
import * as ImagePicker from 'expo-image-picker';
import {LinearGradient} from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {feedsStyles} from "../Feeds/feedsStyles";


export default class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carCategoryOpen: false,
            carCategoryValue: null,
            carCategoryItems: [],

            regionCategoryOpen: false,
            regionCategoryValue: null,
            regionCategoryItems: [],

            cityListOpen: false,
            cityListValue: null,
            cityListItems: [],

            carAgeOpen: false,
            carAgeValue: null,
            carAgeItems: [],


            bodyTypeOpen: false,
            bodyTypeValue: null,
            bodyTypeItems: [
                {label: "Седан", value: "Седан"},
                {label: "Универсал", value: "Универсал"},
                {label: "Хэтчбэк", value: "Хэтчбэк"},
                {label: "Купе", value: "Купе"},
                {label: "Лимузин", value: "Лимузин"},
                {label: "Микроавтобус", value: "Микроавтобус"},
                {label: "Минивэн", value: "Минивэн"},
                {label: "Хардтоп", value: "Хардтоп"},
                {label: "Таун", value: "Таун"},
                {label: "Лифтбэк", value: "Лифтбэк"},
                {label: "Фастбэк", value: "Фастбэк"},
                {label: "Кабриолет", value: "Кабриолет"},
                {label: "Родстер", value: "Родстер"},
                {label: "Ландо", value: "Ландо"},
                {label: "Брогам", value: "Брогам"},
                {label: "Тарга", value: "Тарга"},
                {label: "Спайдер", value: "Спайдер"},
                {label: "Шутингбрейк", value: "Шутингбрейк"},
                {label: "Пикап", value: "Пикап"},
                {label: "Фургон", value: "Фургон"}
            ],

            gearBoxOpen: false,
            gearBoxValue: null,
            gearBoxItem: [
                {label: "Механическая коробка передач", value: "Механическая"},
                {label: "Автоматическая коробка передач", value: "Автоматическая"},
                {label: "Роботизированная коробка передач (робот, типтроник)", value: "робот, типтроник"},
                {label: "Другой", value: "Другой"},
            ],

            carModelOpen: false,
            carModelValue: null,
            carModelItems: [],

            rudderOpen: false,
            rudderValue: null,
            rudderItems: [
                {label: "левый", value: "левый"},
                {label: "правый", value: "правый"},
            ],


            selectedImages: [],
            imageError: null,


            title: "",
            price: "",
            address: "",
            description: "",

        }
    }


    handleBack = () => {
        this.props.navigation.navigate('Feeds')
    };


    renderPicketPhoto = () => {
        let {selectedImages} = this.state;
        if (selectedImages.length) {
            return (
                <ScrollView style={{}} horizontal={true}>
                    {
                        selectedImages.map((item) => (
                            <View style={{width: 100, height: 100, marginRight: 20}} key={item.key}>
                                <TouchableOpacity style={addCarStyle.removeCarStyle} onPress={() => {
                                    this.handleRemoveCar(item)
                                }}>
                                    <Image
                                        style={{justifyContent: 'center'}}
                                        source={require('../../assets/img/trashicon.png')}/>
                                </TouchableOpacity>
                                <Image source={{uri: item.uri}} style={{
                                    width: 100,
                                    height: 100,
                                    borderWidth: 3,
                                    borderRadius: 10,
                                }}
                                />
                            </View>
                        ))
                    }

                </ScrollView>
            );
        }
    };
    openImagePickerAsync = async () => {

        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }


        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }


        pickerResult.key = pickerResult.uri
        let res = pickerResult.uri.split('.');
        let type = res[res.length - 1];


        if (type !== 'jpg' && type !== 'png' && type !== 'jpeg') {
            Alert.alert("формат картинки должен быть JPEG, PNG или JPG")
            return
        }


        let {selectedImages} = this.state;
        selectedImages.push(pickerResult);
        this.setState({
            selectedImages
        })
    };
    handleRemoveCar = (uri) => {
        let {selectedImages} = this.state;
        selectedImages = selectedImages.filter(el => el !== uri);

        this.setState({
            selectedImages
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
            .catch(() => {
                // console.log("Hi")
            })
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
    getCarYears = () => {
        let arr = []
        let maxCarAge = new Date().getFullYear().toString()
        for (let i = maxCarAge; i >= 1950; i--) {
            let picker = {}
            picker.label = i
            picker.value = i
            arr.push(picker)
        }
        this.setState({carAgeItems: arr})
    }
    getCarModel = async () => {
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
                    let arr = []
                    response[0].map((item) => {
                        let picker = {}
                        picker.label = item.name
                        picker.value = item.name
                        picker.id = item.id
                        arr.push(picker)
                    })
                    this.setState({carModelItems: arr})
                })
                .catch((e) => {
                    // console.log(e)
                })
        } catch (e) {

        }
    }

    componentDidMount() {
        this.getCategories()
        this.getRegions()
        this.getCarYears()
        this.getCarModel()

    }


    addAnnouncement = async () => {
        let {selectedImages} = this.state
        try {
            if (!this.state.selectedImages.length) {
                this.setState({imageError: "добавить картинки обязательно"})
                return
            }
            const form = new FormData();
            form.append('image', {
                uri: selectedImages[0].uri,
                type: 'image/jpg',
                name: 'image.jpg',
            });
            form.append("headline", this.state.title)
            form.append("region", this.state.regionCategoryValue);
            form.append("city", this.state.cityListValue);
            form.append("price", this.state.price);
            form.append("address", this.state.address);
            form.append("car_model", this.state.carModelValue);
            form.append("description", this.state.description);
            form.append("body_type", this.state.bodyTypeValue);
            form.append("rudder", this.state.rudderValue);
            form.append("year_of_issue", this.state.carAgeValue);
            form.append("transmission", this.state.gearBoxValue);
            form.append("category_id", this.state.carCategoryValue);


            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken

            fetch("http://bowy.ru/api/products", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': AuthStr,
                },
                body: form


            })
                .then(response => response.json())
                .then((res) => {
                    if (res.success) {
                        this.setState({
                            selectedImages: [],
                            carCategoryValue: null,
                            regionCategoryValue: null,
                            cityListValue: null,
                            carAgeValue: null,
                            bodyTypeValue: null,
                            gearBoxValue: null,
                            carModelValue: null,
                            rudderValue: null,
                            imageError: null,
                            title: "",
                            price: "",
                            address: "",
                            description: "",

                        })
                        Alert.alert("Ваше объявление успешно добавлено")
                        setTimeout(()=>{
                            this.props.navigation.navigate("Feeds")
                        }, 2000)
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }

    }


    render() {
        return (

            <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>

                <View style={addCarStyle.container}>

                    <View style={addCarStyle.titleStyles}>
                        <Text style={{fontSize: 23, fontWeight: "bold"}}>Создание объявления</Text>
                        <TouchableOpacity onPress={this.handleBack}>
                            <EvilIcons name="close" size={23} color="black"/>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{width: "100%"}}>

                        <View style={addCarStyle.characteristicsView}>
                            <TextInput
                                style={addCarStyle.inputStyles}
                                placeholder='Заголовок объявления'
                                value={this.state.title}
                                onChangeText={(title) => this.setState({title})}
                            />

                            <TextInput
                                keyboardType={"numeric"}
                                style={addCarStyle.inputStyles}
                                placeholder='Стоимость'
                                value={this.state.price}
                                onChangeText={(price) => this.setState({price})}
                            />


                            <DropDownPicker
                                open={this.state.carCategoryOpen}
                                value={this.state.carCategoryValue}
                                items={this.state.carCategoryItems}
                                setOpen={() => {
                                    this.setState((state) => ({carCategoryOpen: !state.carCategoryOpen}))
                                }}
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({carCategoryValue: call(value)}))}
                                placeholder="Выберите категорию"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    paddingLeft: 13,
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{color: "grey",}}
                                onOpen={() => {
                                    this.setState({regionCategoryOpen: false})
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
                                placeholder="Выберите область"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    paddingLeft: 13,
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{color: "grey",}}
                                onOpen={() => {
                                    this.setState({carCategoryOpen: false})
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
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({cityListValue: call(value)}))}
                                placeholder="Выберите город"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    paddingLeft: 13,
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{color: "grey",}}
                                onOpen={() => {
                                    this.setState({carCategoryOpen: false})
                                }}
                                listMode="SCROLLVIEW"
                                zIndex={8}
                            />


                            <TextInput
                                style={addCarStyle.inputStyles}
                                placeholder='Адрес'
                                value={this.state.address}
                                onChangeText={(address) => this.setState({address})}
                            />

                            <DropDownPicker
                                open={this.state.carModelOpen}
                                value={this.state.carModelValue}
                                items={this.state.carModelItems}
                                setOpen={() => {
                                    this.setState((state) => ({carModelOpen: !state.carModelOpen}))
                                }}
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({carModelValue: call(value)}))}
                                placeholder="Марка автомобиля"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    paddingLeft: 13,
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{color: "grey",}}
                                onOpen={() => {
                                    this.setState({carCategoryOpen: false})
                                }}
                                listMode="SCROLLVIEW"
                                zIndex={7}
                            />


                            <TextInput
                                style={{width: '100%', height: 60, paddingLeft: 13}}
                                placeholder='Описание объявления'
                                value={this.state.description}
                                onChangeText={(description) => this.setState({description})}
                            />


                            <View style={addCarStyle.feature}>
                                <Text style={{textAlign: "left", width: "100%", fontSize: 17}}>
                                    Характеристики
                                </Text>
                            </View>

                            <DropDownPicker
                                open={this.state.rudderOpen}
                                value={this.state.rudderValue}
                                items={this.state.rudderItems}
                                setOpen={() => {
                                    this.setState((state) => ({rudderOpen: !state.rudderOpen}))
                                }}
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({rudderValue: call(value)}))}
                                placeholder="Руль"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    paddingLeft: 13,
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{color: "grey",}}
                                onOpen={() => {
                                    this.setState({regionCategoryOpen: false})
                                }}
                                zIndex={6}
                                listMode="SCROLLVIEW"
                            />


                            <DropDownPicker
                                open={this.state.gearBoxOpen}
                                value={this.state.gearBoxValue}
                                items={this.state.gearBoxItem}
                                setOpen={() => {
                                    this.setState((state) => ({gearBoxOpen: !state.gearBoxOpen}))
                                }}
                                maxHeight={220}
                                setValue={(call) => this.setState((value) => ({gearBoxValue: call(value)}))}
                                placeholder="Коробка передач"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    paddingLeft: 13,
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{color: "grey",}}
                                onOpen={() => {
                                    this.setState({regionCategoryOpen: false})
                                    this.setState({carCategoryOpen: false})
                                }}
                                zIndex={5}
                                listMode="SCROLLVIEW"
                            />


                            <DropDownPicker
                                open={this.state.carAgeOpen}
                                value={this.state.carAgeValue}
                                items={this.state.carAgeItems}
                                setOpen={() => {
                                    this.setState((state) => ({carAgeOpen: !state.carAgeOpen}))
                                }}
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({carAgeValue: call(value)}))}
                                placeholder="Год выпуска"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    paddingLeft: 13,
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{color: "grey",}}
                                onOpen={() => {
                                    this.setState({regionCategoryOpen: false})
                                    this.setState({carCategoryOpen: false})
                                }}
                                zIndex={4}
                                listMode="SCROLLVIEW"
                            />


                            <DropDownPicker
                                open={this.state.bodyTypeOpen}
                                value={this.state.bodyTypeValue}
                                items={this.state.bodyTypeItems}
                                setOpen={() => {
                                    this.setState((state) => ({bodyTypeOpen: !state.bodyTypeOpen}))
                                }}
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({bodyTypeValue: call(value)}))}
                                placeholder="Тип кузова"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    paddingLeft: 13,
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{color: "grey",}}
                                onOpen={() => {
                                    this.setState({regionCategoryOpen: false})
                                }}
                                zIndex={3}
                                listMode="SCROLLVIEW"
                            />


                            <View style={{flexDirection: "column", width: "100%", marginTop: 40, alignItems: "center"}}>
                                {this.state.imageError ? <Text style={{
                                    width: "70%",
                                    alignSelf: "flex-start",
                                    color: 'red',
                                    marginBottom: 3,
                                    fontSize: 13,
                                    paddingBottom: 10,
                                }}>
                                    {this.state.imageError}
                                </Text> : null}

                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>

                                    <TouchableOpacity style={addCarStyle.imagePicker}
                                                      onPress={this.openImagePickerAsync}>
                                        <Text style={addCarStyle.imagePickerIcon}>
                                            +
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={addCarStyle.pickedPhotoStyle}>
                                        {this.renderPicketPhoto()}
                                    </View>
                                </View>


                            </View>


                            <TouchableOpacity onPress={this.addAnnouncement}>
                                <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={addCarStyle.linearGradient}>

                                    <Text style={{textAlign: 'center', color: 'white'}}>
                                        Разместить Объявление
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>


                        </View>


                    </ScrollView>
                </View>
            </View>
        )
    }
}
