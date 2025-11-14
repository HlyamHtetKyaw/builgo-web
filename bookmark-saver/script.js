// Select elements
const form = document.getElementById("bookmark-form");
const bookName = document.getElementById("bookmark-name");
const bookUrl = document.getElementById("book-url");
const bookmarkList = document.getElementById("bookmarks");

// Load bookmarks from localStorage on page load
document.addEventListener("DOMContentLoaded", showBookmarks);

// Form submit handler
form.addEventListener("submit", addBookmark);

// Add Bookmark
function addBookmark(e) {
  e.preventDefault();

  const name = bookName.value.trim();
  const url = bookUrl.value.trim();

  if (!name || !url) {
    alert("Please enter both Bookmark Name and URL");
    return;
  }

  // Create bookmark object
  const bookmark = {
    id: Date.now(),
    name,
    url,
  };

  // Save to localStorage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Update the UI
  renderBookmark(bookmark);

  // Clear fields
  bookName.value = "";
  bookUrl.value = "";
}

// Render a single bookmark <li>
function renderBookmark(bookmark) {
  const li = document.createElement("li");
  li.className = "bookmark-data";
  li.dataset.id = bookmark.id;

  li.innerHTML = `
    <a href="${bookmark.url}" class="data" target="_blank">${bookmark.name}</a>
    <button class="remove-btn">Remove</button>
  `;

  // Attach remove button handler
  li.querySelector(".remove-btn").addEventListener("click", removeBookmark);

  bookmarkList.appendChild(li);
}

// Show all bookmarks
function showBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.forEach(renderBookmark);
}

// Remove bookmark
function removeBookmark(e) {
  const li = e.target.parentElement;
  const id = li.dataset.id;

  // Remove from localStorage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks = bookmarks.filter((b) => b.id != id);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Remove from UI
  li.remove();
}

// showBookmarks();
