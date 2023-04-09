import { lecturePlace, period } from './type';

export const analyzePlace = (place: string): lecturePlace => {
  const formattedPlace = place
    .replace(/&nbsp;/g, ' ')
    .replace(/,,/g, ',')
    .trim();

  if (formattedPlace.search('集中講義等') > -1) {
    return {
      type: 'intensive',
    };
  }

  if (formattedPlace === '講究等') {
    return {
      type: 'research',
    };
  }

  if (formattedPlace === 'インターンシップ') {
    return {
      type: 'internship',
    };
  }

  if (formattedPlace === '未定') {
    return {
      type: 'TBD',
    };
  }

  if (['', '-'].includes(formattedPlace)) {
    return {
      type: 'null',
    };
  }

  if (
    formattedPlace.search(/(月|火|水|木|金|土)(\d\d?)-(\d\d?)(?:\((.+)\))?/) ===
    -1
  ) {
    return {
      type: 'raw',
      value: formattedPlace,
    };
  }

  const places = formattedPlace.split('  ');

  try {
    const periods = places
      .map((place) => {
        const match = place.match(
          /(月|火|水|木|金|土)(\d\d?)-(\d\d?)(?:\((.+)\))?/
        );
        if (match === null) {
          throw new Error(
            `講義の"曜日・時限"を取得中にエラーが発生しました (${formattedPlace})`
          );
        }

        const periodStart = parseInt(match[2], 10);
        const periodEnd = parseInt(match[3], 10);

        const periods = new Array(periodEnd - periodStart + 1)
          .fill(0)
          .map((_, i) => i + periodStart);
        const classrooms = (() => {
          if (match[4] === undefined) {
            return null;
          }

          if (match[4] === '石川台７号館 (ELSI-1), 三島ホール, Mishima Hall') {
            return match[4];
          }

          if (match[4].split(/,|、/).length > periods.length) {
            return match[4];
          }

          return match[4].split(/,|、/).map((classroom) => classroom.trim());
        })();

        return periods.map((period, i) => ({
          day: match[1] as period['day'],
          period: period as period['period'],
          classroom: classrooms && (classrooms[i] ?? classrooms.slice(-1)[0]),
        }));
      })
      .filter(Boolean)
      .flat() as period[];

    return {
      type: 'normal',
      periods,
    };
  } catch (err) {
    console.error(err);

    return {
      type: 'raw',
      value: formattedPlace,
    };
  }
};
