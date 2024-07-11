-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `authProvider` ENUM('EMAIL', 'PHONE', 'FACEBOOK', 'GOOGLE', 'APPLE') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` TEXT NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `profileUrl` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserNote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Association` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `cnic` VARCHAR(191) NOT NULL,
    `veterinarian` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `horseName` VARCHAR(191) NOT NULL,
    `registrationNumber` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `feed` TEXT NOT NULL,
    `maintenanceSupplements` TEXT NOT NULL,
    `scheduledTime` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Horse_horseName_key`(`horseName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NOT NULL,
    `horseUrl` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseHotel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `stallCost` INTEGER NOT NULL,
    `rvHookUp` BOOLEAN NOT NULL,
    `rvCost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseSupplementsExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `items` TEXT NOT NULL,
    `purchasedAt` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseMedicationDeliverySystemsExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `items` TEXT NOT NULL,
    `purchasedAt` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseInsuranceExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `policyStartDate` DATETIME(3) NOT NULL,
    `policyEndDate` DATETIME(3) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseFeedsPurchaseExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `items` TEXT NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseBeddingExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserHorseAssociation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `horseId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssociationEarnings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userHorseAssociationId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseVeterinaryTreatmentExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `illness` VARCHAR(191) NOT NULL,
    `treatment` BOOLEAN NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseGeneralMaintenanceVeterinary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `horseId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseVaccineExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veterinaryId` INTEGER NOT NULL,
    `vaccineName` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseWomingExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veterinaryId` INTEGER NOT NULL,
    `Date` DATETIME(3) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseTruckInsuranceExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horseId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `truckName` VARCHAR(191) NOT NULL,
    `policyStartDate` DATETIME(3) NOT NULL,
    `policyEndDate` DATETIME(3) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserHorseFarrier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `horseId` INTEGER NOT NULL,
    `farrierName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `shoeSize` VARCHAR(191) NOT NULL,
    `nailSize` VARCHAR(191) NOT NULL,
    `nailType` VARCHAR(191) NOT NULL,
    `shoeingNotes` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HorseFarrierExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userHorseFarrierId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `cost` INTEGER NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserVehicleMaintenanceExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `repair` TEXT NOT NULL,
    `mileage` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTrailerMaintenanceExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `repair` TEXT NOT NULL,
    `mileage` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTackExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `item` TEXT NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPerformanceClothing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `item` TEXT NOT NULL,
    `purchasedAt` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTrailerInsuranceExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `trailer` VARCHAR(191) NOT NULL,
    `policyStartDate` DATETIME(3) NOT NULL,
    `policyEndDate` DATETIME(3) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGasExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `miles` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAssociationMembershipsExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `association` VARCHAR(191) NOT NULL,
    `membershipNumber` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserContactInfoMemberships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emergencyContact` VARCHAR(191) NOT NULL,
    `membershipNumber` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRodeoExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `eventName` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `circuitAssociation` VARCHAR(191) NOT NULL,
    `moneyAdded` INTEGER NOT NULL,
    `edo` VARCHAR(191) NOT NULL,
    `ec` VARCHAR(191) NOT NULL,
    `confirmation` VARCHAR(191) NOT NULL,
    `firstRunPreference` VARCHAR(191) NOT NULL,
    `secondRunPreference` VARCHAR(191) NOT NULL,
    `callBackDate` DATETIME(3) NOT NULL,
    `buddy` VARCHAR(191) NOT NULL,
    `cardNumber` VARCHAR(191) NOT NULL,
    `tradeDeadline` VARCHAR(191) NOT NULL,
    `trade` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RodeoDraw` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRodeoExpenseId` INTEGER NOT NULL,
    `firstGo` VARCHAR(191) NOT NULL,
    `secondGo` VARCHAR(191) NOT NULL,
    `shortGo` VARCHAR(191) NOT NULL,
    `entries` VARCHAR(191) NOT NULL,
    `stallsAvailable` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RodeoDraw_userRodeoExpenseId_key`(`userRodeoExpenseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RodeoArena` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRodeoExpenseId` INTEGER NOT NULL,
    `arenaLocation` VARCHAR(191) NOT NULL,
    `travelTime` TIME NOT NULL,
    `miles` INTEGER NOT NULL,
    `direction` VARCHAR(191) NOT NULL,
    `arenaSize` INTEGER NOT NULL,
    `patternSize` INTEGER NOT NULL,
    `location` ENUM('Indoor', 'Outdoor') NOT NULL,
    `groundConditions` ENUM('Indoor', 'Outdoor') NOT NULL,
    `notes` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RodeoArena_userRodeoExpenseId_key`(`userRodeoExpenseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RodeoResults` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRodeoExpenseId` INTEGER NOT NULL,
    `firstGoWinningTime` TIME NOT NULL,
    `firstGoMyTime` TIME NOT NULL,
    `secondGoWinningTime` TIME NOT NULL,
    `secondGoMyTime` TIME NOT NULL,
    `averageWinningTime` TIME NOT NULL,
    `averageWinningMyTime` TIME NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RodeoResults_userRodeoExpenseId_key`(`userRodeoExpenseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StallsBoarding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rodeoId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rodeoId` INTEGER NOT NULL,
    `restaurant` VARCHAR(191) NOT NULL,
    `eventName` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lodging` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rodeoId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EntryFees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rodeoId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `fees` INTEGER NOT NULL,
    `circuitFees` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bedding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rodeoId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRodeoAssociation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rodeoId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RodeoAssociationEarning` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rodeoAssociationId` INTEGER NOT NULL,
    `horseId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `earned` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserNote` ADD CONSTRAINT `UserNote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Association` ADD CONSTRAINT `Association_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vet` ADD CONSTRAINT `Vet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horse` ADD CONSTRAINT `Horse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseImage` ADD CONSTRAINT `HorseImage_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseHotel` ADD CONSTRAINT `HorseHotel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseSupplementsExpense` ADD CONSTRAINT `HorseSupplementsExpense_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseMedicationDeliverySystemsExpense` ADD CONSTRAINT `HorseMedicationDeliverySystemsExpense_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseInsuranceExpense` ADD CONSTRAINT `HorseInsuranceExpense_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseFeedsPurchaseExpense` ADD CONSTRAINT `HorseFeedsPurchaseExpense_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseBeddingExpense` ADD CONSTRAINT `HorseBeddingExpense_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHorseAssociation` ADD CONSTRAINT `UserHorseAssociation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHorseAssociation` ADD CONSTRAINT `UserHorseAssociation_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssociationEarnings` ADD CONSTRAINT `AssociationEarnings_userHorseAssociationId_fkey` FOREIGN KEY (`userHorseAssociationId`) REFERENCES `UserHorseAssociation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseVeterinaryTreatmentExpense` ADD CONSTRAINT `HorseVeterinaryTreatmentExpense_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseGeneralMaintenanceVeterinary` ADD CONSTRAINT `HorseGeneralMaintenanceVeterinary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseGeneralMaintenanceVeterinary` ADD CONSTRAINT `HorseGeneralMaintenanceVeterinary_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseVaccineExpense` ADD CONSTRAINT `HorseVaccineExpense_veterinaryId_fkey` FOREIGN KEY (`veterinaryId`) REFERENCES `HorseGeneralMaintenanceVeterinary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseWomingExpense` ADD CONSTRAINT `HorseWomingExpense_veterinaryId_fkey` FOREIGN KEY (`veterinaryId`) REFERENCES `HorseGeneralMaintenanceVeterinary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseTruckInsuranceExpense` ADD CONSTRAINT `HorseTruckInsuranceExpense_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHorseFarrier` ADD CONSTRAINT `UserHorseFarrier_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHorseFarrier` ADD CONSTRAINT `UserHorseFarrier_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HorseFarrierExpense` ADD CONSTRAINT `HorseFarrierExpense_userHorseFarrierId_fkey` FOREIGN KEY (`userHorseFarrierId`) REFERENCES `UserHorseFarrier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVehicleMaintenanceExpense` ADD CONSTRAINT `UserVehicleMaintenanceExpense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTrailerMaintenanceExpense` ADD CONSTRAINT `UserTrailerMaintenanceExpense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTackExpense` ADD CONSTRAINT `UserTackExpense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPerformanceClothing` ADD CONSTRAINT `UserPerformanceClothing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTrailerInsuranceExpense` ADD CONSTRAINT `UserTrailerInsuranceExpense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGasExpense` ADD CONSTRAINT `UserGasExpense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssociationMembershipsExpense` ADD CONSTRAINT `UserAssociationMembershipsExpense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserContactInfoMemberships` ADD CONSTRAINT `UserContactInfoMemberships_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRodeoExpense` ADD CONSTRAINT `UserRodeoExpense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RodeoDraw` ADD CONSTRAINT `RodeoDraw_userRodeoExpenseId_fkey` FOREIGN KEY (`userRodeoExpenseId`) REFERENCES `UserRodeoExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RodeoArena` ADD CONSTRAINT `RodeoArena_userRodeoExpenseId_fkey` FOREIGN KEY (`userRodeoExpenseId`) REFERENCES `UserRodeoExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RodeoResults` ADD CONSTRAINT `RodeoResults_userRodeoExpenseId_fkey` FOREIGN KEY (`userRodeoExpenseId`) REFERENCES `UserRodeoExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StallsBoarding` ADD CONSTRAINT `StallsBoarding_rodeoId_fkey` FOREIGN KEY (`rodeoId`) REFERENCES `UserRodeoExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meals` ADD CONSTRAINT `Meals_rodeoId_fkey` FOREIGN KEY (`rodeoId`) REFERENCES `UserRodeoExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lodging` ADD CONSTRAINT `Lodging_rodeoId_fkey` FOREIGN KEY (`rodeoId`) REFERENCES `UserRodeoExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntryFees` ADD CONSTRAINT `EntryFees_rodeoId_fkey` FOREIGN KEY (`rodeoId`) REFERENCES `UserRodeoExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bedding` ADD CONSTRAINT `Bedding_rodeoId_fkey` FOREIGN KEY (`rodeoId`) REFERENCES `UserRodeoExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRodeoAssociation` ADD CONSTRAINT `UserRodeoAssociation_rodeoId_fkey` FOREIGN KEY (`rodeoId`) REFERENCES `UserRodeoExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RodeoAssociationEarning` ADD CONSTRAINT `RodeoAssociationEarning_rodeoAssociationId_fkey` FOREIGN KEY (`rodeoAssociationId`) REFERENCES `UserRodeoAssociation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RodeoAssociationEarning` ADD CONSTRAINT `RodeoAssociationEarning_horseId_fkey` FOREIGN KEY (`horseId`) REFERENCES `Horse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
