import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dimensions, Platform, StatusBar } from 'react-native';
import { baseURL } from './config';

export const getUrl = {
    baseURL: baseURL + 'api/',
}

export const getRandomChar = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getAuthUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? JSON.parse(jsonValue) : { isLogin: false }
    } catch (e) {
        return { isLogin: false, language: 'id' }
    }
}

export const setAuthUser = async (data) => {
    data = {
        ...data,
        isLogin: true,
    }
    await AsyncStorage.setItem('user', JSON.stringify(data));
    return true
}

export const getColor = {
    background: '#FAFAFA',
    // devider: '#F0EFF4',
    devider: '#F5F5F5',
    gradient1: {
        linearGradient: {
            colors: ["red.500", "orange.500"],
            start: [0, 0],
            end: [1, 0]
        }
    },
    gradient2: {
        linearGradient: {
            colors: ["red.300", "orange.300"],
            start: [0, 0],
            end: [1, 0]
        }
    }
}

export const getSize = {
    widthScreen: Dimensions.get('window').width,
    heightScreen: Dimensions.get('window').height
}

export const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const statusbarHeight = Platform.select({
    ios: 35,
    android: StatusBar.currentHeight
})

export const toast = {
    type: 'info',
    position: 'top'
}

export const behavior = Platform.select({
    ios: 'padding',
    android: null
})

export const resizeImage = (width, height) => {
    if (height <= 720 && width <= 720)
        return [width, height]

    let newWidth = width / 1000
    let newHeight = height / 1000

    let devider = 0.5
    if (newWidth > newHeight) {
        devider = devider + newWidth
    } else {
        devider = devider + newHeight
    }

    newWidth < 1 ? newWidth = Math.ceil(width - 280) : newWidth = Math.ceil(width / devider)
    newHeight < 1 ? newHeight = Math.ceil(height - 280) : newHeight = Math.ceil(height / devider)

    return [newWidth, newHeight]
}

export const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });

    return map;
}