let accordion = document.querySelectorAll(".accordion__item");
let heights = [];
accordion.forEach((item,i) => {
	heights[i] = item.children[1].style.height; 
	item.children[1].style.height = 0;
});
function accordionOperating(number) {
	let text = accordion[number].children[1];
	let header = accordion[number].children[0];
	text.classList.toggle("show");
	if (text.classList.contains("show")) {
		text.style.height = heights[number];
	} else {
		text.style.height = 0;
	}
	
	header.classList.toggle("show");
}
accordion.forEach((item, i) => {
	item.addEventListener("click", () => accordionOperating(i));
});
