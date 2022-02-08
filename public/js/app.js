const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submitted...........!", searchInput.value);
  window.location.replace(`/weather?address=${searchInput.value}`);
});
