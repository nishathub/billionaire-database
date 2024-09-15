
const errorMessage = document.getElementById('error-message');
const loadCocktail = async (limitNumber) => {
    const url = `https://forbes400.onrender.com/api/forbes400?limit=${limitNumber}`;
    try {
        // show spinner
        showSpinner();
        const res = await fetch(url);
        if (!res.ok) {
            if(res.status === 404){
                errorMessage.innerHTML = `Not Found`;
            } else {
                errorMessage.innerHTML = `Error fetching data, please try again later`;
            }
            throw new Error(`HTTP error! status : ${res.status}`);
        } else {
            const data = await res.json();
            displayCocktail(data);
        }

    } catch (error) {
        console.log('error fetching data ' , error);
        errorMessage.innerHTML = `Error fetching data, please try again later`;
    }
    finally {
        // hide spinner
        hideSpinner();
        setTimeout(() => {
            errorMessage.innerHTML = '';
        }, 5000);
    }
};

const cardHolder = document.getElementById('card-holder');
const displayCocktail = (data) => {
    cardHolder.innerHTML = '';
    errorMessage.innerHTML = '';
    console.log(data.length);
    if(data.length === 0){
        errorMessage.innerHTML = 'No data found';
    } else {
        data.forEach(element => {
            console.log(element);
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <img src = "${element.person.squareImage}">
            <h4>${element.person.name}</h4>
            <p> State : ${element.state ? element.state : ''}</p>
            <p> Rank : ${element.rank}</p>
            <p> Source : ${element.source}</p>
            <p> Industries : ${element.industries[0]} ${element.industries[1] ? element.industries[1] : '' }</p>
            
            `;
            cardHolder.appendChild(card);
        });
    }

}

// search 
const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function(){
    console.log('clicked');
    searchKey = searchField.value;
    if(searchKey === ''){
        alert('Search field is empty');
    } else {
        loadCocktail(searchKey);
        searchField.value = '';
    }
});
// show some items on window load

// spinner

// Function to show the spinner
function showSpinner() {
    spinner.style.display = 'block';
}

// Function to hide the spinner
function hideSpinner() {
    spinner.style.display = 'none';
}
loadCocktail('10');