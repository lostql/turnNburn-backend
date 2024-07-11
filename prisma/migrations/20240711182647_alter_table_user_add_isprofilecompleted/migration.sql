-- AlterTable
ALTER TABLE `user` ADD COLUMN `isProfileCompleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `firstName` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `authProvider` ENUM('EMAIL', 'PHONE', 'FACEBOOK', 'GOOGLE', 'APPLE') NULL,
    MODIFY `dob` DATETIME(3) NULL,
    MODIFY `gender` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `state` VARCHAR(191) NULL,
    MODIFY `profileUrl` TEXT NULL;
