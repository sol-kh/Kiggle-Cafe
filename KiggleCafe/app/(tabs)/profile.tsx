import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ProfileData = {
  name: string;
};

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('Juan dela Cruz');

  useEffect(() => {
    loadProfileName();
  }, []);

  async function saveProfileName() {
    if (!name.trim()) {
      return;
    }

    const profile = {
      name: name,
    };

    await AsyncStorage.setItem('profileName', JSON.stringify(profile));
    setSavedName(name);
    setName('');
  }

  async function loadProfileName() {
    const raw = await AsyncStorage.getItem('profileName');

    if (raw) {
      const parsed: ProfileData = JSON.parse(raw);
      setSavedName(parsed.name);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: 'https://api.dicebear.com/7.x/adventurer/png?seed=Felix&backgroundColor=FAF6F0',
          }}
          style={styles.avatarImage}
        />
      </View>

      <Text style={styles.name}>{savedName}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Edit Profile Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity style={styles.button} onPress={saveProfileName}>
          <Text style={styles.buttonText}>Save Name</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Member Since</Text>
        <Text style={styles.value}>January 2024</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Orders</Text>
        <Text style={styles.value}>12</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#FAF6F0',
  },
  avatarContainer: {
    width: 114,
    height: 114,
    borderRadius: 57,
    borderWidth: 2,
    borderColor: '#e89dad',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#657b3b',
    marginBottom: 30,
  },
  card: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e89dad',
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#657b3b',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e89dad',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#657b3b',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});