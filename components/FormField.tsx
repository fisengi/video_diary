import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    onBlur,
    ...props
}: {
    title: string;
    value: string;
    placeholder: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
    onBlur: () => void;
}) => {
    return (
        <View className={`gap-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-bold">{title}</Text>
            <View
                className={`w-full h-16 px-4 bg-secondary/20 rounded-2xl border-2 border-secondary/20 focus:border-secondary flex ${
                    title === "Description" ? "h-32" : ""
                }`}
            >
                <TextInput
                    className="flex-1 text-white font-bold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="gray"
                    onChangeText={handleChangeText}
                    onBlur={onBlur}
                    {...props}
                    multiline={title === "Description"}
                    numberOfLines={title === "Description" ? 4 : 1}
                />
            </View>
        </View>
    );
};

export default FormField;
