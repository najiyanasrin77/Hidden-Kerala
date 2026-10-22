const backarrow = document.getElementById("backarrow") as HTMLButtonElement;
  if (backarrow){
    backarrow.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}