import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Text, VStack, Button, Avatar, Heading, Box } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapView, { Marker } from 'react-native-maps'
import { getColor, getSize } from '../../utils/helpers'
import moment from 'moment'

const Absensi = ({ props, form_data }) => {
    const USER = props.USER
    const jamAbsen = props.route.params.jamAbsen
    const [dt, setDt] = useState(new Date().toLocaleString());

    let time_now = moment(dt).format("HH:mm:ss");
    let canAbsen = false;
    if (jamAbsen.mulai < time_now && jamAbsen.sampai > time_now)
        canAbsen = true;

    useEffect(() => {
        let secTimer = setInterval(() => {
            setDt(new Date().toLocaleString())
        }, 1000)

        return () => clearInterval(secTimer);
    }, []);

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                <Heading size="lg" mt="6">{moment(dt).format('DD MMM YYYY')}</Heading>
                <Heading size="xl">{time_now}</Heading>

                <View style={{ width: '100%', paddingHorizontal: 25, marginTop: 30, marginBottom: 30 }}>
                    <Box width="100%" p="3" bg={getColor.gradient2} borderRadius="xl" alignItems="center">
                        <TouchableOpacity onPress={() => form_data.openCamera()}>
                            <Avatar
                                size="xl"
                                source={form_data.foto ? { uri: form_data.foto.uri } : null}>
                                <Text color="white">Tap me</Text>
                            </Avatar>
                        </TouchableOpacity>
                        <Heading size="md" mt="2">{USER.name}</Heading>
                        <Heading size="sm">{USER.name_jabatan}</Heading>
                    </Box>
                </View>

                <MapView
                    style={{ width: '100%', height: getSize.widthScreen / 1.5, borderRadius: 13 }}
                    provider={null}
                    region={{
                        latitude: form_data.latlng.lat,
                        longitude: form_data.latlng.lng,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003,
                    }}
                    pitchEnabled={false}
                    scrollEnabled={false}
                    rotateEnabled={false}
                    zoomEnabled={false}
                >
                    <Marker coordinate={{ latitude: form_data.latlng.lat, longitude: form_data.latlng.lng }}>
                        <VStack alignItems="center">
                            <Text fontWeight="bold" mb="1">{form_data.address}</Text>
                            <Ionicons name='pin' size={35} color="red" />
                        </VStack>
                    </Marker>
                </MapView>

                <View style={{ width: '100%', paddingHorizontal: 25, marginTop: 50 }}>
                    <Button isDisabled={canAbsen ? false : true} width="100%" isLoading={form_data.loading} _spinner={{ color: "white" }} size="lg" onPress={() => form_data.onAbsen()}>
                        <Text color="white" p="1" fontWeight="semibold">{canAbsen ? form_data.dist : jamAbsen.mulai.substring(0, 5) + ' sd ' + jamAbsen.sampai.substring(0, 5)}</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}

export default Absensi
