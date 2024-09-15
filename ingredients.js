
const loadIngredient = async (getUrl) => {
    const url = getUrl;
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
}
const ingredientBox = document.getElementById('ingredient-collection');
ingredientBox.addEventListener('click', function(event){
    let childId = event.target.id;
    switch (childId) {
        case 'state-button':
            let searchState = this.childNodes[1].childNodes[1].value;
            if(searchState === ''){
                alert('Input field is Empty !');
            } else {
                loadIngredient(`https://forbes400.onrender.com/api/forbes400/states/${searchState}`);
            }
            break;
        case 'industry-button':
            let searchIndustry = this.childNodes[3].childNodes[1].value;
            if(searchIndustry === ''){
                alert('Input field is Empty !');
            } else{
                loadIngredient(`https://forbes400.onrender.com/api/forbes400/industries/${searchIndustry}`);
            }
            break;
        case 'filter-button':
            let searchCategory = this.childNodes[5].childNodes[1].value;
            if(searchCategory === ''){
                alert('Input field is Empty !');
            } else {
                loadIngredient(`https://forbes400.onrender.com/api/forbes400/${searchCategory}`);
            }
            break;
        default:
            console.log('No default switch has been set');;
            break;
    }
})
