import { useForm } from 'react-hook-form'

export const BasicForm = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data:unknown) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='type' {...register('username')} placeholder='Usuario' />
      <input type='password' {...register('password')} placeholder='Password' />
      <input type='password' {...register('confirmPassword')} placeholder='Confirm' />
      <button type='submit'> Enviar </button>
    </form>
  )
}
