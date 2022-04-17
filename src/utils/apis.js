import React from 'react'
import API from './axios'
import { toast } from './helpers'
import Toast from 'react-native-toast-message'

export const apis = {
    post: function (url, data, showToast, setLoading) {
        return new Promise((resolve, reject) => {
            API.post(url, data)
                .then(res => {
                    resolve(res.data);
                    setLoading(false);

                    showToast ?
                        Toast.show({ type: toast.type, position: toast.position, text1: res.data.message })
                        : null
                }).catch(err => {
                    reject(err)
                    setLoading(false);

                    showToast ?
                        Toast.show({ type: toast.type, position: toast.position, text1: err.message })
                        : null
                })
        })
    },
    get: function (url, id, showToast, setLoading) {
        return new Promise((resolve, reject) => {
            let newUrl = url;
            if (id)
                newUrl = url + id

            API.get(newUrl)
                .then(res => {
                    resolve(res.data);
                    setLoading(false);

                    showToast ?
                        Toast.show({ type: toast.type, position: toast.position, text1: res.data.message })
                        : null
                }).catch(err => {
                    reject(err);
                    setLoading(false);

                    showToast ?
                        Toast.show({ type: toast.type, position: toast.position, text1: err.message })
                        : null
                })
        })
    }
}