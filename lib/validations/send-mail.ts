import * as z from "zod";

export const SendMailSchema = z.object({
    name: z.string().min(1, {message: "Имя обязательно"}),
    email: z.string().email({message: "Введите корректный email"}),
    message: z.string().min(10, {message: "Минимальная длина сообщения 10 символов"}).max(1000, {message: "Максимальная длина сообщения 1000 символов"})
})
