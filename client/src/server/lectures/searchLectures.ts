import { readFileSync } from 'fs';
import { z } from 'zod';
import type { lecturesResponse } from '@/schema/lectures';
import { lectureSchema } from '@/schema/lectures';
import type { searchQuery } from '@/schema/searchQuery';

const rawLectures = z
  .array(lectureSchema)
  .parse(JSON.parse(readFileSync('./src/data/lectures.json', 'utf-8')));

export function searchLectures(searchQuery: searchQuery): lecturesResponse {
  const filteredLectures = rawLectures.filter((lecture) => {
    // 講義名がマッチしないものは除外
    if (searchQuery.title && !lecture.title.ja.includes(searchQuery.title)) {
      return false;
    }

    // 講師名がマッチしないものは除外
    if (
      searchQuery.teacher &&
      !lecture.teachers.some((teacher) =>
        teacher.includes(searchQuery.teacher as string),
      )
    ) {
      return false;
    }

    // 講義コードの番台がマッチしないものは除外
    if (searchQuery.code && !searchQuery.code.includes(lecture.code.grade)) {
      return false;
    }

    // 学期がマッチしないものは除外
    if (
      searchQuery.quarter &&
      !searchQuery.quarter.some((quarter) => lecture.quarter.includes(quarter))
    ) {
      return false;
    }

    // 使用言語がマッチしないものは除外
    if (
      searchQuery.language &&
      !searchQuery.language.includes(lecture.language)
    ) {
      return false;
    }

    // 曜日がマッチしないものは除外
    if (
      searchQuery.day &&
      !searchQuery.day.some(
        (day) =>
          lecture.place.type !== 'normal' ||
          lecture.place.periods.some((period) => period.day === day),
      )
    ) {
      return false;
    }

    // 時限がマッチしないものは除外
    if (
      searchQuery.period &&
      !searchQuery.period.some(
        (period) =>
          lecture.place.type !== 'normal' ||
          lecture.place.periods.some((p) => p.period === period),
      )
    ) {
      return false;
    }

    // すべての条件にマッチしたもののみ残す
    return true;
  });

  filteredLectures.sort((a, b) => {
    // 講義名でソート
    return a.title.ja.localeCompare(b.title.ja);
  });

  const { limit = 50, page = 1 } = searchQuery;
  const pagenatedLectures = filteredLectures.filter((_, i) => {
    // ページング
    const start = (page - 1) * limit;
    const end = page * limit;
    return i >= start && i < end;
  });

  return {
    finish: filteredLectures.length <= page * limit,
    lectures: pagenatedLectures,
  };
}
