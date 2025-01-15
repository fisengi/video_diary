import { Stack, SplashScreen } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    //YENİ FONTLAR EKLENCEK
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        AmaticRegular: require("../assets/fonts/AmaticSC-Regular.ttf"),
        AmaticBold: require("../assets/fonts/AmaticSC-Bold.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="video/[id]"
                    options={{ headerShown: false }}
                />
            </Stack>
        </QueryClientProvider>
    );
}
