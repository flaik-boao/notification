import { useContext } from "react";
import { Context } from "./Notification";

export default function useNotification() {
  const { open, close, closeAll }: any = useContext(Context);
  return { open, close, closeAll };
}
