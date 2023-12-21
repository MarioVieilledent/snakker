import { Input, Flex, Image, Button } from "@chakra-ui/react";
import { useState } from "react";
import Messages from "./Messages";

import sendIcon from "/icons/sendIcon.svg";
import emojiIcon from "/icons/emojiIcon.svg";

const Chat = () => {
  const gap = "8px";
  const headerFooterHeight = "48px";
  const headerColor = "#222";
  const appBgColor = "#333";

  const [input, setInput] = useState<string>("");

  console.log(sendIcon);

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
              onChange={(e: any) => setInput(e.target.value)}
            />
          </Flex>
          <Button h="100%" bgColor="transparent" w={headerFooterHeight} p={gap}>
            {input ? <Image src={sendIcon} alt="send icon" /> : <Flex></Flex>}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Chat;
