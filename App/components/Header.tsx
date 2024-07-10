import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import Colors from '@/constants/Colors';

type HeaderType = {
  title:'string',
  questionLength: number,
  selectedYear: number,
  onYearChange: (year: number) => void,
};

const Header = ({ title, questionLength, selectedYear, onYearChange }: HeaderType) => {
  const [settings, setSettings] = useState(false);
  const [year, setYear] = useState(selectedYear || 2023);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const years = [2023, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  const renderYearButton = ({ item }) => (
    <TouchableOpacity 
      style={styles.yearButton} 
      onPress={() => { 
        setYear(item); 
        onYearChange(item); 
        setYearModalVisible(false); 
      }}>
      <Text style={styles.yearText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>{title ? title : ''} Questions</Text>
        <Text style={styles.headerSubtext}>{questionLength ? questionLength : ''}+ Questions</Text>
      </View>
      <TouchableOpacity onPress={() => setSettings(!settings)}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
      {settings && (
        <View style={styles.headerSettings}>
          <TouchableOpacity onPress={() => setYearModalVisible(true)}>
            <Text style={[styles.headerSubtext, styles.button]}>Change Year</Text>
          </TouchableOpacity>
          <Link href='/home' style={[styles.headerSubtext, styles.button]}>Change Subject</Link>
          <Link href='/cbt' style={[styles.headerSubtext, styles.button]}>CBT ?</Link>
        </View>
      )}
      <Modal
        visible={yearModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setYearModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Year</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setYearModalVisible(false)}>
                <AntDesign name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={years}
              renderItem={renderYearButton}
              keyExtractor={(item) => item.toString()}
              contentContainerStyle={styles.flatlist}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width:'100%'
  },
  headerText: {
    fontFamily: 'Ubuntu',
    fontSize: 18,
    textTransform: 'capitalize'
  },
  headerSubtext: {
    textAlign: 'center',
    color: '#9c9d9c',
    fontSize: 15,
    fontFamily: 'Ubuntu',
  },
  headerSettings: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    gap:10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 20,
    backgroundColor: Colors.white,
    zIndex: 9999,
    padding: 10,
    marginTop: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGM',
  },
  flatlist: {
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  yearButton: {
    padding: 10,
    width: 60,
    backgroundColor: Colors.gray,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  button:{
    backgroundColor: Colors.black,
    color:Colors.white,
    padding:15,
    width:200
  },
  yearText: {
    fontSize: 16,
    fontFamily: 'SpaceGM',
  },
  closeButton: {
    padding: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 10,
  },
  modalHeader: {
    display: 'flex',
    width: '100%',
    padding: 4,
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
});

export default Header;
