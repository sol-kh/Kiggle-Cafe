import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';

const menuItems = [
  { id: '1', category: 'Hot Drinks', name: 'Espresso' },
  { id: '2', category: 'Hot Drinks', name: 'Cappuccino' },
  { id: '3', category: 'Cold Drinks', name: 'Iced Latte' },
  { id: '4', category: 'Cold Drinks', name: 'Iced Mocha' },
  { id: '5', category: 'Desserts', name: 'Chocolate Cake Slice' },
  { id: '6', category: 'Desserts', name: 'Blueberry Cheesecake' },
  { id: '7', category: 'Sandwiches', name: 'Grilled Cheese Sandwich' },
  { id: '8', category: 'Sandwiches', name: 'BLT' },
  { id: '9', category: 'Pastas', name: 'Creamy Carbonara' },
  { id: '10', category: 'Pastas', name: 'Aglio Olio' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kiggle Cafe Menu</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name}>{item.name}</Text>

            <Pressable
              style={styles.button}
              onPress={() => Alert.alert('Menu Item', `You selected ${item.name}`)}
            >
              <Text style={styles.buttonText}>View Item</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2f302c',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  item: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    paddingBottom: 15,
  },
  category: {
    fontSize: 13,
    color: '#aaa',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  button: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});