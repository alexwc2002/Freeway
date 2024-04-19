async function getGreeting() {
	
	const name = document.getElementById("name");	
	const result = await fetch('/hello?name=' + name.value);
	const json = await result.json();
	document.getElementById("greeting").textContent = json.message;

}

