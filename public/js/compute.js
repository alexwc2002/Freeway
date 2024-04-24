class ComputeScreen {
	constructor() {
		
		this.averageTravelTimeSubmit = this.averageTravelTimeSubmit.bind(this);

		document.getElementById('compute').addEventListener('submit', this.averageTravelTimeSubmit);
	}

		
	async averageTravelTimeSubmit(event){
		event.preventDefault();

		document.getElementById('travelTime').value = "";

		document.getElementById('volume').value = "";


		const formData = new FormData(event.target);

		console.log(event.target);

		const params = new URLSearchParams(formData).toString();

		console.log(params);

		//return;

		const result = await fetch('/traveltime?' + params);

		const json = await result.json();

		document.getElementById('travelTime').value = json.time;	
		
		document.getElementById('volume').value = json.volume;
		
	}
}

new ComputeScreen();