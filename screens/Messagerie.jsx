import { useEffect, useRef, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Pusher from "pusher-js/react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const pusher = new Pusher("7e4577e3949d26fcc586", { cluster: "eu" });
const BACKEND_ADDRESS = "http://10.20.2.115:3000";

export default function ChatScreen({ navigation }) {
  const User = useSelector((state) => state.user.value);
  const scrollViewRef = useRef();

  const username = User.email;
  const [messages, setMessages] = useState([]);

  const [messageText, setMessageText] = useState("");
  console.log(messages)
  console.log(messageText)
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/users/${username}`, { method: "PUT" });

    const subscription = pusher.subscribe("chat");

    subscription.bind("pusher:subscription_succeeded", () => {
      subscription.bind("message", handleReceiveMessage);
    });

    return () =>
      fetch(`${BACKEND_ADDRESS}/users/${username}`, {
        method: "DELETE",
      });
  }, [username]);

  const handleReceiveMessage = (data) => {
    setMessages((messages) => [...messages, data]);
  };

  const handleSendMessage = () => {
    if (!messageText) {
      return;
    }

    const payload = {
      text: messageText,
      username: username,
      createdAt: new Date(),
      id: Math.floor(Math.random() * 100000),
    };

    fetch(`${BACKEND_ADDRESS}/message`, {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(payload),
    });

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }

    setMessageText("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.banner}>
        <Text style={styles.greetingText}>Chat</Text>
      </View>

      <View style={styles.inset}>
        <ScrollView ref={scrollViewRef} style={styles.scroller}>
          {messages.map((message, i) => (
            <View
              key={i}
              style={[
                styles.messageWrapper,

                {
                  ...(message.username === username
                    ? styles.messageSent
                    : styles.messageRecieved),
                },
              ]}
            >
              <Text style={styles.messageUsername}>{message.username}</Text>
              <View
                style={[
                  styles.message,

                  {
                    ...(message.username === username
                      ? styles.messageSentBg
                      : styles.messageRecievedBg),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.messageText,

                    {
                      ...(message.username === username
                        ? styles.messageSentText
                        : styles.messageReceivedText),
                    },
                  ]}
                >
                  {message.text}
                </Text>
              </View>

              <Text style={styles.timeText}>
                {new Date(message.createdAt).getHours()}:
                {String(new Date(message.createdAt).getMinutes()).padStart(
                  2,

                  "0"
                )}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(value) => setMessageText(value)}
            value={messageText}
            style={styles.input}
            autoFocus
          />

          <TouchableOpacity
            onPress={() => handleSendMessage()}
            style={styles.sendButton}
          >
            <MaterialIcons name="send" color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#827397",
  },

  inset: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#ffffff",
    width: "100%",
    paddingTop: 20,
    position: "relative",
  },

  banner: {
    width: "100%",
    height: "15%",
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  greetingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
  },

  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },

  messageWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,
  },

  messageRecieved: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },

  messageUsername: {
    textDecorationStyle: "solid",
    fontStyle: "italic",
    marginBottom: 7,
  },
  messageSent: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },

  messageSentBg: {
    backgroundColor: "#007BFF",
    color: "black",
  },

  messageSentText: {
    color: "white",
  },
  messageReceivedText: {
    color: "black",
  },

  messageRecievedBg: {
    backgroundColor: "#E0E0E0",
  },

  messageText: {
    fontWeight: "400",
  },

  timeText: {
    color: "#506568",
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2,
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    justifySelf: "flex-end",
    alignContent: "flex-start",
    marginBottom: 30,
    marginTop: "auto",
    background: "transparent",
    paddingLeft: 20,
    paddingRight: 20,
  },

  input: {
    backgroundColor: "#f0f0f0",
    width: "80%",
    padding: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#827397",
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "800",
    textTransform: "uppercase",
  },

  scroller: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});