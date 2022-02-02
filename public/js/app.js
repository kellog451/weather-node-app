const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submitted...........!", searchInput.value);
  window.location.replace(
    `http://localhost:3000/weather?address=${searchInput.value}`
  );
});
