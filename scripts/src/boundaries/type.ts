export type lecture = {
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
  teachers: string[];
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
