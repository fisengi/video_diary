import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import empty from "../assets/images/empty.png";

const EmptyDiary = () => {
    return (
        <View className="flex items-center justify-center">
            <Image
                source={empty}
                resizeMode="contain"
                className="w-[300px] h-[300px]"
            />

            <Text
                className="font-bold text-white text-4xl"
                style={{ fontFamily: "AmaticBold" }}
            >
                No memory added
            </Text>
            <TouchableOpacity className="flex-row rounded-xl bg-yellow-500 justify-center items-center px-3 py-3 shadow-md gap-2 my-5 w-full min-h-[50px]">
                <Text className="text-m font-semibold">
                    Add Your First Memory!
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default EmptyDiary;
