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

const ConnectionModal = () => {
  const user = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isNicknameError = nickname === "";
  const isPasswordError = password === "";

  const tryToConnect = (): void => {
    const user: User = {
      nickname,
      password,
    };
    tryToConnectSocket(user);
  };

  useEffect(() => {
    if (user.user.id === defaultGuestUser) {
      onOpen();
    }
    if (user.user.token) {
      onClose();
    }
  }, [user]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("pleaseConnect")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={isNicknameError}>
            <FormLabel>{t("nickname")}</FormLabel>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {!isNicknameError ? (
              <FormHelperText>{t("nicknameHelper")}</FormHelperText>
            ) : (
              <FormErrorMessage>{t("nicknameRequired")}</FormErrorMessage>
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
          <Button colorScheme="blue" mr={3} onClick={tryToConnect}>
            {t("connectAction")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectionModal;
