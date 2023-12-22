import { Flex, Text } from "@chakra-ui/react";
import { Message } from "../../../server/types/message";

export interface SingleMessageProps {
  message: Message;
}

const SingleMessage = ({ message, ...props }: SingleMessageProps) => {
  const formatDate = (date: string): string => {
    return date;
  };

  const self = (): boolean => true;

  return (
    <Flex
      maxW="80%"
      direction="column"
      borderRadius="6px"
      p="6px"
      alignSelf={self() ? "flex-end" : "flex-start"}
      bgColor={self() ? "#338" : "#444"}
      {...props}
    >
      <Text fontSize="xs">{message.author}</Text>
      <Text fontSize="sm">{message.content}</Text>
      <Text fontSize="xs" alignSelf="flex-end">
        {formatDate(message.date)}
      </Text>
    </Flex>
  );
};

export default SingleMessage;
