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
  link.setAttribute("id", `${routes[routeKey]}`)
  link.textContent = `${routes[routeKey]}`;

  navigationBox.appendChild(link);
});    

const handleLocation = async () => {
  const path = window.location.pathname;
  console.log(path);
  const route = routes[path];
  console.log(route);
  document.getElementById(route).classList.add("current-route");
  try {
      const response = await fetch("./words.json")
      if (!response.ok) {
          throw new Error("Failed to fetch data");
      }
      const words = await response.json();
      document.getElementById("digit").innerHTML = words.sections[route].digit;
      document.getElementById("heading").innerHTML = words.sections[route].header;
      const contentData = words.sections[route].content;
      
      if (typeof contentData === "object") {
      const formattedPararaphs = contentData.map(paragraph => `<p>${paragraph}</p>`);
      const paragraphString = formattedPararaphs.join("");
      document.getElementById("content").innerHTML = paragraphString; 
      } else {
        document.getElementById("content").innerHTML = `<p>${words.sections[route].content}</p>`;
      };

      if (words.sections[route].image) {
        const imageData = words.sections[route].image;
        console.log(imageData.url);
        document.getElementById("content").innerHTML += 
          `<img src="${imageData.url}" alt="${imageData.altText}">`};

      document.getElementById("digit").classList.add("slide-in-digit");
      document.getElementById("heading").classList.add("slide-in-right");
      document.getElementById("content").classList.add("slide-in-left");
  }
  catch (error) {
      console.error("Error fetching data", error)
  }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();