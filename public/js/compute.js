class ComputeScreen {
	constructor() {
		this.averageTravelTimeSubmit = this.averageTravelTimeSubmit.bind(this); // Binds the function
		// Adds an event listener to the submit button so that it will call the averageTravelTimeSubmit function when clicked. 
		document.getElementById('compute').addEventListener('submit', this.averageTravelTimeSubmit); 
	}

		
	async averageTravelTimeSubmit(event){	
		// This function talks to the server to compute the average travel time
		event.preventDefault();
		document.getElementById('travelTime').value = ""; // Erases any prior data being displayed in the output boxes
		document.getElementById('volume').value = "";

		const formData = new FormData(event.target); // Creates a FormData object from the given click event
		const params = new URLSearchParams(formData).toString(); // Converts the formdata into a string formatted for a GET request

		const result = await fetch('/traveltime?' + params); // Sends the GET request to the server and grabs the result 
		const json = await result.json(); // Converts the result to a JSON

		document.getElementById('travelTime').value = json.time; // Displays the result given by the server to the output boxes
		document.getElementById('volume').value = json.volume;
	}
}
 
new ComputeScreen();