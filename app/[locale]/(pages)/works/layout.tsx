import { WorksNavigation } from "@/components/works-nav";
import { worksConfig } from "@/config/works";

interface WorksLayoutProps {
  children?: React.ReactNode;
}

export default function WorksLayout({ children }: WorksLayoutProps) {
  return (
    <div className="flex items-center gap-5 h-screen w-screen p-5 pt-[84px]">
      <WorksNavigation items={worksConfig.works} />
      {children}
    </div>
  );
}
