import { Icons } from "@/components/icons";

export default function PortfolioPage() {
  return (
    <div className="w-full h-full p-5 rounded-lg bg-gradient-to-tl from-purple-600 to-indigo-600 animate-slideIn">
      <div className="flex items-center gap-5 text-white">
        <Icons.arrowLeft className="w-20 h-20 " />
        <h2 className="text-5xl">Выберите проект</h2>
      </div>
    </div>
  );
}
