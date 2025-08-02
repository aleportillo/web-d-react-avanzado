import axios from 'axios'

export const useOllama = () => {
  const sendMessage = async (prompt: string) => {
    const res = await axios.post('http://localhost:3001/api/chat', {
      prompt,
    })
    return res
  }

  return { sendMessage }
}
