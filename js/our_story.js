const sellpointVisualWidth =
  document.querySelector(".sellpoint_visual").offsetWidth;
console.log(sellpointVisualWidth);
document
  .querySelector(".sellpoints")
  .style.setProperty("--sellpoint-width", `${sellpointVisualWidth}px`);

const mql = window.matchMedia("(max-width: 700px)");

function countDynamicWidth() {
  const sellpointVisualWidth =
    document.querySelector(".sellpoint_visual").offsetWidth;
  document
    .querySelector(".sellpoints")
    .style.setProperty("--sellpoint-width", `${sellpointVisualWidth}px`);
  if (mql.matches) {
    console.log("This is a narrow screen — less than 700px wide.");
    document.querySelector(".price .sellpoint_text > p").textContent =
      "Smart lighting should be affordable.";
    document.querySelector(".friendly .sellpoint_text > p").textContent =
      "Smart lighting must be for everyone.";
    document.querySelector(".sustainability .sellpoint_text > p").textContent = "We plant a tree for each bulb sold.";
  } else {
    console.log("This is a wide screen — more than 700px wide.");
    document.querySelector(".price .sellpoint_text > p").textContent =
      "Smart lighting should be affordable. We believe that the spread of smart lighting gives us more joy and energy in everyday life.";
    document.querySelector(".friendly .sellpoint_text > p").textContent =
      "Smart lighting must be for everyone. We believe that everyone benefits from better lighting.";
    document.querySelector(".sustainability .sellpoint_text > p").textContent = "Our products live for decades and rarely need to be replaced. In addition, we plant a tree for each bulb sold.";
  }
}

window.onresize = countDynamicWidth;
