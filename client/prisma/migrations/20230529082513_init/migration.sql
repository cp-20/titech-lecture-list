-- AddForeignKey
ALTER TABLE "LecturePeriod" ADD CONSTRAINT "LecturePeriod_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
