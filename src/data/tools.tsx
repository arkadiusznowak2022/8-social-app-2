export function removeWhiteSpaces(text: string): string {
  if (text.includes(' ')) {
    text = text.split(' ').join('');
  }
  return text;
}

export function checkPassword(pass: string): boolean {
  let flag = false;
  const checkNum = new RegExp('[0-9]');
  const checkCapLet = new RegExp('[A-Z]');

  ['!', '#', '@', '$', '%'].forEach((symbol) => {
    if (pass.includes(symbol)) flag = true;
  });
  if (!checkNum.test(pass)) flag = false;
  if (!checkCapLet.test(pass)) flag = false;
  if (pass.length < 6) flag = false;

  return flag;
}
