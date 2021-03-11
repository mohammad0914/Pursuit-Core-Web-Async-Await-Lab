[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Pursuit-Core-Web-Promises-Async-Await-Lab

## Getting Started

- Fork this repo
- Clone the forked repository
- `cd` to the directory where you cloned it
- `npm install` to install dependencies
- `npm test` to open the cypress testing window

> _Note_: Remember to `git add`, `git commit` and `git push` regularly

## Lab: Five (or more, or less) Card Draw

Today, we're going to be working with the [Deck of Cards API](https://deckofcardsapi.com/).
It's a foundational skill for us, as programmers, to learn how any particular API works from some time testing it out, so take 15 minutes or so to look at the API documentation and play around with it in Postman.

Today, we're going to create an app that does these things:

- Creates and shuffles a new deck when the page loads.
- Includes a `<select>` element and a button to draw 1-10 cards from that deck.
- Displays those cards to the user.
- When the user clicks the button again, draws another set of cards from that same deck.
- Shows the user how many cards remain in the deck, and updates this number every time cards are drawn.

![Screen recording of drawing 5 cards, then 3, then 1](https://user-images.githubusercontent.com/3335181/110704658-46b7f980-81c3-11eb-9acb-8335f483daf3.gif)

Let's break this down into smaller problems, shall we?

### Creating and Saving A Deck

When your page first loads, you should generate a new shuffled deck from the Deck of Cards API. You can look at the [Deck of Cards API documentation](https://deckofcardsapi.com/) to figure out how to make that request. Take note of the data it returns.

<details>
  <summary>Need a hint?</summary>
  The route to hit to accomplish this, according to the Deck of Cards docs, is this: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`.
  Use an `async` function that `await`s the result of an Axios call to that route.
</details>

<details>
  <summary>Need more hints?</summary>
  The response from that route should give you several parameters, but the two that care about are `deck_id` and `remaining`.
  With this `deck_id`, the Deck of Cards API is going to give us five cards from _that specific deck_ when we draw them.
  If we draw another five cards, it'll draw the next five unique cards from that deck.
  The API will also give us an updated `remaining` count every time we draw cards from that deck.
  The API, in other words, is keeping track of this information for us.
</details>

<details>
  <summary>Even more hints!</summary>
  However, we can't query this API multiple times for that deck if we don't save it.
  Go ahead and save the deck ID in a variable and save the remaining count in another variable.
  Remember not to hard code the ID or count - **whenever the user refreshes the page, we should query the API for a new deck and save our new deck ID.**
</details>

### Drawing Cards

The next thing we'd like to do is to draw cards from our deck.
Using our deck ID, the Deck of Cards API lets us draw one or more cards from the deck that we just created.
The [Deck of Cards API documentation](https://deckofcardsapi.com/) will tell you how to make this request and what data it will return.

<details>
  <summary>Need a hint?</summary>
  The route for drawing five cards should look something like this: `https://deckofcardsapi.com/api/deck/~deckId~/draw/?count=5`, where `~deckId~` is the deck ID item we saved.
  
  Use Axios to query this route.

  What is available to us here in the response? Well, again, we have two useful keys in this response: `cards`, which contains an array of `Card` objects, and `remaining`, which tells us the number of cards left in the deck.
</details>

<details>
  <summary>Need more hints?</summary>
  Each of these `Card` objects have a set of parameters, all of which could prove useful to us, depending on what we want to do with them: There's an `image` URL, which links to a picture of the card.
  There's a `value` and `suit` parameter, and then there's a `code` parameter with shorthand should we need it.
</details>

<details>
  <summary>Even more hints!</summary>
  Create a `button` tag in your HTML.
  When you click on this `button`, you should fire your Axios request to draw five cards.
  Save the cards to a variable in your project.
  You'll also want to update the remaining count that you have saved in your project.
  When you click the button again, you should draw five different cards.
</details>

### Rendering Cards to the DOM

When we click, we should see the images of five cards, in a row, underneath our button. 
**Give each button a class of `.card`**
> _Note_: The Cypress tests will be looking for the `.card` class to find the cards. **The tests won't pass unless you use the `.card` class name.**

<details>
  <summary>Need a hint?</summary>
  In your button event listener, after your Axios request, loop through your five cards.
  Create `img` tags for each of them, give each a class of `.card`, set each `src` to a the card's image URL, and append them to the DOM underneath your `button` tag.
</details>

### Remaining Cards Indicator

Add a `p` with ID `"#remaining"` below the cards that says _`N card(s) left`_, where `N` is the number of cards left in the deck.
Whenever the API is called for new card(s), update this paragraph's text content accordingly.
> _Note_: The Cypress tests will be looking for the `#remaining` id. **The tests won't pass unless you use this id.**

When the page loads, the remaining cards count should start at `52`.

<details>
  <summary>Need a hint?</summary>
  Whenever you draw a card, the API response contains a `remaining` property that says how many cards are left in the deck.
  When you create a deck, the API response also contains a `remaining` key.
</details>
 

### Drawing More or Fewer Cards

Create a `select` tag underneath your `button`.
Your `select` tag should be filled with numbers from 1 through 10.
Give it a default value of 5 to start.

### Styling

It's time to make your browser look like a genuine card table.
On your `body`, change the background color to be `green`.
Create a `div` tag to surround your `button`, `select` box, and cards, and make the background color `darkgreen`.
Center your cards and inputs on the page, and give them some `margin` of `10px` so that they aren't touching the top of the page directly.

Finally, add a `hover` effect to each card image to `transform` the card to a `1.1` scale when the user hovers over it - as if they're selecting that card.
Isn't it satisfying to mouse over all your cards now?

## Submission Guidelines

- When finished, commit and push your work.
- Make a pull request on github.
- Submit the link to your pull request on Canvas.

Note that these tests use [Cypress fixtures](https://docs.cypress.io/api/commands/fixture.html), or files that are used to store data used in tests.
You can find the JSON fixtures used for network responses under `cypress/fixtures`.

> Tip: see how the data stored in those `.json` files corresponds to what's used in tests.

## Bonus: Single Card Replacements

Add a `"click"` event listener so that whenever a card image is clicked, the API is called to draw a single card.
Replace the `src` of the clicked card image with the single drawn card's image. 
