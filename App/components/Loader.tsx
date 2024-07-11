import { View, Text , ActivityIndicator, StyleSheet} from 'react-native'
import React from 'react'

const Loader = ({text}) => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="small" color="#0000ff" />
      <Text style={styles.loadingText}>{text ? text : "Loading please wait ...."}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fills the parent component
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Raleway',
    marginTop: 20,
  },
});

export default Loader