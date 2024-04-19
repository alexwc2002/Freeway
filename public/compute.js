class ComputeScreen {
	constructor() {
		
		this.averageTravelTimeSubmit = this.averageTravelTimeSubmit.bind(this);

		document.getElementById('compute').addEventListener('submit', this.averageTravelTimeSubmit);
	}

		
	async averageTravelTimeSubmit(event){
		event.preventDefault();

		const formData = new FormData(event.target);

		console.log(event.target);

		const params = new URLSearchParams(formData).toString();

		console.log(params);

		const result = await fetch('/traveltime?' + params);

		const json = await result.json();

		console.log(json.time);
		
		document.getElementById('travelTime').textContent = json.time;	
		
		document.getElementById('volume').textContent = json.volume
		
	}
}

new ComputeScreen();