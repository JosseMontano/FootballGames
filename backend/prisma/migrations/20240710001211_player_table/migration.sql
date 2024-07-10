-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "ci" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "lastnames" TEXT NOT NULL,
    "Age" INTEGER NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Cellphone" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_ci_key" ON "Player"("ci");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
