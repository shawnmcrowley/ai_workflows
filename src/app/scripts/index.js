// Script to fetch data from Langflow API

var myHeaders = new Headers();
myHeaders.append("x-api-key", "sk-AEDsSFO3Lg3H85crq64Co1hmezOIhraCVCvxO8LKeZU");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:7860/api/v1/run/e4a5193e-7b8a-4203-8b17-9a1f8a91eeec", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

