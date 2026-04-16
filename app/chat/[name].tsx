import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { io } from "socket.io-client";

const socket = io("http://192.168.0.108:3000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const username = "Osama"; // ✏️ غيّر الاسم لكل جهاز

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, { ...data, fromMe: false }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const msgData = {
      message: message,
      time: new Date().toLocaleTimeString(),
      user: username,
    };

    socket.emit("send_message", msgData);

    setMessages((prev) => [...prev, { ...msgData, fromMe: true }]);

    setMessage("");
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#e5ddd5" }}>

      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.fromMe ? "flex-end" : "flex-start",
              backgroundColor: item.fromMe ? "#0084ff" : "#ffffff",
              padding: 10,
              borderRadius: 10,
              marginVertical: 5,
              maxWidth: "70%",
            }}
          >
            {/* اسم المستخدم */}
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 3,
                color: item.fromMe ? "#d1e7ff" : "#333",
              }}
            >
              {item.user}
            </Text>

            {/* الرسالة */}
            <Text style={{ color: item.fromMe ? "white" : "black" }}>
              {item.message}
            </Text>

            {/* الوقت */}
            <Text style={{ fontSize: 10, color: "gray", marginTop: 5 }}>
              {item.time}
            </Text>
          </View>
        )}
      />

      <TextInput
        placeholder="اكتب رسالة..."
        value={message}
        onChangeText={setMessage}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      />

      <TouchableOpacity
        onPress={sendMessage}
        style={{
          backgroundColor: "#0084ff",
          padding: 15,
          marginTop: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          إرسال
        </Text>
      </TouchableOpacity>

    </View>
  );
}