import { css } from '@emotion/react';
import { Badge, Card } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import type { lecture, lecturePeriod, lecturePlace } from '@/schema/lectures';

export type LectureListItemProps = {
  lecture: lecture;
};

export const lectureTypeTable = {
  TBD: '未定',
  intensive: '集中講義',
  research: '講究',
  internship: 'インターンシップ',
} satisfies Record<
  Exclude<lecturePlace['type'], 'normal' | 'raw' | 'null'>,
  string
>;

const checkLecturePlaceType = (
  type: lecturePlace['type'],
): type is Exclude<lecturePlace['type'], 'normal' | 'raw' | 'null'> =>
  Object.keys(lectureTypeTable).includes(type);

const formatLecturePeriod = (periods: lecturePeriod[]) => {
  return periods
    .filter((period) => period.period % 2 === 1)
    .map((period) => `${period.day}${period.period}-${period.period + 1}`);
};

export const LecturePlace: FC<{ place: lecturePlace }> = ({ place }) => {
  if (checkLecturePlaceType(place.type)) {
    return (
      <div>
        <Badge>{lectureTypeTable[place.type]}</Badge>
      </div>
    );
  }

  if (place.type === 'null') {
    return <></>;
  }

  if (place.type === 'raw') {
    return (
      <div>
        <Badge>{place.value}</Badge>
      </div>
    );
  }

  if (place.type === 'normal') {
    return (
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
        `}
      >
        {formatLecturePeriod(place.periods).map((period) => (
          <Badge key={period}>{period}</Badge>
        ))}
      </div>
    );
  }

  return <></>;
};

export const LectureListItem: FC<LectureListItemProps> = ({ lecture }) => {
  return (
    <li
      css={css`
        list-style: none;
      `}
    >
      <Card
        component={Link}
        target="_blank"
        rel="noopener noreferrer"
        href={lecture.link}
        withBorder
        css={css`
          width: 100%;
          margin-top: -1px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          <div
            css={css`
              display: flex;
              gap: 8px;

              @media screen and (max-width: 720px) {
                flex-direction: column;
              }
            `}
          >
            <LecturePlace place={lecture.place} />
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 8px;
              `}
            >
              <Badge color="teal">{lecture.credit}単位</Badge>
              <Badge color="orange">{lecture.language}</Badge>
              <Badge color="cyan">{lecture.quarter}</Badge>
            </div>
          </div>
          <div
            css={css`
              display: flex;
            `}
          >
            <div
              css={css`
                width: 5rem;
                color: #999;

                @media screen and (max-width: 768px) {
                  display: none;
                }
              `}
            >
              {lecture.code.value}
            </div>
            <div
              css={css`
                color: #333;
                font-weight: bold;

                @media screen and (max-width: 768px) {
                  font-size: 0.9rem;
                }
              `}
            >
              {lecture.title.ja}
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
};
