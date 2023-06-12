var books = [
    { title: "Book 1", author: "Author 1", subject: "Subject 1", publishDate: "2023-01-11" },
    { title: "Book 2", author: "Author 2", subject: "Subject 2", publishDate: "2022-02-21" },
    { title: "Book 3", author: "Author 3", subject: "Subject 3", publishDate: "2021-03-31" },
    { title: "Book 4", author: "Author 4", subject: "Subject 4", publishDate: "2023-04-01" },
    { title: "Book 5", author: "Author 5", subject: "Subject 5", publishDate: "2022-05-02" },
    { title: "Book 6", author: "Author 6", subject: "Subject 6", publishDate: "2021-06-03" },
    { title: "Book 7", author: "Author 7", subject: "Subject 7", publishDate: "2023-07-04" },
    { title: "Book 8", author: "Author 8", subject: "Subject 8", publishDate: "2022-08-05" },
    { title: "Book 9", author: "Author 9", subject: "Subject 9", publishDate: "2021-09-06" },
    { title: "Book 10", author: "Author 10", subject: "Subject 10", publishDate: "2023-10-07" },
    { title: "Book 11", author: "Author 11", subject: "Subject 11", publishDate: "2022-11-08" },
    { title: "Book 12", author: "Author 12", subject: "Subject 12", publishDate: "2021-12-09" },
    
  ];
  function addBook() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const subject = document.getElementById("bookSubject").value;
    const publishDate = document.getElementById("bookPublishDate").value;

    if (title && author && subject && publishDate) {
        const bookes = { title, author, subject, publishDate };
        books.push(bookes); // Update book list with new book added
        alert("successful");
        applyFilters();
    }

  }
  
  var currentPage = 1;
  var booksPerPage = 10;
  
  function displayBooks(booksToDisplay) {
    var table = document.getElementById("book-table");
    table.innerHTML = "";
  
    var headerRow = table.insertRow(0);
    var headers = ["Title", "Author", "Subject", "Publish Date"];
    for (var i = 0; i < headers.length; i++) {
      var headerCell = headerRow.insertCell(i);
      headerCell.innerHTML = headers[i];
    }
  
    var startIndex = (currentPage - 1) * booksPerPage;
    var endIndex = startIndex + booksPerPage;
    var displayedBooks = booksToDisplay.slice(startIndex, endIndex);
  
    for (var j = 0; j < displayedBooks.length; j++) {
      var book = displayedBooks[j];
      var row = table.insertRow(j + 1);
  
      var titleCell = row.insertCell(0);
      var authorCell = row.insertCell(1);
      var subjectCell = row.insertCell(2);
      var dateCell = row.insertCell(3);
  
      titleCell.innerHTML = book.title;
      authorCell.innerHTML = book.author;
      subjectCell.innerHTML = book.subject;
      dateCell.innerHTML = book.publishDate;
    }
    
  }
  function renderCriteriaCounts(books) {
    const criteriaCounts = {
      title: {},
      author: {},
      subject: {},
      publishDate: {},
    };
  
    books.forEach((book) => {
      incrementCriteriaCount(criteriaCounts.title, book.title);
      incrementCriteriaCount(criteriaCounts.author, book.author);
      incrementCriteriaCount(criteriaCounts.subject, book.subject);
      incrementCriteriaCount(criteriaCounts.publishDate, book.publishDate);
    });
  
    renderCount('#title-count', criteriaCounts.title);
    renderCount('#author-count', criteriaCounts.author);
    renderCount('#subject-count', criteriaCounts.subject);
    renderCount('#publish-date-count', criteriaCounts.publishDate);
  }
  
  function incrementCriteriaCount(criteria, value) {
    if (criteria.hasOwnProperty(value)) {
      criteria[value].count += 1;
    } else {
      criteria[value] = { count: 1 };
    }
  }
  
  function renderCount(selector, criteria) {
    const countElement = document.querySelector(selector);
    let totalCount = 0;
  
    for (const value in criteria) {
      if (criteria.hasOwnProperty(value)) {
        const count = criteria[value].count;
        totalCount += count;
      }
    }
  
    countElement.textContent = totalCount;
  }
  function applyFilters() {
    var titleFilter = document.getElementById("title-filter").value.toLowerCase();
    var authorFilter = document.getElementById("author-filter").value.toLowerCase();
    var subjectFilter = document.getElementById("subject-filter").value.toLowerCase();
    var startDateFilter = document.getElementById("start-date-filter").value;
    var endDateFilter = document.getElementById("end-date-filter").value;

  
    var filteredBooks = books.filter(function (book) {
      var publishDate = new Date(book.publishDate);
      var startDate = new Date(startDateFilter);
      var endDate = new Date(endDateFilter);

      var withinRange = true;
      if (startDateFilter && endDateFilter) {
        withinRange = publishDate >= startDate && publishDate <= endDate;
      }
      return (
        book.title.toLowerCase().includes(titleFilter) && 
        book.author.toLowerCase().includes(authorFilter) &&
        book.subject.toLowerCase().includes(subjectFilter) &&
        withinRange
      );
    });
  
    renderPagination(filteredBooks.length);
    displayBooks(filteredBooks);
    renderCriteriaCounts(filteredBooks);    
    addBook(filteredBooks);
  }
  
  function changePage(pageNumber) {
    currentPage = pageNumber;
    applyFilters();
  }
  
  function renderPagination(totalBooks) {
    var totalPages = Math.ceil(totalBooks / booksPerPage);
    var pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
  
    for (var i = 1; i <= totalPages; i++) {
      var link = document.createElement("span");
      link.textContent = i;
      link.classList.add("pagination-link");
      if (i === currentPage) {
        link.classList.add("active");
      }
      link.addEventListener("click", function () {
        changePage(parseInt(this.textContent));
      });
      pagination.appendChild(link);
    }
  }
applyFilters();