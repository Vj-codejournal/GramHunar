



function set_value(prop){

const myHeaders = new Headers();
myHeaders.append("Apikey", "Api-Key FaO55yWz.wD7nVQ96v4VsgqiLJiZpngClr3Od4Inj");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "a": prop
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://127.0.0.1:5000/add", requestOptions)
  .then((response) => response.text())
  .then((result) => {return result})
  .catch((error) => console.error(error));
}






payload = {
  spt1 : set_value ,

}




export const data = payload;
