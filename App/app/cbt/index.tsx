import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import CbtSettings from '@/components/CbtSettings'
import CbtPage from '@/components/CbtPage';
import Colors from '@/constants/Colors';



const Cbt = () => {
    const [settings, setSettings] = useState(null);
    const startCBT = (settings:any) => {
        setSettings(settings);
    };

  return (
    <View style={{backgroundColor:Colors.white, height:'100%',}}>
        <View style={{ flex: 1 }}>
            {!settings ? (
                <CbtSettings startCBT={startCBT} />
            ) : (
                <CbtPage settings={settings} />
            )}
            </View>
        </View>
  )
}

export default Cbt;

const styles = StyleSheet.create({

})