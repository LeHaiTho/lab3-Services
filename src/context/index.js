import { View, Text, Alert } from 'react-native'
import { createContext, useContext, useMemo, useReducer } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const MyContext = createContext()
MyContext.displayName = "My store"

// Reducer 
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userLogin: action.value }
    case "LOGOUT":
      return { ...state, userLogout: null }
    default: {
      throw new Error("Invalid action")
    }
  }
}

// MyContext
const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
  }
  const [dispatch, controller] = useReducer(reducer, initialState)
  const value = useMemo(() => [controller, dispatch])
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  )
}

const useMyContextController = () => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error(
      "useMyContextController should be used inside the MyContextContollerProvider"
    )
  }
  return context
}

//Tham chiếu collection
const USERS = firestore().collection('USERS')

// Dinh nghia action
// các action phải thông qua Dispatch

const createAccount = (email, password, fullname, phone) => {
  auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Create account successfull !")
      USERS.doc(email)
        .set({
          email,
          password,
          phone,
          fullname

        })
    }
    )
    .catch(err => console.log(err))
}

const login = (dispatch, email, password) => {
  auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      USERS.doc(email)
        .onSnapshot(u => {
          if (u.exists) {
            console.log(`Dang nhap thanh cong với ${u.data}`)
            dispatch({ type: USER_LOGIN, value: u.data() })
          }
          else {
            Alert.alert('Tai khoan chua dang ki')
          }
        })
    })
}
const logout = (dispatch) => {
  auth().signOut()
    .then(() => {
      dispatch({ type: "LOGOUT" })
    })
}
export { MyContextControllerProvider, useMyContextController, login, createAccount, logout } 