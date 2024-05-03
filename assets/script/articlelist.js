use = 'strict';
const articleListURL ='https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/49ddd7c2636fb722912d91107aff55c79ddf05a8/articles.json'
let currentData = null;

document.addEventListener('DOMContentLoaded', function() {
    initArticleList();
})

function initArticleList() {    //holt die Daten von der URL und zeigt sie an
    const responsePromise = fetch(articleListURL);  //fetch: holt Daten von der URL
    responsePromise.then(function(response) {   //then: wartet erst auf Daten und führt dann die Funktion aus
        //console.log(response);  //zeigt die Daten im Console an; Log vor/nach then würde direkt ausgeführt werden und nicht auf Daten warten
        const dataPromise = response.json();  //json: gibt die Daten als JSON zurück
        dataPromise.then(function(data) {
            currentData = data;
            renderArticleList(data.articles);
            initFilters();
        });
    });
}

function filterArticles(filterValue) {  //filtert die Artikel nach den Keywords
    const filteredArticles = currentData.articles.filter(function(article) {
        return article.tags.keywords.includes(filterValue); //includes: prüft ob filterValue in keywords enthalten ist, wenn true dann wird gespeichert in filteredArticles
    });
    return filteredArticles;
}

function initFilters() {    //Filterbuttons werden initialisiert
    filterButtons = document.querySelectorAll('[data-js-category="keywords"] [data-js-filter]');
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const filter = event.currentTarget.getAttribute('data-js-filter');
            const filteredArticles = filterArticles(filter);
            //console.log(event.currentTarget);
            renderArticleList(filteredArticles);
        });
    });
    console.log(filterButtons);
}

function renderArticleList(articles) {  //zeigt die Artikel in der Liste an
    articleListElement = document.querySelector('[data-js-generate-articleList]');
    const cards = articles.map(function(article) {
        return `<li>
        <figure>
            <img src="/images/${article.teaserImg}">
            <figcaption>
                <h3>${article.title}</h3>
                <address>${article.author}</address>
                <ul class="tag-list">
                    ${article.tags.keywords.map((tag) => ` <li>${tag}</li>`).join('')}
                    ${article.tags.fileFormat.map((tag) => ` <li>${tag}</li>`).join('')}
                    ${article.tags.modules.map((tag) => ` <li>${tag}</li>`).join('')}
                    ${article.tags.projectphase.map((tag) => ` <li>${tag}</li>`).join('')}
                </ul>
            </figcaption>
        </figure>
        </li>`;
    }).join('');

    articleListElement.innerHTML = cards;
    console.log(cards);
}
