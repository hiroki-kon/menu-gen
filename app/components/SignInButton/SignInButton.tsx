import { Github } from "@tamagui/lucide-icons";
import { Button } from "tamagui";

interface Props {
    onPress: () => void
}

export function SignInButton({onPress}: Props) {
  return (
    <>
      <Button onPress={onPress} icon={<Github />}>GitHubでサインイン</Button>
    </>
  );
}
