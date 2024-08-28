import { SendEmailToClientType } from "@/components/Posts/ContactToClient";
import { BACKEND_API_URL } from "@/main";

const useSendEmail = () => {
  const sendMessage = async ({
    from,
    to,
    subject,
    text,
    html,
  }: SendEmailToClientType) => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/message/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ from, subject, text, to, html }),
      });
      const Data = await res.json();
      console.log("Send email responce : ", Data);
    } catch (error) {
      console.log(`Error while send email: `, error);
    }
  };
  return { sendMessage };
};

export default useSendEmail;
