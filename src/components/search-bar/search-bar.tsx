'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  city: z.string().min(3, {
    message: 'Verifique o nome da sua cidade!'
  })
})

export default function SearchComponent() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-row justify-center items-center w-full space-x-4'
      >
        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormControl>
                <Input placeholder='Seu endereço' {...field} />
              </FormControl>
              {/* Mensagem flutuante */}
              <FormMessage className='absolute top-full left-0 text-red-500 text-sm mt-1' />
            </FormItem>
          )}
        />
        <Button type='submit' className='shrink-0 bg-red-600'>
          <MagnifyingGlassIcon />
        </Button>
      </form>
    </Form>
  )
}
