import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type CoffeeItem = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  category: string;
};

export default function HomeScreen() {
  const router = useRouter();

  const [menuItems, setMenuItems] = useState<CoffeeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMenu();
  }, []);

  async function loadMenu() {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://api.sampleapis.com/coffee/hot');

      if (!response.ok) {
        throw new Error('Unable to fetch coffee menu.');
      }

      const data = await response.json();

      const formattedMenu = data.slice(0, 10).map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        description: item.description,
        ingredients: item.ingredients || [],
        category: 'Hot Drinks',
      }));

      setMenuItems(formattedMenu);
    } catch (err) {
      setError('Unable to load menu. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#657b3b" />
        <Text style={styles.loadingText}>Loading coffee menu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable style={styles.tryAgainButton} onPress={loadMenu}>
          <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kiggle Cafe Menu</Text>

      <Pressable style={styles.reloadButton} onPress={loadMenu}>
        <Text style={styles.buttonText}>Reload Menu</Text>
      </Pressable>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <Pressable
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: '/details',
                  params: {
                    title: item.title,
                    category: item.category,
                    description: item.description,
                    ingredients: item.ingredients.join(', '),
                  },
                })
              }
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
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: '#FAF6F0',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FAF6F0',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#657b3b',
  },
  reloadButton: {
    backgroundColor: '#657b3b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  tryAgainButton: {
    backgroundColor: '#657b3b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
  },
  item: {
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#e89dad',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  category: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#657b3b',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#657b3b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 12,
    color: '#657b3b',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#b00020',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
});