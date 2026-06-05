import { Image, StyleSheet, Text, View } from 'react-native';

// ─── Profile Screen ───────────────────────────────────────────────────────────
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Profile Picture Frame */}
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: 'https://api.dicebear.com/7.x/adventurer/png?seed=Felix&backgroundColor=FAF6F0' }} 
          style={styles.avatarImage}
        />
      </View>
      
      <Text style={styles.name}>Juan dela Cruz</Text>
      <Text style={styles.email}>juan@coffee.com</Text>

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

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#FAF6F0', // Warm White Background
  },
  avatarContainer: {
    width: 114,
    height: 114,
    borderRadius: 57,
    borderWidth: 2,
    borderColor: '#e89dad', // Pastel Pink Border Ring
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
    color: '#657b3b', // Sage Green Name
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  card: {
    width: '80%',
    backgroundColor: '#ffffff', // Clean Card White
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e89dad', // Pastel Pink Outline (Matches Home Cards)
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#657b3b', // Sage Green Values
    marginTop: 4,
  },
});