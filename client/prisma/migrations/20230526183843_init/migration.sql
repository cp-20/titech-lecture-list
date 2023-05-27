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
    "quarter" TEXT[],
    "teachers" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LecturePeriod" (
    "id" BIGSERIAL NOT NULL,
    "lecture_id" BIGINT NOT NULL,
    "day" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "classroom" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LecturePeriod_pkey" PRIMARY KEY ("id")
);
