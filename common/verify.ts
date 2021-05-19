import md5 from "./md5";

export const passwordEncode = (str: string) => {
  return md5(str);
};