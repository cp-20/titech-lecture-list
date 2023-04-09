import { JSDOM } from 'jsdom';

export const htmlParser = (html: string) => {
  const dom = new JSDOM(html);

  return dom.window.document;
};
