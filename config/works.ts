import { WorksConfig } from "@/types/index"

export const worksConfig: WorksConfig = {
    works: [
        {
            id: 1,
            title: "BLURX",
            description: "BLURX — это веб-приложение на React, посвященное фильмам и сериалам.",
            features: [
                "Добавление фильмов и сериалов в избранное.",
                "Просмотр трейлеров через встроенные видеоплееры.",
                "Полностью адаптивный дизайн для разных устройств.",
                "Плавные CSS-анимации для улучшения пользовательского опыта.",
                "Интеграция с внешним API для получения актуальной информации.",
            ],
            libraries: [
                "React — для построения пользовательского интерфейса.",
                "Axios — для работы с API.",
                "React Router — для маршрутизации.",
                "Express — для серверной обработки.",
            ],
            logoImage: "/images/logos/BLURX.svg",
            logoWidth: 150,
            video: "/video/BLURX.mp4",
            demoLink: "",
            gitHubLink: "https://github.com/whyred2/blurx",
            youtubeLink: "https://www.youtube.com/watch?v=Zi_vGm5J928",
            href: "/works/blurx",
        },
        {
            id: 2,
            title: "CUBE",
            description: "Cube — следующая работа. Находится в разработке...",
            features: [
                "Уникальные функции ожидаются.",
            ],
            libraries: [
                "Next.js — для серверного рендеринга и маршрутизации.",
                "React — для построения пользовательского интерфейса.",
            ],
            logoImage: "/images/logos/CUBE.svg",
            logoWidth: 60,
            video: "",
            demoLink: "",
            gitHubLink: "",
            youtubeLink: "",
            href: "/works/cube",
        },
    ],
};
