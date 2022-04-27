import { Dimensions, StatusBar, StyleSheet} from 'react-native'

const singleCarStyles = StyleSheet.create({

    whiteWrapper: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        position:'relative',
        backgroundColor:'white',
        padding:23,
        width:'100%',
        paddingBottom: 0,
    },
    autoTitle: {
        fontSize:24,
        color:'#424A55',
        fontWeight: 'bold',
        marginBottom:15
    },
    autoPrice: {
        fontSize:20,
        color:'#424A55',
        fontWeight: 'normal',
        marginBottom:20
    },
    autoAddress: {
        fontSize:14,
        color:'#8B94A3',
        fontWeight: 'normal',
        marginBottom:8
    },
    autoDate: {
        fontSize:14,
        color:'#8B94A3',
        fontWeight: 'normal',
        marginBottom:20
    },
    autoDescription: {
        fontSize:16,
        color:'#424A55',
        fontWeight: 'normal',
        marginBottom:41,
        lineHeight:25
    },
    infoLabelWrapper: {
        width:180,
        marginRight:41
    },
    infoLabel: {
        fontSize:16,
        color:'#8B94A3'
    },
    infoValue: {
        marginRight:41,
        fontSize:16,
        color:'#424A55'
    },
    infoWrapper: {
        width:'100%',
        height:'auto',
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        marginBottom:17
    },
    callButton:{
        width:165,
        height:50,
        borderRadius:8
    },
    callButtonToch:{
        alignSelf: 'stretch',
        flex: 1,
        alignItems:'center',
        justifyContent:"center",
        flexDirection: 'row',
    },
    writeUser:{
        width:165,
        height:50,
        borderRadius:8
    },
    writeUserToch:{
        alignSelf: 'stretch',
        flex: 1,
        alignItems:'center',
        justifyContent:"center",
        flexDirection: 'row',
    },
    actionButtonsWrapper: {
        width:"100%",
        height:60,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent:"space-between",
        marginTop:15
    },
    userWrapper: {
        width:"100%",
        height:60,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent:"flex-start",
        marginBottom:40
    },
    userImageWrapper:{
        width:50,
        height:50,
        marginRight:15
    },
    userImage:{
        width:'100%',
        height:'100%',
    },

    userName:{
        color:'#424A55',
        fontSize:16,
        marginBottom:10
    },
    postCount:{
        color:'#34BE7C',
        fontSize:12,
        fontWeight:'bold'
    }

});

export {singleCarStyles};