const myTripContainer = document.getElementById("myTripContainer") as HTMLDivElement;

const loggedInUser = localStorage.getItem("loggedInUser");

const savedTrips = localStorage.getItem("myTrips");

const allTrips =savedTrips ? JSON.parse(savedTrips) : [];

const trips = allTrips.filter((trip: any) => {
    return trip.username === loggedInUser;
});



console.log(trips);

const tripHTML = trips.map((trip: any , index:number) => `
    <div class="tripcard">
        <h2>${trip.destination}</h2>
        <p>📅 ${trip.duration} Days</p>
        <p>🏕️ ${trip.tripType}</p>
        <p>🌦️ ${trip.weather}</p>

        <button class="viewPackingBtn" data-index="${index}">
            View Packing List
        </button>

        <button class="deleteTripBtn" data-index="${index}">
            Delete Trip
        </button>
    </div>
`).join("");



myTripContainer.innerHTML = tripHTML;



const viewPackingBtns = document.querySelectorAll(".viewPackingBtn");


const packingPopup = document.getElementById("packingPopup") as HTMLDivElement;

function packingListHTML(items: string[]) {
    const list = items.map(item => `<li><label><input type="checkbox"> ${item}</label></li>`).join("");

    packingPopup.innerHTML = `
        <div class="packingbox">
            <button id="closePopup" class="closePopup">&times;</button>
            <h2>🧳 PACKING LIST</h2>
            <ul>${list}</ul>
        </div>
    `;

    packingPopup.style.display = "flex";

    document.getElementById("closePopup")?.addEventListener("click", () => {
        packingPopup.style.display = "none";
    });
}

viewPackingBtns.forEach((button) => {

    button.addEventListener("click", () => {

        const index = Number((button as HTMLElement).dataset.index);

        const trip = trips[index];

        
        packingListHTML(trip.items);

    });
});


const deleteTripBtns = document.querySelectorAll(".deleteTripBtn");


deleteTripBtns.forEach((button)=>{

    button.addEventListener("click",() => {

    const confirmDelete = confirm(
            "Are you sure you want to delete this saved trip?"
        );

        console.log("Confirm result:", confirmDelete);


        if (!confirmDelete) {
            return;
        }
        console.log("Deleting!");


        
        const index = Number((button as HTMLElement).dataset.index);
        console.log(index);

        const tripToDelete = trips[index];

        const tripIndex = allTrips.indexOf(tripToDelete);

        allTrips.splice(tripIndex, 1); 

        localStorage.setItem("myTrips",JSON.stringify(allTrips));

        location.reload();

  });
});

const usernameDisplay = document.getElementById("usernameDisplay") as HTMLSpanElement;


const logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;

const loginLink = document.getElementById("loginLink") as HTMLAnchorElement;

// const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        usernameDisplay.innerHTML = `Hey, ${loggedInUser}!`;
        loginLink.style.display = "none";
        logoutBtn.style.display = "inline-block";
    } else {
        usernameDisplay.innerHTML = "";
        loginLink.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("loggedInUser");
        logoutBtn.style.display = "none";
        loginLink.style.display = "inline-block";

        window.location.href = "mytrips.html";
    });

const backarrow = document.getElementById("backarrow") as HTMLButtonElement;
  if (backarrow){
    backarrow.addEventListener("click", function () {
        window.location.href = "plansmart.html";
    });
}

