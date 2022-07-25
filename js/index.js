import { randomize, shuffle } from "./random.js";
import { toggleTheme, setSavedTheme } from "./themeSwitcher.js";
import { GlobalContext } from "./global_ctx.js";
import { search } from "./search.js";
import { generateCards } from "./cardGenerator.js";
import { PageManager } from "./page.js";
import { dotfiles } from "../dotfiles.js";

GlobalContext.cards = generateCards(dotfiles);
GlobalContext.page_manager = new PageManager(GlobalContext.cards);
randomize(GlobalContext.cards);

// Shuffle cards on each page load
shuffle();

function mapButtons() {
    // Shuffle button
    document
        .getElementById("js-sortSwitcher")
        .addEventListener("click", () => shuffle());

    // Theme toggle
    document
        .getElementById("js-themeSwitcher")
        .addEventListener("click", () => toggleTheme());

    // Page buttons
    document
        .getElementById("nextPage")
        .addEventListener("click", () =>
            GlobalContext.page_manager.go_to_next_page()
        );
    document
        .getElementById("prevPage")
        .addEventListener("click", () =>
            GlobalContext.page_manager.go_to_previous_page()
        );
    document
        .getElementById("firstPage")
        .addEventListener("click", () =>
            GlobalContext.page_manager.go_to_first_page()
        );
    document
        .getElementById("lastPage")
        .addEventListener("click", () =>
            GlobalContext.page_manager.go_to_last_page()
        );

    // Search button
    document.getElementById("searchInput").addEventListener("keyup", search);
    document.getElementById("searchSubmit").addEventListener("click", search);
    document.getElementById("searchSubmit").forceSearch = true;
}

// Map buttons to their functions
mapButtons();

window.addEventListener("load", () => setSavedTheme());
