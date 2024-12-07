/*
  Warnings:

  - You are about to drop the column `userImage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "userImage",
ADD COLUMN     "image" TEXT;
