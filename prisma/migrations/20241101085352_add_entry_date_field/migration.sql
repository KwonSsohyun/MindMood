/*
  Warnings:

  - Added the required column `entry_date` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "entry_date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "update_date" DROP NOT NULL;
