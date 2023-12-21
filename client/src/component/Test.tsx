import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Message } from "../../../types/message";
import { sendMessage } from "../socket/socket";

const Test = () => {
  const messages = useAppSelector((state) => state.messages.messages);

  const [message, setMessage] = useState<string>("");

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="20px"
      w="100%"
      h="100%"
    >
      <Text>Snakker</Text>
      <Input onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={() => sendMessage(message)}>Send</Button>
      <Text>Messages</Text>
      <Flex direction="column">
        {messages.map((m: Message, i: number) => (
          <Text key={i}>{m.content}</Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default Test;
