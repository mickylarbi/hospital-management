/*
  Warnings:

  - You are about to drop the column `checklists` on the `DoctorPatients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DoctorPatients" DROP COLUMN "checklists";

-- CreateTable
CREATE TABLE "Checklist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "doctorPatientId" UUID NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "doctorPatientId" UUID NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanAction" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "planId" UUID NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "PlanAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionSchedule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "planItemId" UUID NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "timeOfDay" TEXT NOT NULL,

    CONSTRAINT "ActionSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_doctorPatientId_fkey" FOREIGN KEY ("doctorPatientId") REFERENCES "DoctorPatients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanAction" ADD CONSTRAINT "PlanAction_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionSchedule" ADD CONSTRAINT "ActionSchedule_planItemId_fkey" FOREIGN KEY ("planItemId") REFERENCES "PlanAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
