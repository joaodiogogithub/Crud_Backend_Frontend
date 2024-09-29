import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  title: string
  message: string
  apiKey: string
}

export function CreateWorkflowForm() {
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
      <Input
        placeholder="Titulo"
        {...register('title', { required: true })}
      />
      <Textarea
        placeholder="Digite sua mensagem"
        {...register('message', { required: true })}
      />
      <div className="max-w-80">
        <Input
          placeholder="Instagram API Key"
          {...register('apiKey', { required: true })}
        />
      </div>
      <div className="flex justify-end">
        <Button>Salvar</Button>
      </div>
    </form>
  )
}
