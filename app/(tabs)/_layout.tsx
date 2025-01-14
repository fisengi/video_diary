import { Tabs, Slot } from "expo-router";
import React from "react";
import { Colors } from "../../constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const TabLayout = () => {
    return (
        <Slot></Slot>

        // <Tabs
        //     screenOptions={{
        //         tabBarActiveTintColor: Colors["light"].tint,
        //         headerShown: false,
        //     }}
        // >
        //     <Tabs.Screen
        //         name="index"
        //         options={{
        //             title: "Diary",
        //             tabBarIcon: ({ color }) => (
        //                 <FontAwesome5 name="book" size={24} color={color} />
        //             ),
        //         }}
        //     />
        //     <Tabs.Screen
        //         name="upload-video"
        //         options={{
        //             title: "Upload New Video",
        //             tabBarIcon: ({ color }) => (
        //                 <FontAwesome5
        //                     name="cloud-upload-alt"
        //                     size={24}
        //                     color={color}
        //                 />
        //             ),
        //         }}
        //     />
        // </Tabs>
    );
};

export default TabLayout;
