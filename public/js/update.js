class UpdateScreen {
    constructor() {
        this.updateLocation = this.updateLocation.bind(this); // Binds the function 
        // Adds an event listern to the submit button so it calls the updateLocation() function when clicked. 
        document.getElementById('update').addEventListener('submit', this.updateLocation);
    }

    async updateLocation(event) {
        // This function talks to the server to update the location name
        event.preventDefault();
        const formData = new FormData(event.target); // Creates a FormData object from the click event. 
        const jsonData = Object.fromEntries(formData.entries()); // Creates a JSON object from the FormData object 
        const jsonString = JSON.stringify(jsonData); // Converts the JSON object into a string.
        const fetchOptions = { // Constructs the POST request
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: jsonString // The body (jsonString) contains the parameters set by the user
        
        };
        const result = await fetch("/updatestation", fetchOptions); // Sends the POST request to the server
        const json = await result.json(); // Grabs the response from the server
    }
}


new UpdateScreen();