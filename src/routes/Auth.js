import React, { useEffect } from 'react';
import { View, StatusBar, Image } from 'react-native';
import { getAuthUser, getSize, statusbarHeight } from '../utils/helpers';
import { connect } from "react-redux";

const Auth = ({ navigation, SET_USER }) => {

    useEffect(() => {
        getAuthUser().then((data) => {
            console.log(data);
            if (data.isLogin) {
                SET_USER(data);
                navigation.replace('Home');
            } else
                navigation.replace('Login');
        })
    }, [])

    const imageSize = getSize.widthScreen < getSize.heightScreen ? getSize.widthScreen / 2 : getSize.heightScreen / 2

    return (
        <>
            <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content' />
            <View style={{ flex: 1, backgroundColor: 'white', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Image resizeMethod='resize' source={require('../assets/images/logo_unsri.png')} style={{ width: imageSize, height: imageSize, resizeMode: 'stretch' }} />
            </View>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        USER: state.userReducer.userState,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SET_USER: (value) => dispatch({ type: 'SET_USER', value: value }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)