function generateRandomAlphaNumericString(length, characters) {
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function generateUniqueUserID() {
  const alphaCharacters = "ABCDEFGIJKMNOPQRSTUVEWXOSYSJD";
  const numericCharacters = "0123456789";

  const alphaPart = generateRandomAlphaNumericString(3, alphaCharacters);
  const numericPart = generateRandomAlphaNumericString(3, numericCharacters);

  return alphaPart + numericPart;
}

module.exports = generateUniqueUserID;
