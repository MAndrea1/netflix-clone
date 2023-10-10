export function getRandomElement<T>(array:T[]){
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export function shortenString(inputString: string, maxLength: number): string {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    // Find the last space within the maxLength
    let lastSpaceIndex = maxLength;
    while (lastSpaceIndex > 0 && inputString.charAt(lastSpaceIndex) !== ' ') {
      lastSpaceIndex--;
    }

    if (lastSpaceIndex <= 0) {
      // If no space is found, simply cut the string at the maxLength
      return inputString.slice(0, maxLength) + '...';
    } else {
      // Cut the string at the last space found
      return inputString.slice(0, lastSpaceIndex) + '...';
    }
  }
}