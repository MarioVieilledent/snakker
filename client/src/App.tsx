import { useToast } from "@chakra-ui/react";
import Chat from "./components/Chat";
import ConnectionModal from "./modals/ConnectionModal";
import { useEffect } from "react";
import { useAppSelector } from "@store/hooks";
import { toastDuration } from "./constants";
import { useTranslation } from "react-i18next";

function App() {
  const socketEvent = useAppSelector((state) => state.socketEvent);

  const { t } = useTranslation();

  const toastConnectionOk = useToast();
  const toastWrongPassword = useToast();
  const toastNotAllowed = useToast();

  useEffect(() => {
    if (socketEvent.event === "connectionOk") {
      toastConnectionOk({
        title: t("connectionSuccess"),
        description: t("connectionSuccessDescription"),
        status: "success",
        duration: toastDuration,
        isClosable: true,
      });
    } else if (socketEvent.event === "connectionFailed") {
      toastWrongPassword({
        title: t("connectionError"),
        description: t("connectionErrorWrongPassword"),
        status: "error",
        duration: toastDuration,
        isClosable: true,
      });
    } else if (socketEvent.event === "notAllowed") {
      toastNotAllowed({
        title: t("notAllowed"),
        description:
          t("notAllowedDescription") + ": " + socketEvent.description,
        status: "warning",
        duration: toastDuration,
        isClosable: true,
      });
    }
  }, [socketEvent]);

  return (
    <>
      <Chat />
      <ConnectionModal />
    </>
  );
}

export default App;
