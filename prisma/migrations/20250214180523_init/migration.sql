/*
  Warnings:

  - Added the required column `notes` to the `DoctorPatients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DoctorPatients" ADD COLUMN     "checklists" TEXT[],
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "plans" TEXT[];
