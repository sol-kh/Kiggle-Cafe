import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
  const router = useRouter();

  const { title, category, description, ingredients } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.detailCard}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name}>{title}</Text>

        <View style={styles.divider} />

        <Text style={styles.descriptionLabel}>Product Details</Text>
        <Text style={styles.descriptionText}>
          {description || 'No description available.'}
        </Text>

        <Text style={styles.descriptionLabel}>Ingredients</Text>
        <Text style={styles.descriptionText}>
          {ingredients || 'No ingredients listed.'}
        </Text>
      </View>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back to Menu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FAF6F0',
    justifyContent: 'center',
  },
  detailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 3,
    borderColor: '#e89dad',
    marginBottom: 25,
    shadowColor: '#657b3b',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    color: '#e89dad',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#657b3b',
    marginBottom: 4,
  },
  divider: {
    height: 2,
    backgroundColor: '#FAF6F0',
    marginVertical: 16,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#657b3b',
    marginTop: 10,
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 15,
    color: '#7a7a7a',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#657b3b',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#657b3b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});