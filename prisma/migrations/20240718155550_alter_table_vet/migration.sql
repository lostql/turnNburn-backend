/*
  Warnings:

  - You are about to drop the column `cnic` on the `vet` table. All the data in the column will be lost.
  - Added the required column `clinic` to the `Vet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vet` DROP COLUMN `cnic`,
    ADD COLUMN `clinic` VARCHAR(191) NOT NULL;
