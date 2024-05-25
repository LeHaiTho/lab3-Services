// import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import MyStack from './routers/MyStack';
import {MyContextControllerProvider} from './store';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import firestore from '@react-native-firebase/firestore';
// import Todo from './Todos/todo';

const App = () => {
  return (
    // <SafeAreaView style={{flex: 1}}>
    <MyContextControllerProvider>
      {/* <View style={{flex: 1}}> */}
      {/* <Signup /> */}
      {/* <Signin /> */}
      <PaperProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </PaperProvider>
      {/* </View> */}
    </MyContextControllerProvider>
    // </SafeAreaView>

    // <PaperProvider>
    //   <NavigationContainer>
    //     <MyStack />
    //   </NavigationContainer>
    // </PaperProvider>
    // <View style={{flex: 1}}>
    //   <MyContextControllerProvider>
    //     <PaperProvider>
    //       <NavigationContainer>
    //         <MyStack />
    //       </NavigationContainer>
    //     </PaperProvider>
    //   </MyContextControllerProvider>
    //   {/* <Home /> */}
    // </View>
  );
};
export default App;
