const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showSpinningLoader(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeSpinningLoader(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiQuotes = [];

// Show New Quote
function newQuote(){
    showSpinningLoader();
    // Math.random() returns a floating point between 0 and 1
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent = quote.author;
    }
    // check Quote length to determine styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    removeSpinningLoader();
    quoteText.textContent = quote.text;
}

// Get Quotes from API
async function getQuotes() {
    showSpinningLoader();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        
        newQuote();
    } catch(error) {
        // Catch Error here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); // '_blank' open in a new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load 
getQuotes();