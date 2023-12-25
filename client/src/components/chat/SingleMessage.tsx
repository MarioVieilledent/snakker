import { Flex, Text } from "@chakra-ui/react";
import { Message } from "../../../../server/types/message";
import { useAppSelector } from "@/store/hooks";

export interface SingleMessageProps {
  message: Message;
}

const SingleMessage = ({ message, ...props }: SingleMessageProps) => {
  const user = useAppSelector((state) => state.user);

  const formatDate = (dateStr: string): string => {
    const date: Date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isToday) {
      return `today - ${formatTime(date)}`;
    } else if (isYesterday) {
      return `yesterday - ${formatTime(date)}`;
    } else {
      return `${padNumber(date.getDate())}/${padNumber(
        date.getMonth() + 1,
      )}/${date.getFullYear().toString().slice(-2)} - ${formatTime(date)}`;
    }
  };

  function formatTime(date: Date): string {
    const hours = padNumber(date.getHours());
    const minutes = padNumber(date.getMinutes());
    return `${hours}:${minutes}`;
  }

  function padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  const self = (): boolean => message.username === user.user.username;

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
      <Text fontSize="xs">{message.username}</Text>
      <Text fontSize="sm">{message.content}</Text>
      <Text fontSize="xs" alignSelf="flex-end">
        {formatDate(message.date)}
      </Text>
    </Flex>
  );
};

export default SingleMessage;
