import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import VideoCard from "../../components/VideoCard";
import EmptyDiary from "../../components/EmptyDiary";
import { router } from "expo-router";
const videoData = [
    { id: "1", name: "ilk video", desc: "deneme 1 2", video: "ilk videomuz" },
    { id: "2", name: "ilk video", desc: "deneme 1 2", video: "ilk videomuz" },
    { id: "3", name: "ilk video", desc: "deneme 1 2", video: "ilk videomuz" },
    { id: "4", name: "ilk video", desc: "deneme 1 2", video: "ilk videomuz" },
    { id: "5", name: "ilk video", desc: "deneme 1 2", video: "ilk videomuz" },
];

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Home = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-dark-background h-full">
                <View className="flex-row justify-between items-center px-4 py-4">
                    <View className="justify-center px-4">
                        <Text
                            className="text-5xl color-dark-icon"
                            style={{ fontFamily: "AmaticBold" }}
                        >
                            Dear Diary
                        </Text>
                    </View>
                    <View className="my-4 px-3">
                        <TouchableOpacity
                            onPress={() => router.push("/upload-video")}
                            className="flex-row rounded-xl bg-yellow-500 justify-center items-center px-3 py-3 shadow-md gap-2"
                        >
                            <FontAwesome name="plus" size={12} />
                            <Text className="text-sm font-semibold">
                                Add New Memory
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="w-full h-[90%]">
                    <FlatList
                        data={videoData}
                        renderItem={({ item }) => <VideoCard video={item} />}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={() => <EmptyDiary />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            padding: 10,
                            gap: 16,
                        }}
                        ItemSeparatorComponent={() => <View className="h-4" />}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Home;
