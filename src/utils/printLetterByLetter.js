export const printLetterByLetter = function (text, updatePrintedContent) {
	const characters = text.split("");
	let currentIndex = 0;

	function getNextCharacter() {
		if (currentIndex < characters.length) {
			const character = characters[currentIndex];
			currentIndex++;
			if (currentIndex < characters.length) {
				setTimeout(getNextCharacter, 200);
			}
			updatePrintedContent((prevContent) => prevContent + character);
		}
	}

	getNextCharacter();
};
