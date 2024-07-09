/*
  Warnings:

  - Added the required column `teamDivisionId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "teamDivisionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TeamDivision" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamDivision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamDivisionId_fkey" FOREIGN KEY ("teamDivisionId") REFERENCES "TeamDivision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
