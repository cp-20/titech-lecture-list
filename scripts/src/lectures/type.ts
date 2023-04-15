export type structuredLecture = Omit<lecture, 'place'> & {
  place: lecturePlace;
};

export type lecture = {
  // シラバスへのリンク
  link: string;
  // 授業名
  title: string;
  // 開講元
  origin: string;
  // 担当教員
  teachers: string[];
  // 曜日・時限 (講義室)
  place: string;
  // 科目コード
  code: {
    grade: number;
    value: string;
  };
  // 単位
  credit: number;
  // 開講年度
  year: string;
  // 開講クォーター
  quarter: string;
  // 使用言語
  language: string;
};

export type lecturePlace =
  // 集中講義
  | {
      type: 'intensive';
    }
  // 通常講義
  | {
      type: 'normal';
      periods: period[];
    }
  // 講究等
  | { type: 'research' }
  // インターンシップ
  | { type: 'internship' }
  // 未定
  | { type: 'TBD' }
  // 空文字または'-'のとき
  | { type: 'null' }
  // その他
  | { type: 'raw'; value: string };

export type period = {
  day: '月' | '火' | '水' | '木' | '金' | '土';
  period: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  classroom: string | null;
};
