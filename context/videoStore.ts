import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import * as VideoThumbnails from "expo-video-thumbnails";

interface VideoData {
    id: string;
    name: string;
    desc: string;
    videoUri: string;
    date: string;
    thumbnail: string;
}

interface VideoStore {
    videos: VideoData[];
    addVideo: (video: Omit<VideoData, "id" | "date" | "thumbnail">) => void;
    updateVideo: (id: string, data: Partial<VideoData>) => void;
    getVideoById: (id: string) => VideoData | undefined;
    deleteVideo: (id: string) => void;
}

const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

const generateThumbnail = async (videoUri: string) => {
    const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 0,
    });
    return uri;
};

const useVideoStore = create(
    persist<VideoStore>(
        (set, get) => ({
            videos: [],
            addVideo: async (videoData) => {
                const thumbnail = await generateThumbnail(videoData.videoUri);
                set((state) => ({
                    videos: [
                        ...state.videos,
                        {
                            ...videoData,
                            id: generateUniqueId(),
                            date: new Date().toISOString(),
                            thumbnail,
                        },
                    ],
                }));
            },
            updateVideo: (id, updatedData) =>
                set((state) => ({
                    videos: state.videos.map((video) =>
                        video.id === id ? { ...video, ...updatedData } : video
                    ),
                })),
            getVideoById: (id) => get().videos.find((video) => video.id === id),
            deleteVideo: (id) =>
                set((state) => ({
                    videos: state.videos.filter((video) => video.id !== id),
                })),
        }),
        {
            name: "video-store",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useVideoStore;
