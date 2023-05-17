// Based in https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
// This code just take into account the first character
export function isNonAlphanumeric(character: string): boolean {
  // UTF-16 representation
  const codeRepresentation: number = character.charCodeAt(0);
  if (
    (codeRepresentation > 47 && codeRepresentation < 58) || // Check for 1-9
    (codeRepresentation > 64 && codeRepresentation < 91) || // Check for A-Z
    (codeRepresentation > 96 && codeRepresentation < 123) // Check for a-z
  ) {
    return false;
  }

  return true;
}
