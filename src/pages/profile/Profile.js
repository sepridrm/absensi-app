import React from 'react'
import { Text, VStack, Button, Heading } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Profile = ({ props, onLogout }) => {
    const USER = props.USER

    return (
        <VStack style={{ flex: 1, padding: 25, backgroundColor: 'white' }}>
            <Heading fontSize="2xl"><Ionicons size={27} name="ios-people-circle-outline" />{USER.name}</Heading>
            <Text fontSize="xl">{USER.name_jabatan}</Text>
            <Text fontSize="lg">{USER.name_mesin ? USER.name_mesin : ''}</Text>
            <Text fontSize="md"><Ionicons size={18} name="mail-outline" /> {USER.email}</Text>
            <Button
                p="3"
                borderRadius={25}
                bg="red.600"
                mt="12"
                onPress={() => onLogout()}>
                Logout
            </Button>
        </VStack>
    )
}

export default Profile
