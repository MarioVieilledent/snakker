import { Flex, Text } from "@chakra-ui/react";
import { socket } from "../socket/socket";

const Test = () => {
  return (
    <Flex>
      <Text>UwU</Text>
      <button onClick={() => socket.emit("test", "Client data")}>Click</button>
    </Flex>
  );
};

export default Test;
