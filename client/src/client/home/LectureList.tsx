import { css } from '@emotion/react';
import { Loader } from '@mantine/core';
import type { FC } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import { LectureListItem } from '@/client/home/LectureListItem';
import { useSearchQueryAtom } from '@/client/home/searchQueryAtom';
import type { lecture, lecturesResponse } from '@/schema/lectures';
import { fetcher } from '@/shared/hooks/useSWR';

export type PresentialLectureListProps = {
  lectures: lecture[];
  isLoading: boolean;
};

export const PresentialLectureList: FC<PresentialLectureListProps> = ({
  lectures,
  isLoading,
}) => {
  return (
    <ul
      css={css`
        position: relative;
      `}
    >
      {isLoading && 'loading'}
      {lectures.map((lecture) => (
        <LectureListItem key={lecture.link} lecture={lecture} />
      ))}
    </ul>
  );
};

export const LectureList: FC = () => {
  const [searchQuery] = useSearchQueryAtom();
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data, setSize, isLoading } = useSWRInfinite<lecturesResponse>(
    (page, previousPageData: lecturesResponse | null) => {
      if (previousPageData && previousPageData.finish) return null;

      return `/api/lectures?q=${JSON.stringify({
        ...searchQuery,
        page: page + 1,
        limit: 50,
      })}`;
    },
    fetcher,
    { initialSize: 1 },
  );

  const lectures = data && data.flatMap((d) => d.lectures);

  const hasMore = data ? !data.slice(-1)[0].finish : true;

  useEffect(() => {
    const loaderElement = loaderRef.current;
    if (loaderElement === null) return;

    const observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        setSize((size) => size + 1);
      }
    });
    observer.observe(loaderElement);

    return () => {
      observer.unobserve(loaderElement);
    };
  }, [setSize]);

  return (
    <>
      <PresentialLectureList lectures={lectures ?? []} isLoading={isLoading} />
      <div
        ref={loaderRef}
        css={css`
          display: grid;
          padding-top: 32px;
          padding-bottom: 128px;
          place-items: center;
        `}
      >
        {hasMore && <Loader variant="dots" />}
      </div>
    </>
  );
};
