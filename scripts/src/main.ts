import { writeFileSync } from 'fs';
import { lectureListLinks } from './lectures/lectureListLinks';
import { fetchLectureLinks } from './lectures/fetchLectureLinks';
import { fetchLectureDetail } from './lectures/fetchLectureDetail';
import { lecture } from './lectures/type';
import { useCache } from './shared/cache';
import { useThread } from './shared/thread';

const lectureDataFilePath = './lectures.json';

const detailFetcher = (links: string[]) =>
  links.map((lectureLink) => async () => {
    try {
      const lecture = await fetchLectureDetail(lectureLink);
      return lecture;
    } catch (err) {
      console.error(
        `講義取得中に何らかのエラーが発生しました (${lectureLink})`
      );
      console.error(err);
      return null;
    }
  });

const fetchOCW = async () => {
  const lectureLinks = await useCache('lectureLinks', async () =>
    (await Promise.all(lectureListLinks.map(fetchLectureLinks))).flat()
  );

  console.log(`取得件数: ${lectureLinks.length}\n`);

  const lectures: lecture[] = await useCache(
    'lectures',
    async () =>
      (
        await useThread(detailFetcher(lectureLinks), 10)
      ).filter(Boolean) as lecture[]
  );

  const fetchedLinks = lectures.map((lecture) => lecture.link);
  const missingLinks = lectureLinks.filter(
    (link) => !fetchedLinks.includes(link)
  );

  const integratedLectures = lectures.concat(
    (await useThread(detailFetcher(missingLinks), 10)).filter(
      Boolean
    ) as lecture[]
  );

  return integratedLectures;
};

fetchOCW().then((lectures) => {
  writeFileSync(lectureDataFilePath, JSON.stringify(lectures), {
    encoding: 'utf-8',
  });
});
