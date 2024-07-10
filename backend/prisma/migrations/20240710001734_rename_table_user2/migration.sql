/*
  Warnings:

  - You are about to drop the column `Cellphone` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `Photo` on the `Player` table. All the data in the column will be lost.
  - Added the required column `cellphone` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "Cellphone",
DROP COLUMN "Date",
DROP COLUMN "Photo",
ADD COLUMN     "cellphone" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL;
