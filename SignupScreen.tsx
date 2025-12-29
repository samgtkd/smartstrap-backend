import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native';

export default function SignupScreen({ navigation }: any) {
  const [role, setRole] = useState('patient');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [rpps, setRpps] = useState('');
  const [specialite, setSpecialite] = useState('');

 
  const isFormValid = () => {
    const commonFields = nom.length > 0 && prenom.length > 0 && email.length > 0 && phone.length > 0;
    if (role === 'patient') {
      return commonFields && dateNaissance.length > 0;
    } else {
      return commonFields && rpps.length > 0 && specialite.length > 0;
    }
  };

  const canContinue = isFormValid();

  
  const handleSignup = () => {
    const userInfo = {
      nom,
      prenom,
      email,
      phone,
      role,
      dateNaissance: role === 'patient' ? dateNaissance : null,
      rpps: role === 'medecin' ? rpps : null,
      specialite: role === 'medecin' ? specialite : null,
    };

    
    navigation.navigate('SetPassword', { userInfo: userInfo });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollInner}>
        <Text style={styles.headerTitle}>Inscription</Text>

        {/* SÉLECTEUR DE RÔLE */}
        <View style={styles.roleContainer}>
          <TouchableOpacity 
            style={[styles.roleButton, role === 'patient' && styles.activeRole]} 
            onPress={() => setRole('patient')}
          >
            <Text style={role === 'patient' ? styles.activeText : styles.roleText}>Patient</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.roleButton, role === 'medecin' && styles.activeRole]} 
            onPress={() => setRole('medecin')}
          >
            <Text style={role === 'medecin' ? styles.activeText : styles.roleText}>Médecin</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom</Text>
          <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />

          <Text style={styles.label}>Prénom</Text>
          <TextInput style={styles.input} placeholder="Prénom" value={prenom} onChangeText={setPrenom} />

          {role === 'medecin' && (
            <View>
              <Text style={styles.label}>Numéro RPPS</Text>
              <TextInput style={styles.input} placeholder="1010..." keyboardType="numeric" value={rpps} onChangeText={setRpps} />
              <Text style={styles.label}>Spécialité</Text>
              <TextInput style={styles.input} placeholder="Ex: Cardiologue" value={specialite} onChangeText={setSpecialite} />
            </View>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="email@test.com" keyboardType="email-address" value={email} onChangeText={setEmail} />

          <Text style={styles.label}>Téléphone</Text>
          <TextInput style={styles.input} placeholder="07000000" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

          {role === 'patient' && (
            <View>
              <Text style={styles.label}>Date de naissance</Text>
              <TextInput style={styles.input} placeholder="DD / MM / YYYY" value={dateNaissance} onChangeText={setDateNaissance} />
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.mainButton, !canContinue && styles.disabledButton]} 
          onPress={handleSignup} 
          disabled={!canContinue}
        >
          <Text style={styles.buttonText}>Continuer en tant que {role}</Text>
        </TouchableOpacity>

        <View style={styles.socialSection}>
          <Text style={styles.orText}>ou inscrivez vous avec</Text>
          <View style={styles.socialIconsContainer}>
            <View style={styles.iconCircleBlue}><Text style={styles.blueLetter}>G</Text></View>
            <View style={styles.iconCircleBlue}><Text style={styles.blueLetter}>f</Text></View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerText}>Avez-vous un compte ? <Text style={styles.link}>Connexion</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollInner: { padding: 30, alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#0055FF', marginBottom: 20 },
  roleContainer: { flexDirection: 'row', marginBottom: 25, width: '100%' },
  roleButton: { flex: 1, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#0055FF', borderRadius: 10, marginHorizontal: 5 },
  activeRole: { backgroundColor: '#0055FF' },
  roleText: { color: '#0055FF', fontWeight: 'bold' },
  activeText: { color: '#FFF', fontWeight: 'bold' },
  inputContainer: { width: '100%' },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 5 },
  input: { backgroundColor: '#F0F4FF', borderRadius: 12, padding: 12, marginBottom: 15 },
  mainButton: { backgroundColor: '#FF0000', width: '100%', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 10 },
  disabledButton: { backgroundColor: '#CCCCCC' },
  buttonText: { color: '#FFF', fontWeight: 'bold', textTransform: 'capitalize' },
  socialSection: { marginTop: 30, alignItems: 'center', width: '100%' },
  orText: { color: '#666', fontSize: 12, marginBottom: 15 },
  socialIconsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  iconCircleBlue: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#E8EFFF', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  blueLetter: { color: '#0055FF', fontSize: 20, fontWeight: 'bold' },
  footerText: { fontSize: 13, color: '#333' },
  link: { color: '#0055FF', fontWeight: 'bold' }
});