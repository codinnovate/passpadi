import React, { useContext, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Paystack } from 'react-native-paystack-webview';
import ActivationContext from '@/context/ActivationContext';

const Activate = () => {
  const { activateApp } = useContext(ActivationContext);
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  const handlePaymentSuccess = async () => {
    try {
      await activateApp();
      Alert.alert('Activation Successful', 'You can now access the app.');
      // Navigate to main app screen
    } catch (error) {
      console.error('Error setting activation:', error);
      Alert.alert('Error', 'Failed to activate. Please try again.');
    } finally {
      setPaymentInProgress(false);
    }
  };

  const handlePaymentFailure = () => {
    Alert.alert('Payment Failed', 'Your payment was not successful. Please try again.');
    setPaymentInProgress(false);
  };

  return (
    <View style={styles.container}>
      <Paystack
        paystackKey="pk_test_6b10c305ac9c9ff3601b7be8b88bd0addd1d2e68"
        amount={'25000.00'}
        billingEmail="paystackwebview@something.com"
        activityIndicatorColor="green"
        onCancel={() => handlePaymentFailure()}
        onSuccess={() => handlePaymentSuccess()}
        autoStart={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default Activate;
