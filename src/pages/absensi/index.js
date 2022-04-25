import React, { useEffect, useState } from 'react'
import Absensi from './Absensi'
import { connect } from "react-redux";
import GetLocation from 'react-native-get-location'
import Loading from '../../components/Loading';
import Toast from 'react-native-toast-message'
import { toast, resizeImage, getRandomChar } from '../../utils/helpers';
import { launchCamera } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { apis } from '../../utils/apis';
import API from '../../utils/axios';
import { getDistance } from 'geolib';

const index = (props) => {
    const [latlng, setLatlng] = useState(null);
    const [address, setAddress] = useState(null);
    const [dist, setDist] = useState('Absen Sekarang');
    const [foto, setFoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const USER = props.USER
    const jamAbsen = props.route.params.jamAbsen

    useEffect(() => {
        getLocation();
    }, [])

    const openCamera = async () => {
        const result = await launchCamera();
        if (!result.didCancel) {
            // console.log(result);
            const newSize = resizeImage(result.assets[0].width, result.assets[0].height);

            ImageResizer.createResizedImage(result.assets[0].uri, newSize[0], newSize[1], 'JPEG', 80)
                .then(response => {
                    const image = {
                        name: getRandomChar() + ".jpg",
                        uri: response.uri,
                        type: 'image/jpg',
                    }
                    setFoto(image);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    const getLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                setLatlng({ lat: location.latitude, lng: location.longitude });
                getAddress(location);
                getDistancetoOffice(location);
            })
            .catch(error => {
                const { code, message } = error;
                console.log(code, message);
                Toast.show({ type: toast.type, position: toast.position, text1: 'Silahkan hidupkan GPS Anda' })
            })
    }

    const getAddress = (location) => {
        API.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + location.longitude + "," + location.latitude + ".json?language=id&access_token=pk.eyJ1Ijoic2Vwcmlkcm0iLCJhIjoiY2wxZHE2ajRpMDJtNjNqbm4xM3E0YmJkZSJ9.T6sjEEijYuBDu6WYun97iQ")
            .then(res => {
                // console.log(res.data.features[0].place_name_id.split(","));
                if (res.data.features[0].place_name_id.split(",")[0])
                    setAddress(res.data.features[0].place_name_id.split(",")[0] + "," + res.data.features[0].place_name_id.split(",")[1])
                else
                    setAddress('Alamat terdekat tidak ditemukan')
            }).catch(err => {
                console.log(err);
                setAddress('Alamat terdekat tidak ditemukan')
            })
    }

    const getDistancetoOffice = (location) => {
        let dist = getDistance(
            { latitude: location.latitude, longitude: location.longitude },
            { latitude: USER.lat, longitude: USER.lng }
        );

        dist = Number(dist/1000).toFixed(2);
        setDist("Absen "+dist+"Km diluar Kantor");
    }

    const validation = () => {
        let warning;
        (!foto) ? warning = "Silahkan ambil foto" : warning = false

        return warning;
    }

    async function onAbsen() {
        if (validation()) {
            return Toast.show({ type: toast.type, position: toast.position, text1: validation() })
        }

        setLoading(true)

        let formData = new FormData();
        formData.append('id', USER.id);
        formData.append('keterangan', jamAbsen.keterangan);
        formData.append('lat', latlng.lat.toString());
        formData.append('lng', latlng.lng.toString());
        formData.append('address', address);
        formData.append('address_status', dist < 1 ? "Didalam Area" : "Diluar Area");
        formData.append('alat', 'android');
        formData.append('foto', foto);

        const res = await apis.post('absen', formData, true, setLoading)
        if (res.success === 1) {
            props.route.params.onRefresh();
            setTimeout(() => {
                props.navigation.goBack();
            }, 2000);
        }
    }

    const form_data = {
        latlng,
        foto, setFoto,
        loading, setLoading,
        openCamera,
        onAbsen,
        address,
        dist
    }

    if (address == null) return <Loading />

    return (
        <Absensi
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
