import React, { Component } from 'react';
import {
    View,
    Platform,
    TextInput, StyleSheet, StatusBar, Dimensions, ScrollView, Image, Text, TouchableOpacity, createStackNavigator,
    Modal, TouchableHighlight, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatStyles } from './ChatStyles';
import {feedsStyles} from "../Feeds/feedsStyles";

const articleData = [
    {id:1, userImage: require('../../assets/img/face1.jpg'), name:'Дмитрий',   last_message: 'Завтра в 10:00 подъеду', title: 'Аренда авто,под залог1', price: '1 290 ₽'},
    {id:2, userImage: require('../../assets/img/face2.png'), name:'Александр',   last_message: 'Давайте завтра', title: 'Аренда авто,под залог2', price: '1 150 ₽'},
    {id:3, userImage: require('../../assets/img/face3.jpg'), name:'Антон',    last_message: 'Подъезжаю', title: 'Аренда авто,под залог3', price: '1 250 ₽'}
];

const wishIcons = [
    require('../../assets/img/addinwishactive.png')
];


export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    openSingleMessage = (data ) => {
        this.props.navigation.navigate('SingleCar', {
            params: data,
        })
    };


    singleMessage= ()=> {
        this.props.navigation.navigate('SingleMessage')
    };

    render() {
        return(
            <View style={ChatStyles.wishhListScreenMainView}>

                {/*<View style={ChatStyles.wishTitleWrapper}>*/}

                {/*    <Text style={ChatStyles.wishTitle}>*/}
                {/*        Избранное*/}
                {/*    </Text>*/}

                {/*    <TouchableOpacity style={{width:30,height:30, justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>*/}
                {/*        <Image style={{width:4, height:18}} source={ require('../../assets/img/dots.png')}/>*/}
                {/*    </TouchableOpacity>*/}

                {/*</View>*/}


                <View style={ChatStyles.textInputWrapperStyle}>

                    <View style={ChatStyles.textInputContainerStyle}>

                        <TouchableOpacity>
                            <Image style={ChatStyles.textInputImg} source={require('../../assets/img/search_input_icon.png')}/>
                        </TouchableOpacity>

                        <TextInput
                            style={ChatStyles.textInputStyle}
                            underlineColorAndroid="transparent"
                            placeholder="Поиск по сообщениям"
                        />

                    </View>


                    <TouchableOpacity style={{width:15,height:35, justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>
                        <Image style={{width:4, height:20}} source={ require('../../assets/img/dots.png')}/>
                    </TouchableOpacity>

                </View>

                <ScrollView style={ChatStyles.scrollView} >

                    {articleData.map((article, index) => (
                        <TouchableOpacity key={article.id} style={ChatStyles.wishhListCaritems}>

                            <View style={ChatStyles.wishhListCarImgWrapper}>
                                <Image style={ChatStyles.wishhListCaritemsImg} source={article.userImage}/>
                            </View>

                            <View style={ChatStyles.wishhListCarItemRight} >
                                {/*onPress={() => this.openSingleCar(article)}*/}
                                <TouchableOpacity   onPress={this.singleMessage} >
                                    <Text style={{fontSize:14, fontWeight:'bold', color:'#424A55', marginBottom: 13}}>{article.name}</Text>

                                    <View style={{  flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 13}}>
                                        <Text style={{fontSize:12, fontWeight:'normal', color:'#818B9B', }}>{article.title}</Text>
                                       <View style={ChatStyles.searchLine}></View>
                                        <Text style={{fontSize:12, fontWeight:'normal', color:'#818B9B'}}>{article.price}</Text>
                                    </View>

                                    <Text style={{fontSize:12, fontWeight:'400', color:'#424A55', marginBottom: 5}}>{article.last_message}</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}

                </ScrollView>

            </View>
        )
    }
}



