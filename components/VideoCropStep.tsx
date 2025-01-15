import React from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import VideoCropper from "./VideoCropper";
import { useCropVideo } from "@/lib/utils";

const VideoCropStep = ({
    videoUri,
    onProceed,
    videoDuration,
}: {
    videoUri: string;
    onProceed: (croppedUri: string) => void;
    videoDuration: number;
}) => {
    const cropVideoMutation = useCropVideo();

    const handleCropComplete = async ({
        startTime,
        endTime,
    }: {
        startTime: number;
        endTime: number;
    }) => {
        cropVideoMutation.mutate(
            { videoUri, startTime, endTime },
            {
                onSuccess: (croppedUri) => {
                    onProceed(croppedUri);
                },
                onError: (error) => {
                    Alert.alert("Error", "Failed to crop video");
                    console.error(error);
                },
            }
        );
    };

    return (
        <View className="flex-1 w-full bg-dark-background">
            {cropVideoMutation.isPending ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#facc15" />
                </View>
            ) : (
                <VideoCropper
                    videoUri={videoUri}
                    onCropComplete={handleCropComplete}
                    videoDuration={videoDuration}
                />
            )}
        </View>
    );
};

export default VideoCropStep;
