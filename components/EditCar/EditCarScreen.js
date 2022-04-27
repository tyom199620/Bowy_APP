import React, {Component} from 'react';
import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform,
    NativeModules,
    ScrollView,
    Linking,
    TextInput,
    FlatList,



} from 'react-native';

import {editCarStyles} from './EditCarStyles';

import * as ImagePicker from 'expo-image-picker';

import {LinearGradient} from "expo-linear-gradient";

import {Picker} from '@react-native-picker/picker';

import {ScrollPicker} from 'react-native-value-picker';

export default class EditCarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImages: [],
            selectedImagesUri: '',

            addedCarDetails: {
                headline: '',
                adDescription: '',
                address: '',
                price: '',
                carModel: '',
                headLine2: '',
                adDescription2: '',
                price2: '',
                address2: '',
            },
        }
    }





    handleBack = () => {
        this.props.navigation.navigate('Feeds');
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
        let {selectedImages} = this.state;
        selectedImages.push(pickerResult.uri);

        console.log(selectedImages);
        this.setState({
            selectedImages
        })
    };


    renderPicketPhoto = () => {
        let {selectedImages} = this.state;
        if (selectedImages.length) {
            return (

                <ScrollView style={{}} horizontal={true}>
                    {selectedImages.map(item => (
                        <View style={{width: 100, height: 100, marginRight: 20}}>
                            <TouchableOpacity style={editCarStyles.removeCarStyle} onPress={() => {
                                this.handleRemoveCar(item)
                            }}>
                                <Image
                                    style={{justifyContent: 'center'}}
                                    source={require('../../assets/img/trashicon.png')}/>
                            </TouchableOpacity>
                            <Image source={{uri: item}} style={{
                                width: 100,
                                height: 100,
                                borderWidth: 3,
                                borderRadius: 10,
                            }}
                            />
                        </View>
                    ))}

                </ScrollView>
            );
        }
    };
    handleRemoveCar = (uri) => {
        let {selectedImages} = this.state;
        selectedImages = selectedImages.filter(el => el !== uri);

        this.setState({
            selectedImages

        })
    };

    render() {
        {console.log(this.props.auto_data)}




        return (
            <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
                <View style={editCarStyles.container}>
                    <ScrollView>
                        <View>
                            <View style={editCarStyles.titleStyles}>
                                <Text style={{fontSize: 18}}>
                                    Редактирование объявления
                                </Text>
                                <Text style={{color: "#9AA1B4"}} onPress={this.handleBack}>
                                    X
                                </Text>
                            </View>



                            <Picker
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedLanguage(itemValue)
                                }>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>


                            {/*Создание объявления*/}
                            <View style={editCarStyles.characteristicsView}>
                                <TextInput
                                    style={editCarStyles.inputStyles}
                                    placeholder='Загаловок объявления'
                                    value={this.props.auto_data.title}
                                    onChangeText={(headline) => this.setState({headline})}

                                />
                                <TextInput
                                    style={editCarStyles.inputStyles}
                                    placeholder='Описание объявления'
                                    value={this.props.auto_data.body_type}
                                    onChangeText={(adDescription) => this.setState({adDescription})}
                                />
                                <TextInput
                                    style={editCarStyles.inputStyles}
                                    placeholder='Стоимость'
                                    value={this.props.auto_data.price}
                                    onChangeText={(price) => this.setState({price})}
                                />
                                <TextInput
                                    style={editCarStyles.inputStyles}
                                    placeholder='Адрес'
                                    value={this.props.auto_data.address}
                                    onChangeText={(address) => this.setState({address})}
                                />
                                <TextInput
                                    style={editCarStyles.inputStyles}
                                    placeholder='Марка автомобиля'
                                    value={this.props.auto_data.autoMark}
                                    onChangeText={(carModel) => this.setState({carModel})}
                                />
                                <TextInput
                                    style={{width: '100%', height: 60,}}
                                    placeholder='Описание объявления'
                                    value={this.props.auto_data.title}
                                />


                            </View>
                            <View style={{marginTop: 30}}>
                                <Text>
                                    Характеристики
                                </Text>
                                <View style={editCarStyles.characteristicsView}>
                                    <TextInput
                                        style={editCarStyles.inputStyles}
                                        placeholder='Описание объявления'
                                        value={this.props.auto_data.title}
                                        onChangeText={(headLine2) => this.setState({headLine2})}
                                    />
                                    <TextInput
                                        style={editCarStyles.inputStyles}
                                        placeholder='Описание объявления'
                                        value={this.props.auto_data.description}
                                        onChangeText={(adDescription2) => this.setState({adDescription2})}
                                    />
                                    <TextInput
                                        style={editCarStyles.inputStyles}
                                        placeholder='Стоимость'
                                        value={this.props.auto_data.price}
                                        onChangeText={(price2) => this.setState({price2})}
                                    />
                                    <TextInput style={{width: '100%', height: 60,}}
                                               placeholder='Адрес'
                                               value={this.props.auto_data.address}
                                               onChangeText={(address2) => this.setState({address2})}
                                    />

                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row',}}>
                                <TouchableOpacity style={editCarStyles.imagePicker} onPress={this.openImagePickerAsync}>
                                    <Text style={editCarStyles.imagePickerIcon}>

                                        +
                                    </Text>
                                </TouchableOpacity>

                                <View style={editCarStyles.pickedPhotoStyle}>
                                    {this.renderPicketPhoto()}

                                </View>
                            </View>
                            <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={editCarStyles.linearGradient}>
                                <TouchableOpacity>
                                    <Text style={{textAlign: 'center', color: 'white'}}>
                                        Сохранить
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }


}
