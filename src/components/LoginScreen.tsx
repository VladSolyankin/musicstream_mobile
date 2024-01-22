import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		console.log('Email:', email);
		console.log('Password:', password);
	};

	return (
		<View style={styles.container}>
			<Image source={require("../assets/logo-transparent.png")} style={styles.logo} />

			<Input
				placeholder="Email"
				leftIcon={<Icon name="email" size={24} color="black" />}
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
				containerStyle={styles.inputContainer}
				inputStyle={styles.inputText}
				inputContainerStyle={styles.inputContainerStyle}
			/>
			<Input
				placeholder="Пароль"
				leftIcon={<Icon name="lock" size={24} color="black" />}
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				containerStyle={styles.inputContainer}
				inputStyle={styles.inputText}
				inputContainerStyle={styles.inputContainerStyle}
			/>
			<Button
				title="Войти"
				onPress={handleLogin}
				buttonStyle={styles.loginButton}
				titleStyle={styles.buttonTitle}
			/>
			<Text style={styles.textStyle}>Нет аккаунта? Регистрация</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	logo: {
		width: 250,
		height: 150,
		resizeMode: 'contain'
	},
	inputContainer: {
		marginBottom: 15,
	},
	inputText: {
		fontSize: 16,
	},
	inputContainerStyle: {
		width: '90%',
	},
	loginButton: {
		marginTop: 10,
		backgroundColor: '#007BFF',
		width: '100%',
	},
	buttonTitle: {
		fontSize: 18,
	},
	textStyle: {
		color: 'blue',
		marginTop: 20,
		textDecorationLine: "underline"

	}
});

export default LoginScreen;
