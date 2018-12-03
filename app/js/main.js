const fontSelector = document.querySelector("#font");
const snippet = document.querySelector("#snippet");
const outputBox = document.querySelector("#outputBox");

// adapted from https://javascript.info/mouse-drag-and-drop
snippet.onmousedown = function(e) {
	snippet.style.position = 'absolute';
	snippet.style.zIndex = '1000';

	outputBox.append(snippet);

	moveTo(e.pageX, e.pageY);

	function moveTo(pageX, pageY) {
		snippet.style.left = pageX - snippet.offsetWidth / 2 + 'px';
		snippet.style.top = pageY - outputBox.offsetTop - snippet.offsetHeight / 2 + 'px';
	}

	function onMouseMove(e) {
		moveTo(e.pageX, e.pageY);
	}

	document.addEventListener('mousemove', onMouseMove);

	snippet.onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		snippet.onmouseup = null;
	}

	snippet.ondragstart = function() {
  		return false;
	};
}

function handleFontChange(e) {
	var selectedFont = fontSelector.options[fontSelector.selectedIndex].text;
	var units = document.querySelectorAll('.canvas .unit');
	units.forEach(unit => {
		unit.style.fontFamily = selectedFont;
	});
}

fontSelector.addEventListener('change', handleFontChange);