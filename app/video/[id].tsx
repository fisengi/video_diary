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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useVideoStore from "@/context/videoStore";
import { Video, ResizeMode } from "expo-av";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VideoDetails = () => {
    const { id } = useLocalSearchParams();
    const { getVideoById, deleteVideo } = useVideoStore();
    const videoDetails = getVideoById(id as string);

    if (!videoDetails) {
        return null;
    }

    return (
        <SafeAreaView className="flex-1 bg-dark-background">
            <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-secondary/20 items-center justify-center"
                >
                    <FontAwesome name="arrow-left" size={20} color="white" />
                </TouchableOpacity>
                {/* <Text className="text-white text-xl font-bold">
                    {videoDetails.date}
                </Text> */}
                <TouchableOpacity
                    onPress={() => {
                        // todo: add delete confirmation and edit video functionality
                        deleteVideo(videoDetails.id);
                        router.back();
                        console.log("deleted");
                    }}
                    className="justify-center"
                >
                    <FontAwesome name="edit" size={25} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{ height: SCREEN_HEIGHT * 0.6 }} className="w-full">
                <Video
                    source={{ uri: videoDetails.videoUri }}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={false}
                />
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
