import { PrismaClient } from '@prisma/client';
import type {
  lecture,
  lectureQuarter,
  lecturesResponse,
} from '@/schema/lectures';
import type { lecturePlace } from '@/schema/lectures';
import type { searchQuery } from '@/schema/searchQuery';

export const searchLectures = async (
  searchQuery: searchQuery,
): Promise<lecturesResponse | undefined> => {
  const prisma = new PrismaClient();

  const titleQuery = searchQuery.title
    ? { title_ja: { contains: searchQuery.title } }
    : {};

  const teachersQuery = searchQuery.teacher
    ? { teachers: { hasSome: searchQuery.teacher } }
    : {};

  const codeQuery = searchQuery.code
    ? { code_grade: { in: searchQuery.code } }
    : {};

  const quarterQuery = searchQuery.quarter
    ? { quarter: { hasSome: searchQuery.quarter } }
    : {};

  const languageQuery = searchQuery.language
    ? { language: { in: searchQuery.language } }
    : {};

  const placeQuery = {
    periods: {
      some: {
        period: {
          in: searchQuery.period,
        },
        day: {
          in: searchQuery.day,
        },
      },
    },
  };

  try {
    const page = searchQuery.page ?? 1;
    const limit = searchQuery.limit ?? 50;

    const filteredLectures = await prisma.lecture.findMany({
      where: {
        AND: [
          {
            ...titleQuery,
            ...teachersQuery,
            ...codeQuery,
            ...quarterQuery,
            ...languageQuery,
            ...placeQuery,
          },
        ],
      },
      include: { periods: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    const structuredLectures: lecture[] = filteredLectures.map((lecture) => ({
      code: {
        grade: lecture.code_grade as 100 | 200 | 300 | 400 | 500 | 600,
        value: lecture.code_value,
      },
      title: {
        ja: lecture.title_ja,
        en: lecture.title_en ?? undefined,
      },
      teachers: lecture.teachers,
      credit: lecture.credit,
      language: lecture.language as '日本語' | '英語',
      quarter: lecture.quarter as lectureQuarter,
      year: lecture.year,
      origin: lecture.origin,
      link: lecture.link,
      place: {
        type: lecture.place_type,
        value: lecture.place_value,
        periods: lecture.periods.map((period) => ({
          day: period.day,
          period: period.period,
          classroom: period.classroom,
        })),
      } as lecturePlace,
    }));

    return {
      finish: structuredLectures.length === 0,
      lectures: structuredLectures,
    };
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};
