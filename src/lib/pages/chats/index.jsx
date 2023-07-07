import axios from "axios";
import { BASE_URL } from "../../helpers/base_url";
import { useEffect, useState } from "react";

const Chats = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchChats = async () => {
        const { data } = await axios.get(`${BASE_URL}/chats`);
        setChats(data);
        setLoading(false);
    };
    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div className="flex justify-center">
            <div>
                <h2> Chats </h2>
                {loading ? (
                    <i
                        className="pi pi-spin pi-spinner"
                        style={{ fontSize: "2rem" }}
                    ></i>
                ) : (
                    chats?.map((chat) => (
                        <li key={chat?._id}>{chat?.chatName}</li>
                    ))
                )}
            </div>
        </div>
    );
};

export default Chats;
