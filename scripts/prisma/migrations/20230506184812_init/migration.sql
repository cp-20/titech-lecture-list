/*
  Warnings:

  - You are about to drop the `LectureQuarter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LectureTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "quarter" TEXT[],
ADD COLUMN     "teachers" TEXT[];

-- DropTable
DROP TABLE "LectureQuarter";

-- DropTable
DROP TABLE "LectureTeacher";
