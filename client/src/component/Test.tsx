import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { socket } from "../socket/socket";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addMessage } from "../store/messagesSlice";
import { Message } from "../types";

const Test = () => {
  const messages = useAppSelector((state) => state.messages.messages);

  const [message, setMessage] = useState<string>("");

  const dispatch = useAppDispatch();

  socket.on("test2", (data: Message) => {
    console.log("triggered");
    dispatch(addMessage(data));
  });

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
      <Button onClick={() => socket.emit("test", message)}>Send</Button>
      <Text>Messages</Text>
      <Flex direction="column">
        {messages.map((m: Message, i: number) => (
          <Text key={i}>{m.message}</Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default Test;
