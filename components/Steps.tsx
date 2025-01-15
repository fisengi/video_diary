import { Text, View } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const Steps = ({ step }: { step: number }) => {
    return (
        <View className="flex-row justify-between items-center px-4 py-3 mt-5">
            <View className="flex-column items-center">
                <View
                    className={`w-16 h-16 rounded-full items-center justify-center ${
                        step >= 1 ? "bg-yellow-500" : "bg-secondary/20"
                    }`}
                >
                    {step > 1 ? (
                        <FontAwesome name="check" size={24} color="white" />
                    ) : (
                        <Text className="text-white text-2xl text-bold">1</Text>
                    )}
                </View>
                <Text className="text-white text-lg font-bold mt-2">
                    Select Video
                </Text>
            </View>

            {/* Connecting Line */}
            <View
                className="flex-1 items-center justify-center"
                style={{ marginTop: -20 }}
            >
                <View
                    className={`h-1 w-full rounded-full ${
                        step > 1 ? "bg-yellow-500" : "bg-secondary/20"
                    }`}
                />
            </View>

            <View className="flex-column items-center">
                <View
                    className={`w-16 h-16 rounded-full items-center justify-center ${
                        step >= 2 ? "bg-yellow-500" : "bg-secondary/20"
                    }`}
                >
                    {step > 2 ? (
                        <FontAwesome name="check" size={24} color="white" />
                    ) : (
                        <Text className="text-white text-2xl text-bold">2</Text>
                    )}
                </View>
                <Text className="text-white text-lg font-bold mt-2">
                    Crop Video
                </Text>
            </View>

            {/* Connecting Line */}
            <View
                className="flex-1 items-center justify-center"
                style={{ marginTop: -20 }}
            >
                <View
                    className={`h-1 w-full rounded-full ${
                        step > 2 ? "bg-yellow-500" : "bg-secondary/20"
                    }`}
                />
            </View>

            <View className="flex-column items-center">
                <View
                    className={`w-16 h-16 rounded-full items-center justify-center ${
                        step === 3 ? "bg-yellow-500" : "bg-secondary/20"
                    }`}
                >
                    <Text className="text-white text-2xl text-bold">3</Text>
                </View>
                <Text className="text-white text-lg font-bold mt-2">
                    Add Details
                </Text>
            </View>
        </View>
    );
};

export default Steps;
