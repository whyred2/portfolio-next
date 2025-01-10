import React from "react";
import { notFound } from "next/navigation";

import { worksConfig } from "@/config/works";
import { WorkSection } from "@/components/work-section";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = worksConfig.works.find((item) => item.href === `/works/${slug}`);

  if (!work) {
    notFound();
  }

  return (
    <WorkSection
      work={{
        id: work.id,
        title: work.title,
        description: work.description,
        libraries: work.libraries,
        features: work.features,
        logoImage: work.logoImage,
        logoWidth: work.logoWidth,
        video: work.video,
        demoLink: work.demoLink,
        youtubeLink: work.youtubeLink,
        gitHubLink: work.gitHubLink,
      }}
    />
  );
}
