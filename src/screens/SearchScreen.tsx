import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchMovies } from '../api/tmdb';
import MoviePoster from '../components/MoviePoster';
import { colors } from '../theme/colors';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  // Función para buscar cuando el usuario presiona "Enter" o deja de escribir
  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      setLoading(true);
      const data = await searchMovies(text);
      setResults(data);
      setLoading(false);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Buscador 🔎</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Avengers, Mario Bros, etc..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={handleSearch}
        autoCorrect={false}
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3} // 3 columnas para que se vea diferente a tendencias
          renderItem={({ item }) => (
            <MoviePoster 
              posterPath={item.poster_path} 
              onPress={() => navigation.navigate('Detail', { movie: item })} 
            />
          )}
          ListEmptyComponent={
            query.length > 0 ? <Text style={styles.emptyText}>No encontramos nada 😢</Text> : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 60, paddingHorizontal: 10 },
  headerTitle: { color: 'white', fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 50, fontSize: 16 }
});