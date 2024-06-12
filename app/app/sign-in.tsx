import { router } from "expo-router";
import { Text, View } from "react-native";

import { useSession } from "../ctx";
import { SignInButton } from "@/components/SignInButton/SignInButton";

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SignInButton
        onPress={() => {
          signIn("/");
        }}
      />
    </View>
  );
}
