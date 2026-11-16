/* ========================================
   KC LIVE - PARODY ARCHIVE SYSTEM
======================================== */

const STORAGE_KEY = "kc-live-parodies";

/* ========================================
   CATEGORY SYSTEM
======================================== */

const PARODY_CATEGORIES = {
    ALL: "all",
    DUELIST: "duelist",
    KAIBA: "kaiba",
    FIVE_DS: "5ds",
    CARD: "card",
    OTHER: "other",
};

const CATEGORY_LABELS = {
    all: "ALL PARODIES",
    duelist: "DUELIST",
    kaiba: "KAIBA CORPORATION",
    "5ds": "YU-GI-OH! 5D'S",
    card: "CARD PARODY",
    other: "OTHER",
};

/* ========================================
   DEFAULT PARODIES
======================================== */

const defaultParodies = [
    {
        id: 1,
        title: "Duelist Registration System",
        category: "kaiba",
        characters: "SETO KAIBA · VIEWERS",
        description:
            "What if Kaiba Corporation revolutionized public administration through Duelist Decks?",
        script: `
시청자들: 덱이 없음 주민등록도 못한단 게 말이 돼?

카이바: 뭐가 말이 안 된단거지? 난 덱을 등록하라고만 했지, 듀얼리스트만 주민등록 할 수 있다고 한 적은 없어.

시청자들: 어쨌든 일개 게임 회사가 행정업무에 개입한단 소리잖아?

카이바: 그래 확실히 말이 안될 순 있지. 하지만 이 만화가 탄생한 일본은 자신의 신분을 증명할려면 여권이나, 운전면허 같은 공식 자료가 필요한데 여행도 못 가고 운전도 안 해봤다면 자신의 거주지가 기록된 공과금 납부서를 떼야 하는데 도장도 3개 이상 승인받고 자동화가 아닌 수기로 이뤄지기에 엄청나게 오래걸리지. 근데 아무 카드 40장으로 이뤄진 덱 하나만 등록하면 너무나도 쉽게 자신의 신분을 증명하고 향후 우리 회사의 상품을 구매해주는 고객에게 우선적으로 행정 업무는 물론 추가 복지 혜택도 주는데 그게 어디가 이상하단거지?

시청자들: 이런 ㅆㅂ 존나게 혁신적인 시스템이잖아?
`,
    },
    {
        id: 2,
        title: "Jack Atlas & The Chocolate Bar",
        category: "5ds",
        characters: "JACK ATLAS · SETO KAIBA",
        description: "Jack Atlas discovers the cruel reality of internet nicknames.",
        script: `
잭 아틀라스: 유튜브에 내 덱으로 초코바와 소라고동이라 하는데 그게 무슨 소리야?

카이바: 그건 아틀라스라는 초코바가 실제로 있어서 그래. 초코바의 고동을 지금 여기서 그 대열을 이루어 천지가 개벽할 힘을 보아라! 싱크로 소환! => 이렇단거지 그래도 직 아틀라스보단 낫지 않아?

잭 아틀라스: 어느쪽이든 맘에 안 드는데?
`,
    },
    {
        id: 3,
        title: "Cards Into Space",
        category: "kaiba",
        characters: "SETO KAIBA · VIEWERS",
        description: "Kaiba explains why launching cards into space was not so absurd.",
        script: `
시청자들: 우주로 카드는 왜 쏘아 올린거야? 네가 아무리 부자라지만 우주 파동 어쩌고로 네오 스페이시언과 네오스 만들어진 건 인정하겠는데 만화라고 해도 과장이 너무 과한 거 아냐?

카이바: 그래 당시 애니로는 정말 과분했지. 하지만 2024년에 <승리의 여신:니케>의 개발사인 시프트업 사 역시 우주로 발사체를 쏘아 올려 자회사의 신(新) 니케인 신데렐라를 대대적으로 홍보한 사례가 있었는데 그게 어디가 과분하단 거지?

시청자들: 이런 ㅆㅂ 왜 실제 세계에 진짜 있었던 일인데?
`,
    },
    {
        id: 4,
        title: "Alcatraz: Explosion Is Art",
        category: "kaiba",
        characters: "SETO KAIBA · VIEWERS",
        description: "Kaiba defends the destruction of Duel Tower as a corporate declaration.",
        script: `
시청자들: 듀얼 타워는 왜 폭파한거야?

카이바: 드디어 그쪽들도 배틀 시티 얘기를 꺼내는군?

시청자들: 그전까지도 잘만 얘기해줬으면서 진짜 생돈 썩어나지 않냐? 로켓에 듀얼 타워까지 네가 초특급 다이아 수저 아니었음 벌써 망했을 걸?

카이바: 뼈 때리는 발언이지만 그것도 맞는 말이라 반박할 수 없군...

시청자들: 아무튼 슬슬 얘기해주지 않겠어? 왜 아르마딜로(?)에 듀얼 타워를 설치했다가 폭파한 건데?

카이바: 아르마딜로가 아니라 알카트라즈겠지. 사실 알카트라즈는 카이바 코퍼레이션이 원래 군수 산업을 위해 설치한 섬이었지. 하지만 폐막식으로 굳이 알카트라즈를 듀얼 타워와 함께 폭파하고 나타나는 푸른 눈의 백룡 형상의 제트기는 카이바 코퍼레이션이 완벽히 군수 산업을 접었음을 선언하는 거다. 한 번 올림픽 폐막식에 톰 크루즈가 낙하산 타고 내려온 폐막식도 있는데 그게 생돈 썩어나는 건가?

시청자들: 이런 ㅆㅂ 역시 폭발은 예술이었잖아? Oh, it's an art~!
`,
    },
    {
        id: 5,
        title: "Plasma: Kamen Rider Decade",
        category: "card",
        characters: "PLASMA · NEOS · EVIL HERO",
        description: "Plasma claims to be Kamen Rider Decade. The Evil Heroes disagree.",
        script: `
플리즈마: 난 가면라이더 디케이드다!

네오스: ...?

다른 E.히어로들: ...?

다른 E.히어로들: 약했니?

다른 E.히어로들: 유벨이 이상하게 만들어놨냐?

플리즈마: 난 모든 카드로 변신할 수 있어! 그래서 난 디케이드다!

이블 히어로: 마법이랑 함정은 흉내도 못 내면서 말도 안 되는 소릴하고 있어.

나레이션: (사악한 히어로답게 주먹으로 해결. => 퍼퍼퍽!!!)

플리즈마: ....하흫... => 감격(?)
`,
    },
];

/* ========================================
   STORAGE
======================================== */

function loadParodies() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
    } catch (error) {
        console.error("[KC LIVE] Failed to load parodies:", error);
    }

    return [...defaultParodies];
}

function saveParodies() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parodies));
        return true;
    } catch (error) {
        console.error("[KC LIVE] Failed to save parodies:", error);
        showToast("PARODY SAVE FAILED");
        return false;
    }
}

/* ========================================
   STATE
======================================== */

let parodies = loadParodies();
let activeFilter = PARODY_CATEGORIES.ALL;
let currentParodyId = null;

/* ========================================
   TOAST
======================================== */

function showToast(message) {
    if (typeof window.showToast === "function") {
        window.showToast(message);
        return;
    }

    console.log(`[KC LIVE] ${message}`);
}

/* ========================================
   CATEGORY HELPERS
======================================== */

function getCategoryLabel(category) {
    return CATEGORY_LABELS[category] || "PARODY";
}

/* ========================================
   SCRIPT PARSER
======================================== */

function parseScript(script) {
    if (!script || typeof script !== "string") {
        return [];
    }

    const dialogueLines = [];

    const lines = script
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    lines.forEach((line) => {
        // Character: Dialogue / Character: Dialogue
        const segments = line.split(/\/(?=\s*[^/:]{1,40}\s*:)/);

        segments.forEach((segment) => {
            const trimmed = segment.trim();

            if (!trimmed) return;

            const separatorIndex = trimmed.indexOf(":");

            // Character dialogue or explicit narration
            if (separatorIndex !== -1) {
                const character = trimmed.slice(0, separatorIndex).trim();

                const dialogue = trimmed.slice(separatorIndex + 1).trim();

                if (character && dialogue) {
                    dialogueLines.push({
                        character,
                        dialogue,
                        isNarration: character === "나레이션",
                    });

                    return;
                }
            }

            // No speaker = narration
            dialogueLines.push({
                character: "나레이션",
                dialogue: trimmed,
                isNarration: true,
            });
        });
    });

    return dialogueLines;
}

/* ========================================
   VIEW MANAGEMENT
======================================== */

function getLiveElements(page) {
    return {
        list: page.querySelector("#live-parody-list"),
        viewer: page.querySelector("#live-parody-viewer"),
        editor: page.querySelector("#live-parody-editor"),
    };
}

function showFeed(page) {
    const { list, viewer, editor } = getLiveElements(page);

    if (list) list.classList.remove("hidden");
    if (viewer) viewer.classList.add("hidden");
    if (editor) editor.classList.add("hidden");

    currentParodyId = null;
}

function showViewer(page) {
    const { list, viewer, editor } = getLiveElements(page);

    if (list) list.classList.add("hidden");
    if (viewer) viewer.classList.remove("hidden");
    if (editor) editor.classList.add("hidden");
}

function showEditor(page) {
    const { list, viewer, editor } = getLiveElements(page);

    if (list) list.classList.add("hidden");
    if (viewer) viewer.classList.add("hidden");
    if (editor) editor.classList.remove("hidden");
}

/* ========================================
   PARODY CARD
======================================== */

function createParodyCard(parody, index) {
    const article = document.createElement("article");

    article.className = "live-parody-card";
    article.dataset.liveCategory = parody.category;

    const header = document.createElement("div");
    header.className = "live-parody-card-header";

    const category = document.createElement("span");
    category.className = "live-parody-category";
    category.textContent = getCategoryLabel(parody.category);

    const number = document.createElement("span");
    number.className = "live-parody-number";
    number.textContent = `EP. ${String(index + 1).padStart(3, "0")}`;

    header.append(category, number);

    const title = document.createElement("h3");
    title.textContent = parody.title;

    const description = document.createElement("p");
    description.className = "live-parody-description";
    description.textContent = parody.description || "No description available.";

    const meta = document.createElement("div");
    meta.className = "live-parody-meta";

    const characters = document.createElement("span");

    const usersIcon = document.createElement("i");
    usersIcon.className = "fa-solid fa-users";

    characters.append(
        usersIcon,
        document.createTextNode(` ${parody.characters || "UNKNOWN CHARACTERS"}`),
    );

    const scriptMeta = document.createElement("span");

    const scriptIcon = document.createElement("i");
    scriptIcon.className = "fa-solid fa-scroll";

    scriptMeta.append(scriptIcon, document.createTextNode(" PARODY SCRIPT"));

    meta.append(characters, scriptMeta);

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "live-parody-open";
    openButton.dataset.liveParody = parody.id;

    const buttonText = document.createElement("span");
    buttonText.textContent = "READ PARODY";

    const arrow = document.createElement("i");
    arrow.className = "fa-solid fa-arrow-right";

    openButton.append(buttonText, arrow);

    article.append(header, title, description, meta, openButton);

    return article;
}

/* ========================================
   RENDER PARODIES
======================================== */

function renderParodies(page) {
    const list = page.querySelector("#live-parody-list");

    if (!list) return;

    list.innerHTML = "";

    const filteredParodies = parodies.filter((parody) => {
        if (activeFilter === PARODY_CATEGORIES.ALL) {
            return true;
        }

        // DUELIST = entire Yu-Gi-Oh! parody archive
        if (activeFilter === PARODY_CATEGORIES.DUELIST) {
            return parody.category !== PARODY_CATEGORIES.OTHER;
        }

        return parody.category === activeFilter;
    });

    if (filteredParodies.length === 0) {
        const emptyState = document.createElement("div");

        emptyState.className = "live-empty-state";
        emptyState.textContent = "NO PARODIES FOUND IN THIS CATEGORY.";

        list.appendChild(emptyState);
        return;
    }

    filteredParodies.forEach((parody, index) => {
        list.appendChild(createParodyCard(parody, index));
    });
}

/* ========================================
   OPEN PARODY
======================================== */

function openParody(page, parodyId) {
    const parody = parodies.find((item) => String(item.id) === String(parodyId));

    if (!parody) {
        showToast("PARODY NOT FOUND");
        return;
    }

    currentParodyId = parody.id;

    const categoryElement = page.querySelector("#live-viewer-category");

    const titleElement = page.querySelector("#live-viewer-title");

    const dialogueElement = page.querySelector("#live-viewer-dialogue");

    if (!categoryElement || !titleElement || !dialogueElement) {
        console.error("[KC LIVE] Viewer elements not found.");
        return;
    }

    categoryElement.textContent = getCategoryLabel(parody.category);
    titleElement.textContent = parody.title;
    dialogueElement.innerHTML = "";

    const dialogueLines = parseScript(parody.script);

    dialogueLines.forEach((line) => {
        const dialogueItem = document.createElement("div");
        dialogueItem.className = "live-dialogue-line";

        // Narration gets a separate class for optional styling
        if (line.isNarration) {
            dialogueItem.classList.add("live-dialogue-narration");
        }

        const character = document.createElement("span");
        character.className = "live-dialogue-character";
        character.textContent = line.character;

        const dialogue = document.createElement("p");
        dialogue.className = "live-dialogue-text";
        dialogue.textContent = line.dialogue;

        dialogueItem.append(character, dialogue);
        dialogueElement.appendChild(dialogueItem);
    });

    showViewer(page);
}

/* ========================================
   EDITOR
======================================== */

function resetEditor(page) {
    const form = page.querySelector("#live-parody-form");

    if (form) {
        form.reset();
    }
}

function openEditor(page) {
    resetEditor(page);
    showEditor(page);
}

function closeEditor(page) {
    resetEditor(page);
    showFeed(page);
}

/* ========================================
   CREATE PARODY
======================================== */

function createParody(page, event) {
    event.preventDefault();

    const titleInput = page.querySelector("#live-parody-title");
    const categoryInput = page.querySelector("#live-parody-category");
    const charactersInput = page.querySelector("#live-parody-characters");
    const descriptionInput = page.querySelector("#live-parody-description");
    const scriptInput = page.querySelector("#live-parody-script");

    if (!titleInput || !categoryInput || !charactersInput || !descriptionInput || !scriptInput) {
        console.error("[KC LIVE] Editor inputs not found.");
        return;
    }

    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const characters = charactersInput.value.trim();
    const description = descriptionInput.value.trim();
    const script = scriptInput.value.trim();

    if (!title || !characters || !script) {
        showToast("PLEASE COMPLETE REQUIRED FIELDS");
        return;
    }

    const newParody = {
        id: Date.now(),
        title,
        category,
        characters,
        description,
        script,
    };

    parodies.unshift(newParody);

    if (!saveParodies()) {
        parodies.shift();
        return;
    }

    activeFilter = PARODY_CATEGORIES.ALL;

    updateFilterButtons(page);
    renderParodies(page);
    showFeed(page);

    showToast("PARODY PUBLISHED");

    openParody(page, newParody.id);
}

/* ========================================
   FILTER BUTTONS
======================================== */

function updateFilterButtons(page) {
    const filterButtons = page.querySelectorAll(".live-filter-button");

    filterButtons.forEach((button) => {
        const isActive = button.dataset.liveFilter === activeFilter;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", String(isActive));
    });
}

/* ========================================
   EVENT BINDING
======================================== */

export function initLive() {
    const page = document.getElementById("page-live");

    if (!page) return;

    // Prevent duplicate initialization
    if (page.dataset.liveInitialized === "true") {
        return;
    }

    page.dataset.liveInitialized = "true";

    const createButton = page.querySelector("#live-create-button");

    const viewerBackButton = page.querySelector("#live-viewer-back");

    const editorCancelButton = page.querySelector("#live-editor-cancel");

    const parodyForm = page.querySelector("#live-parody-form");

    /* FILTER */
    page.querySelectorAll(".live-filter-button").forEach((button) => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.liveFilter;

            updateFilterButtons(page);
            renderParodies(page);
        });
    });

    /* CREATE */
    if (createButton) {
        createButton.addEventListener("click", () => {
            openEditor(page);
        });
    }

    /* VIEWER BACK */
    if (viewerBackButton) {
        viewerBackButton.addEventListener("click", () => {
            showFeed(page);
        });
    }

    /* EDITOR CANCEL */
    if (editorCancelButton) {
        editorCancelButton.addEventListener("click", () => {
            closeEditor(page);
        });
    }

    /* FORM SUBMIT */
    if (parodyForm) {
        parodyForm.addEventListener("submit", (event) => {
            createParody(page, event);
        });
    }

    /* CARD OPEN - EVENT DELEGATION */
    page.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const openButton = target.closest("[data-live-parody]");

        if (!openButton || !page.contains(openButton)) {
            return;
        }

        openParody(page, openButton.dataset.liveParody);
    });

    /* INITIAL RENDER */
    updateFilterButtons(page);
    renderParodies(page);
    showFeed(page);

    console.log("[KC LIVE] Parody archive initialized.");
}
