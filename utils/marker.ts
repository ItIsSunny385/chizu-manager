export const getMarkerWithLetter = (
  color: string,
  letter: string,
  letterColor: string
) => {
  // 参考URL：
  // https://www.web-dev-qa-db-ja.com/ja/javascript/javascript%E3%81%AEatob%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6base64%E3%82%92%E3%83%87%E3%82%B3%E3%83%BC%E3%83%89%E3%81%99%E3%82%8B%E3%81%A8%E3%80%81utf8%E6%96%87%E5%AD%97%E5%88%97%E3%81%8C%E6%AD%A3%E3%81%97%E3%81%8F%E3%83%87%E3%82%B3%E3%83%BC%E3%83%89%E3%81%95%E3%82%8C%E3%81%BE%E3%81%9B%E3%82%93/1053828992/
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384z" fill="${color}"/><text x="50%" y="43%" style="dominant-baseline:central;text-anchor:middle;font-size:200px;" fill="${letterColor}">${encodeURIComponent(
    letter
  ).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
    return String.fromCharCode(parseInt("0x" + p1));
  })}</text></svg>`;
};

export const getMarkerBase64 = (
  color: string,
  letter: string,
  letterColor: string
) => {
  return (
    "data:image/svg+xml;base64," +
    window.btoa(getMarkerWithLetter(color, letter, letterColor))
  );
};
