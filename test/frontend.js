function ChangeLocationSubmit(){
	const startInput = document.getElementById("startInput")
	const endInput = document.getElementById("endInput")
	const stationInput = document.getElementById("stationInput")
	//call .value on const to get the information or else it will just be an html Element
	if(startInput.value.length)
	document.getElementById("temp").textContent = startInput.value.length
}