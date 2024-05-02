import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import 'react-native-gesture-handler';
import { Appbar, Button, TextInput } from 'react-native-paper';
import Todo from './src/components/Todo';
const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const ref = firestore().collection('todos')

  // handle add to do 
  const handleAddTodo = async () => {
    await ref.add({
      title: todo,
      complete: false
    })
    setTodo('')
  }
  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = []
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete
        })
      })
      setTodos(list)
      if (loading) {
        setLoading(false)
      }
    })
  })
  if (loading) {
    return null
  }

  return (
    // lab3 ly thuyet 
    <View style={{
      flex: 1
    }}>
      <Appbar>
        <Appbar.Content title='TODOs list' />
      </Appbar>
      <FlatList style={{
        flex: 1
      }}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Todo{...item} />}
      />

      <TextInput label='New Todo' value={todo} onChangeText={(text) => setTodo(text)} />
      <Button onPress={handleAddTodo}>Add TODO</Button>
    </View>


    // <RegisterScreen />
    // <LoginScreen />
    // <MyStack />

    // lab 3
    // <MyContextControllerProvider>
    //   <RegisterScreen />
    // </MyContextControllerProvider>
  )
}

export default App