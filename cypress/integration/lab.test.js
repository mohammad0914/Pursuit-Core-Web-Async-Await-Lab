const deckId = "my-deck-id";

const clickForDeck = (fixture, count = 5) => {
  cy.intercept(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`, { fixture });
  cy.get("button").click();
};

const visitWithFirstDeck = () => {
  cy.intercept("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", {
    deck_id: deckId,
  });

  cy.visit("./index.html");

  clickForDeck("cards1.json");
};

describe("Index", () => {
  it("starts the select with a default value of 5", () => {
    cy.visit("./index.html");
    cy.get("select").should("have.value", 5);
  });

  it("starts the deck out with 52 card(s) left", () => {
    cy.visit("./index.html");
    cy.get("#remaining").should("have.text", "52 card(s) left.");
  });

  it("shows five cards from the retrieved deck ID when the button is clicked", () => {
    visitWithFirstDeck();

    cy.fixture("cards1.json").then((cardsFixture1) => {
      cy.get(".card")
        .should("have.length", 5)
        .each((card, index) => {
          cy.wrap(card).should("have.attr", "src", cardsFixture1.cards[index].image);
        });
    });

    cy.get("#remaining").should("have.text", "47 card(s) left.");
  });

  it("fetches new cards when the button is clicked again with a different count", () => {
    visitWithFirstDeck();

    cy.get("select").select("3");

    clickForDeck("cards2.json", 3);

    cy.fixture("cards2.json").then((cardsFixture2) => {
      cy.get(".card").each((card, index) => {
        cy.wrap(card).should("have.attr", "src", cardsFixture2.cards[index].image);
      });
    });

    cy.get("#remaining").should("have.text", "44 card(s) left.");
  });
});
