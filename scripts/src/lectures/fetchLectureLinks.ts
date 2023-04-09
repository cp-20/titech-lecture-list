import { fetchText } from '../shared/fetchText';
import { htmlParser } from '../shared/htmlParser';

export const fetchLectureLinks = async (lectureListLink: string) => {
  const html = await fetchText(lectureListLink);
  const document = htmlParser(html);

  const lectureLinks = Array.from(
    document.querySelectorAll('.ranking-list tbody tr .course_title a')
  );

  return lectureLinks
    .map(
      (lectureLink) =>
        'http://www.ocw.titech.ac.jp' + lectureLink.getAttribute('href')
    )
    .filter(Boolean) as string[];
};
