import React, { useEffect } from "react";
import { useContext } from "react";
import { ActivityIndicator, Button, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppContext from "../../context/AppContext";
import { logout } from "../../store/authReducer";
import { getPosts, resetPost } from "../../store/postReducer";

const Home = () => {
    const {posts,loading} = useSelector(state => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());

        return ()=>{
            dispatch(resetPost());
        }
    }, []);

    return (
        <ScrollView>
            {
                posts?.map((p) => {
                    return (
                        <View key={p.id} style={{ margin: 10 }}>
                            <Text>{p.title}</Text>
                        </View>
                    )
                })
            }
            <Button title="Reload" onPress={()=>dispatch(getPosts())}/>
            <Button title="Logout" onPress={()=>dispatch(logout())}/>
            <Modal transparent visible={loading}>
                <View style={{ flex:1,justifyContent:'center',alignItems:'center' }}>
                    <ActivityIndicator />
                </View>
            </Modal>
        </ScrollView>
    )
}

export default Home;