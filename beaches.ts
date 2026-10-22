const beachcards = document.querySelector(".beachcards") as HTMLDivElement;


interface Destination {
    id: string;
    name: string;
    image: string;
    description: string;
    category: string[];
    link: string;
}

const backarrow = document.getElementById("backarrow") as HTMLButtonElement;
  if (backarrow){
    backarrow.addEventListener("click", function () {
        window.location.href = "explore.html";
    });
}



async function loadbeachCards() {

    const response = await fetch("./data/destinations.json");

    const destinations: Destination[] = await response.json();


    destinations.forEach((destination) => {

        console.log(destination.name);
        console.log(destination.category);


        if (destination.category.includes("beach")) {

            const card = document.createElement("div");

            card.className = "explorechard";

            card.id = destination.id;


            card.innerHTML = `

                <img
                    src="${destination.image}"
                    width="180"
                    height="120"
                >

                <h3>${destination.name}</h3>

                <p>
                    ${destination.description}
                </p>

                <a href="viewdetails.html?destination=${encodeURIComponent(destination.name)}">
                View Details
                </a>

            `;


            beachcards.appendChild(card);

        }
     });

}


loadbeachCards();