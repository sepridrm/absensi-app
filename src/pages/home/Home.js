import React, { useState, useEffect, useLayoutEffect } from 'react'
import { ScrollView, RefreshControl, Image, FlatList, TouchableOpacity } from 'react-native'
import { Text, VStack, HStack, Box, Fab, Icon, Heading, NativeBaseProvider } from 'native-base'
import { getColor, getSize } from '../../utils/helpers'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import ItemAbsen from '../../components/items/ItemAbsen'
import { Calendar } from 'react-native-calendars';

const Home = ({ form_data, props }) => {
  const USER = props.USER
  const [dt, setDt] = useState(new Date().toLocaleString());
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState(null);
  const [jamAbsen, setJamAbsen] = useState(null);
  const [listAbsen, setListAbsen] = useState([]);

  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  useEffect(() => {
    let timeDif = '24:00';
    USER.jam_kerja.forEach(element => {
      let temp = moment(dt).format("YYYY/MM/DD") + " " + element.mulai;

      if (moment(moment(temp).diff(moment(dt).format("YYYY/MM/DD HH:mm:ss"))).format("HH:mm") < timeDif) {
        setJamAbsen(element);
        timeDif = moment(moment(temp).diff(moment(dt).format("YYYY/MM/DD HH:mm:ss"))).format("HH:mm");
      }
    });

    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(secTimer);
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ padding: 7, marginRight: 7 }} onPress={() => props.navigation.navigate("Profile")}>
          <Ionicons size={30} name="ios-people-circle-outline" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  const onSelectDate = (date) => {
    setSelectedDate(date);

    let temp = [];
    form_data.absen.forEach(element => {
      // .subtract(7, 'hours')
      if (moment(element.created_at).format('YYYY-MM-DD') === date) {
        temp.push(ItemAbsen(element, props.navigation));
      }
    });

    setListAbsen(temp);
  }

  return (
    <NativeBaseProvider config={config}>
      <ScrollView backgroundColor='white' refreshControl={<RefreshControl refreshing={form_data.refresh} onRefresh={() => form_data.onRefresh()} />}>
        <VStack px="4" flex={1} pb="16">
          <Heading size="lg" mt="4" textAlign="center">{moment(dt).format('DD MMM YYYY')}</Heading>
          <Heading size="xl" textAlign="center">{moment(dt).format('HH:mm:ss')}</Heading>

          <Box p="4" mt="4" bg={getColor.gradient2} borderRadius="xl">
            <HStack alignItems="center" space={4}>
              <Box bg={getColor.gradientFoto} style={{ borderRadius: 60, padding: 3 }}>
                <Image resizeMethod="resize" source={require('../../assets/images/logo_unsri.png')} style={{ height: 50, width: 50, borderRadius: 50, resizeMode: 'cover' }} />
              </Box>
              <VStack width={getSize.widthScreen / 1.6}>
                <Text fontWeight="bold" fontSize="lg">{USER.name}</Text>
                {jamAbsen ?
                  <>
                    <Text key="absen" fontWeight="bold" mt="2">Absen {jamAbsen.name} Anda pukul</Text>
                    <Heading key="jam_absen" size="lg">{jamAbsen.mulai.substring(0, 5)} sd {jamAbsen.sampai.substring(0, 5)}</Heading>
                  </>
                  :
                  null
                }
              </VStack>
            </HStack>
          </Box>

          <Heading mt="6" size="md">Riwayat absensi</Heading>

          <Calendar
            current={currentDate}
            minDate={'2022-01-01'}
            maxDate={moment().format('YYYY-MM-DD')}
            markingType={'period'}
            markedDates={form_data.dataCalendar}
            onDayPress={day => onSelectDate(day.dateString)}
            onMonthChange={month => {
              setCurrentDate(month.dateString)
            }}
          />

          {selectedDate ?
            <>
              <Heading key="absen_history" size="md" mt="8">Absen tanggal {moment(new Date(selectedDate)).format('DD MMM YYYY')}</Heading>
              {listAbsen.length > 0 ?
                listAbsen
                :
                <Text key="no_data">Tidak ada data</Text>
              }
            </>
            : null}

        </VStack>
      </ScrollView>

      {
        USER.absen === "mesin" ?
          null :
          <Fab
            ml={getSize.widthScreen / 2.5}
            placement="bottom-left"
            onPress={() => props.navigation.navigate('Absensi', { jamAbsen: jamAbsen, getAbsen: form_data.getAbsen })}
            position="absolute"
            icon={<Icon color="white" as={<Ionicons name="finger-print" />} size="sm" />}
          />
      }
    </NativeBaseProvider>
  )
}

export default Home