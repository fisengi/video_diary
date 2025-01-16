import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface VideoData {
    id: string;
    name: string;
    desc: string;
    videoUri: string;
    date: string;
}

interface VideoStore {
    videos: VideoData[];
    addVideo: (video: Omit<VideoData, "id" | "date">) => void;
    updateVideo: (id: string, data: Partial<VideoData>) => void;
    getVideoById: (id: string) => VideoData | undefined;
    deleteVideo: (id: string) => void;
}

const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

const useVideoStore = create(
    persist<VideoStore>(
        (set, get) => ({
            videos: [],
            addVideo: (videoData) => {
                set((state) => ({
                    videos: [
                        ...state.videos,
                        {
                            ...videoData,
                            id: generateUniqueId(),
                            date: new Date().toISOString(),
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
