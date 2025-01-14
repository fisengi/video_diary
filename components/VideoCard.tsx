import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface VideoProps {
    video: {
        id: string;
        name: string;
        desc: string;
        video: string;
    };
}

const VideoCard = ({ video }: VideoProps) => {
    const [play, setPlay] = useState(false);

    return (
        <View className="w-full h-[500px] flex flex-col items-center justify-center p-4 border-2 border-red-900 rounded-xl">
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
                activeOpacity={0.7}
                onPress={() => setPlay(true)}
                className="w-full h-[80%] rounded-xl flex justify-center items-center"
            >
                <Image
                    source={require("../assets/images/react-logo.png")}
                    className="w-full h-full rounded-xl border-2 border-white"
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </View>
    );
};

export default VideoCard;
