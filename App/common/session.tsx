import AsyncStorage from '@react-native-async-storage/async-storage';

const storeInSession = async (key, value) => {
    try {
      const data = await AsyncStorage.setItem(key, value);
      console.log(`this is the data i saved  ${value} `)
    } catch (e) {
      console.log(`Na wetin happen be this  ${e} `)
    }
  };


  const lookInSession = (key) => {
    return AsyncStorage.getItem(key)
}
// const lookInSession = async (key) => {
//     try {
//       const data = await AsyncStorage.getItem(key);
//       return JSON.parse(data);
//     } catch (e) {
//       // error reading value
//     }
// }

const logOutUser = () => {
    AsyncStorage.clear();
}

export {lookInSession, storeInSession, logOutUser}