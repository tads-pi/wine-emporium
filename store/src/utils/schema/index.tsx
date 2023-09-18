import { z } from 'zod'

export const userLoginFormSchema = z.object({
        name: z.string().nonempty('O campo do nome deve estar preenchido'),
        document: z.string().nonempty('O campo de CPF deve estar preenchido').min(14, { message: 'Digite seu CPF' }),
        email: z.string().nonempty('O campo de email deve estar preenchido').email('Digite um e-mail válido'),
        password: z.string().nonempty('O campo de senha deve estar preenchido').min(5, 'Senha fraca').min(10, 'Senha média').min(15, 'Senha forte'),
        group: z.string().nonempty('O campo de grupo deve estar preenchido'),
  })