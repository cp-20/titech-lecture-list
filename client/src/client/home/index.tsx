import { css } from '@emotion/react';
import { Anchor, Space, Text, Title } from '@mantine/core';
import type { NextPage } from 'next';
import Link from 'next/link';
import { LectureList } from '@/client/home/LectureList';
import { SearchSettings } from '@/client/home/SearchSettings';
import { Description } from '@/shared/components/Description';

export const Home: NextPage = () => {
  return (
    <>
      <Description
        title="東工大講義リスト"
        description="TOKYO TECH OCWから取得した講義リストを提供しています。高速な検索・絞り込みが可能です。"
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
        <Title order={1}>東工大講義リスト</Title>

        <Text color="dimmed" mt="xs">
          これらデータは全て
          <Anchor
            component={Link}
            href="http://www.ocw.titech.ac.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TOKYO TECH OCW
          </Anchor>
          から
          <Anchor
            component={Link}
            href="https://creativecommons.org/licenses/by-nc-sa/2.1/jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY-NC-SA 2.1 JP
          </Anchor>
          の下で提供されているものを利用しています
        </Text>

        <Text color="dimmed" mb="xs">
          それぞれの講義をクリックすると該当するシラバスのページに飛びます
        </Text>

        <Space h="xs" />

        <Text>
          <Anchor component={Link} href="/api-usage">
            APIの使い方はこちらを参照
          </Anchor>
        </Text>

        <Space h="xl" />

        <SearchSettings />

        <Space h="md" />

        <LectureList />
      </div>
    </>
  );
};
