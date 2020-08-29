var method = "GET";
var url = "https://restcountries.eu/rest/v2/all";
var asynchronous = true;

//De label value en de label waarde
var label = "Content-type";
var labelValue = "application/x-www-form-urlencoded";

//-------------------------------------------------------------------------------------------

function getCountriesData(){
	var ajaxRequest;

	var ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			process(myObj);
		}
	};

	ajaxRequest.open(method, url , asynchronous);
	ajaxRequest.setRequestHeader(label, labelValue);
	ajaxRequest.send();

	return false;
}

//-------------------------------------------------------------------------------------------

function process(data){
	var countryOptions = document.getElementById("country");
	
	for(var i = 0; i < data.length; i++){
		var opt = document.createElement('option');
		opt.innerHTML = data[i].name;
		opt.value = data[i].name;
		countryOptions.appendChild(opt);
	}
}

//-------------------------------------------------------------------------------------------

function getCountryData(){
	var selectedCountryValue = document.getElementById("country").value;
	
	var ajaxRequest;

	var ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			pageProcessing(myObj);
		}
	};

	ajaxRequest.open(method, url = "https://restcountries.eu/rest/v2/name/"+selectedCountryValue , asynchronous);
	ajaxRequest.setRequestHeader(label, labelValue);
	ajaxRequest.send();

	return false;
}

//-------------------------------------------------------------------------------------------

function pageProcessing(data){
	var img = document.getElementById("countryFlag");
	img.setAttribute("src", "https://restcountries.eu/data/"+data[0].alpha3Code.toLowerCase()+".svg");
	
	var capital = document.getElementById("capital");
	var timezone = document.getElementById("timezone");
	var language = document.getElementById("language");
	var currency = document.getElementById("currency");
	
	capital.innerHTML = "Capital: "+data[0].capital;
	timezone.innerHTML = "Timezone: "+data[0].timezones;
	language.innerHTML = "Language: "+data[0].languages[0].nativeName;
	currency.innerHTML = "Currency: "+data[0].currencies[0].code;
	
	var borders = document.getElementById("borders");
	
	if(borders.hasChildNodes()){
		borders.innerHTML = '';
	}
	
	if(data[0].borders[[0]]){
		for(var i = 0; i < 5; i++){
			var li = document.createElement('li');
			if(data[0].borders[[i]] != null){
				li.innerHTML = data[0].borders[[i]];
				borders.appendChild(li);
			}
		}
	}else{
		var li = document.createElement('li');
		li.innerHTML = "No data available.";
		borders.appendChild(li);
	}
	
	
	var table = document.getElementById("regional");
	var tableBody = document.getElementById("tableBody");
	
	if(tableBody.hasChildNodes()){
		tableBody.innerHTML = '';
	}
	
	if(data[0].regionalBlocs.length > 0){
		for(var i = 0; i < data[0].regionalBlocs.length; i++){
			var tr = document.createElement('tr');
			
			var tdAcronym = document.createElement('td');
			var tdName = document.createElement('td');
			
			tdAcronym.innerHTML = data[0].regionalBlocs[[i]].acronym;
			tdName.innerHTML = data[0].regionalBlocs[[i]].name;
			
			tr.appendChild(tdAcronym);
			tr.appendChild(tdName);
			tableBody.appendChild(tr);
			table.appendChild(tableBody);
		}
	}else{
		var tr = document.createElement('tr');
		
		var tdAcronym = document.createElement('td');
		var tdName = document.createElement('td');
		
		tdAcronym.innerHTML = "No data available.";
		tdName.innerHTML = "No data available.";
		
		tr.appendChild(tdAcronym);
		tr.appendChild(tdName);
		tableBody.appendChild(tr);
		table.appendChild(tableBody);
	}
	
	var latLong1 = data[0].latlng[0];
	var latLong2 = data[0].latlng[1];
	
	myMap(latLong1, latLong2);
}

//------------------------------------------MAP------------------------------------------------- 

function myMap(latLong1, latLong2) {
	var mapProp = {
		center: new google.maps.LatLng(latLong1,latLong2),
		zoom:5,
	};
	var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}


