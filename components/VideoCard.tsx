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
    };
}

const VideoCard = ({ video }: VideoProps) => {
    const [thumbnailUri, setThumbnailUri] = useState<string | null>(null);

    useEffect(() => {
        generateThumbnail();
    }, [video.videoUri]);

    const generateThumbnail = async () => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                video.videoUri,
                {
                    time: 0,
                    quality: 0.5,
                }
            );
            setThumbnailUri(uri);
        } catch (e) {
            console.warn("Thumbnail generation failed:", e);
        }
    };

    return (
        <View className="w-full h-[500px] flex flex-col items-center justify-center p-4 rounded-xl">
            {/* header*/}
            <View className="flex flex-row items-center w-full mb-4">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="flex flex-col flex-1 ml-3 gap-y-1">
                        <Text
                            className="font-bold text-xl text-white"
                            numberOfLines={1}
                        >
                            {video.name}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => router.push(`/video/${video.id}`)}
                className="w-full h-[80%] rounded-xl flex justify-center items-center border-2 border-yellow-500/55"
            >
                {thumbnailUri ? (
                    <Image
                        source={{ uri: thumbnailUri }}
                        className="w-full h-full rounded-xl"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="w-full h-full rounded-xl bg-secondary/20 items-center justify-center">
                        <Text className="text-white text-lg font-bold">
                            No Thumbnail
                        </Text>
                    </View>
                )}
                <View className="absolute inset-0 items-center justify-center">
                    <View className="w-16 h-16 rounded-full bg-black/50 items-center justify-center">
                        <FontAwesome name="play" size={30} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
            <View className="flex items-center justify-center mt-3">
                <Text className="text-gray-400 text-lg ">{video.desc}</Text>
            </View>
        </View>
    );
};

export default VideoCard;
