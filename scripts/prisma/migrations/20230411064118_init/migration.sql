-- CreateTable
CREATE TABLE "Lecture" (
    "id" BIGSERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "title_ja" TEXT NOT NULL,
    "title_en" TEXT,
    "origin" TEXT NOT NULL,
    "place_type" TEXT NOT NULL,
    "place_value" TEXT,
    "code_grade" INTEGER NOT NULL,
    "code_value" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LecturePeriod" (
    "id" BIGSERIAL NOT NULL,
    "lecture_id" BIGINT NOT NULL,
    "day" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "classroom" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LecturePeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LectureTeacher" (
    "id" BIGSERIAL NOT NULL,
    "lecture_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LectureTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LectureQuarter" (
    "id" BIGSERIAL NOT NULL,
    "lecture_id" BIGINT NOT NULL,
    "quarter" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LectureQuarter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LecturePeriod" ADD CONSTRAINT "LecturePeriod_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureTeacher" ADD CONSTRAINT "LectureTeacher_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureQuarter" ADD CONSTRAINT "LectureQuarter_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
