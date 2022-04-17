import React, { useState, useEffect } from 'react'
import Home from './Home'
import { apis } from '../../utils/apis';
import { connect } from 'react-redux';
import moment from 'moment';
import Loading from '../../components/Loading';
import { setAuthUser } from '../../utils/helpers';

const index = (props) => {
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [absen, setAbsen] = useState(null)
    const [dataCalendar, setDataCalendar] = useState(null)
    const USER = props.USER

    useEffect(() => {
        getAbsen();
        getJamKerja();
    }, [])

    const onRefresh = () => {
        setRefresh(false);
        setDataCalendar(null);
        setAbsen(null);

        getAbsen();
        getJamKerja();
    }

    const getAbsen = async () => {
        const res = await apis.get('getabsen/', USER.id, false, setLoading)
        if (res.success === 1) {
            setAbsen(res.data);

            let obj = {};
            res.data.forEach((element, index) => {
                if (index === 0)
                    obj[moment(element.created_at).format('YYYY-MM-DD')] = { startingDay: true, color: '#50cebb', textColor: 'white' }
                else if (index === res.data.length - 1)
                    obj[moment(element.created_at).format('YYYY-MM-DD')] = { endingDay: true, color: '#50cebb', textColor: 'white' }
                else{
                    if(!obj[moment(element.created_at).format('YYYY-MM-DD')])
                        obj[moment(element.created_at).format('YYYY-MM-DD')] = { color: '#70d7c7', textColor: 'white' }
                }
            });

            setDataCalendar(obj);
        }
    }

    const getJamKerja = async () => {
        const res = await apis.get('getjamkerja/', USER.id, false, setLoading)
        if (res.success === 1) {
            setAuthUser(res.data);
            props.SET_USER(res.data);
        }
    }

    const form_data = {
        absen,
        loading, setLoading,
        dataCalendar,
        refresh, onRefresh,
        getAbsen
    }

    if (dataCalendar == null) return <Loading/>

    return (
        <Home
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
