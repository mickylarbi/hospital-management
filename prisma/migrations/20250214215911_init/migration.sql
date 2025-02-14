/*
  Warnings:

  - You are about to drop the column `plans` on the `DoctorPatients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DoctorPatients" DROP COLUMN "plans";

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_doctorPatientId_fkey" FOREIGN KEY ("doctorPatientId") REFERENCES "DoctorPatients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
