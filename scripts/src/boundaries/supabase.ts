import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { lecture } from './type';
import { useThread } from '../shared/thread';

const prisma = new PrismaClient();

const lectures = JSON.parse(
  readFileSync('./src/boundaries/lectures.json', 'utf-8')
) as lecture[];

const main = async () => {
  useThread(
    lectures.map((lecture, i) => async () => {
      const transactions = [];

      transactions.push(
        prisma.lecture.create({
          data: {
            id: i,
            link: lecture.link,
            title_ja: lecture.title.ja,
            title_en: lecture.title.en,
            origin: lecture.origin,
            place_type: lecture.place.type,
            place_value:
              lecture.place.type === 'raw' ? lecture.place.value : null,
            code_grade: lecture.code.grade,
            code_value: lecture.code.value,
            credit: lecture.credit,
            year: lecture.year,
            language: lecture.language,
            teachers: {
              create: lecture.teachers.map((teacher) => ({
                lecture_id: i,
                name: teacher,
              })),
            },
            quarter: {
              create: lecture.quarter.map((quarter) => ({
                lecture_id: i,
                quarter: quarter,
              })),
            },
            periods:
              lecture.place.type === 'normal'
                ? {
                    create: lecture.place.periods.map((period) => ({
                      lecture_id: i,
                      day: period.day,
                      period: period.period,
                      classroom: period.classroom,
                    })),
                  }
                : undefined,
          },
        })
      );

      // transactions.push(
      //   ...lecture.teachers.map((teacher) =>
      //     prisma.lectureTeacher.create({
      //       data: {
      //         lecture_id: i,
      //         name: teacher,
      //       },
      //     })
      //   )
      // );

      // transactions.push(
      //   ...lecture.quarter.map((quarter) =>
      //     prisma.lectureQuarter.create({
      //       data: {
      //         lecture_id: i,
      //         quarter: quarter,
      //       },
      //     })
      //   )
      // );

      // if (lecture.place.type === 'normal') {
      //   transactions.push(
      //     ...lecture.place.periods.map((period) =>
      //       prisma.lecturePeriod.create({
      //         data: {
      //           lecture_id: i,
      //           day: period.day,
      //           period: period.period,
      //           classroom: period.classroom,
      //         },
      //       })
      //     )
      //   );
      // }

      await Promise.all(transactions);
    }),
    10
  );
};

main();
