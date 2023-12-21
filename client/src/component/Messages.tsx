import { Flex } from "@chakra-ui/react";
import { Message } from "../../../server/types/message";
import { useAppSelector } from "../store/hooks";

const Messages = (props: any) => {
  const messages = useAppSelector((state) => state.messages.messages);

  return (
    <Flex w="100%" h="100%" flexDirection="column-reverse" {...props}>
      {messages.map((m: Message, i: number) => (
        <Flex key={i}>{m.content}</Flex>
      ))}
    </Flex>
  );
};

export default Messages;
