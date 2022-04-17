import React from 'react'
import { Alert } from 'react-native'
import Profile from './Profile'
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage'

const index = (props) => {

    const alertLogout = () => {
        Alert.alert('Keluar', 'Apakah anda yakin keluar akun ?', [
            { text: 'Iya', onPress: () => onLogout() },
            { text: 'Tidak' },
        ])
    }

    const onLogout = () => {
        AsyncStorage.clear().then(() => {
            props.navigation.goBack();
            props.navigation.replace('Login');
        })
    }

    return (
        <Profile
            props={props}
            onLogout={alertLogout}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(index)
