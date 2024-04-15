import './style.css'

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
}

const routes = {
  "/": "zero",
  "/one": "one",
  "/two": "two",
  "/three": "three",
  "/four": "four",
  "/five": "five",
  "/six": "six"
};

const navigationBox = document.getElementById("navigationBox");

Object.keys(routes).map(routeKey => {
  const link = document.createElement("a");
  link.href = `${routeKey}`;
  link.textContent = `${routes[routeKey]}`;

  navigationBox.appendChild(link);
});    
  

const handleLocation = async () => {
  const path = window.location.pathname;
  console.log(path);
  const route = routes[path];
  console.log(route);
  try {
      const response = await fetch("./words.json")
      if (!response.ok) {
          throw new Error("Failed to fetch data");
      }
      const words = await response.json();
      document.getElementById("header").innerHTML = words.sections[route].header;
      document.getElementById("content").innerHTML = words.sections[route].content; 
  }
  catch (error) {
      console.error("Error fetching data", error)
  }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();