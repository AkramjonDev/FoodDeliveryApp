import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
const NotificationListener = () => {
  useEffect(() => {
    // Foreground state messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    // Background and quit state messages
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    return unsubscribe;
  }, []);

  return null;
};
