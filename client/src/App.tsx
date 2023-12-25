import { useToast } from "@chakra-ui/react";
import Chat from "./components/chat/Chat";
import ConnectionModal from "./modals/ConnectionModal";
import { useEffect, useState } from "react";
import { useAppSelector } from "@store/hooks";
import { toastDuration } from "./constants";
import { useTranslation } from "react-i18next";
import { connectionPromise } from "./socket/socket";
import { getPageLS, setPageLS } from "./localStorage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Diary from "./components/diary/Diary";
import Calendar from "./components/calendar/Calendar";

export type Page = "chat" | "diary" | "calendar";
export const defaultPage: Page = "chat";

function App() {
  const socketEvent = useAppSelector((state) => state.socketEvent);

  const { t } = useTranslation();

  const toastConnection = useToast();
  const toastNotAllowed = useToast();

  const [page, setPage] = useState<Page>();

  useEffect(() => {
    setPage(getPageLS());
  }, []);

  useEffect(() => {
    if (page) {
      setPageLS(page);
    }
  }, [page]);

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Chat />
        </>
      ),
    },
    {
      path: "/diary",
      element: (
        <>
          <Diary />
        </>
      ),
    },
    {
      path: "/calendar",
      element: (
        <>
          <Calendar />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ConnectionModal />
    </>
  );
}

export default App;
