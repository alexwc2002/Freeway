function averageTravelTimeSubmit(){
	const startInput = document.getElementById("startInput")
	const endInput = document.getElementById("endInput")
	const stationInput = document.getElementById("stationInput")
	//call .value on const to get the information or else it will just be an html Element
	if(startInput.value.length === 0  || endInput.value.length === 0 || stationInput.value.length === 0  )
	{
		document.getElementById("travelTime").textContent = "Fill all boxes"
	}
	else
	{
		document.getElementById("travelTime").textContent = startInput.value
		document.getElementById("volume").textContent = endInput.value
	}
}


function Change_location_text(){
	const stationID = document.getElementById("stationID")
	const oldName = document.getElementById("oldName")
	const newName = document.getElementById("newName")
	if(stationID.value.length === 0  || oldName.value.length === 0 || newName.value.length === 0  )
	{
		document.getElementById("status").textContent = "Fill all boxes"
	}
	else
	{
		document.getElementById("status").textContent = "Failed"
	}
	
}