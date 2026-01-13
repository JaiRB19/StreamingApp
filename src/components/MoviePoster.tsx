import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getPosterUrl } from '../api/tmdb';

interface MoviePosterProps {
  posterPath: string;
  onPress: () => void; // Para cuando toquemos la película
}

export default function MoviePoster({ posterPath, onPress }: MoviePosterProps) {
  const imageUrl = getPosterUrl(posterPath);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl && (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            resizeMode="cover" 
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Para que ocupe espacio equitativo en la grilla
    margin: 8,
    height: 250, // Altura fija para que todas se vean igual
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#333', // Color de fondo mientras carga
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Sombra en Android
  },
  image: {
    flex: 1,
    borderRadius: 18,
  }
});