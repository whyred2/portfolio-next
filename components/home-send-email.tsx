import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

import { MailForm } from "@/components/mail-form";
import { Phone, Screen } from "@/components/ui/phone";
import { Icons } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

export function SendMail() {
  useGSAP(() => {
    const mailTitle = document.querySelector(".mail_title") as HTMLElement;
    const mailOr = document.querySelector(".mail_or") as HTMLElement;
    const mailTrigger = document.querySelector(".mail_trigger") as HTMLElement;

    const titleWidth = mailTitle.offsetWidth;
    gsap.set(mailTitle, { x: -(titleWidth * 1.2) });
    gsap.set(mailOr, { y: 500 });
    gsap.set(".phone", { x: 400 });

    gsap.to(mailTitle, {
      x: 0,
      ease: "power4",
      scrollTrigger: {
        trigger: mailTrigger,
        start: "top center",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    gsap.to(mailOr, {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: mailTrigger,
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    gsap.to(".phone", {
      x: 0,
      ease: "power2",
      scrollTrigger: {
        trigger: mailTrigger,
        start: "top 20%",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });
  });

  return (
    <div className="mail_trigger bg-slate-100 m-5 rounded-lg overflow-hidden relative h-[calc(100vh-104px)] flex items-center justify-evenly">
      <div className="mail_title absolute top-[80px] left-0 bg-info text-3xl text-white p-5 rounded-r-lg">
        Связаться со мной можно через
      </div>
      <MailForm />
      <div className="relative h-4/6 w-px bg-black/30 flex items-center justify-center">
        <div className="mail_or absolute z-10 -left-[60px] bg-active text-2xl text-white h-32 w-32 rounded-lg -rotate-12 flex items-center justify-center">
          или
        </div>
      </div>
      <Phone className="phone">
        <Screen>
          <div className="grid">
            <h3 className="text-2xl">Соц-сети и почту:</h3>
            <div className="grid gap-2 text-xl">
              <Link
                href="https://t.me/whyred72"
                className="relative bg-violet-800 px-3 py-4 rounded-sm overflow-hidden group"
                target="_blank"
              >
                <div className="absolute inset-0 bg-gray-900 text-white rounded-sm flex gap-3 items-center justify-center translate-x-0 transition-transform duration-300 group-hover:-translate-x-full">
                  <Icons.telegram className="w-6 h-6" /> Telegram
                </div>
                <p>@whyred72</p>
              </Link>

              <Link
                href="https://www.instagram.com/dima74181"
                className="relative bg-violet-900 px-3 py-4 rounded-sm overflow-hidden group"
                target="_blank"
              >
                <div className="absolute inset-0 bg-gray-900 text-white rounded-sm flex gap-3 items-center justify-center translate-x-0 transition-transform duration-300 group-hover:-translate-x-full">
                  <Icons.insta className="w-6 h-6" /> Instagram
                </div>
                @dima74181
              </Link>

              <div className="relative bg-violet-900 px-3 py-4 rounded-sm overflow-hidden group">
                <div className="absolute inset-0 bg-gray-900 text-white rounded-sm flex gap-3 items-center justify-center translate-x-0 transition-transform duration-300 group-hover:-translate-x-full">
                  <Icons.mail className="w-6 h-6" /> Email
                </div>
                <p>dima74181@gmail.com</p>
              </div>
            </div>
            <div className="text-2xl flex flex-col items-center mt-4">
              <Icons.arrowUp className="w-10 h-10" />
              <p>Просто наведись</p>
            </div>
          </div>
        </Screen>
      </Phone>
    </div>
  );
}
