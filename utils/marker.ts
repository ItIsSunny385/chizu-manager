export const getMarkerWithLetter = (
  color: string,
  letter: string,
  letterColor: string
) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384z" fill="${color}"/><text x="50%" y="43%" style="dominant-baseline:central;text-anchor:middle;font-size:200px;" fill="${letterColor}">A</text></svg>`;
};
