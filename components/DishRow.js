import { View, Text, Image, TouchableOpacity } from "react-native";
import client, { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { useState } from "react";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemssById,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const imageUrl = image ? urlFor(image).url() : null;

  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemssById(state, id));

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (items.length <= 0) return;

    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        key={id}
        onPress={() => setIsPressed(!isPressed)}
        className={`flex-row items-center space-x-3 p-4 border-b border-gray-300 bg-white ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-1">
          <Text className="text-lg font-bold">{name}</Text>
          <Text className="text-gray-500">{description}</Text>
          <Text>
            <Currency quantity={price} currency="USD" />
          </Text>
        </View>
        <View>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} className="w-20 h-20 rounded" />
          ) : (
            <View className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
              <Text>No Image</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color={"#00CCBB"} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
