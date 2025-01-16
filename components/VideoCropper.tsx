import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, Image, Dimensions } from "react-native";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import Slider from "@react-native-community/slider";
import * as VideoThumbnails from "expo-video-thumbnails";

const SCREEN_WIDTH = Dimensions.get("window").width;
const FRAME_WIDTH = (SCREEN_WIDTH - 48) / 6;

const VideoCropper = ({
    videoUri,
    videoDuration,
    onCropComplete,
}: {
    videoUri: string;
    videoDuration: number;
    onCropComplete: (crop: { startTime: number; endTime: number }) => void;
}) => {
    const videoRef = useRef<ExpoVideo>(null);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(Math.min(5, videoDuration));
    const [frames, setFrames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const generateFrames = async () => {
        try {
            setIsLoading(true);
            const newFrames = [];
            const frameCount = 6;

            const interval = videoDuration / (frameCount - 1);

            for (let i = 0; i < frameCount; i++) {
                try {
                    // should round the time because thumbnail cannot be generated sometimes if round is not done
                    const timeInSeconds = i * interval;
                    console.log(
                        `Generating thumbnail for time: ${timeInSeconds}s`
                    );

                    const { uri } = await VideoThumbnails.getThumbnailAsync(
                        videoUri,
                        {
                            time: Math.round(timeInSeconds) * 1000,
                            quality: 0.3,
                        }
                    );
                    console.log(`Generated thumbnail: ${uri}`);
                    newFrames.push(uri);
                } catch (e) {
                    console.warn(`Failed to generate thumbnail ${i}:`, e);
                }
            }

            if (newFrames.length > 0) {
                console.log(`Generated ${newFrames.length} thumbnails`);
                setFrames(newFrames);
            }
        } catch (error) {
            console.error("Error in generateFrames:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (videoUri) {
            console.log("Starting thumbnail generation for:", videoUri);
            generateFrames();
        }
    }, [videoUri]);

    const handleSliderChange = async (value: number) => {
        const newStartTime = Math.max(0, Math.min(value, videoDuration - 5));
        setStartTime(newStartTime);
        setEndTime(Math.min(newStartTime + 5, videoDuration));

        if (videoRef.current) {
            await videoRef.current.setPositionAsync(newStartTime * 1000);
        }
    };

    return (
        <View className="flex-1 w-full bg-dark-background p-4">
            <View className="w-full h-[300px] rounded-xl overflow-hidden mb-4">
                <ExpoVideo
                    ref={videoRef}
                    source={{ uri: videoUri }}
                    style={{ flex: 1 }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={false}
                />
            </View>

            <View className="flex-column justify-between items-center">
                <Text className="text-white text-base mb-2 mt-4">
                    Start: {startTime.toFixed(1)}s End: {endTime.toFixed(1)}s
                </Text>

                <View className="w-full">
                    <Slider
                        style={{ width: "100%", height: 40 }}
                        minimumValue={0}
                        maximumValue={Math.max(0, videoDuration - 5)}
                        step={0.5}
                        value={startTime}
                        minimumTrackTintColor="#facc15"
                        maximumTrackTintColor="#4b5563"
                        thumbTintColor="#facc15"
                        onValueChange={handleSliderChange}
                    />

                    <View className="h-20 mt-2">
                        <View className="flex-row justify-between w-full">
                            {(isLoading ? Array(6).fill(null) : frames).map(
                                (frame, index) => (
                                    <View
                                        key={index}
                                        style={{ width: FRAME_WIDTH }}
                                        className={`h-20 rounded-md overflow-hidden border border-gray-600 ${
                                            isLoading ? "bg-gray-700" : ""
                                        }`}
                                    >
                                        {!isLoading && frame && (
                                            <Image
                                                source={{ uri: frame }}
                                                className="w-full h-full"
                                                resizeMode="cover"
                                            />
                                        )}
                                    </View>
                                )
                            )}
                        </View>

                        <View
                            className="absolute top-0 h-20 bg-yellow-500/20 border-2 border-yellow-500"
                            style={{
                                left: `${(startTime / videoDuration) * 100}%`,
                                width: `${
                                    ((endTime - startTime) / videoDuration) *
                                    100
                                }%`,
                            }}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => onCropComplete({ startTime, endTime })}
                    className="rounded-xl bg-yellow-500 justify-center items-center my-5 w-full min-h-[50px]"
                >
                    <Text className="text-m font-semibold">
                        Crop and Proceed
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default VideoCropper;
