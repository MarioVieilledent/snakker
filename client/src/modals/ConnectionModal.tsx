import { useAppSelector } from "@store/hooks";
import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../../server/types/user";
import { defaultGuestUser } from "@/constants";
import { tryToConnectSocket } from "@/socket/socket";
import { getTokenLS, getUserLS } from "@/localStorage";

const ConnectionModal = () => {
  const user = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isNicknameError = username === "";
  const isPasswordError = password === "";

  const tryToConnect = (u: string, p: string): void => {
    const user: User = {
      username: u,
      password: p,
    };
    tryToConnectSocket(user);
  };

  useEffect(() => {
    const userTemp = getUserLS();
    if (userTemp.username === defaultGuestUser || !getTokenLS()) {
      // If no user saved in localEtorage, or token empty, open connection tab
      onOpen();
    } else {
      // Else, we try to connect once
      tryToConnect(userTemp.username, userTemp.password ?? "");
    }
    if (user.user.token) {
      onClose();
    }
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("pleaseConnect")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={isNicknameError}>
            <FormLabel>{t("usernameOrEmail")}</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {!isNicknameError ? (
              <FormHelperText>{t("usernameOrEmailHelper")}</FormHelperText>
            ) : (
              <FormErrorMessage>{t("mandatory")}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isPasswordError}>
            <FormLabel>{t("password")}</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isNicknameError ? (
              <FormHelperText>{t("passwordHelper")}</FormHelperText>
            ) : (
              <FormErrorMessage>{t("passwordRequired")}</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            {t("cancelAction")}
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => tryToConnect(username, password)}
          >
            {t("connectAction")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectionModal;
