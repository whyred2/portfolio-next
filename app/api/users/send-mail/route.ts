import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response("Все поля обязательны для заполнения", { status: 400 });
    }

    await prisma.mail.create({
      data: {
        name,
        email,
        message,
      },
    });

    return new Response("Сообщение успешно отправлено", { status: 200 });
  } catch (error) {
    console.error("Ошибка при обработке запроса:", error);
    return new Response("Не удалось отправить сообщение", { status: 500 });
  }
}