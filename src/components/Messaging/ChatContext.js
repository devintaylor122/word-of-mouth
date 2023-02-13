import {
    createContext,
    useContext,
    useReducer,
} from "react";
import { AuthProvider } from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { anyUser } = useAuth();
    const INITIAL_STATE = {
    chatId: "null",
    user: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
        case "CHANGE_USER":
        return {
            user: action.payload,
            chatId:
            anyUser.uid > action.payload.uid
                ? anyUser.uid + action.payload.uid
                : action.payload.uid + anyUser.uid,
        };

        default:
        return state;
    }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
    </ChatContext.Provider>
    );
};

export default ChatContext;