-- CreateTable
CREATE TABLE `TireReplacementType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('Trailer', 'Truck') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TireReplacementType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TireReplacementExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `tireReplacementTypeId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `cost` INTEGER NOT NULL,
    `mileage` INTEGER NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TireReplacementExpense` ADD CONSTRAINT `TireReplacementExpense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TireReplacementExpense` ADD CONSTRAINT `TireReplacementExpense_tireReplacementTypeId_fkey` FOREIGN KEY (`tireReplacementTypeId`) REFERENCES `TireReplacementType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
