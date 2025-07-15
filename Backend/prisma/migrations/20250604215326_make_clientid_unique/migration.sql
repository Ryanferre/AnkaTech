/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `ativoscripto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ativoscripto_clientId_key` ON `ativoscripto`(`clientId`);
