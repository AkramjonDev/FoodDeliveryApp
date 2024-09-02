import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaruantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import imageGif from "../assets/200w.gif";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <View className="flex-1 bg-[#00CCBB]">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon width={40} height={40} color={"white"} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white rounded-md mx-5 z-50 shadow-md p-5">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 minut</Text>
            </View>
            <Image className="h-20 w-20" source={imageGif} />
          </View>
          <Progress.Bar color="#00CCBB" indeterminate={true} />

          <Text className="mt-3 text-gray-500">
            Your order at{" "}
            <Text className="font-semibold text-black">{restaurant.title}</Text>{" "}
            is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant?.lat || 37.7749, // Default latitude 
          longitude: restaurant?.long || -122.4194, // Default longitude 
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 mt-10 z-0"
        mapType="mutedStandard"
      >
        {restaurant?.lat && restaurant?.long && (
          <Marker
            coordinate={{
              latitude: restaurant.lat,
              longitude: restaurant.long,
            }}
            title={restaurant.title}
            description={restaurant.restaurant_description}
            identifier="origin"
            pinColor="#00CCBB"
          />
        )}
      </MapView>
    </View>
  );
};

export default DeliveryScreen;
