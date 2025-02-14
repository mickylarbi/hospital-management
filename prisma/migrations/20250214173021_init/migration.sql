/*
  Warnings:

  - A unique constraint covering the columns `[patientId,doctorId]` on the table `DoctorPatients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DoctorPatients_patientId_doctorId_key" ON "DoctorPatients"("patientId", "doctorId");
