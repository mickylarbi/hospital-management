/*
  Warnings:

  - You are about to drop the `ActionSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlanAction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `action` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActionSchedule" DROP CONSTRAINT "ActionSchedule_planItemId_fkey";

-- DropForeignKey
ALTER TABLE "PlanAction" DROP CONSTRAINT "PlanAction_planId_fkey";

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "action" TEXT NOT NULL;

-- DropTable
DROP TABLE "ActionSchedule";

-- DropTable
DROP TABLE "PlanAction";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "planId" UUID NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "timeOfDay" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
