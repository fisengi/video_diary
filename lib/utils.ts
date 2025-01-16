import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";
import { useMutation } from "@tanstack/react-query";

interface CropVideoParams {
    videoUri: string;
    startTime: number;
    endTime: number;
}

const cropVideo = async ({
    videoUri,
    startTime,
}: CropVideoParams): Promise<string> => {
    const fileExtension = videoUri.substring(videoUri.lastIndexOf("."));
    const baseUri = videoUri.substring(0, videoUri.lastIndexOf("."));

    const outputUri = `${baseUri}_cropped${fileExtension}`;

    const command = `-ss ${startTime} -i ${videoUri} -to ${
        startTime + 5
    } -c copy ${outputUri}`;

    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();
    if (ReturnCode.isSuccess(returnCode)) {
        return outputUri;
    } else if (ReturnCode.isCancel(returnCode)) {
        throw new Error("FFmpeg cropping cancelled");
    } else {
        throw new Error("FFmpeg cropping failed");
    }
};

const useCropVideo = () => {
    return useMutation<string, Error, CropVideoParams>({
        mutationFn: cropVideo,
        onSuccess: () => {
            console.log("Video cropped successfully!");
        },
        onError: (error: any) => {
            console.error("Error cropping video:", error);
        },
    });
};
export { useCropVideo };
