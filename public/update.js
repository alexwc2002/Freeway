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


new UpdateScreen();