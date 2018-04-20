import { http } from './http';

//document.addEventListener('DOMContentLoaded', getWords);

// Search input
const searchWord = document.getElementById("search_word");

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
            let output = '';
            const matchedWord = word.word_uyghur_cyrilic === input;
            const related_words = word.related_words;
            let related_words_container = document.querySelector('.related_words_container');
            if (matchedWord) {
                document.querySelector('.container').innerHTML = `
                <br>
                <span>${word.word_uyghur_cyrilic} - ${word.translation_russian}</span>
                `;

                // Object of related words
                Object.keys(related_words).forEach(function (word) {
                    //console.log(related_words[word].word_uyghur_cyrilic);
                    //console.log(related_words[word].translation_russian);
                    output +=`<div>${related_words[word].word_uyghur_cyrilic} - ${related_words[word].translation_russian};</div>`
                });

                //console.log(typeof(output));
                related_words_container.innerHTML = output;
            }
        }))
        .catch(err => console.log(err));

        function getCategories(category, className) {
            
        }
}

