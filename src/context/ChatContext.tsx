import { createContext, useReducer, type ReactNode } from 'react'

// ----- INTERFACES

interface Message {
  from: string
  text: string
}

interface ChatState {
  messages: Message[]
  loading: boolean
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }

interface ChatContextType {
  state: ChatState
  dispatch: React.Dispatch<ChatAction>
}

interface ChatProviderProps {
  children: ReactNode
}

// ------- CONTEXT

export const ChatContext = createContext<ChatContextType | undefined>(undefined)

const initialState = {
  messages: [],
  loading: false
}

const chatReducer = (
  state: ChatState,
  action: ChatAction
) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}
//   const [, dispatch] = useReducer(chatReducer, initialState)

// dispatch({ type: 'ADD_MESSAGE', payload: { from: 'user', text: userPrompt } })
// dispatch({ type: 'ADD_MESSAGE', payload: { from: 'bot', text: res.data.response } })
export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>
}
