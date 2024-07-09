/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TeamDivision` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `TeamDivision` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamDivision" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TeamDivision_name_key" ON "TeamDivision"("name");
