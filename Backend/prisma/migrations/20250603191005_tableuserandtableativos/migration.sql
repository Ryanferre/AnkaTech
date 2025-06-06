-- CreateTable
CREATE TABLE `clienteuser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `clienteuser_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ativoscripto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ativos` JSON NOT NULL,
    `valorTotal` DECIMAL(10, 2) NOT NULL,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clienteuser` ADD CONSTRAINT `clienteuser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ativoscripto` ADD CONSTRAINT `ativoscripto_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clienteuser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
