import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, // 1. Importamos el componente de entrada de texto
  Alert 
} from 'react-native';
import { colors } from '../theme/colors';

interface LoginProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginProps) {
  // 2. Creamos estados para guardar lo que escribe el usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí podrías validar si los campos están vacíos, 
    // pero como pediste que se pueda entrar igual, solo imprimimos en consola.
    console.log("Iniciando sesión con:", email, password);
    onLogin();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>NETFLIX CLONE 🍿</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Usuario o Email</Text>
        {/* 3. Input de Email */}
        <TextInput
          style={styles.input}
          placeholder="Ej. usuario@correo.com"
          placeholderTextColor="#666" // Color del texto de ayuda
          value={email}
          onChangeText={(text) => setEmail(text)} // Actualizamos el estado
          keyboardType="email-address" // Pone @ en el teclado
          autoCapitalize="none" // Evita mayúsculas automáticas
        />
        
        <Text style={styles.label}>Contraseña</Text>
        {/* 4. Input de Password */}
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#666"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true} // 🔒 Esto convierte el texto en puntitos
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
        </TouchableOpacity>
        
        {/* Un pequeño texto extra para que se vea más real */}
        <TouchableOpacity onPress={() => Alert.alert('Ups', 'Funcionalidad no implementada')}>
            <Text style={styles.helpText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 50,
  },
  form: {
    width: '100%',
  },
  label: {
    color: '#aaa',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#333',
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15, // Espacio interno para que el texto no pegue al borde
    color: 'white', // IMPORTANTE: Si no pones esto, escribes negro sobre negro
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  helpText: {
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
  }
});