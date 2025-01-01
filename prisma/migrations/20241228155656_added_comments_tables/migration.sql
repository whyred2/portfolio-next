-- CreateTable
CREATE TABLE "CommentsQuestions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentsQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentsWishes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentsWishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentsReviews" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentsReviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentsQuestions" ADD CONSTRAINT "CommentsQuestions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentsWishes" ADD CONSTRAINT "CommentsWishes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentsReviews" ADD CONSTRAINT "CommentsReviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
