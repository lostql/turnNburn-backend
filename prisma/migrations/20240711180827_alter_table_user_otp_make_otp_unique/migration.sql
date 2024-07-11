/*
  Warnings:

  - A unique constraint covering the columns `[otp]` on the table `UserOtp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserOtp_otp_key` ON `UserOtp`(`otp`);
