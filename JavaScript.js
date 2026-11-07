// Book details for the library catalogue

var books = [
    {
        id: "B101",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Thriller",
        total: 3,
        available: 3,
        cover: "https://covers.openlibrary.org/b/isbn/9781409181637-L.jpg"
    },
    {
        id: "B102",
        title: "Fourth Wing",
        author: "Rebecca Yarros",
        genre: "Fantasy",
        total: 3,
        available: 3,
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCPbJ-2c8LA6Hlds1yAZ69O-rOcqB3UqHq0bpJdLDsqQ&s"
    },
    {
        id: "B103",
        title: "The Canterville Ghost",
        author: "Oscar Wilde",
        genre: "Fiction",
        total: 3,
        available: 3,
        cover: "https://koolskoolbookstore.com/cdn/shop/products/791_1b76a8d3-3b91-4654-bd5f-e0d32e905f47.jpg?v=1615901295"    },
    {
        id: "B104",
        title: "The Inheritance Games",
        author: "Jennifer Lynn Barnes",
        genre: "Mystery",
        total: 3,
        available: 3,
        cover: "https://covers.openlibrary.org/b/isbn/9781368052405-L.jpg"
    },
    {
        id: "B105",
        title: "Twenty Thousand Leagues Under the Sea",
        author: "Jules Verne",
        genre: "Adventure",
        total: 3,
        available: 3,
        cover: "https://cdn.shopify.com/s/files/1/0674/5433/7265/files/9781435162150_p0.jpg?v=1768953420"
    },
    {
        id: "B106",
        title: "One Arranged Murder",
        author: "Chetan Bhagat",
        genre: "Mystery",
        total: 3,
        available: 3,
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtu5a3XtgL_UFO4TDQZ0mfJbCbGTMfMiu6FRUk1m7Gw&s=10"
    },
    {
        id: "B107",
        title: "Inferno",
        author: "Dan Brown",
        genre: "Thriller",
        total: 3,
        available: 3,
        cover: "https://covers.openlibrary.org/b/isbn/9780552169585-L.jpg"
    },
    {
        id: "B108",
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
        genre: "Fantasy",
        total: 3,
        available: 3,
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DR7P8Icxu5aNfeiXApBekzCY2YjgE-sdjE1T4KIR8Q&s=10"
    },
    {
        id: "B109",
        title: "The Shock Doctrine: The Rise of Disaster Capitalism",
        author: "Naomi Klein",
        genre: "Non-fiction",
        total: 3,
        available: 3,
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RIN-GoI1dyXlj5NYiLXEFYNzzEVm7874T-6_24uwJEjbj8F3_slxWDc&s=10"
    },
    {
        id: "B110",
        title: "The Mark of Athena",
        author: "Rick Riordan",
        genre: "Fantasy",
        total: 3,
        available: 3,
        cover: "https://covers.openlibrary.org/b/isbn/9781423140603-L.jpg"
    },
    {
        id: "B111",
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-help",
        total: 3,
        available: 3,
        cover: "https://covers.openlibrary.org/b/isbn/9781847941831-L.jpg"
    },
    {
        id: "B112",
        title: "The Unexpected Guest",
        author: "Agatha Christie",
        genre: "Mystery",
        total: 3,
        available: 3,
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPETvQ5jlQlF7KVP0HSI53pJCJ8oHbIp4Ju-t8eRVgQQ&s=10"
    }
];

var records = [];
var activity = [];


// Save data in the browser

function saveData() {
    localStorage.setItem("literaryLaneBooks", JSON.stringify(books));
    localStorage.setItem("literaryLaneRecords", JSON.stringify(records));
    localStorage.setItem("literaryLaneActivity", JSON.stringify(activity));
}


// Load previously saved data

function loadData() {
    var savedBooks = localStorage.getItem("literaryLaneBooks");
    var savedRecords = localStorage.getItem("literaryLaneRecords");
    var savedActivity = localStorage.getItem("literaryLaneActivity");

    if (savedBooks) {
        books = JSON.parse(savedBooks);
    }

    if (savedRecords) {
        records = JSON.parse(savedRecords);
    }

    if (savedActivity) {
        activity = JSON.parse(savedActivity);
    }
}


// Display books in the catalogue

function displayBooks() {
    var grid = document.getElementById("bookGrid");

    var search = document.getElementById("searchInput").value.toLowerCase();
    var genre = document.getElementById("genreFilter").value;

    var output = "";
    var count = 0;

    for (var i = 0; i < books.length; i++) {
        var book = books[i];

        var matchesText =
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search);

        var matchesGenre =
            genre === "All" ||
            book.genre.toLowerCase() === genre.toLowerCase();

        if (matchesText && matchesGenre) {
            count++;

            output += '<div class="book-card">';
            output += '<div class="cover-wrap">';

            if (book.cover) {
                output += '<img src="' + book.cover +
                    '" alt="Cover of ' + book.title +
                    '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\';">';
            }

            output += '<div class="cover-fallback" style="display:' +
                (book.cover ? 'none' : 'grid') + '">' +
                book.title + '</div>';

            output += '</div>';

            output += '<div class="book-info">';
            output += '<h3>' + book.title + '</h3>';
            output += '<p class="book-author">by ' + book.author + '</p>';

            output += '<div class="book-meta">';
            output += '<span class="genre-pill">' + book.genre + '</span>';
            output += '<span class="book-id">' + book.id + '</span>';
            output += '</div>';

            output += '<p class="availability ' +
                (book.available === 0 ? 'unavailable' : '') + '">' +
                book.available + ' of ' + book.total +
                ' copies available</p>';

            output += '</div></div>';
        }
    }

    grid.innerHTML = output ||
        '<p class="empty-row">No books match your search.</p>';

    document.getElementById("catalogueCount").textContent =
        count + (count === 1 ? " book" : " books");

    updateStats();
}


// Update dashboard statistics

function updateStats() {
    var available = 0;
    var issued = 0;

    for (var i = 0; i < books.length; i++) {
        available += Number(books[i].available);

        issued += Number(books[i].total) -
                  Number(books[i].available);
    }

    document.getElementById("totalBooks").textContent = books.length;
    document.getElementById("availableBooks").textContent = available;
    document.getElementById("issuedBooks").textContent = issued;
    document.getElementById("requestCount").textContent = 0;
}


// Add an activity entry

function addActivity(message) {
    activity.unshift({
        message: message,
        time: new Date().toLocaleString()
    });

    if (activity.length > 8) {
        activity.pop();
    }

    displayActivity();
}


// Display recent activities

function displayActivity() {
    var box = document.getElementById("activityList");

    if (activity.length === 0) {
        box.innerHTML =
            '<p class="empty-row">Your recent library activity will appear here.</p>';
        return;
    }

    var output = "";

    for (var i = 0; i < activity.length; i++) {
        output += '<div class="activity-item">';
        output += '<span class="activity-dot"></span>';
        output += '<span>' + activity[i].message + '</span>';
        output += '<span class="activity-time">' + activity[i].time + '</span>';
        output += '</div>';
    }

    box.innerHTML = output;
}


// Display issue records

function displayRecords() {
    var body = document.getElementById("recordsBody");

    if (records.length === 0) {
        body.innerHTML =
            '<tr><td colspan="5" class="empty-row">No books have been issued yet.</td></tr>';
        return;
    }

    var output = "";

    for (var i = 0; i < records.length; i++) {
        var r = records[i];

        output += "<tr>";
        output += "<td>" + r.id + "</td>";
        output += "<td>" + r.title + "</td>";
        output += "<td>" + r.reader + "</td>";
        output += "<td>" + r.date + "</td>";

        output += '<td class="' +
            (r.status === "Issued" ? "status-issued" : "status-returned") +
            '">' + r.status + "</td>";

        output += "</tr>";
    }

    body.innerHTML = output;
}


// Add a new book

document.getElementById("addBookForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var title = document.getElementById("newTitle").value.trim();
    var author = document.getElementById("newAuthor").value.trim();
    var genre = document.getElementById("newGenre").value.trim();
    var copies = Number(document.getElementById("newCopies").value);
    var cover = document.getElementById("newCover").value.trim();

    var id = "B" + (101 + books.length);

    books.push({
        id: id,
        title: title,
        author: author,
        genre: genre,
        total: copies,
        available: copies,
        cover: cover
    });

    addActivity('Added "' + title + '" to the catalogue.');

    saveData();
    displayBooks();

    this.reset();

    document.getElementById("newCopies").value = 1;

    alert("Book added successfully!");
});


// Issue a book

document.getElementById("issueForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var id = document.getElementById("issueId").value.trim().toUpperCase();
    var reader = document.getElementById("readerName").value.trim();

    var book = books.find(function(item) {
        return item.id.toUpperCase() === id;
    });

    if (!book) {
        alert("Book ID not found.");
        return;
    }

    if (book.available < 1) {
        alert("No copies are currently available.");
        return;
    }

    book.available--;

    records.unshift({
        id: book.id,
        title: book.title,
        reader: reader,
        date: new Date().toLocaleDateString(),
        status: "Issued"
    });

    addActivity(reader + ' borrowed "' + book.title + '".');

    saveData();
    displayBooks();
    displayRecords();

    this.reset();

    alert("Book issued successfully!");
});


// Return a book

document.getElementById("returnForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var id = document.getElementById("returnId").value.trim().toUpperCase();
    var reader = document.getElementById("returnReader").value.trim();

    var record = records.find(function(item) {
        return item.id.toUpperCase() === id &&
               item.reader.toLowerCase() === reader.toLowerCase() &&
               item.status === "Issued";
    });

    var book = books.find(function(item) {
        return item.id.toUpperCase() === id;
    });

    if (!book || !record) {
        alert("No matching active issue record was found. Check the Book ID and reader name.");
        return;
    }

    if (book.available < book.total) {
        book.available++;
    }

    record.status = "Returned";

    addActivity(reader + ' returned "' + book.title + '".');

    saveData();
    displayBooks();
    displayRecords();

    this.reset();

    alert("Book returned successfully!");
});


// Open and close mobile sidebar

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("sidebarOverlay").classList.toggle("show");
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebarOverlay").classList.remove("show");
}


// Start the website

loadData();

document.getElementById("todayDate").textContent =
    new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

displayBooks();
displayRecords();
displayActivity();