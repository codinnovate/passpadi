import { View, Text } from 'react-native'
import React, { useState } from 'react'

const Cbt = () => {
    const [cbtSettings, setCbtSettings] = useState(true);

  return  cbtSettings ? <Text>Cbt Settings Here</Text> : null

  const handleCbtSettings = () => {
    setCbtSettings(false)
  }
  return (
    <>
    {cbtSettings ? <cbtSettings /> : 
    (
    <View>
        {/* Cbt settings first */}
      <Text>Cbt</Text>

          
    </View>
    )
    }
    </>
  )
}

export default Cbt