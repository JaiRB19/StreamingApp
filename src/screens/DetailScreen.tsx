import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getPosterUrl } from '../api/tmdb';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

// 1. Definimos una imagen de respaldo por si falla la original
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x750.png?text=No+Image';

export default function DetailScreen() {
  const route = useRoute();
  const { movie } = route.params as any; 

  // 2. Obtenemos las URLs "crudas"
  const rawBackdrop = getPosterUrl(movie.backdrop_path);
  const rawPoster = getPosterUrl(movie.poster_path);

  // 3. Lógica de seguridad para las imágenes
  const backdropSource = rawBackdrop ? { uri: rawBackdrop } : { uri: PLACEHOLDER_IMAGE };
  const posterSource = rawPoster ? { uri: rawPoster } : { uri: PLACEHOLDER_IMAGE };

  return (
    <ScrollView style={styles.container} bounces={false}>
      {/* Imagen de Fondo (Backdrop) */}
      <View style={styles.imageContainer}>
        <Image 
          source={backdropSource} 
          style={styles.backdrop}
          resizeMode="cover"
        />
        <View style={styles.gradient} />
      </View>

      {/* Información Principal */}
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Image 
            source={posterSource} 
            style={styles.poster} 
            resizeMode="cover"
          />
          <View style={styles.titleContainer}>
            {/* 👇 AQUÍ ESTÁ EL CAMBIO PRINCIPAL: title o name */}
            <Text style={styles.title}>
              {movie.title || movie.name}
            </Text>

            {/* 👇 TAMBIÉN AGREGAMOS ESTO: release_date o first_air_date */}
            <Text style={styles.date}>
              📅 {movie.release_date || movie.first_air_date}
            </Text>

            <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)} / 10</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Sinopsis</Text>
        <Text style={styles.overview}>
          {movie.overview || "No hay descripción disponible para este título."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: width,
    height: 250,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  contentContainer: {
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginTop: -50,
    borderWidth: 2,
    borderColor: colors.cardBackground,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  rating: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});