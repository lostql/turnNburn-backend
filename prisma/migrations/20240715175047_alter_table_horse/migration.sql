/*
  Warnings:

  - Added the required column `volume` to the `Horse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `horse` ADD COLUMN `volume` DOUBLE NOT NULL;
