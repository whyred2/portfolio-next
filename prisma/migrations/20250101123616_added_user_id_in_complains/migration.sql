-- AlterTable
ALTER TABLE "Complains" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Complains" ADD CONSTRAINT "Complains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
