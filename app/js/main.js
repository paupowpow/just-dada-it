const fontSelector = document.querySelector("#font");

function handleFontChange(e) {
	var selectedFont = fontSelector.options[fontSelector.selectedIndex].text;
	var units = document.querySelectorAll('.canvas .unit');
	units.forEach(unit => {
		unit.style.fontFamily = selectedFont;
	});
}

fontSelector.addEventListener('change', handleFontChange);

