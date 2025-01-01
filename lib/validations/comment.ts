import * as z from "zod";

export const CommentSchema = z.object({
    message: z.string().min(10, {message: "Минимальная длина сообщения 10 символов"}).max(1000, {message: "Максимальная длина сообщения 1000 символов"})
})
