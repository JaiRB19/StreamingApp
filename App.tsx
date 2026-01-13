import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; // Iconos gratis incluidos en Expo

// Pantallas
import LoginScreen from './src/screens/LoginScreen';
import SearchScreen from './src/screens/SearchScreen';     // "Inicio"
import TrendingScreen from './src/screens/TrendingScreen'; // "Tendencia"
import MoviesScreen from './src/screens/MoviesScreen';     // "Peliculas"
import SeriesScreen from './src/screens/SeriesScreen';     // "Series"
import DetailScreen from './src/screens/DetailScreen';

import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- 1. Creamos el Navegador de Pestañas (El menú de abajo) ---
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Ocultamos el header de arriba porque ya tenemos el diseño propio
        tabBarStyle: {
          backgroundColor: colors.background, // Fondo negro del menú
          borderTopColor: '#333', // Línea sutil arriba del menú
          height: 60, // Altura del menú
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.primary, // Color cuando está seleccionado (Rojo)
        tabBarInactiveTintColor: '#888', // Color cuando no está seleccionado (Gris)
        // Función para elegir el icono según la pantalla
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Inicio') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Peliculas') iconName = focused ? 'film' : 'film-outline';
          else if (route.name === 'Series') iconName = focused ? 'tv' : 'tv-outline';
          else if (route.name === 'Tendencia') iconName = focused ? 'flame' : 'flame-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={SearchScreen} />
      <Tab.Screen name="Peliculas" component={MoviesScreen} />
      <Tab.Screen name="Series" component={SeriesScreen} />
      <Tab.Screen name="Tendencia" component={TrendingScreen} />
    </Tab.Navigator>
  );
}

// --- 2. El Stack Principal (Login -> Tabs -> Detalle) ---
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          // Si NO está logueado, mostramos Login
          <Stack.Screen name="Login">
             {() => <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        ) : (
          // Si SÍ está logueado, mostramos el Grupo de la App
          <Stack.Group>
            {/* La pantalla principal ahora es el MENU DE PESTAÑAS */}
            <Stack.Screen name="MainTabs" component={MainTabs} />
            
            {/* El Detalle va "encima" del menú (por eso está fuera del Tab.Navigator) */}
            <Stack.Screen 
              name="Detail" 
              component={DetailScreen} 
              options={{ 
                headerShown: true, // Queremos ver la flecha de atrás
                title: '',
                headerTransparent: true,
                headerTintColor: '#fff'
              }} 
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}