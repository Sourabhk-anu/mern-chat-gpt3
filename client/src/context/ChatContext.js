import {createContext, useContext, useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [newRequestLoading, setNewRequestLoading] = useState(false);

    async function fetchResponse(){
        if(prompt==="") return alert("Write prompt");
        setNewRequestLoading(true);
        setPrompt("");
        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBjp30LBQ7cMYdTdnHyhT97Hg3hv1IBaP4",
                method: "post",
                data: {
                    contents: { 
                        parts: [{ text: prompt }] 
                    }
                },
            });

            const message = {
                question: prompt,
                answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            };

            setMessages((prev) => [...prev, message]);
            setNewRequestLoading(false);
        } catch (error) {
            alert("something went wrong");
            console.log(error);
            setNewRequestLoading(false);
        }
    }

    const [chats, setChats] = useState([]);

//   const [selected, setSelected] = useState(null);

  async function fetchChats() {
    try {
      const { data } = await axios.get('/api/chat/all', {
        headers: {
          token: localStorage.getItem("authToken"),
        },
      });

      setChats(data);
    //   setSelected(data[0]._id);
    } catch (error) {
      console.log(error);
    }
  }

  const [createLod, setCreateLod] = useState(false);

  async function createChat() {
    const token = await localStorage.getItem('authToken');
    // console.log(token);
    axios.post('/api/chat/new', {token: token}
      .then(res => {
        // console.log(res.data)
        setCreateLod(res.data.data);
      })
    )
   }

  // async function createChat() {
  //   setCreateLod(true);
  //   try {
  //     const { data } = await axios.post(
  //       '/api/chat/new',
  //       {},
  //       {
  //         headers: {
  //           token: localStorage.getItem("authToken"),
  //         },
  //       }
  //     );

  //     fetchChats();
  //     setCreateLod(false);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("something went wrong");
  //     setCreateLod(false);
  //   }
  // }

    return <ChatContext.Provider value={{ 
        fetchResponse, 
        messages, 
        prompt, 
        setPrompt, 
        newRequestLoading, 
        chats, 
        createChat, 
        createLod}}
        >
            {children}
        </ChatContext.Provider>
}

export const ChatData = () => useContext(ChatContext);