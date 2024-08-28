import { SendEmailToClientType } from "@/components/Posts/ContactToClient";
import { BACKEND_API_URL } from "@/main";
import { useState } from "react";
import { toast } from "react-toastify";

const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const sendMessage = async ({
    from,
    to,
    subject,
    text,
    html,
  }: SendEmailToClientType) => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_API_URL}/api/message/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ from, subject, text, to, html }),
      });
      const Data = await res.json();
      console.log("Send Email API-Responce: ", Data);
      setLoading(false);
      if (Data.message != "Email sent successfully") {
        toast.error("Error while sending!");
        return;
      }

      toast.success(Data.message);
    } catch (error) {
      toast.error("Check Your Internet");
    }
  };
  return { sendMessage, loading };
};

export default useSendEmail;
