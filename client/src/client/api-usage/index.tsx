import { css } from '@emotion/react';
import { Anchor, Code, Space, Text, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Description } from '@/shared/components/Description';

export const APIUsage: NextPage = () => {
  return (
    <>
      <Description
        title="APIの使い方 | 東工大講義リスト"
        description="東工大講義リストのAPIの使い方を説明しています。"
      />

      <div
        css={css`
          min-height: 100vh;
          padding: 64px;

          @media screen and (max-width: 720px) {
            padding: 32px;
          }

          @media screen and (max-width: 480px) {
            padding: 16px;
          }
        `}
      >
        <Text mb="md">
          <Anchor component={Link} href="/">
            元のページに戻る
          </Anchor>
        </Text>

        <Title order={1}>APIの使い方</Title>

        <Text color="dimmed" mt="xs">
          東工大講義リストを取得するAPIの使い方を説明しています
        </Text>
        <Text color="dimmed" mb="xs">
          これらのAPIは公序良俗に反さない範囲で自由に利用できます
        </Text>

        <Space h="xl" />

        <Title order={2} fz="1.1rem">
          GET <Code fz="inherit">{'/api/lectures?q={query}'}</Code>
        </Title>

        <Text mt="xs">
          講義情報を
          <Code fz="inherit">{'{query}'}</Code>
          に従って取得します
        </Text>
        <Text my="xs">
          <Code fz="inherit">{'{query}'}</Code>
          の型は以下の通りです (TypeScriptでの定義)
        </Text>

        <Prism language="typescript">{`
type searchQuery = Partial<{
  title: string;
  teacher: string;
  code: (100 | 200 | 300 | 400 | 500 | 600)[];
  quarter: ('1Q' | '2Q' | '3Q' | '4Q' | '1-2Q' | '2-3Q' | '3-4Q' | '1-4Q')[];
  language: ('日本語' | '英語')[];
  day: ('月' | '火' | '水' | '木' | '金' | '土')[];
  period: (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12)[];
  // 1 <= limit <= 100
  limit: number;
  // 1 <= page
  page: number;
}>;`}</Prism>

        <Text my="md">
          返り値は次のような形式になります (TypeScriptでの定義)
        </Text>

        <Prism language="typescript">{`
type response = {
  // これ以上取得するものがないときはtrue
  finish: boolean;
  lectures: lecture[];
};

type lecture = {
  // シラバスのURL
  link: string;
  // 講義名
  title: {
    ja: string;
    en: string;
  };
  // 開講元
  origin: string;
  // 担当教員名
  teacher: string[];
  // 科目コード (番台+文字列)
  code: {
    grade: 100 | 200 | 300 | 400 | 500 | 600;
    value: string;
  };
  // 開講クォーター
  quarter: ('1Q' | '2Q' | '3Q' | '4Q' | '1-2Q' | '2-3Q' | '3-4Q' | '1-4Q')[];
  // 使用言語
  language: '日本語' | '英語';
  // 曜日・時限 + 講義室
  place: lecturePlace;
  // 単位数
  credit: number;
  // 開講年度
  year: string;
};

type lecturePlace =
  // 通常の授業
  | {
      type: 'normal';
      periods: {
        day: '月' | '火' | '水' | '木' | '金' | '土';
        period: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
        classroom: string;
      }[];
    }
  // 集中講義等
  | {
      type: 'intensive';
    }
  // 講究等
  | {
      type: 'research';
    }
  // インターンシップ
  | {
      type: 'internship';
    }
  // 未定
  | {
      type: 'TBD';
    }
  // 未設定
  | {
      type: 'null';
    }
  // その他
  | {
      type: 'raw';
      value: string;
    };
`}</Prism>
      </div>
    </>
  );
};
