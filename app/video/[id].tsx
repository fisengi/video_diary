import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Video } from "expo-av";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VideoDetails = () => {
    const { id } = useLocalSearchParams();

    const videoDetails = {
        id: id,
        name: "Beautiful Memory",
        desc: "This is a wonderful memory from our trip to the mountains last summer. The weather was perfect and the views were breathtaking.",
        date: "January 25, 2025",
        video: "path_to_video",
    };

    return (
        <SafeAreaView className="flex-1 bg-dark-background">
            <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-secondary/20 items-center justify-center"
                >
                    <FontAwesome name="arrow-left" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">
                    {videoDetails.date}
                </Text>
                <TouchableOpacity onPress={() => {}} className="justify-center">
                    <FontAwesome name="edit" size={25} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{ height: SCREEN_HEIGHT * 0.6 }} className="w-full ">
                <Image
                    source={require("../../assets/images/react-logo.png")}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <TouchableOpacity
                    className="absolute inset-0 items-center justify-center"
                    onPress={() => {
                        /**/
                    }}
                >
                    <View className="w-16 h-16 rounded-full bg-secondary/80 items-center justify-center">
                        <FontAwesome name="play" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
                <View className="p-4 space-y-4">
                    <View>
                        <Text className="text-2xl font-bold text-white mb-2">
                            {videoDetails.name}
                        </Text>
                        <Text className="text-gray-400 leading-6">
                            {videoDetails.desc}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default VideoDetails;
