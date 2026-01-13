import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Importante para navegar
import { getTrendingMovies } from "../api/tmdb";
import MoviePoster from "../components/MoviePoster";
import { colors } from "../theme/colors";

export default function TrendingScreen() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>(); // Hook de navegación

  useEffect(() => {
    getTrendingMovies().then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tendencias 🔥</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <MoviePoster 
            posterPath={item.poster_path} 
            onPress={() => navigation.navigate('Detail', { movie: item })} 
          />
        )}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60, // Ajustado para que no choque con el notch
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 15,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  }
});