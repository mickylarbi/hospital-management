-- DropForeignKey
ALTER TABLE "ActionSchedule" DROP CONSTRAINT "ActionSchedule_planItemId_fkey";

-- DropForeignKey
ALTER TABLE "Checklist" DROP CONSTRAINT "Checklist_doctorPatientId_fkey";

-- DropForeignKey
ALTER TABLE "DoctorPatients" DROP CONSTRAINT "DoctorPatients_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "DoctorPatients" DROP CONSTRAINT "DoctorPatients_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_doctorPatientId_fkey";

-- DropForeignKey
ALTER TABLE "PlanAction" DROP CONSTRAINT "PlanAction_planId_fkey";

-- AddForeignKey
ALTER TABLE "DoctorPatients" ADD CONSTRAINT "DoctorPatients_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorPatients" ADD CONSTRAINT "DoctorPatients_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_doctorPatientId_fkey" FOREIGN KEY ("doctorPatientId") REFERENCES "DoctorPatients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_doctorPatientId_fkey" FOREIGN KEY ("doctorPatientId") REFERENCES "DoctorPatients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanAction" ADD CONSTRAINT "PlanAction_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionSchedule" ADD CONSTRAINT "ActionSchedule_planItemId_fkey" FOREIGN KEY ("planItemId") REFERENCES "PlanAction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
