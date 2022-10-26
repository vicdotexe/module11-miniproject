function getBookData(){
    const book = {};
    book.id = document.querySelector("#bookId").value;
    book.title = document.querySelector("#bookTitle").value;
    book.author = document.querySelector("#bookAuthor").value;
    return book;
}

document.querySelector("#newBook").addEventListener("submit", (e)=>{
    e.preventDefault();
    fetch("/api/books", {
        method:"POST",
        body: JSON.stringify(getBookData()),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if (res.ok){
            location.reload();
        }else{
            return res;
        }
    })
});

function renderBooks(){
    fetch("/api/books").then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        const ul = document.querySelector("#allBooks");
        ul.innerHTML = "";
        data.forEach(book => {
            const li = document.createElement("li");
            li.innerText = book.title;
            ul.appendChild(li);
        });
    })
}

renderBooks();