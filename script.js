
document.querySelector("#addButton").onclick = addRow;
document.querySelector("#removeButton").onclick = function(){
	let blocks = document.querySelector('#blocks');
	if (blocks.childElementCount > 0) blocks.removeChild(blocks.lastChild);
	updateNumberOfRows();
};
document.querySelector("#copyButton").onclick = function(){
	const text = document.querySelector("#copy").innerText;
	navigator.clipboard.writeText(text);
};


function addRow() {
	const newBlock = document.createElement("div");
	newBlock.class = "row";
	var textnode = document.createTextNode("⬜⬜⬜⬜⬜");
	newBlock.appendChild(textnode);
	document.querySelector("#blocks").appendChild(newBlock);
	
	characterSpans(newBlock);
	updateNumberOfRows();
}


window.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < 6; i++) {
		addRow();
	}
	
	document.querySelector("#number").innerHTML = daysSinceDate();
	updateNumberOfRows();
	
});

function characterSpans(el) {
	// Modified from: https://stackoverflow.com/questions/45332637/how-to-get-character-position-when-click-on-text-in-javascript/45333785
		let characters = el['innerText'].split('');
		el.innerHTML = '';
		characters.forEach(char => {
			let span = document.createElement('span');
			span.innerText = char;
			span.addEventListener('click', function () {
				let position = 0;
				let el = this;
				while (el.previousSibling !== null) {
					position++;
					el = el.previousSibling;
				}
				if (this.innerHTML == "⬜") {
					this.innerHTML = "🟩";
				} else if (this.innerHTML == "🟩") {
					this.innerHTML = "🟨";
				} else {
					this.innerHTML = "⬜";
				}
			});
			el.appendChild(span);
		});
}

function daysSinceDate() {
	let today = new Date();
	let origin = new Date(2021, 05, 20);
	return Math.ceil((today.getTime()-origin.getTime())/(1000*60*60*24));
}

function updateNumberOfRows() {
	let blocks = document.querySelector('#blocks');
	let count = blocks.childElementCount;
	if (count > 6) {
		count = "X";
	}
	document.querySelector("#count").innerHTML = count;
}