import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import Slider from "@react-native-community/slider";

const VideoCropper = ({
    videoUri,
    videoDuration,
    onCropComplete,
}: {
    videoUri: string;
    videoDuration: number;
    onCropComplete: (crop: { startTime: number; endTime: number }) => void;
}) => {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(5);

    const handleSliderChange = (value: number) => {
        setStartTime(value);
        setEndTime(Math.min(value + 5, videoDuration));
    };

    return (
        <View className="flex-1 w-full bg-dark-background p-4">
            <View className="w-full h-[300px] rounded-xl overflow-hidden mb-4">
                <ExpoVideo
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
                <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={0}
                    maximumValue={videoDuration - 5}
                    step={1}
                    value={startTime}
                    minimumTrackTintColor="#facc15"
                    maximumTrackTintColor="#4b5563"
                    thumbTintColor="#facc15"
                    onValueChange={handleSliderChange}
                />

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
