import { Flex } from "@chakra-ui/react";
import { Message } from "../../../../server/types/message";
import { useAppSelector } from "../../store/hooks";
import SingleMessage from "./SingleMessage";

const Messages = (props: any) => {
  const messages = useAppSelector((state) => state.messages.messages);

  return (
    <Flex
      w="100%"
      h="100%"
      flexDirection="column-reverse"
      overflowY="auto"
      gap="12px"
      p="12px"
      {...props}
    >
      {messages.map((mes: Message, i: number) => (
        <SingleMessage message={mes} key={i} />
      ))}
    </Flex>
  );
};

export default Messages;
