import { fetchText } from '../shared/fetchText';
import { htmlParser } from '../shared/htmlParser';
import { lecture } from './type';

export const fetchLectureDetail = async (
  lectureLink: string
): Promise<lecture> => {
  const html = await fetchText(lectureLink);
  const document = htmlParser(html);

  const title = document
    .querySelector('.page-title-area > h3')
    ?.innerHTML.replace(/&nbsp;/g, ' ')
    .trim();

  const details = document.querySelectorAll('.gaiyo-data dl');

  const origin = details.item(0).querySelector('dd')?.innerHTML.trim();
  const teachers = Array.from(details.item(1).querySelectorAll('dd > a')).map(
    (linkElement) => linkElement.innerHTML.trim()
  );

  const place = details
    .item(4)
    .querySelector('dd')
    ?.innerHTML?.replace(/&nbsp;/g, ' ')
    .trim();
  const lectureClass = details.item(5).querySelector('dd')?.innerHTML;
  const code = (() => {
    const code = details.item(6).querySelector('dd')?.innerHTML;

    if (code === undefined) return undefined;

    return {
      grade: parseInt(code?.substring(5, 6) + '00', 10),
      value: code,
    };
  })();
  const credit = parseInt(
    details.item(7).querySelector('dd')?.innerHTML ?? '-1',
    10
  );
  const year = details.item(8).querySelector('dd')?.innerHTML.trim();
  const quarter = details.item(9).querySelector('dd')?.innerHTML.trim();
  const language = details.item(12).querySelector('dd')?.innerHTML.trim();

  if (
    title === undefined ||
    origin === undefined ||
    place === undefined ||
    lectureClass === undefined ||
    code === undefined ||
    year === undefined ||
    quarter === undefined ||
    language === undefined ||
    credit === -1
  ) {
    throw new Error(
      `講義情報が正しく取得できませんでした (${lectureLink})\n\n${JSON.stringify(
        {
          link: lectureLink,
          title,
          origin,
          teachers,
          place,
          code,
          credit,
          year,
          quarter,
          language,
        },
        null,
        2
      )}`
    );
  }

  return {
    link: lectureLink,
    title,
    origin,
    teachers,
    place,
    code,
    credit,
    year,
    quarter,
    language,
  };
};
