-- CreateTable
CREATE TABLE "Championship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amountTeams" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Championship_pkey" PRIMARY KEY ("id")
);
