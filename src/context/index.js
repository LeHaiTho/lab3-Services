import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createContext, useContext, useMemo, useReducer } from 'react'
import { Alert } from 'react-native'

const MyContext = createContext()
MyContext.displayName = "My store"

// Reducer 
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userLogin: action.value }
    case "LOGOUT":
      return { ...state, userLogin: null }
    case "JOBS_LIST":
      return { ...state, jobsList: action.value }
    default: {
      throw new Error("Invalid action")
    }
  }
}

// MyContext
const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
    jobsList: []
  }
  const [controller, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => [controller, dispatch], [controller, dispatch])
  // dependencies
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
const JOB = firestore().collection('JOB')

// Dinh nghia action
// các action phải thông qua Dispatch

const createAccount = (email, password, fullname) => {
  auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      USERS.doc(email)
        .set({
          email,
          password,
          fullname
        })
      Alert.alert('Register success')
    }
    )
    .catch(err => {
      Alert.alert('The email address is already registered')
      console.log(err)
    })
}

const login = (dispatch, email, password) => {
  auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      USERS.doc(email)
        .onSnapshot(u => {
          if (u.exists) {
            Alert.alert(`Login successful ${u.id}`)
            dispatch({ type: "USER_LOGIN", value: u.data() })
          }
        }
        )
    })
    .catch(err => {
      Alert.alert("Sai email hoặc password !!!")
      console.log(err);
    })
}

const logout = (dispatch) => {
  auth().signOut()
    .then(() => {
      dispatch({ type: "LOGOUT" })
    })
}

// const addNewJob = (title) => {
//   JOB.add({ title: title, time: new Date().toLocaleString() })
//     .then(() => {
//       console.log(` title: ${title}`);
//     })
//     .then((err) => {
//       console.log(err);
//     })
// }
export { MyContextControllerProvider, createAccount, login, logout, useMyContextController }
