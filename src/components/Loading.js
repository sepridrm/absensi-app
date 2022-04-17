import { Spinner } from 'native-base'
import React from 'react'
import { View } from 'react-native'


const Loading = () => {
    return (
        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <Spinner color="warning.500" />
        </View>
    )
}

export default Loading