class UpdateScreen {
    constructor() {
        this.updateLocation = this.updateLocation.bind(this);

        document.getElementById('update').addEventListener('submit', this.updateLocation);
    }

async updateLocation(event) {
    console.log("wow");
    event.preventDefault();

    const formData = new FormData(event.target);
    // Convert FormData to JSON
    const jsonData = Object.fromEntries(formData.entries());
    const jsonString = JSON.stringify(jsonData);

    console.log(formData); 

    const fetchOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: jsonString
   
    };

    console.log(fetchOptions);

    const result = await fetch("/updatestation", fetchOptions);

    const json = await result.json();

    console.log(json);
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

new UpdateScreen();