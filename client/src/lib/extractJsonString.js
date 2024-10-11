export function extractJsonString(inputString) {
    let startIndex = inputString.indexOf("{");
    if (startIndex === -1) return null; 

    let endIndex = startIndex;
    let braceCount = 0;

    for (let i = startIndex; i < inputString.length; i++) {
        if (inputString[i] === "{") {
            braceCount++;
        } else if (inputString[i] === "}") {
            braceCount--;
            if (braceCount === 0) {
                endIndex = i;
                break;
            }
        }
    }

    if (braceCount !== 0) return null; // Unmatched braces

    return inputString.substring(startIndex, endIndex + 1);
}