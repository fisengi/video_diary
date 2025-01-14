import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as VideoThumbnails from "expo-video-thumbnails";

interface VideoProps {
    video: {
        id: string;
        name: string;
        desc: string;
        videoUri: string;
        date?: string;
        thumbnail: string;
    };
}

const VideoCard = ({ video }: VideoProps) => {
    return (
        <View className="w-full h-[500px] flex flex-col items-center justify-center p-4 rounded-xl">
            {/* header*/}
            <View className="flex flex-row items-center w-full mb-4">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[60px] h-[60px] rounded-xl  flex justify-center items-center p-0.5 bg-secondary">
                        <View className="flex items-center">
                            <Text className="text-xs font-bold text-white">
                                JAN
                            </Text>
                            <Text className="text-lg font-extrabold text-white">
                                25
                            </Text>
                            <Text className="text-xs font-medium text-white">
                                2025
                            </Text>
                        </View>
                    </View>

                    <View className="flex flex-col flex-1 ml-3 gap-y-1">
                        <Text
                            className="font-bold text-xl text-white"
                            numberOfLines={1}
                        >
                            {video.name}
                        </Text>
                        <Text
                            className="text-l text-gray-100 font-pregular"
                            numberOfLines={1}
                        >
                            {video.desc}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => router.push(`/video/${video.id}`)}
                className="w-full h-[80%] rounded-xl flex justify-center items-center"
            >
                <Image
                    source={{ uri: video.thumbnail || video.videoUri }}
                    className="w-full h-full rounded-xl border-2 border-white"
                    resizeMode="cover"
                />
                <View className="absolute inset-0 items-center justify-center">
                    <View className="w-16 h-16 rounded-full bg-black/50 items-center justify-center">
                        <FontAwesome name="play" size={30} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default VideoCard;
