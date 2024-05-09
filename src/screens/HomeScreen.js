import firestore from '@react-native-firebase/firestore'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import JobItem from '../components/JobItem'
import { addNewJob, logout, useMyContextController } from '../context'
const HomeScreen = ({ navigation }) => {
  const [show, setShow] = useState(true)
  const [addJob, setAddJob] = useState('')
  const [jobsList, setJobsList] = useState([])
  const ref = firestore().collection('JOB')
  const [controller, dispatch] = useMyContextController()
  const { userLogin } = controller

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('LoginScreen')
    }
  }, [navigation, userLogin])
  const handleLogout = () => {
    logout(dispatch)
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button textColor="blue" labelStyle={{
          fontStyle: 'italic'
        }} onPress={handleLogout}>
          Logout
        </Button>
      )
    })
  })

  async function addNewJob() {
    if (addJob != '') {
      await ref.add({
        title: addJob,
        time: new Date().toLocaleString()
      });
    } else {
      Alert.alert("Thông báo", 'Chưa nhập tên hoạt động')
    }

    setAddJob('');
  }

  React.useEffect(() => {
    return ref.orderBy('time', 'asc').onSnapshot(querySnapshot => {
      const list = []
      querySnapshot.forEach(doc => {
        const { title, time } = doc.data()
        list.push({
          id: doc.id,
          title,
          time,
        })
      })

      setJobsList(list)
    })
  })
  return (
    <View style={{
      flex: 1,
      margin: 20
    }}>
      <View style={{
        flexDirection: 'row',
      }}>
        <TextInput
          label={'New Job'}
          value={addJob}
          onChangeText={setAddJob}
          contentStyle={{
            backgroundColor: 'white'
          }}
          style={{
            flex: 2
          }}
        />
        <Button style={{
          backgroundColor: 'blue',
          borderRadius: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onPress={addNewJob}
          textColor='white'>
          Add
        </Button>
      </View>
      <FlatList
        data={jobsList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <JobItem {...item} index={jobsList.index} />}
      />
    </View>
  )
}

export default HomeScreen