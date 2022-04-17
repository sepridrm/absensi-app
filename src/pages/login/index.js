import React, { useState } from 'react'
import Login from './Login'
import { setAuthUser, toast } from '../../utils/helpers';
import { apis } from '../../utils/apis';
import Toast from 'react-native-toast-message'
import { connect } from 'react-redux';

const index = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const validation = () => {
        let warning;
        (!email || !password) ? warning = "Silahkan lengkapi data." : warning = false

        return warning;
    }

    async function onLogin() {
        if (validation()) {
            return Toast.show({ type: toast.type, position: toast.position, text1: validation() })
        }

        setLoading(true)
        const data = {
            email, password
        }

        const res = await apis.post('login', data, true, setLoading)
        if (res.success === 1) {
            setAuthUser(res.data);
            props.SET_USER(res.data);
            props.navigation.replace('Home');
        }
    }

    const form_data = {
        email, setEmail,
        password, setPassword,
        loading, setLoading,
        onLogin
    }

    return (
        <Login
            props={props}
            form_data={form_data}
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
