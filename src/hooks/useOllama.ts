import axios from 'axios'

export const useOllama = () => {
  const sendMessage = async (userPrompt: string) => {
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama2',
        prompt: userPrompt,
        stream: false
      })
      return res
    } catch (error) {
      console.error('Error', error)
    }
  }

  return { sendMessage }
}
