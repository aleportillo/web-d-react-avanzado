import { useForm } from 'react-hook-form'
import './index.css'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useReducer, useState } from 'react'

const schema = yup.object({
  userInput: yup
    .string()
    .min(3, 'El mensaje debe tener minimo 3 caracteres')
    .required('El mensaje es obligatorio'),
})

export const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePregunta = async (data:{ userInput: string }) => {
    console.log(data)
    setLoading(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handlePregunta)}>
        <input
          type='text' {...register('userInput')}
          className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        {errors.userInput && <p>{errors.userInput.message}</p>}
        <button className='w-full py-2 rounded transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700'> Preguntar </button>
      </form>
      {/* <div>
        <p> {loading ? 'Generando respuesta' : response} </p>
      </div> */}
      <div>
        {state.messages.map((msg, index) => {
          return (
            <p key={index}>
              <b>
                {msg.from === 'user' ? 'Tú' : 'Bot'}:
              </b>
              {msg.text}
            </p>
          )
        })}
      </div>
    </>
  )
}
