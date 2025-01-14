import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import useVideoStore from "@/context/videoStore";

import * as ImagePicker from "expo-image-picker";
import { Video, ResizeMode } from "expo-av";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z
        .string()
        .trim()
        .nonempty({ message: "Do not forget to name your memory!" })
        .min(1, { message: "Do not forget to name your memory!" }),
    desc: z
        .string()
        .trim()
        .nonempty({ message: "Do not forget to describe your memory!" })
        .min(1, { message: "Do not forget to describe your memory!" }),
    videoUri: z.string({
        required_error: "Please select a video first!",
    }),
});

type FormData = z.infer<typeof schema>;

const UploadVideo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const { addVideo } = useVideoStore();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            desc: "",
            videoUri: undefined,
        },
    });

    const pickVideo = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert(
                    "Permission Required",
                    "You need to allow access to your media library to upload videos."
                );
                return;
            }

            setIsProcessing(true);

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: false, // :D i could do that crop functionality in here
                quality: 1,
            });

            if (!result.canceled) {
                setValue("videoUri", result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking video:", error);
            Alert.alert("Error", "Failed to pick video. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);

            addVideo(data);

            Alert.alert("Success", "Memory uploaded successfully!", [
                {
                    text: "OK",
                    onPress: () => router.back(),
                },
            ]);
        } catch (error) {
            console.error("Error uploading:", error);
            Alert.alert("Error", "Failed to upload memory. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-dark-background h-full">
                <View className="flex-row items-center justify-between px-4 py-3">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 rounded-full bg-secondary/20 items-center justify-center"
                    >
                        <FontAwesome
                            name="arrow-left"
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-bold">
                        Upload Your Memory
                    </Text>
                </View>
                <View className="flex-1 h-full w-full px-4">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormField
                                title="Name"
                                value={value}
                                placeholder="Name of the video"
                                handleChangeText={onChange}
                                onBlur={onBlur}
                                otherStyles="mt-5"
                            />
                        )}
                    />
                    {errors.name?.message &&
                        typeof errors.name.message === "string" && (
                            <Text className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </Text>
                        )}

                    <Controller
                        control={control}
                        name="desc"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormField
                                title="Description"
                                value={value}
                                placeholder="Description of the video"
                                handleChangeText={onChange}
                                onBlur={onBlur}
                                otherStyles="mt-5"
                            />
                        )}
                    />
                    {errors.desc?.message &&
                        typeof errors.desc.message === "string" && (
                            <Text className="text-red-500 text-sm mt-1">
                                {errors.desc.message}
                            </Text>
                        )}

                    <View className="mt-5 gap-y-2">
                        <Text className="text-base text-gray-100 font-bold">
                            Upload Video
                        </Text>

                        <Controller
                            control={control}
                            name="videoUri"
                            render={({ field: { value } }) => (
                                <TouchableOpacity
                                    onPress={pickVideo}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <View className="w-full h-60 px-4 bg-secondary/20 rounded-2xl border-2 border-secondary/20 flex justify-center items-center">
                                            <ActivityIndicator
                                                size="large"
                                                color="#facc15"
                                            />
                                            <Text className="text-white text-sm mt-4">
                                                Processing video...
                                            </Text>
                                        </View>
                                    ) : value ? (
                                        <View className="w-full rounded-2xl overflow-hidden">
                                            <Video
                                                source={{ uri: value }}
                                                style={{
                                                    width: "100%",
                                                    height: 300,
                                                }}
                                                useNativeControls
                                                resizeMode={ResizeMode.CONTAIN}
                                                isLooping
                                                // onPlaybackStatusUpdate={(
                                                //     status
                                                // ) => setStatus(() => status)}
                                                shouldPlay={false}
                                            />
                                            <View className="mt-2 flex-row items-center justify-between">
                                                <Text className="text-white text-sm">
                                                    Tap to change video
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        setValue("videoUri", "")
                                                    }
                                                    className="bg-red-500/20 p-2 rounded-full"
                                                >
                                                    <FontAwesome
                                                        name="trash"
                                                        size={16}
                                                        color="#ef4444"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ) : (
                                        <View className="w-full h-60 px-4 bg-secondary/20 rounded-2xl border-2 border-secondary/20 flex justify-center items-center">
                                            <View className="w-14 h-14 border border-dashed border-yellow-500 flex justify-center items-center">
                                                <FontAwesome
                                                    name="cloud-upload"
                                                    size={25}
                                                    color="white"
                                                />
                                            </View>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                        {errors.videoUri && (
                            <Text className="text-red-500 text-sm mt-1">
                                {errors.videoUri.message}
                            </Text>
                        )}
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        disabled={isLoading}
                        className={`rounded-xl bg-yellow-500 justify-center items-center my-5 w-full min-h-[50px] flex-row ${
                            isLoading ? "opacity-70" : ""
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <ActivityIndicator color="black" />
                                <Text className="text-m font-semibold ml-2">
                                    Uploading...
                                </Text>
                            </>
                        ) : (
                            <Text className="text-m font-semibold">
                                Upload Your Memory
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default UploadVideo;
