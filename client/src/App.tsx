import { useToast } from "@chakra-ui/react";
import Chat from "./components/Chat";
import ConnectionModal from "./modals/ConnectionModal";
import { useEffect } from "react";
import { useAppSelector } from "@store/hooks";
import { toastDuration } from "./constants";
import { useTranslation } from "react-i18next";
import { connectionPromise } from "./socket/socket";

function App() {
  const socketEvent = useAppSelector((state) => state.socketEvent);

  const { t } = useTranslation();

  const toastConnection = useToast();
  const toastNotAllowed = useToast();

  useEffect(() => {
    if (socketEvent.event === "tryToConnect") {
      toastConnection.promise(connectionPromise, {
        success: {
          title: t("connectionSuccess"),
          description: t("connectionSuccessDescription"),
          duration: toastDuration,
          isClosable: true,
        },
        error(e) {
          return {
            title: t("connectionError"),
            description: `${t("connectionErrorReasonColumn")} ${e}`,
            duration: toastDuration,
            isClosable: true,
          };
        },
        loading: {
          title: t("connectionLoading"),
          description: t("connectionLoadingDescription"),
          duration: toastDuration,
          isClosable: true,
        },
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
