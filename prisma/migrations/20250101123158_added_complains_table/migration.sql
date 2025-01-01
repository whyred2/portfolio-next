-- CreateTable
CREATE TABLE "Complains" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER,
    "type" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Complains_pkey" PRIMARY KEY ("id")
);
