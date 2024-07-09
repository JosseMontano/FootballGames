-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_teamDivisionId_fkey";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "teamDivisionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamDivisionId_fkey" FOREIGN KEY ("teamDivisionId") REFERENCES "TeamDivision"("id") ON DELETE SET NULL ON UPDATE CASCADE;
