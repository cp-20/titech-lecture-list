export const fetchText = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const textRes = await res.text();

  return textRes;
};
