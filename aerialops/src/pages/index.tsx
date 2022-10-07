import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import { trpc } from "../utils/trpc";
import styles from "./Home.module.scss";

export default function IndexPage() {
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const [file, setFile] = useState<any>(null);
  const [text, setText] = useState<string>("");
  const { data, refetch } = trpc.useQuery(["msg.list"]);
  const addMessage = trpc.useMutation(["msg.add"], {
    onSuccess: () => refetch(),
  });
  const onSend = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length) {
      addMessage.mutate({ text, hasImage: file ? true : false, file });
      setText("");
      setFile(null);
    }
  };
  const uploadImage = (e: any) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setFile(reader.result);
      };
    }
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);
  const destructTime = (time: Date) => {
    let days =
      Math.abs(new Date().valueOf() - new Date(time).valueOf()) /
      (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    if (days > 1) {
      return new Date(time).toDateString();
    } else if (hours > 1) {
      return `${Math.round(hours)} hour ago`;
    } else {
      return `${Math.round(minutes)} min ago`;
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.chat_wrapper}>
        <div className={styles.chat_inner_window}>
          {data &&
            data?.map((chat: any, idx: number) => (
              <div ref={bottomRef} key={idx}>
                <div className={styles.text_wrap}>
                  <p>{chat.text}</p>
                  {chat.imgUrl && (
                    <img src={chat.imgUrl} className={styles.uploaded_img} />
                  )}
                </div>
                <span>{destructTime(chat.createdAt)}</span>
              </div>
            ))}
        </div>
        <div className={styles.input_wrapper}>
          <form onSubmit={onSend}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.input_message}
              placeholder="Type.."
            />
            <label htmlFor="file-upload" className={styles.custom_file}>
              <img
                src="https://img.icons8.com/nolan/64/attach.png"
                className={styles.attach_img}
              />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/jpeg image/png"
              onChange={(e) => uploadImage(e)}
            />
            <button className={styles.send}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
