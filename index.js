let deckId;
document.addEventListener('DOMContentLoaded', () => {
    loadPage();
    configureButtonClickEvent();
}
);
function addRemainig(input) {
    let remaining = document.querySelector("#remainigcards");
    remaining.textContent = input;
}

function configureButtonClickEvent() {
    let getCards = document.querySelector("#getCards");
    getCards.addEventListener('click', () => {

        if (deckId != null) {
            let number = document.querySelector("#cardsnumber");
            let numberOfCards = number.options[select.selectedIndex].value;
            drawCards(deckId, parsInt(numberOfCards))
        }
    })
}
function loadPage() {
    axios
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

function drawCards(id, number) {
    debugger
    let url = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${number}`;
    axios
        .get(url)
        .then(response => {
            response.data.cards.forEach(card => {
                let imgElement = document.createElement("img");
                imgElement.src = card["image"];
                var section = document.querySelector("section");
                section.appendChild(imgElement);
            });



        })
        .catch(error => { console.log(error) });
}
