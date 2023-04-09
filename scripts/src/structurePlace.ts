import { lecture, structuredLecture } from './lectures/type';
import { readFileSync, writeFileSync } from 'fs';
import { analyzePlace } from './lectures/analyzePlace';

const lectureDataFilePath = './lectures.json';

const structurePlace = () => {
  const lectures: lecture[] = JSON.parse(
    readFileSync(lectureDataFilePath, { encoding: 'utf-8' })
  );

  const structuredLectures: structuredLecture[] = lectures.map((lecture) => {
    console.log(lecture.place, lecture.link);

    return {
      ...lecture,
      place: analyzePlace(lecture.place),
    };
  });

  return structuredLectures;
};

writeFileSync('./lectures-with-place.json', JSON.stringify(structurePlace()), {
  encoding: 'utf-8',
});
