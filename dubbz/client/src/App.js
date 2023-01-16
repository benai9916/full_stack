import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const baseUrl = "http://127.0.0.1:8000";
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState(undefined);

  const fetchData = () => {
    console.log("callled");
    axios.get(`${baseUrl}/api/v1/chat`).then((res) => setChatData(res.data));
  };
  const handlePost = () => {
    if (message.length > 0) {
      axios.post(`${baseUrl}/api/v1/chat`, { message: message }).then((res) => {
        console.log(res.data);
        setChatData((prev) => [...prev, res.data]);
      });
      setMessage("");
    } else {
      alert("please enter message");
    }
  };
  const handleMessage = (event) => {
    setMessage(event.target.value);
  };
  const handleDeleteAll = () => {
    let token = prompt("Enter token");
    axios
      .delete(`${baseUrl}/api/v1/chat`, { data: { token: token } })
      .then((res) => setChatData(res.data))
      .catch((err) => alert(err.message));
  };
  const handleDelete = (id) => {
    let token = prompt("Enter token");
    axios
      .delete(`${baseUrl}/api/v1/chat/${id}`, { data: { token: token } })
      .catch((err) => alert(err.message));
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(chatData);

  return (
    <div className="chat">
      <h4>Chatter</h4>
      <p>Type something in the box below and hit "post"!</p>
      <div>
        <input
          type="text"
          name="message"
          value={message}
          onChange={handleMessage}
        />
        <button onClick={handlePost}>Post</button>
        <button onClick={handleDeleteAll}>Delete all</button>
      </div>
      {chatData &&
        chatData?.map((itm, id) => (
          <div key={id} className="messages">
            <div>
              <span>
                <b>~anonymous</b> -{" "}
                {new Date(itm?.created_at).toLocaleTimeString()}
              </span>
              <span onClick={() => handleDelete(itm?.id)}>Delete</span>
            </div>
            <p>{itm?.message}</p>
          </div>
        ))}
    </div>
  );
};

export default App;
