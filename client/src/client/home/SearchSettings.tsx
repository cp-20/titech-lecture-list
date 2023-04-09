import { css } from '@emotion/react';
import { Checkbox, Input } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchQueryAtom } from '@/client/home/searchQueryAtom';
import type { searchQuery } from '@/schema/searchQuery';

const lectureCodes = [100, 200, 300, 400, 500, 600] as const;
const lectureQuarters = [
  '1Q',
  '2Q',
  '3Q',
  '4Q',
  '1-2Q',
  '2-3Q',
  '3-4Q',
  '1-4Q',
] as const;
const lectureDays = ['月', '火', '水', '木', '金', '土'] as const;
const lecturePeriods = [1, 3, 5, 7, 9, 11] as const;

const calcSearchArray = <T,>(
  prevArray: T[] | undefined,
  checked: boolean,
  value: T,
): T[] | undefined => {
  if (checked) {
    if (prevArray === undefined) {
      return [value];
    }

    return [...prevArray, value];
  }

  if (prevArray === undefined) {
    return undefined;
  }

  const nextArray = prevArray.filter((v) => v !== value);

  return nextArray.length === 0 ? undefined : nextArray;
};

export const SearchSettings: FC = () => {
  const [_, setGlobalSearchQuery] = useSearchQueryAtom();
  const [searchQuery, setSearchQuery] = useState<searchQuery>({});
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  useEffect(() => {
    setGlobalSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setGlobalSearchQuery]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 16px;

          @media screen and (max-width: 480px) {
            flex-direction: column;
          }

          & > div {
            flex: 1;
          }
        `}
      >
        <Input.Wrapper label="講義名">
          <Input
            value={searchQuery.title}
            onChange={(e) => {
              setSearchQuery({
                ...searchQuery,
                title: e.target.value || undefined,
              });
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="担当教員名">
          <Input
            value={searchQuery.teacher}
            onChange={(e) => {
              setSearchQuery({
                ...searchQuery,
                teacher: e.target.value || undefined,
              });
            }}
          />
        </Input.Wrapper>
      </div>

      <div
        css={css`
          display: flex;
          gap: 16px;

          & > div {
            display: flex;
            flex: 1;
            gap: 16px;

            @media screen and (max-width: 720px) {
              flex-direction: column;
            }

            & > div {
              flex: 1;

              & > p {
                margin-bottom: 2px;
                font-size: 0.9rem;
              }
            }
          }
        `}
      >
        <div>
          <div>
            <p>科目コード (番台)</p>
            <div>
              {lectureCodes.map((code) => (
                <Checkbox
                  key={code}
                  checked={searchQuery.code?.includes(code)}
                  label={code}
                  onChange={(e) => {
                    setSearchQuery({
                      ...searchQuery,
                      code: calcSearchArray(
                        searchQuery.code,
                        e.target.checked,
                        code,
                      ),
                    });
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <p>クォーター</p>
            <div>
              {lectureQuarters.map((quarter) => (
                <Checkbox
                  key={quarter}
                  checked={searchQuery.quarter?.includes(quarter)}
                  label={quarter}
                  onChange={(e) => {
                    setSearchQuery({
                      ...searchQuery,
                      quarter: calcSearchArray(
                        searchQuery.quarter,
                        e.target.checked,
                        quarter,
                      ),
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div>
            <p>曜日</p>

            <div>
              {lectureDays.map((day) => (
                <Checkbox
                  key={day}
                  checked={searchQuery.day?.includes(day)}
                  label={day}
                  onChange={(e) => {
                    setSearchQuery({
                      ...searchQuery,
                      day: calcSearchArray(
                        searchQuery.day,
                        e.target.checked,
                        day,
                      ),
                    });
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <p>時限</p>

            <div>
              {lecturePeriods.map((period) => (
                <Checkbox
                  key={period}
                  checked={searchQuery.period?.includes(period)}
                  label={`${period}-${period + 1}限`}
                  onChange={(e) => {
                    setSearchQuery({
                      ...searchQuery,
                      period: calcSearchArray(
                        searchQuery.period,
                        e.target.checked,
                        period,
                      ),
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
