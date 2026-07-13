export const translateStep = (text: string, system: "VI" | "US"): string => {
  if (system === "VI") {
    return text;
  }

  // Regular expression matching uppercase characters not surrounded by lowercase letters
  const letters =
    "[a-zA-Záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]";
  const makeRegex = (char: string) =>
    new RegExp(`(?<!${letters})${char}(?!${letters})`, "g");

  let result = text;
  result = result.replace(makeRegex("X"), "sc");
  result = result.replace(makeRegex("V"), "inc");
  result = result.replace(makeRegex("A"), "dec");
  result = result.replace(makeRegex("T"), "hdc");
  result = result.replace(makeRegex("F"), "dc");
  result = result.replace(makeRegex("E"), "tr");

  return result;
};
