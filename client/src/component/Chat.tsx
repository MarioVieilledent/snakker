import { Input, Flex, Image, Button } from "@chakra-ui/react";
import { sendMessageSocket } from "../socket/socket";
import { useState } from "react";
import Messages from "./Messages";

import emojiIcon from "/icons/emojiIcon.svg";
import sendIcon from "/icons/sendIcon.svg";
import plusIcon from "/icons/plusIcon.svg";

const Chat = () => {
  const gap = "8px";
  const headerFooterHeight = "48px";
  const headerColor = "#222";
  const appBgColor = "#333";

  const [input, setInput] = useState<string>("");

  // Send message via socket.io and empty the input value
  const sendMessage = (): void => {
    sendMessageSocket(input);
    setInput("");
  };

  // When key up on the message input
  const handleClickInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Flex direction="column" w="100" h="100%" bgColor={appBgColor}>
      <Flex h={headerFooterHeight} bgColor={headerColor}></Flex>
      <Flex flexGrow={1}>
        <Messages flexGrow={1} />
      </Flex>
      <Flex h={headerFooterHeight}>
        <Flex w="100%" h="100%">
          <Button h="100%" bgColor="transparent" w={headerFooterHeight} p={gap}>
            <Image src={emojiIcon} alt="emoji icon" />
          </Button>
          <Flex flexGrow={1} py={gap}>
            <Input
              w="100%"
              h="100%"
              placeholder="Message"
              value={input}
              onKeyUp={handleClickInput}
              onChange={(e: any) => setInput(e.target.value)}
            />
          </Flex>
          {input ? (
            <Button
              h="100%"
              bgColor="transparent"
              w={headerFooterHeight}
              p={gap}
              onClick={sendMessage}
            >
              <Image src={sendIcon} alt="send icon" />
            </Button>
          ) : (
            <Button
              h="100%"
              bgColor="transparent"
              w={headerFooterHeight}
              p={gap}
            >
              <Image src={plusIcon} alt="plus icon" />
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Chat;
