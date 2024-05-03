const articleListURL ='https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/49ddd7c2636fb722912d91107aff55c79ddf05a8/articles.json'

document.addEventListener('DOMContentLoaded', function() {
    initArticleList();
})

function initArticleList() {  
    const responsePromise = fetch(articleListURL);  //fetch: holt Daten von der URL
    responsePromise.then(function(response) {   //then: wartet erst auf Daten und führt dann die Funktion aus
        //console.log(response);  //zeigt die Daten im Console an; Log vor/nach then würde direkt ausgeführt werden und nicht auf Daten warten
        const dataPromise = response.json();  //json: gibt die Daten als JSON zurück
        dataPromise.then(function(data) {
            renderArticleList(data.articles);
        });
    });
}

function renderArticleList(articles) {
    articleListElement = document.querySelector('[data-js-generate-articleList]');
    const cards =articles.map(function(article) {
        return `<li>
        <figure>
            <img src="/images/${article.teaserImg}" alt="">
            <figcaption>
                <h3>${article.title}</h3>
                <address>${article.author}</address>
            </figcaption>
        </figure>
        </li>`;
    }).join('');

    articleListElement.innerHTML = cards;
    console.log(cards);

/*     console.log(articleListElement);
    console.log(articles);
    //articleListElement.innerHTML = 
    const authors = articles.map(function(article) {
        return `<li>${article.author}</li>`;
    })
    articleListElement.innerHTML = authors.join('');
    console.log(authors); */
}