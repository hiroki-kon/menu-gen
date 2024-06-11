import { Button, Form, TextArea } from "tamagui";
import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

interface Props {
  onSubmit: (value: string) => void;
  placeholder: string;
  buttonText: string;
  width: `${string}%`;
}

export function RecommendInputForm(props: Props) {
  const { onSubmit, placeholder, buttonText, width } = props;
  const [input, setInput] = useState<string>("");

  return (
    <>
      <Form
        alignItems="center"
        width={width}
        gap="$2"
        onSubmit={() => onSubmit(input)}
      >
        <TextArea
          size="$4"
          width="100%"
          placeholder={placeholder}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            setInput(e.nativeEvent.text);
          }}
        />
        <Form.Trigger asChild>
          <Button bg="$yellow9Light" width={"100%"}>
            {buttonText}
          </Button>
        </Form.Trigger>
      </Form>
    </>
  );
}
