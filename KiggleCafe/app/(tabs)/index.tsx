import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const menuSections = [
  {
    title: 'Hot Drinks',
    data: [
      { id: '1', name: 'Espresso', price: '₱110', description: 'Rich, bold, and concentrated espresso shot.' },
      { id: '2', name: 'Cappuccino', price: '₱140', description: 'Perfect balance of espresso, steamed milk, and airy foam.' },
      { id: '3', name: 'Americano', price: '₱125', description: 'Smooth espresso diluted with hot water for a classic black coffee.' },
    ],
  },
  {
    title: 'Cold Drinks',
    data: [
      { id: '4', name: 'Iced Latte', price: '₱150', description: 'Chilled espresso poured over fresh milk and ice.' },
      { id: '5', name: 'Iced Mocha', price: '₱160', description: 'Sweet chocolate combined with espresso, cold milk, and ice.' },
      { id: '6', name: 'Caramel Macchiato', price: '₱165', description: 'Fresh milk layered with rich espresso and sweet caramel drizzle.' },
    ],
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const flatData = menuSections.flatMap(section => [
    { isHeader: true, title: section.title },
    ...section.data
  ]);

  return (
    <View style={styles.container}>
      {/* Cute Styled Title Heading Box */}
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>KIGGLE COFFEE</Text>
        <View style={styles.symbolRow}>
          <View style={styles.decorativeLine} />
          <Ionicons name="cafe" size={20} color="#e89dad" style={styles.coffeeIcon} />
          <View style={styles.decorativeLine} />
        </View>
      </View>

      <FlatList
        data={flatData}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          if ('isHeader' in item) {
            return <Text style={styles.sectionHeader}>{item.title}</Text>;
          }

          return (
            <View style={styles.itemCard}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>

              <Pressable
                style={styles.button}
                onPress={() => 
                  router.push({
                    pathname: '/details',
                    params: { 
                      name: item.name, 
                      category: item.id <= '3' ? 'Hot Drinks' : 'Cold Drinks', 
                      price: item.price, 
                      description: item.description 
                    }
                  })
                }
              >
                <Text style={styles.buttonText}>View Item</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FAF6F0', 
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#657b3b', 
    letterSpacing: 1,
  },
  symbolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    width: '50%',
  },
  decorativeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e89dad', 
    opacity: 0.5,
  },
  coffeeIcon: {
    paddingHorizontal: 10,
  },
  sectionHeader: {
    fontSize: 20, 
    fontWeight: '700',
    color: '#657b3b',
    marginTop: 18,
    marginBottom: 12,
    paddingLeft: 4,
  },
  itemCard: {
    backgroundColor: '#ffffff', 
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 20, 
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#e89dad', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#657b3b',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 21, 
    fontWeight: 'bold',
    color: '#657b3b', 
    marginBottom: 4, 
  },
  price: {
    fontSize: 16, 
    color: '#7a7a7a',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#657b3b', 
    paddingVertical: 12, 
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});