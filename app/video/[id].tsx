import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
    Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useVideoStore from "@/context/videoStore";
import { Video, ResizeMode } from "expo-av";
import EditModal from "@/components/EditModal";
import { useState } from "react";
import FormField from "@/components/FormField";
import { KeyboardAvoidingView } from "react-native";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VideoDetails = () => {
    const { id } = useLocalSearchParams();
    const { getVideoById, updateVideo } = useVideoStore();
    const videoDetails = getVideoById(id as string);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [name, setName] = useState(videoDetails?.name);
    const [desc, setDesc] = useState(videoDetails?.desc);

    if (!videoDetails) {
        return null;
    }

    const handleSave = () => {
        Alert.alert("Save", "Are you sure you want to save?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Save",
                onPress: () => {
                    setIsEditModeOn(false);
                    updateVideo(id as string, {
                        ...videoDetails,
                        name: name,
                        desc: desc,
                    });
                },
            },
        ]);
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
                {/* <Text className="text-white text-xl font-bold">
                    {videoDetails.date}
                </Text> */}
                <TouchableOpacity
                    onPress={() => setIsEditModalOpen(!isEditModalOpen)}
                    className="w-10 h-10 rounded-full bg-secondary/20 items-center justify-center"
                >
                    <FontAwesome name="ellipsis-v" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    height: isEditModeOn
                        ? SCREEN_HEIGHT * 0.4
                        : SCREEN_HEIGHT * 0.6,
                }}
                className="w-full"
            >
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView className="flex-1">
                    <View className="p-4 space-y-4">
                        <View>
                            {isEditModeOn ? (
                                <FormField
                                    title="Name"
                                    value={name || ""}
                                    placeholder="Name"
                                    handleChangeText={(onChange) => {
                                        setName(onChange);
                                    }}
                                    onBlur={() => {}}
                                />
                            ) : (
                                <Text className="text-2xl font-bold text-white mb-2">
                                    {videoDetails.name}
                                </Text>
                            )}
                            {isEditModeOn ? (
                                <FormField
                                    title="Description"
                                    value={desc || ""}
                                    placeholder="Description"
                                    handleChangeText={(onChange) => {
                                        setDesc(onChange);
                                    }}
                                    onBlur={() => {}}
                                />
                            ) : (
                                <Text className="text-gray-400 leading-6">
                                    {videoDetails.desc}
                                </Text>
                            )}
                            {isEditModeOn && (
                                <TouchableOpacity
                                    onPress={() => {
                                        handleSave();
                                    }}
                                    className="rounded-xl bg-yellow-500 justify-center items-center my-5 w-full min-h-[50px] flex-row mb-10"
                                >
                                    <Text className="text-m font-semibold">
                                        Save
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {isEditModalOpen && (
                <>
                    <TouchableOpacity
                        className="absolute inset-0 bg-black/20 z-40"
                        onPress={() => setIsEditModalOpen(false)}
                    />
                    <EditModal
                        onClose={() => setIsEditModalOpen(false)}
                        isEditModeOn={() => setIsEditModeOn(true)}
                    />
                </>
            )}
        </SafeAreaView>
    );
};

export default VideoDetails;
