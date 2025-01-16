import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import useVideoStore from "@/context/videoStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface EditModalProps {
    onClose: () => void;
    isEditModeOn: () => void;
}

const EditModal = ({ onClose, isEditModeOn }: EditModalProps) => {
    const { id } = useLocalSearchParams();
    const { deleteVideo } = useVideoStore();

    const handleDelete = () => {
        Alert.alert(
            "Delete Memory",
            "Are you sure you want to delete this memory?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteVideo(id as string);
                        router.back();
                    },
                },
            ]
        );
    };

    return (
        <View className="absolute right-4 top-32 z-50 bg-dark-background rounded-xl">
            <View className="bg-dark-foreground rounded-xl overflow-hidden shadow-lg border border-gray-700">
                <TouchableOpacity
                    onPress={() => {
                        isEditModeOn();
                        onClose();
                    }}
                    className="flex-row items-center px-4 py-3 border-b border-gray-700"
                >
                    <FontAwesome name="edit" size={16} color="#facc15" />
                    <Text className="text-white text-base ml-3">
                        Edit Memory
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        handleDelete();
                        onClose();
                    }}
                    className="flex-row items-center px-4 py-3"
                >
                    <FontAwesome name="trash" size={16} color="#ef4444" />
                    <Text className="text-red-500 text-base ml-3">
                        Delete Memory
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditModal;
