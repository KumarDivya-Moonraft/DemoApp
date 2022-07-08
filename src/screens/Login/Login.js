import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, View, TextInput, Text, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authReducer";
import styles from './Login.style';

const Login = () => {
    const dispatch = useDispatch();
    const {loading} =useSelector(state=>state.auth)
    const [email, setEmail] = useState('user@gmail.com');
    const [password, setPassword] = useState('123456');

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ marginTop: 100, padding: 10 }}>
                <Text style={styles.formContainer}>Login</Text>
                <TextInput style={styles.textInput} placeholder={'Email'} onChangeText={(email) => setEmail(email)} value={email} />
                <TextInput style={styles.textInput} placeholder={'Password'} secureTextEntry={true} onChangeText={(password) => setPassword(password)} value={password} />
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => dispatch(login({ email, password }))}>
                    <Text style={styles.buttonTitle}>Login</Text>
                </TouchableOpacity>
            </View>
            <Modal transparent visible={loading}>
                <View style={{ flex:1,justifyContent:'center',alignItems:'center' }}>
                    <ActivityIndicator />
                </View>
            </Modal>
        </ScrollView>
    )
}

export default Login;