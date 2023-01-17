log = console.log;

// set global variables
const form = document.querySelector("#form");
const paginationContainer = document.querySelector(".pagination-container");
const paginationNumbers = document.querySelector("#page-numbers");
const prevButton = document.querySelector("#prev-btn");
const nextButton = document.querySelector("#next-btn");

const paginationLimit = 20;
const maxSearchResults = 100;
const pageCount = Math.ceil(100 / paginationLimit);
let currentPage = 1;
let sroffset = 0;

// handle the form
form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  // clear the page
  clearPageResults();

  // get the search query
  const searchQuery = getInputValue();

  // fetch and output the results
  try {
    const searchResults = await getWikiResults(searchQuery);
    if (searchResults.query.searchinfo.totalhits === 0) {
      alert("No results found. Try different keywords");
      return;
    }
    displayResults(searchResults);
    enablePaginationContainer();
  } catch (err) {
    console.log(err);
    alert("Failed to search Wikipedia.");
  }
}

const getInputValue = () => {
  const inputValue = document.querySelector("#search").value.trim();

  if (inputValue === "") {
    alert("Please enter a search result");
  }

  return inputValue;
};

const clearPageResults = () => {
  document.querySelector("#search-container").innerHTML = "";
};

// fetch the results
async function getWikiResults(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&prop=info&inprop=url&utf8=&format=json&srlimit=20&srsearch=${searchQuery}
  `;

  // const encodeEndpoint = encodeURI(endpoint);
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

// display the results
function displayResults(results) {
  // get the search container
  const searchContainer = document.querySelector("#search-container");

  const {
    query: { search },
  } = results;

  search.forEach((result) => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

    searchContainer.insertAdjacentHTML(
      `beforeend`,
      `<div class="result-item">
        <h3 class="result-title">
          <a href="${url}" ref="noopener" target="_blank">${result.title}</a>
        </h3>
        <a href="${url}" class="result-link" ref="noopener" target="_blank"
          >${url}</a
        >
        <span class="result-snippet"
          >${result.snippet}</span
        >
      </div>`
    );
  });
}

// handle pagination

const enablePaginationContainer = () => {
  paginationContainer.classList.remove("hidden");
};

const disablePaginationContainer = () => {
  paginationContainer.classList.add("hidden");
};

nextButton.addEventListener("click", getNextPage);

prevButton.addEventListener("click", getPrevPage);

async function getNextPage() {
  const inputValue = getInputValue();

  clearPageResults();

  disablePaginationContainer();

  try {
    const nextPageResults = await getWikiResults(
      `${inputValue}&sroffset=${(sroffset += 20)}`
    );
    if (nextPageResults.query.searchinfo.totalhits === 0) {
      alert("");
    }
    displayResults(nextPageResults);
    enablePaginationContainer();
  } catch (err) {
    alert("No more results found.");
    return;
  }
}

async function getPrevPage() {
  if (sroffset <= 0) {
    return;
  }

  const inputValue = getInputValue();

  clearPageResults();

  disablePaginationContainer();

  try {
    const prevPageResults = await getWikiResults(
      `${inputValue}&sroffset=${(sroffset -= 20)}`
    );
    displayResults(prevPageResults);
    enablePaginationContainer();
  } catch (err) {
    alert(err);
    return;
  }
}
