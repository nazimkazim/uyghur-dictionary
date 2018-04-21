import { http } from './http';

//document.addEventListener('DOMContentLoaded', getWords);

// Search input
const searchWord = document.getElementById("search_word");

// Array of categories
const categories = [];

// Search input event listener
searchWord.addEventListener('keyup', (e) => {
    // Get input text
    const userText = e.target.value;

    if (searchWord !== '') {
        //console.log(userText);
        getWords(userText);
    }
});


function getWords(input) {

    http.get('http://localhost:3000/words')
        .then(data => data.forEach(function (word) {
            // Initialize words_output 
            let words_output = '';

            // Initialize categories_output
            let categories_output = '';

            // Check if a searched word in json matches input 
            const matchedWord = word.word_uyghur_cyrilic === input;

            // Fetch all related words
            const related_words = word.related_words;

            // Cache related words container
            let related_words_container = document.querySelector('.related_words_container');

            // Cache related words categories container
            let related_words_categories_container = document.querySelector('.categories_container');


            if (matchedWord) {

                // Append found words to container
                document.querySelector('.container').innerHTML = `
                <br>
                <span>${word.word_uyghur_cyrilic} - ${word.translation_russian}</span>
                `;

                // Object of related words
                Object.keys(related_words).forEach(function (word) {

                    // Populate words output with divs
                    words_output += `<div class="${related_words[word].category}">${related_words[word].word_uyghur_cyrilic} - ${related_words[word].translation_russian};</div>`

                    // Push categories array with categories from JSON
                    categories.push(related_words[word].category);

                });

                const _categories = getCategories(categories);

                _categories.forEach(function (category) {
                    categories_output += `<a href="${category}">${category}</a>`
                })

                related_words_container.innerHTML = words_output;
                //console.table(categories);


                related_words_categories_container.innerHTML = categories_output
            }
        }))
        .catch(err => console.log(err));

    // Function responsible for creating a unique array
    function getCategories(categories) {
        var uniqueArray = Array.from(new Set(categories));
        return uniqueArray;
    }
}

