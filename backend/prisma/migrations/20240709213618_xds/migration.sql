/*
  Warnings:

  - You are about to drop the column `dateEnd` on the `Championship` table. All the data in the column will be lost.
  - You are about to drop the column `dateStart` on the `Championship` table. All the data in the column will be lost.
  - Added the required column `dateend` to the `Championship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datestart` to the `Championship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Championship" DROP COLUMN "dateEnd",
DROP COLUMN "dateStart",
ADD COLUMN     "dateend" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "datestart" TIMESTAMP(3) NOT NULL;
