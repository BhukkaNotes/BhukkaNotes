  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".right section");
    const links = document.querySelectorAll(".lesson-list a");

    function showSectionByHash(hash) {
      sections.forEach(section => {
        if ("#" + section.id === hash) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    }

    // Show the section from URL hash on load
    showSectionByHash(location.hash || "#lesson1");

    // Handle clicks on the list
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetHash = this.getAttribute("href");
        showSectionByHash(targetHash);
        // Update the URL hash without scrolling
        history.pushState(null, null, targetHash);
      });
    });

    // Optional: React to back/forward browser buttons
    window.addEventListener("popstate", () => {
      showSectionByHash(location.hash || "#lesson1");
    });
  });


           document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const lessonListItems = Array.from(document.querySelectorAll(".left .lesson-list li"));
    const lessonLinks = Array.from(document.querySelectorAll(".left .lesson-list a"));
    const sections = Array.from(document.querySelectorAll(".right section"));
    const articles = Array.from(document.querySelectorAll(".right section article")); // Assumes one article per section

    function removeHighlights(element) {
        if (!element) return;
        const marks = element.querySelectorAll("mark");
        marks.forEach(mark => {
            const parent = mark.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(mark.textContent), mark);
                parent.normalize(); // Merge adjacent text nodes
            }
        });
    }

    function highlightMatches(element, keyword) {
        if (!element || !keyword) return;

        removeHighlights(element); // Clear previous highlights first

        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special regex characters
        const regex = new RegExp(`(${escapedKeyword})`, "gi");
        const nodesToModify = [];

        while (node = walker.nextNode()) {
            if (node.parentNode && ['SCRIPT', 'STYLE', 'MARK'].includes(node.parentNode.nodeName.toUpperCase())) {
                continue;
            }
            if (node.nodeValue.match(regex)) {
                nodesToModify.push(node);
            }
        }

        nodesToModify.forEach(textNode => {
            const parent = textNode.parentNode;
            if (!parent) return;

            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            textNode.nodeValue.replace(regex, (match, p1, offset) => {
                if (offset > lastIndex) {
                    fragment.appendChild(document.createTextNode(textNode.nodeValue.substring(lastIndex, offset)));
                }
                const mark = document.createElement("mark");
                mark.textContent = match;
                fragment.appendChild(mark);
                lastIndex = offset + match.length;
            });

            if (lastIndex < textNode.nodeValue.length) {
                fragment.appendChild(document.createTextNode(textNode.nodeValue.substring(lastIndex)));
            }
            parent.replaceChild(fragment, textNode);
        });
    }

    function showSection(targetId) {
        let foundSection = false;
        sections.forEach(section => {
            if (section.id === targetId) {
                section.style.display = "block";
                foundSection = true;
            } else {
                section.style.display = "none";
            }
        });
        if (!foundSection && sections.length > 0) {
            sections[0].style.display = "block"; // Fallback to first section
        }
    }

    function updatePageForHash(hash) {
        const query = searchInput.value.trim().toLowerCase();
        const targetId = hash ? hash.substring(1) : (sections.length > 0 ? sections[0].id : null);

        if (targetId) {
            showSection(targetId);
            const targetArticle = articles.find(article => article.closest('section')?.id === targetId);
            if (targetArticle) {
                if (query) {
                    highlightMatches(targetArticle, query);
                    setTimeout(() => {
                        const firstMark = targetArticle.querySelector("mark");
                        if (firstMark) {
                           firstMark.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                    }, 50);
                } else {
                    removeHighlights(targetArticle);
                }
            }
        } else if (sections.length > 0) {
             showSection(sections[0].id);
        }
    }

    // 1. Search input filtering (MODIFIED PART)
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();

        lessonListItems.forEach(li => {
            const link = li.querySelector("a");
            if (!link) { // Should not happen if HTML is correct
                li.style.display = query ? "none" : "list-item";
                return;
            }
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) { // Should not happen
                li.style.display = query ? "none" : "list-item";
                return;
            }
            const targetId = href.substring(1);
            // Find the article corresponding to this list item
            const targetArticle = articles.find(article => article.closest('section')?.id === targetId);

            if (query) { // If there is a search query
                if (targetArticle) {
                    const articleText = targetArticle.textContent.toLowerCase();
                    // Show 'li' if query is in article text, else hide
                    li.style.display = articleText.includes(query) ? "list-item" : "none";
                } else {
                    // If no corresponding article found, hide the 'li' when searching
                    li.style.display = "none";
                }
            } else {
                // If query is empty, show all list items
                li.style.display = "list-item";
            }
        });

        // Re-apply highlighting to the currently visible section if the query changes
        const currentHash = window.location.hash;
        const currentSectionId = currentHash ? currentHash.substring(1) : (sections.length > 0 ? sections[0].id : null);
        if (currentSectionId) {
            const activeArticle = articles.find(article => article.closest('section')?.id === currentSectionId);
            // Check if the section containing the activeArticle is actually displayed
            if (activeArticle && activeArticle.closest('section')?.style.display === 'block') {
                 if (query) {
                    highlightMatches(activeArticle, query);
                } else {
                    removeHighlights(activeArticle);
                }
            }
        }
    });

    // 2. Lesson link click handling
    lessonLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetHash = this.getAttribute("href");
            
            if (window.location.hash !== targetHash) {
                history.pushState(null, null, targetHash);
            }
            updatePageForHash(targetHash);
        });
    });

    // 3. Handle browser back/forward buttons
    window.addEventListener("popstate", () => {
        updatePageForHash(window.location.hash);
    });

    // 4. Initial page load
    // Trigger initial search input event to filter list if search bar has pre-filled text (e.g. from browser cache)
    // This ensures the list is filtered correctly according to the initial search value.
    if (searchInput.value) {
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    // Then update page based on hash (which also handles highlighting for the current query)
    updatePageForHash(window.location.hash || (sections.length > 0 ? `#${sections[0].id}` : ""));

});

function toggleMobileMenu(){
    document.querySelector(".mobile-nav").classList.toggle("dp-none");
    document.querySelector("#bars-icon").classList.toggle("dp-none");
    document.querySelector("#close-icon").classList.toggle("dp-none");
}

// Lightbox code (use as is, only update lessonCount loop to folders.length)

let currentLesson = '';
let currentIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function showImage() {
    lightboxImage.src = images[currentLesson][currentIndex];
}

nextBtn.addEventListener("click", () => {
    if (currentLesson && images[currentLesson]) {
        currentIndex = (currentIndex + 1) % images[currentLesson].length;
        showImage();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentLesson && images[currentLesson]) {
        currentIndex = (currentIndex - 1 + images[currentLesson].length) % images[currentLesson].length;
        showImage();
    }
});

closeBtn.addEventListener("click", () => {
    lightbox.classList.add("hidden");
});


    for (let i = 0; i < folders.length; i++) {
        const container = document.getElementById(`imageContainer${i + 1}`);
        if (!container) continue;

        const lessonKey = `lesson${i + 1}`;
        images[lessonKey].forEach((url, index) => {
            const img = document.createElement("img");
            img.src = url;
            img.alt = `Lesson ${i + 1} Page ${index + 1}`;
            img.loading = "lazy";

            img.addEventListener("click", () => {
                currentLesson = lessonKey;
                currentIndex = index;
                showImage();
                lightbox.classList.remove("hidden");
            });
            container.appendChild(img);
        });
    }
