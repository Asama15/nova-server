import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const router = useRouter();

  const enterChat = () => {
    if (name.trim() === "") return;
    router.push(`/chat/${name}`);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Nova Chat 💬
      </Text>

      <TextInput
        placeholder="اكتب اسمك..."
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        onPress={enterChat}
        style={{
          backgroundColor: "blue",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          دخول
        </Text>
      </TouchableOpacity>
    </View>
  );
}