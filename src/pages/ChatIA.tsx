import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";
import { useEffect } from "react";

export const ChatIA = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://macarron.app.n8n.cloud/webhook/39f4e31d-bd73-4bb6-a32f-c57c36a55c1a/chat",
      webhookConfig: {
        method: "POST",
        headers: {},
      },
      target: "#n8n-chat",
      mode: "window",
      chatInputKey: "chatInput",
      chatSessionKey: "sessionId",
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: "en",
      initialMessages: [
        "Hi there! 👋",
        "My name is Nathan. How can I assist you today?",
      ],
      i18n: {
        en: {
          title: "Hi there! 👋",
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: "",
          getStarted: "New Conversation",
          inputPlaceholder: "Type your question..",
          closeButtonTooltip: "Close the chat",
        },
      },
      enableStreaming: false,
    });
  }, []);

  return <div id="n8n-chat" style={{ height: "500px" }}></div>;
};
