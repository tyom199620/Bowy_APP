import { Dimensions, StatusBar, StyleSheet} from 'react-native'

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        paddingLeft:22,
        paddingRight:22,
    },
    text: {
        fontSize: 42,
    },
    profileScreenMainView:{
        flex: 1,
        // width: Dimensions.get('window').width,
        paddingTop: StatusBar.currentHeight+23,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white'

    },
    profileCaritems: {
        height: 125,
        alignSelf: 'stretch',
        width:Dimensions.get('window').width,
        marginBottom:20,
        flex: 1,
        flexDirection: 'row',
        borderRadius:13,
        overflow:'hidden'
    },
    profileCarImgWrapper: {
    },
    profileCaritemsImg: {

    },
    profileCarItemRight: {
        padding:15
    },
    addinwish: {
        position:'absolute',
        width: 28,
        height: 28,
        right:10,
        bottom:10,
        zIndex: 1,
    },
    textInputStyle: {
        height:40,
        flex:1,
        color:'#424A55'
    },
    textInputWrapperStyle: {
        width: Dimensions.get('window').width,
        paddingLeft:20,
        paddingRight:20,
        marginBottom:30,
    },
    textInputContainerStyle: {
        backgroundColor: '#F0F4F8',
        borderRadius: 16,
        overflow: 'hidden',
        paddingLeft:12,
        paddingRight:17,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInputImg: {
        width:20,
        height:20,
        marginRight: 16
    },
    textInputImgFilterIcon: {
        width:20,
        height:17,
        marginLeft: 17
    },
    searchLine: {
        width:2,
        height:24,
        backgroundColor: '#DAE1EC',
        marginLeft: 17
    },
    modalContainer: {
        marginTop: 22,
        marginRight: 22,
        marginLeft: 22,
    },
    modalContainer2: {
        width:"100%",
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:38
    },
    modalContainerTitle: {
        fontSize: 18,
        color: '#424A55',
        fontWeight: 'bold'
    },
    closeModal: {
        width:24,
        height:24
    },

    filterSearchButton: {
        width:'100%',
        height:50,
        backgroundColor: 'green',
        color:'white',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:8
    },
    sortByWrapper: {
        width:'100%',
        height: 169,
        marginTop:20,
        backgroundColor:'#F0F4F8',
        borderRadius:10,
        padding: 15
    },
    filterFieldsWrapper: {
        marginBottom:59
    },
    minMaxPriceWrapper: {
        width:'100%',
        height: 96,
        marginTop:20,
        backgroundColor:'#F0F4F8',
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
    },
    minPriceWrapper:{
        height:48,
        borderBottomColor: "#a2abc25c",
        borderBottomWidth: 1
    },
    maxPriceWrapper: {
        height:48
    },
    rbWrapper: {
        marginBottom: 21,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    filterSortLabel: {
        marginRight: 36,
        fontSize: 14,
        color: '#8B94A3',
        fontWeight: 'normal'
    },
    rbStyle: {
        height: 10,
        width: 10,
        borderRadius: 110,
        borderWidth: 1,
        borderColor: '#8B94A3',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:12
    },
    selected: {
        width: 4,
        height: 4,
        borderRadius: 55,
        backgroundColor: '#2EB6A5',
    },
    result: {
        marginTop: 22,
        color: 'white',
        fontWeight: '600',
        backgroundColor: 'blue',
    },
    sortByTitile:{
        color: "#A7AEBA",
        fontSize: 11,
        marginBottom: 17
    },

    prifileTitleWrapper:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'100%',
        paddingLeft:23,
        paddingRight:20,
        marginBottom:30
    },
    wishTitle:{
        fontSize:24,
        color:'#424A55',
        fontWeight:'bold'
    },

    returnBack: {
        width:20,
        height: 16
    },
     profileNot: {
        width:20,
        height: 21
    },
    profileSetting : {
        width:19,
        height: 20
    },
    profilePhoto : {
        width:80,
        height: 80
    },
    profilePhotoWrapper:{
        marginRight:25
    },
    userName:{
        width: '90%',
        fontSize:18,
        color:'#424A55',
        marginBottom:8
    },
    profileCall : {
        width:15,
        height: 15,
        marginRight:17
    },
    profileMail : {
        width:16,
        height: 15,
        marginRight:17
    },
    profileLocation : {
        width:15,
        height: 18,
        marginRight:17
    },

    profile:{

    },

    profileInfoWrapper: {
        width:"100%",
        height:144,
        paddingLeft:22,
        paddingRight:22,
        marginBottom:40
    },

    profileInfo: {
        width:"100%",
        height:160,
        backgroundColor:'#F0F4F8',
        padding:22,
        borderRadius:10,
    },

    userInfoItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:27,

    },

    profileUserInfo: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom:30,
        width:'100%',
        paddingLeft:22,
        paddingRight:22,
    },
    profileUserInfoTwoWrapper:{

    },
    profileUserInfoTwo:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    profileNumberLabel:{
        color:'#818B9B',
        fontSize:14,
        marginRight:15
    },
    profileNumber:{
        fontSize:14,
        color:"#424A55"
    },
    tabsWrapper:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width:'100%',
        paddingLeft:22,
        paddingRight:22,
        marginBottom:28
    },
    tabWrapper:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width:'50%',
        flexWrap:'wrap',
        height:40,
    },
    tabLabel:{
        color:"#818B9B",
        marginBottom:10,
        width:'100%',
        textAlign:"center",
    },
    tabLine:{
        width:40,
        height:3,
        backgroundColor:"#2EB6A5",
        marginTop:10
    },
    carsInfo: {
        fontSize: 14,
        fontWeight: '700',
        color: '#424A55',
        marginBottom: 10,
    },
    refactorInput:{
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        fontSize: 15,
        width: '100%',
        maxWidth: 200,
        marginBottom: 5,
        padding: 3
    }

});

export {ProfileStyles};
