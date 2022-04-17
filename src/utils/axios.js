import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart';
import { Alert } from 'react-native'
import { getUrl } from './helpers'

let API

API = axios.create({
    baseURL: getUrl.baseURL
})

API.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

API.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            return Alert.alert(t('confirmation'), t('session'),
                [
                    {
                        text: t('ok'), onPress: () => AsyncStorage.clear().then(() =>
                            RNRestart.Restart()
                        )
                    }
                ]);
        }
        return Promise.reject(error);
    })

export default API