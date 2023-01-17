const quoteBtn = document.getElementById("newQuote");
const twitterBtn = document.getElementById("newTweet");
const url = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const spinner = document.querySelector("#js-spinner");

quoteBtn.addEventListener("click", getQuote);

async function getQuote() {
  // fetch the quote from the Trump url

  // remove the "hidden" class on the spinner
  spinner.classList.remove("hidden");
  // disable the quote button
  quoteBtn.disabled = true;
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      // If the response is not 200 throw an error.
      throw new Error(resp.statusText);
    }
    const data = await resp.json();
    const { message } = data;
    displayQuote(message);
    setTweetButton(message);
  } catch (err) {
    console.log(err);
    alert(`Failed to fetch new quote`);
  } finally {
    // enable the quote button
    quoteBtn.disabled = false;
    // add the "hidden" class back again
    spinner.classList.add("hidden");
  }
}

function displayQuote(quote) {
  // display the quote in the quotesContainer
  const quotesContainer = document.getElementById("quotes-container");
  quotesContainer.textContent = quote;
}

function setTweetButton(quote) {
  // dweet quote
  twitterBtn.setAttribute(
    "href",
    `https://twitter.com/share?text=${quote} - Donald Trump`
  );
}

// display a quote on opening the page
getQuote();
