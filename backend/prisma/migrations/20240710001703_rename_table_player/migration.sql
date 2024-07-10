/*
  Warnings:

  - You are about to drop the column `Age` on the `Player` table. All the data in the column will be lost.
  - Added the required column `age` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "Age",
ADD COLUMN     "age" INTEGER NOT NULL;
