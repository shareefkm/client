import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import UserAxios from "../Axios/UserAxios";
import EmployeeAxios from "../Axios/EmployeeAxios";
// import { fetchChats, openChat } from "../../api/CommonApi";

function Chat({ senderRole, reciverRole }) {
  const [inboxChats, setInboxChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [socket, setSocket] = useState(null);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const currentPersonId = useSelector((state) =>
    senderRole === "employee" ? state.employee._id : state.user._id
  );

  const currentPersonRole = senderRole === "employee" ? "Employee" : "Users" ;

  // Fetch initial chats
  useEffect(() => {
    EmployeeAxios.get('/chat').then((res)=>{
      setInboxChats(res.data.chats);
    })
  }, [senderRole]);
  console.log(inboxChats);

  // Handle sending a message
  const sendMessage = () => {
    if (newMessage.trim() === "") return; // Prevent sending empty messages
    const newMessageData = {
      content: newMessage,
      chatId: selectedChat._id,
      senderId: { _id: currentPersonId },
      role: currentPersonRole,
      createdAt: new Date(),
    };
    if(senderRole === 'employee'){
      EmployeeAxios.post('/sendmessage',{newMessageData}).then((res)=>{
        console.log(res);
      })
    }else{
      UserAxios.post('/sendmessage',{newMessageData}).then((res)=>{
        console.log(res);
      })
    }
    socket.emit("send message", newMessageData, selectedChat._id);
    setNewMessage(""); // Clear the input field after sending
  };

  // Open a chat and load its messages
  const chatOpen = (chat) => {
    setSelectedChat(chat);
   EmployeeAxios.get(`/openchat?chatId=${chat._id}`).then((res) => {
      setAllMessages(res.data.result);
      console.log(res);
    });
  };

  // Initialize the socket connection
  useEffect(() => {
    const newSocket = io(baseUrl);
    setSocket(newSocket);

    newSocket.on("error", (error) => {
      console.log(error);
    });

    // Cleanup socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [baseUrl]);

  // Join the room and handle incoming messages
  useEffect(() => {
    if (socket && selectedChat) {
      socket.emit("joinroom", selectedChat._id, currentPersonId);
      socket.on("response", (newMessage) => {
        setAllMessages((prev) => [...prev, newMessage]);
      });
    }
  }, [socket, selectedChat, currentPersonId]);

  return (
    <div className="container mx-auto">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required
              />
            </div>
          </div>

          <ul className=" overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            <li>
              {inboxChats.map((chat) => {
                return (
                  <div
                    key={chat._id}
                    onClick={() => chatOpen(chat)}
                    className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                  >
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={
                        chat?.userId.Image ? 
                        chat?.userId.Image : "/images/user.png"
                      }
                      alt="username"
                    />
                    <div className="w-full pb-2">
                      <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-gray-600">
                          {chat?.userId.Name}
                        </span>
                        <span className="block ml-2 text-sm text-gray-600">10 unread messages</span>
                      </div>
                      <span className="block ml-2 text-sm text-gray-600"></span>
                    </div>
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={
                  selectedChat?.[reciverRole]?.Image
                    ? selectedChat?.[reciverRole]?.Image
                    : ""
                }
                alt="username"
              />
              <span className="block ml-2 font-bold text-gray-600">
                {selectedChat?.[reciverRole]?.Name}
              </span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>

            <div className="relative w-full p-6 overflow-y-auto h-[28rem] ">
              {allMessages.map((data, index) => (
                <ul key={index} className="space-y-2">
                  <li
                    className={`${
                      currentPersonId == data.senderId._id
                        ? "flex justify-end"
                        : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`relative max-w-xl px-3 py-1 text-white rounded-3xl shadow border  ${
                        currentPersonId === data.senderId._id
                          ? "bg-blue-500"
                          : "bg-gray-700"
                      } chat-bubble`}
                    >
                      <span className="block">{data.content}</span>
                      <span className="text-xs">
                        {new Date(data.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </li>
                </ul>
              ))}
            </div>

            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <input
                type="text"
                placeholder="Message"
                onChange={(e) => setNewMessage(e.target.value)}
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
              />
              <button type="submit" onClick={sendMessage}>
                <svg
                  className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
