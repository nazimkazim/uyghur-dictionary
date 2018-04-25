import { http } from './http';

//document.addEventListener('DOMContentLoaded', getWords);

// Search input
const searchWord = document.querySelector(".input");
// Cache related words container
const related_words_container = document.querySelector('.related_words_container');

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


            // Cache related words categories container
            let related_words_categories_container = document.querySelector('.categories_container');

            if (matchedWord) {
                // Append found words to container
                document.querySelector('.my-container').innerHTML = `
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

                // Assign unique categories to the variable
                const _categories = getCategories(categories);

                // Loop unique categories
                _categories.forEach(function (category) {
                    categories_output += `
                    <a class="level-item tag is-primary is-medium category-item" href="#">
                        ${category}
                    </a>`
                })



                // Display related word on page
                related_words_container.innerHTML = `
                <div class="title is-3">Выражения и словосочетания</div>
                ${words_output}`;

                // Display categories on page
                related_words_categories_container.innerHTML =
                    `<div class="tags">
                        ${categories_output}
                    </div>`

                // Fetch categories values 
                const cat_vals = document.querySelectorAll('.level-item');

                // Loop through all categories values
                cat_vals.forEach(function (v) {
                    v.addEventListener('click', function (e) {
                        const cat_val = e.target.innerText;
                        const res = toggleWordsOnCategories(cat_val);
                        //console.log(res);
                    });

                })

            }
            //const children = related_words_container.childNodes;
            //console.log(children);
        }))
        .catch(err => console.log(err));

    // Function to toggle words on categories
    function toggleWordsOnCategories(category_text) {
        // Get direct chilren from related words container
        const childrenNodeList = related_words_container.children;
        const dividedClass = category_text.split(" ")[0];
        //console.log(dividedClass[0]);

        // Get length of the children
        const childrenLen = related_words_container.children.length - 1;

        // Loop thorough classes of children node list
        for (var i = 1; i <= childrenLen; i++) {
            // check if child node contains class of a category
            if (childrenNodeList[i].classList.contains(dividedClass)) {
                //console.log("true");
                //console.log(childrenNodeList[i].classList);
                //console.log(category_text);
                childrenNodeList[i].classList.toggle('show');
                childrenNodeList[i].classList.remove('hide');
            } else {
                childrenNodeList[i].classList.add('hide');
            }
        }
        //console.log(childrenNodeList);

    }

    // Function responsible for creating a unique array
    function getCategories(categories) {
        var uniqueArray = Array.from(new Set(categories));
        return uniqueArray;
    }
}

