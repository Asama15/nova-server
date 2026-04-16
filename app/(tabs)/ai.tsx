import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // تحميل الرسائل عند فتح التطبيق
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const saved = await AsyncStorage.getItem("messages");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (e) {
      console.log("Error loading messages", e);
    }
  };

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(newMessages));
    } catch (e) {
      console.log("Error saving messages", e);
    }
  };

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMessages = [
      ...messages,
      { id: Date.now().toString(), text, me: true },
    ];

    setMessages(newMessages);
    saveMessages(newMessages);
    setText("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ color: "white", margin: 5 }}>
            {item.text}
          </Text>
        )}
      />

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="اكتب رسالة..."
        placeholderTextColor="gray"
        style={{
          backgroundColor: "#222",
          color: "white",
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
      />

      <TouchableOpacity onPress={sendMessage}>
        <Text
          style={{
            color: "white",
            backgroundColor: "green",
            padding: 10,
            textAlign: "center",
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          إرسال
        </Text>
      </TouchableOpacity>
    </View>
  );
}