/* ========================================
   KC KOREAN CARD DATABASE
======================================== */

const KC_KOREAN_CARD_DATABASE = (() => {
    const koreanCards = new Map();
    const cardNamesById = new Map();

    let loaded = false;
    let loadingPromise = null;

    /* ========================================
       NAME NORMALIZATION
    ======================================== */

    function normalizeName(name) {
        return String(name || "")
            .normalize("NFKC")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");
    }

    /* ========================================
       REGISTER CARD
    ======================================== */

    function registerCard(cardId, lang, name) {
        if (!cardId || !lang || !name) return;

        const id = String(cardId);

        if (!cardNamesById.has(id)) {
            cardNamesById.set(id, {});
        }

        cardNamesById.get(id)[lang] = name;
    }

    /* ========================================
       BUILD KOREAN NAME MAP
    ======================================== */

    function buildDatabase() {
        koreanCards.clear();

        for (const card of cardNamesById.values()) {
            const englishName = card.en;
            const koreanName = card.ko;

            if (!englishName || !koreanName) continue;

            koreanCards.set(normalizeName(englishName), koreanName);
        }

        console.info(`[KC KOREAN DATABASE] ${koreanCards.size} cards loaded.`);
    }

    function buildDatabase() {
        koreanCards.clear();

        for (const card of cardNamesById.values()) {
            const englishName = card.en;
            const koreanName = card.ko;

            if (!englishName || !koreanName) continue;

            koreanCards.set(normalizeName(englishName), koreanName);
        }

        console.info(`[KC KOREAN DATABASE] ${koreanCards.size} cards loaded.`);
    }

    function searchEnglishNamesByKorean(query) {
        const normalizeKorean = (text) =>
            String(text || "")
                .normalize("NFKC")
                .toLowerCase()
                .replace(/\s+/g, "");

        const keyword = normalizeKorean(query);

        if (!keyword) return [];

        const matches = [];

        for (const [englishName, koreanName] of koreanCards) {
            if (normalizeKorean(koreanName).includes(keyword)) {
                matches.push(englishName);
            }
        }

        return matches;
    }

    /* ========================================
       LOAD JSON
    ======================================== */

    async function load() {
        if (loaded) return;
        if (loadingPromise) return loadingPromise;

        loadingPromise = (async () => {
            try {
                const response = await fetch(new URL("./card_texts.json", import.meta.url));

                if (!response.ok) {
                    throw new Error(`JSON LOAD FAILED: ${response.status}`);
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error("INVALID JSON FORMAT");
                }

                cardNamesById.clear();

                data.forEach((card) => {
                    registerCard(card.card_id, card.lang, card.name);
                });

                buildDatabase();

                loaded = true;
            } catch (error) {
                console.error("[KC KOREAN DATABASE] LOAD ERROR:", error);

                throw error;
            }
        })();

        return loadingPromise;
    }

    /* ========================================
       GET KOREAN NAME
    ======================================== */

    function getKoreanNameByEnglish(englishName) {
        return koreanCards.get(normalizeName(englishName)) || null;
    }

    function getKoreanNameById(cardId) {
        return cardNamesById.get(String(cardId))?.ko || null;
    }

    function hasCard(englishName) {
        return koreanCards.has(normalizeName(englishName));
    }

    /* ========================================
       PUBLIC API
    ======================================== */

    return {
        load,
        getKoreanNameByEnglish,
        getKoreanNameById,
        searchEnglishNamesByKorean, // 추가
        hasCard,
        size: () => koreanCards.size,
        isLoaded: () => loaded,
    };
})();

export default KC_KOREAN_CARD_DATABASE;
