let deckId;
document.addEventListener('DOMContentLoaded', () => {
    loadPage();
    configureButtonClickEvent();
}
);
function addRemainig(input) {
    let remaining = document.querySelector("#remaining");
    remaining.textContent = input;
}

function configureButtonClickEvent() {
    let getCards = document.querySelector("#getCards");
    getCards.addEventListener('click', () => {
        // debugger
        if (deckId != null) {
            let number = document.querySelector("#cardsnumber");
            let numberOfCards = number.options[number.selectedIndex].value;
            drawCards(deckId, parseInt(numberOfCards))
        }
    })
}
async function loadPage() {
    await axios
        .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(resposne => {
            // debugger
            if (resposne.data.success) {
                deckId = resposne.data.deck_id;
                addRemainig(resposne.data.remaining);
                console.log(resposne.data);
            }
        })
        .catch(error => {
            console.log(error);
        });



}

async function drawCards(id, number) {
    debugger
    let url = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${number}`;
    await axios
        .get(url)
        .then(response => {
            removeChild();
            response.data.cards.forEach(card => {
                let imgElement = document.createElement("img");
                imgElement.src = card["image"];
                imgElement.className = ".card";
                var section = document.querySelector("section");
                section.appendChild(imgElement);
            });

            let remain = response.data.remaining;
            addRemainig(remain);
        })
        .catch(error => { console.log(error) });
}

function removeChild() {
    var section = document.querySelector("section");
    var images = document.querySelectorAll("img");
    for (let image of images) {
        section.removeChild(image);
    }
}


