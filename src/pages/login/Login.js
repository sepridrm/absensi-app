import React, { useState } from 'react'
import { View, ScrollView, Image, Platform } from 'react-native'
import { Button, Input, Stack, Text, Icon } from 'native-base';
import { getSize } from '../../utils/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Login = ({ props, form_data }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "white" }}>
            <View style={{ flex: 1, paddingHorizontal: 25, alignContent: 'center', alignItems: 'center', paddingVertical: getSize.widthScreen / 2 }}>
                <Image
                    resizeMethod='resize'
                    style={{ width: getSize.widthScreen / 2.5, height: getSize.widthScreen / 2.5, resizeMode: 'stretch' }}
                    source={require('../../assets/images/logo_unsri.png')}
                />
                <Stack space={4} w="100%" mt="16">
                    <Input
                        p={Platform.OS === 'ios' ? "4" : "2"}
                        InputLeftElement={
                            <Icon as={<Ionicons name="mail-outline" />} size="sm" marginLeft={4} color="gray" />
                        }
                        value={form_data.email}
                        onChangeText={(text) => form_data.setEmail(text)}
                        variant="rounded"
                        autoCapitalize="none"
                        placeholder="Email Pegawai"
                        keyboardType="email-address"
                    />
                    <Input
                        p={Platform.OS === 'ios' ? "4" : "2"}
                        InputLeftElement={
                            <Icon as={<Ionicons name="ios-lock-closed-outline" />} size="sm" marginLeft={4} color="gray" />
                        }
                        InputRightElement={
                            <Button roundedRight={25} roundedLeft={3} onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? <Ionicons size={26} color="white" name="ios-eye-off-outline" /> : <Ionicons size={26} color="white" name="ios-eye-outline" />}
                            </Button>
                        }
                        type={showPassword ? "text" : "password"}
                        value={form_data.password}
                        onChangeText={(text) => form_data.setPassword(text)}
                        variant="rounded"
                        placeholder="Password"
                    />
                </Stack>

                <Button
                    p="3"
                    mt="10"
                    w="100%"
                    borderRadius={25}
                    onPress={() => form_data.onLogin()}
                    isLoading={form_data.loading}
                    isLoadingText="Loading">
                        Login
                </Button>

                {/* <View style={{ flexGrow: 1, flexDirection: 'column-reverse', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Belum punya akun ? </Text>
                        <Text type="bold" style={{ color: 'green', padding: 5 }} onPress={() => props.navigation.navigate('Register')}>Register </Text>
                    </View>
                </View> */}

            </View>
        </ScrollView>
    )
}

export default Login
