import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Stack = createStackNavigator();

type SavedNote = {
  note: string;
  time: string;
};

function CartScreen({ navigation }: any) {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState<SavedNote | null>(null);

  useEffect(() => {
    loadNote();
  }, []);

  async function saveNote() {
    if (!note.trim()) {
      return;
    }

    const orderNote = {
      note: note,
      time: new Date().toLocaleTimeString(),
    };

    await AsyncStorage.setItem('orderNote', JSON.stringify(orderNote));
    setSaved(orderNote);
    setNote('');
  }

  async function loadNote() {
    const raw = await AsyncStorage.getItem('orderNote');

    if (raw) {
      const parsed = JSON.parse(raw);
      setSaved(parsed);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Screen</Text>

      <Text style={styles.label}>Special Instructions:</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Extra sugar, no ice..."
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>

      {saved && (
        <View style={styles.savedBox}>
          <Text style={styles.savedTitle}>Last Saved Note:</Text>
          <Text style={styles.savedText}>{saved.note}</Text>
          <Text style={styles.savedTime}>Saved at {saved.time}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OrderSummary')}
      >
        <Text style={styles.buttonText}>View Order Summary</Text>
      </TouchableOpacity>
    </View>
  );
}

function OrderSummaryScreen({ navigation }: any) {
  const [saved, setSaved] = useState<SavedNote | null>(null);

  useEffect(() => {
    loadNote();
  }, []);

  async function loadNote() {
    const raw = await AsyncStorage.getItem('orderNote');

    if (raw) {
      const parsed = JSON.parse(raw);
      setSaved(parsed);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      {saved ? (
        <View style={styles.savedBox}>
          <Text style={styles.savedTitle}>Special Instruction:</Text>
          <Text style={styles.savedText}>{saved.note}</Text>
          <Text style={styles.savedTime}>Saved at {saved.time}</Text>
        </View>
      ) : (
        <Text style={styles.savedText}>No saved note yet.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>← Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CartLayout() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#657b3b' },
          headerTintColor: '#F5F5F5',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'My Cart' }}
        />
        <Stack.Screen
          name="OrderSummary"
          component={OrderSummaryScreen}
          options={{ title: 'Order Summary' }}
        />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FAF6F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#657b3b',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#657b3b',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e89dad',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#657b3b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  savedBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  savedTitle: {
    fontSize: 13,
    color: '#657b3b',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  savedText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  savedTime: {
    fontSize: 12,
    color: '#666',
  },
});