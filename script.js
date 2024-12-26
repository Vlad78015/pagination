let formSearch = document.querySelector(".form-search") 
let inputSearch = document.querySelector(".input-search") 
let btnSearch = document.querySelector(".btn-search") 
let txtPage1 = document.querySelector(".page-1")
let APIURL = 'https://newsapi.org/v2/everything' 
let APIKEY = 'bda4358801984da0830a4103676f9a2d' 
let currentPage = 1 
let currentInput = '' 
let btnLeft = document.querySelector(".btn-left") 
let btnRight = document.querySelector(".btn-right") 
let page1 = document.querySelector(".page-1")
let newsPerPage = 8
document.getElementById('burger').addEventListener('click', function() {
    let nav = document.querySelector('.nav');
    nav.classList.toggle('active'); 
});
function fetchNews() { 
    let url = `${APIURL}?q=${currentInput}&page=${currentPage}&pageSize=${newsPerPage}&apiKey=${APIKEY}`
    fetch(url, { 
        method: 'GET', 
    }) 
    .then(Response => { 
        if (!Response.ok) { 
            console.error("Error") 
        } 
        return Response.json() 
    }) 
    .then(data => { 
        btnRight.style.display = 'block' 
        btnLeft.style.display = 'block' 
        page1.style.display = 'block' 
        let boxNews = document.querySelector(".box-news") 
        if (data.articles.length === 0) { 
            boxNews.innerHTML = `<li class='txt-error'>It' not found</li>`
                btnRight.style.display = 'none' 
                page1.style.display = 'none' 
        }  
        else { 
            boxNews.innerHTML = '' 
            btnRight.style.display = 'block' 
            page1.style.display = 'block' 
        } 
        data.articles.forEach(article => { 
            let oneNew = document.createElement('li') 
            oneNew.classList.add("article-new") 
            oneNew.innerHTML = ` 
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">  
                    <article>  
                        <img class='img-article' src="${article.urlToImage || 'https://via.placeholder.com/480'}" alt="${article.title}">  
                        <h2>${article.title}</h2>  
                        <p>Posted by: ${article.author || 'Unknown'}</p>  
                        <p>${article.description || 'No description available'}</p>  
                    </article>  
                </a> 
            ` 
            boxNews.appendChild(oneNew) 
        }) 
        updatePagination(data.totalResults) 
    }) 
    .catch(error => { 
        console.error(error) 
    }) 
}
    btnSearch.addEventListener("click", function(){ 
        let workingInput = inputSearch.value.trim(); 
        if(workingInput !== currentInput){ 
            currentInput = workingInput; 
            currentPage = 1; 
            fetchNews();
        }}) 
         function updatePagination(totalResults){ 
            txtPage1.textContent = `Page ${currentPage}`
            let totalPages = Math.ceil(totalResults / 8) 
            if(currentPage === 1){ 
                btnLeft.style.display = 'none' 
            } 
            else if(currentPage >= totalPages){ 
                btnRight.style.display = 'none' 
            } 
            else{ 
                btnLeft.style.display = 'block' 
            } 
        }
        /* function updatePagination(totalResults) {
            let totalPages = Math.ceil(totalResults / newsPerPage)
            totalPages = Math.min(totalPages, maxPages)
            let paginationContainer = document. querySelector(".pagination-numbers") 
            paginationContainer.innerHTML = ' '

            let startPage = Math.max(1, currentPage - 2)
            let endPage = Math.min(totalPages, currentPage + 2)

            if(startPage > 1) {
            createPageButton(1, paginationContainer)
            if(startPage > 2) {
            let dots = document.createElement("span")
            dots.textContent = "..."
            paginationContainer.appendChild(dots)
        }
    }
            for (let i = startPage; i <= endPage; i++) {
            createPageButton(i, paginationContainer)
        }
            if(endPage < totalPages){
            if(endPage < totalPages - 1) {
            let dots = document.createElement("span")
            dots.textContent = "..."
            paginationContainer.appendChild(dots)
            }
            createPageButton(totalPages, paginationContainer)
        }
            btnLeft.style.display = currentPage > 1 ? 'block' :
            'none'
            btnRight.style.display = currentPage < totalPages
            ? 'block' : 'none'
        } */

        
/* function createPageButton(page, container){
    let pageButton = document.createElement("button")
    pageButton.textContent = page
    pageButton.classList.add("pagination-button")
    if(page === currentPage){
        pageButton.style.color = "green"
        pageButton.style.fontWeight = "bold"
    }
    pageButton.addEventListener("click", function(){
        currentPage = page
        fetchNews()
    })
    container.appendChild(pageButton)
} */
btnRight.addEventListener("click", function(){
    currentPage++
    fetchNews()
})
btnLeft.addEventListener("click", function(){
    if(currentPage > 1){
        currentPage--
        fetchNews()
    }
})