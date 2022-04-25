import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, Box, HStack, VStack, Avatar, Heading } from 'native-base'
import Moment from 'moment'
import { getRandomChar } from '../../utils/helpers'
import { baseURL } from '../../utils/config';

function ItemAbsen(item, navigation) {
    const timeAbsen = Moment(item.created_at).format('HH:mm') === "00:00" ? false : true
    return (
        <TouchableOpacity key={getRandomChar()} onPress={() => null}>
            <Box backgroundColor={!timeAbsen ? "red.200" : "white"} borderWidth="1" borderColor="red.300" borderRadius="md" p="3" mt="4">
                <HStack space="3">
                    {item.alat === 'android' ?
                        <Avatar size="lg" bg="wite.500" source={{ uri: baseURL + item.foto }} />
                        : null
                    }
                    <VStack width="73%">
                        <HStack alignItems="center" space={2}>
                            <MaterialCommunityIcons name={item.keterangan === 'masuk' ? 'door-open' : 'door-closed'} size={20} />
                            <Heading fontSize="lg">{item.keterangan}</Heading>
                        </HStack>
                        {!timeAbsen ?
                            null :
                            <HStack alignItems="center" space={2}>
                                <Ionicons name={item.alat === 'mesin' ? 'finger-print' : 'phone-portrait-outline'} size={18} />
                                <Text>{item.alat}</Text>
                            </HStack>
                        }
                        {item.alat === 'android' ?
                            <HStack alignItems="center" space={2}>
                                <Ionicons name="pin" size={18} />
                                <Text>{item.address}<Text fontWeight="bold">{item.address_status ? "("+item.address_status+")" : ''}</Text></Text>
                            </HStack>
                            : null
                        }
                        {!timeAbsen ?
                            <Text>Belum absen</Text>
                            :
                            <HStack alignItems="center" space={2}>
                                <Ionicons name="calendar-outline" size={18} />
                                <Text>{Moment(item.created_at).format('DD MMM YYYY HH:mm')}</Text>
                            </HStack>
                        }
                    </VStack>
                </HStack>
            </Box>
        </TouchableOpacity>
    )
}
export default ItemAbsen