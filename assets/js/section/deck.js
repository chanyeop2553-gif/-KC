/* ========================================
   KC DUELIST DECK SYSTEM
======================================== */

import KC_CARD_DATABASE from "../database/card-database.js";

const DeckSystem = (() => {
    /* =========================
       CONFIGURATION
    ========================= */

    const STORAGE_KEY = "kc-duelist-deck";

    const MAIN_MIN = 40;
    const MAIN_MAX = 60;
    const EXTRA_MAX = 15;
    const CARD_MAX = 3;

    /* =========================
       DOM
    ========================= */

    const form = document.getElementById("card-search-form");
    const searchInput = document.getElementById("card-search-input");
    const searchResults = document.getElementById("card-search-results");
    const resultCount = document.getElementById("search-result-count");

    const deckList = document.getElementById("my-deck-list");
    const mainCount = document.getElementById("main-deck-count");
    const extraCount = document.getElementById("extra-deck-count");

    const clearButton = document.getElementById("clear-deck-button");
    const submitButton = document.getElementById("submit-deck-button");

    const tabs = document.querySelectorAll("[data-deck-tab]");

    /* =========================
       STATE
    ========================= */

    let deck = {
        main: [],
        extra: [],
    };

    let activeTab = "main";
    let initialized = false;
    let searchRequestId = 0;

    /* =========================
       TOAST
    ========================= */

    function showToast(message) {
        document.dispatchEvent(
            new CustomEvent("kc:toast", {
                detail: { message },
            }),
        );
    }

    /* =========================
       HTML ESCAPE
    ========================= */

    function escapeHTML(value) {
        return String(value ?? "").replace(
            /[&<>"']/g,
            (char) =>
                ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                })[char],
        );
    }

    /* =========================
       STORAGE
    ========================= */

    function saveDeck() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
        } catch (error) {
            console.error("[KC DECK] Storage save failed:", error);
            showToast("DECK SAVE FAILED");
        }
    }

    function loadDeck() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

            if (saved && Array.isArray(saved.main) && Array.isArray(saved.extra)) {
                deck = {
                    main: saved.main.filter(
                        (card) => card && card.id != null && Number(card.quantity) > 0,
                    ),
                    extra: saved.extra.filter(
                        (card) => card && card.id != null && Number(card.quantity) > 0,
                    ),
                };
            }
        } catch (error) {
            console.error("[KC DECK] Storage load failed:", error);

            deck = {
                main: [],
                extra: [],
            };
        }
    }

    /* =========================
       CARD TYPE
    ========================= */

    function getDeckType(card) {
        const type = card.type || card.cardOther || "";

        if (/Fusion|Synchro|XYZ|Xyz|Link/i.test(type) || /융합|싱크로|엑시즈|링크/.test(type)) {
            return "extra";
        }

        return "main";
    }

    /* =========================
       CARD NORMALIZATION
    ========================= */

    function normalizeCard(card) {
        if (!card) return null;

        const id = card.id ?? card.englishName ?? card.name;

        if (id == null || !card.name) return null;

        return {
            id: String(id),
            name: card.koreanName || card.name,
            koreanName: card.koreanName || "",
            englishName: card.englishName || card.name,
            type: card.type || "",
            image: card.image || "",
            description: card.description || "",
            atk: card.atk ?? "",
            def: card.def ?? "",
            source: card.source || "",
        };
    }

    /* =========================
       SEARCH
    ========================= */

    async function searchCards(query) {
        const keyword = String(query ?? "").trim();

        // 이전 검색 결과 무효화
        const requestId = ++searchRequestId;

        if (!keyword) {
            renderSearchResults([]);
            resultCount.textContent = "0 CARDS";
            return;
        }

        searchResults.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-spinner fa-spin"></i>
                <p>SEARCHING CARD DATABASE...</p>
            </div>
        `;

        resultCount.textContent = "SEARCHING...";

        try {
            const results = await KC_CARD_DATABASE.searchCards(keyword);

            // 최신 검색만 처리
            if (requestId !== searchRequestId) return;

            const cards = (Array.isArray(results) ? results : [])
                .map(normalizeCard)
                .filter(Boolean);

            // 카드 ID 중복 제거
            const uniqueCards = [];
            const seen = new Set();

            for (const card of cards) {
                if (seen.has(card.id)) continue;

                seen.add(card.id);
                uniqueCards.push(card);
            }

            renderSearchResults(uniqueCards);
        } catch (error) {
            if (requestId !== searchRequestId) return;

            console.error("[KC DECK] Search error:", error);

            searchResults.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <p>DATABASE CONNECTION FAILED.</p>
                    <small>Please check your connection and try again.</small>
                </div>
            `;

            resultCount.textContent = "ERROR";
        }
    }

    /* =========================
       SEARCH RESULT RENDER
    ========================= */

    function renderSearchResults(cards) {
        resultCount.textContent = `${cards.length} CARDS`;

        if (!cards.length) {
            searchResults.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <p>CARD NOT FOUND.</p>
                    <small>Try another card name.</small>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = cards
            .map((card) => {
                const encodedCard = encodeURIComponent(JSON.stringify(card));

                return `
                    <article class="card-result">

                        ${
                            card.image
                                ? `
                                    <img
                                        src="${escapeHTML(card.image)}"
                                        alt="${escapeHTML(card.name)}"
                                        loading="lazy"
                                        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                                    >
                                    <div
                                        class="card-result-placeholder"
                                        style="display:none"
                                    >
                                        KC
                                    </div>
                                `
                                : `
                                    <div class="card-result-placeholder">
                                        KC
                                    </div>
                                `
                        }

                        <div class="card-result-info">
                            <h3 class="card-name">
                                ${escapeHTML(card.name)}
                            </h3>

                            <p class="card-type">
                                ${escapeHTML(card.type)}
                            </p>

                            ${
                                card.englishName
                                    ? `
                                        <small class="card-english-name">
                                            ${escapeHTML(card.englishName)}
                                        </small>
                                    `
                                    : ""
                            }
                        </div>

<button
    class="add-card-button"
    data-add-card="${encodedCard}"
    aria-label="Add ${escapeHTML(card.name)}"
    type="button"
>
    <i class="fa-solid fa-plus"></i>
    <span>추가</span>
</button>

                    </article>
                `;
            })
            .join("");
    }

    /* =========================
       ADD CARD
    ========================= */

    function addCard(card) {
        const normalized = normalizeCard(card);

        if (!normalized) {
            showToast("INVALID CARD DATA");
            return;
        }

        const target = getDeckType(normalized);
        const list = deck[target];

        const existing = list.find((item) => String(item.id) === normalized.id);

        if (existing) {
            if (existing.quantity >= CARD_MAX) {
                showToast("MAXIMUM 3 COPIES PER CARD");
                return;
            }

            existing.quantity++;
        } else {
            list.push({
                ...normalized,
                quantity: 1,
            });
        }

        // Main Deck 제한
        if (target === "main" && getTotal("main") > MAIN_MAX) {
            removeCard(normalized.id, "main", false);
            showToast("MAIN DECK MAXIMUM IS 60");
            return;
        }

        // Extra Deck 제한
        if (target === "extra" && getTotal("extra") > EXTRA_MAX) {
            removeCard(normalized.id, "extra", false);
            showToast("EXTRA DECK MAXIMUM IS 15");
            return;
        }

        saveDeck();
        renderDeck();

        showToast("CARD ADDED TO DECK");
    }

    /* =========================
       REMOVE CARD
    ========================= */

    function removeCard(id, type, update = true) {
        if (!deck[type]) return;

        const list = deck[type];

        const index = list.findIndex((item) => String(item.id) === String(id));

        if (index === -1) return;

        list[index].quantity--;

        if (list[index].quantity <= 0) {
            list.splice(index, 1);
        }

        if (update) {
            saveDeck();
            renderDeck();
        }
    }

    /* =========================
       COUNTER
    ========================= */

    function getTotal(type) {
        return deck[type].reduce((total, card) => total + Number(card.quantity || 0), 0);
    }

    /* =========================
       DECK RENDER
    ========================= */

    function renderDeck() {
        if (!deckList || !mainCount || !extraCount) return;

        const list = deck[activeTab];

        mainCount.textContent = getTotal("main");
        extraCount.textContent = getTotal("extra");

        if (!list.length) {
            deckList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-layer-group"></i>
                    <p>Your deck is empty.</p>
                </div>
            `;
            return;
        }

        deckList.innerHTML = list
            .map(
                (card) => `
            <div class="deck-card-item">

                ${
                    card.image
                        ? `
                            <img
                                class="deck-card-thumbnail"
                                src="${escapeHTML(card.image)}"
                                alt="${escapeHTML(card.name)}"
                                loading="lazy"
                            >
                        `
                        : ""
                }

                <span class="deck-card-name">
                    ${escapeHTML(card.name)}
                </span>

                <span class="deck-card-quantity">
                    × ${card.quantity}
                </span>

                <button
                    class="remove-card-button"
                    data-remove-card="${escapeHTML(card.id)}"
                    data-card-type="${activeTab}"
                    aria-label="Remove ${escapeHTML(card.name)}"
                    type="button"
                >
                    <i class="fa-solid fa-xmark"></i>
                    <span class="remove-label">제거</span>
                </button>

            </div>
        `,
            )
            .join("");
    }

    /* =========================
       TAB
    ========================= */

    function switchTab(tab) {
        if (!["main", "extra"].includes(tab)) return;

        activeTab = tab;

        tabs.forEach((button) => {
            button.classList.toggle("active", button.dataset.deckTab === tab);
        });

        renderDeck();
    }

    /* =========================
       CLEAR
    ========================= */

    function clearDeck() {
        if (!confirm("Clear the entire deck?")) return;

        deck = {
            main: [],
            extra: [],
        };

        saveDeck();
        renderDeck();

        showToast("DECK CLEARED");
    }

    /* =========================
       SUBMIT
    ========================= */

    function submitDeck() {
        const mainTotal = getTotal("main");
        const extraTotal = getTotal("extra");

        if (mainTotal < MAIN_MIN || mainTotal > MAIN_MAX) {
            showToast("MAIN DECK MUST CONTAIN 40–60 CARDS");
            return;
        }

        if (extraTotal > EXTRA_MAX) {
            showToast("EXTRA DECK MAXIMUM IS 15");
            return;
        }

        const formatSelect = document.getElementById("deck-format-select");

        document.dispatchEvent(
            new CustomEvent("kc:deck-submit", {
                detail: {
                    main: deck.main,
                    extra: deck.extra,
                    format: formatSelect?.value || "default",
                    submittedAt: new Date().toISOString(),
                },
            }),
        );

        showToast("DECK SUBMITTED FOR REVIEW");

        console.log("[KC DECK] Submitted for review.");
    }

    /* =========================
       EVENTS
    ========================= */

    function bindEvents() {
        form?.addEventListener("submit", (event) => {
            event.preventDefault();
            searchCards(searchInput?.value || "");
        });

        searchResults?.addEventListener("click", (event) => {
            const button = event.target.closest("[data-add-card]");

            if (!button) return;

            try {
                const card = JSON.parse(decodeURIComponent(button.dataset.addCard));

                addCard(card);
            } catch (error) {
                console.error("[KC DECK] Card parsing failed:", error);
                showToast("CARD DATA ERROR");
            }
        });

        deckList?.addEventListener("click", (event) => {
            const button = event.target.closest("[data-remove-card]");

            if (!button) return;

            removeCard(button.dataset.removeCard, button.dataset.cardType);
        });

        tabs.forEach((button) => {
            button.addEventListener("click", () => {
                switchTab(button.dataset.deckTab);
            });
        });

        clearButton?.addEventListener("click", clearDeck);
        submitButton?.addEventListener("click", submitDeck);
    }

    /* =========================
       INITIALIZATION
    ========================= */

    function init() {
        if (initialized) return;

        initialized = true;

        loadDeck();
        bindEvents();
        renderDeck();

        console.log("[KC DECK] SYSTEM INITIALIZED.");
    }

    /* =========================
       PUBLIC API
    ========================= */

    return {
        init,
        searchCards,
        addCard,
        renderDeck,
        clearDeck,
        submitDeck,
        getDeck: () => deck,
        switchTab,
        removeCard,
        getTotal,
        getDeckType,
        normalizeCard,
        escapeHTML,
        saveDeck,
        loadDeck,
        bindEvents,
    };
})();

/* ========================================
   INITIALIZATION
======================================== */

DeckSystem.init();

export default DeckSystem;
