import create from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

const useVideoStore = create(
    persist(
        (set) => ({
            videos: [],
            addVideo: (video) =>
                set((state) => ({
                    videos: [...state.videos, video],
                })),
            updateVideo: (id, updatedData) =>
                set((state) => ({
                    videos: state.videos.map((video) =>
                        video.id === id ? { ...video, ...updatedData } : video
                    ),
                })),
            getVideoById: (id) => (state) =>
                state.videos.find((video) => video.id === id),
        }),
        {
            name: "video-store",
            getStorage: () => AsyncStorage,
        }
    )
);

export default useVideoStore;
