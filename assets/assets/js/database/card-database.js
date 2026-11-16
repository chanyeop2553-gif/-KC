import KC_KOREAN_CARD_DATABASE from "./card-korean-database.js";
/* ========================================
   KC CARD DATABASE
   KOREAN / ENGLISH CARD SEARCH
======================================== */

const KC_CARD_DATABASE = (() => {
    /* ========================================
       API CONFIGURATION
    ======================================== */

    const API = {
        KOREAN: "https://api.yugiohcard.kr/card/",
        ENGLISH: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
    };

    // ========================================
    // KOREAN → ENGLISH CARD NAME DATABASE
    // ========================================

    const CARD_NAME_MAP = {
        // ========================================
        // DM : DUEL MONSTERS
        // ========================================

        "블랙 매지션": "Dark Magician",
        "블랙 매지션 걸": "Dark Magician Girl",
        "푸른 눈의 백룡": "Blue-Eyes White Dragon",
        "붉은 눈의 흑룡": "Red-Eyes Black Dragon",
        "암흑 기사 가이아": "Gaia The Fierce Knight",
        "카오스 솔저": "Black Luster Soldier",
        엑조디아: "Exodia the Forbidden One",
        "봉인된 엑조디아": "Exodia the Forbidden One",
        크리보: "Kuriboh",
        "시간의 마술사": "Time Wizard",
        "소환사 알레이스터": "Aleister the Invoker",
        마슈마론: "Marshmallon",
        "사이버 드래곤": "Cyber Dragon",
        "사이버 엔드 드래곤": "Cyber End Dragon",

        // ========================================
        // GX : ELEMENTAL HERO
        // ========================================

        "엘리멘틀 히어로 네오스": "Elemental HERO Neos",
        "엘리멘틀 히어로 에어맨": "Elemental HERO Stratos",
        "엘리멘틀 히어로 버스트 레이디": "Elemental HERO Burstinatrix",
        "엘리멘틀 히어로 스파크맨": "Elemental HERO Sparkman",
        "엘리멘틀 히어로 페더맨": "Elemental HERO Avian",
        "엘리멘틀 히어로 클레이맨": "Elemental HERO Clayman",
        "엘리멘틀 히어로 프레임 윙맨": "Elemental HERO Flame Wingman",
        "엘리멘틀 히어로 샤이닝 플레어 윙맨": "Elemental HERO Shining Flare Wingman",
        "엘리멘틀 히어로 네오스페이시언 아쿠아 돌핀": "Neo-Spacian Aqua Dolphin",
        "네오스페이시언 글로모스": "Neo-Spacian Glow Moss",

        // ========================================
        // 5D'S : SYNCHRO
        // ========================================

        "스타더스트 드래곤": "Stardust Dragon",
        "레드 데몬즈 드래곤": "Red Dragon Archfiend",
        "블랙 로즈 드래곤": "Black Rose Dragon",
        "고대 요정 드래곤": "Ancient Fairy Dragon",
        "파워 툴 드래곤": "Power Tool Dragon",
        "정크 워리어": "Junk Warrior",
        "정크 싱크론": "Junk Synchron",
        "포뮬러 싱크론": "Formula Synchron",
        "슈팅 스타 드래곤": "Shooting Star Dragon",

        // ========================================
        // ZEXAL : XYZ
        // ========================================

        "No.39 유토피아": "Number 39: Utopia",
        "No.39 희망황 호프": "Number 39: Utopia",
        유토피아: "Number 39: Utopia",
        "No.99 희망황룡 호프드라군": "Number 99: Utopia Dragon",
        "No.107 갤럭시아이즈 타키온 드래곤": "Number 107: Galaxy-Eyes Tachyon Dragon",
        "갤럭시아이즈 포톤 드래곤": "Galaxy-Eyes Photon Dragon",
        "No.62 갤럭시아이즈 프라임 포톤 드래곤": "Number 62: Galaxy-Eyes Prime Photon Dragon",

        // ========================================
        // ARC-V : PENDULUM
        // ========================================

        "오드아이즈 펜듈럼 드래곤": "Odd-Eyes Pendulum Dragon",
        "패왕흑룡 오드아이즈 리벨리온 드래곤": "Odd-Eyes Rebellion Dragon",
        "패왕백룡 오드아이즈 윙 드래곤": "Odd-Eyes Wing Dragon",
        "EM 펜듈럼 매지션": "Performapal Pendulum Sorcerer",
        마술사: "Magician",

        // ========================================
        // VRAINS : LINK
        // ========================================

        "디코드 토커": "Decode Talker",
        "파이어월 드래곤": "Firewall Dragon",
        "엑스코드 토커": "Excode Talker",
        "토폴로직 폭탄 드래곤": "Topologic Bomber Dragon",
        "토폴로직 제로보로스": "Topologic Zeroboros",
        "액세스코드 토커": "Accesscode Talker",
        "트랜스코드 토커": "Transcode Talker",
        링크리보: "Linkuriboh",
        "샐러맨그레이트 알미라지": "Salamangreat Almiraj",

        // ========================================
        // HAND TRAPS
        // ========================================

        "하루 우라라": "Ash Blossom & Joyous Spring",
        "증식의 G": "Maxx C",
        "이펙트 뵐러": "Effect Veiler",
        유령토끼: "Ghost Ogre & Snow Rabbit",
        "저택 와라시": "Ghost Belle & Haunted Mansion",
        "원시생명체 니비루": "Nibiru, the Primal Being",
        "디멘션 어트랙터": "Dimension Shifter",
        "드롤 & 로크 버드": "Droll & Lock Bird",
        "PSY 프레임기어 감마": "PSY-Framegear Gamma",
        "PSY 프레임기어 델타": "PSY-Framegear Delta",

        // ========================================
        // SPELL CARDS
        // ========================================

        "죽은 자의 소생": "Monster Reborn",
        번개: "Raigeki",
        "해피의 깃털": "Harpie's Feather Duster",
        "욕망과 졸부의 항아리": "Pot of Extravagance",
        "욕망의 항아리": "Pot of Greed",
        "졸부와 겸허의 항아리": "Pot of Prosperity",
        "강력한 드로우": "Pot of Desires",
        "라이트닝 스톰": "Lightning Storm",
        "무덤의 지명자": "Called by the Grave",
        "말살의 지명자": "Crossout Designator",
        "금지된 일적": "Forbidden Droplet",
        초융합: "Super Polymerization",
        융합: "Polymerization",
        희생양: "Scapegoat",
        테라포밍: "Terraforming",
        증원: "Reinforcement of the Army",
        "어리석은 매장": "Foolish Burial",
        무대회전: "Set Rotation",

        // ========================================
        // TRAP CARDS
        // ========================================

        "신의 심판": "Solemn Judgment",
        "신의 통고": "Solemn Strike",
        "신의 경고": "Solemn Warning",
        무한포영: "Infinite Impermanence",
        격류장: "Torrential Tribute",
        차원장벽: "Dimensional Barrier",
        "배너티 스페이스": "Vanity's Emptiness",
        "매크로 코스모스": "Macro Cosmos",
        "대대적 체포작전": "Compulsory Evacuation Device",
        "리빙 데드가 부르는 소리": "Call of the Haunted",

        // ========================================
        // CLASSIC / POPULAR CARDS
        // ========================================

        "푸른 눈의 아백룡": "Blue-Eyes Alternative White Dragon",
        "궁극의 푸른 눈의 백룡": "Blue-Eyes Ultimate Dragon",
        "진 푸른 눈의 백룡": "Blue-Eyes White Dragon",
        "붉은 눈의 흑염룡": "Red-Eyes Black Flare Dragon",
        블랙홀: "Dark Hole",
        "봉인의 황금궤": "Gold Sarcophagus",
        "죽음의 덱 파괴 바이러스": "Deck Devastation Virus",
        "마법의 램프": "Magical Labyrinth",
    };

    /* ========================================
       REQUEST CACHE
    ======================================== */

    const koreanCache = new Map();
    const englishCache = new Map();

    /* ========================================
       NORMALIZE KOREAN CARD
    ======================================== */

    function normalizeKoreanCard(data) {
        if (!data || !data.cardName) {
            return null;
        }

        const koreanName = data.cardName.trim();

        return {
            id: null,

            name: koreanName,
            koreanName,
            englishName: CARD_NAME_MAP[koreanName] || null,

            type: data.cardOther || "",
            description: data.cardText || "",

            attribute: data.cardAttr || "",
            level: data.cardLevel || "",

            atk: data.cardAtk || "",
            def: data.cardDef || "",

            image: null,
            imageSmall: null,
            imageCropped: null,

            source: "korean",
        };
    }

    /* ========================================
       NORMALIZE ENGLISH CARD
    ======================================== */

    function normalizeEnglishCard(data) {
        if (!data) {
            return null;
        }

        const image = data.card_images?.[0] || {};

        return {
            id: data.id,

            name: data.name,
            koreanName: null,
            englishName: data.name,

            type: data.type || "",
            description: data.desc || "",

            attribute: data.attribute || "",
            level: data.level ?? data.linkval ?? null,

            atk: data.atk ?? null,
            def: data.def ?? null,

            image: image.image_url || null,
            imageSmall: image.image_url_small || null,
            imageCropped: image.image_url_cropped || null,

            source: "ygoprodeck",
        };
    }

    /* ========================================
   KOREAN CARD NAME RESOLVER
======================================== */

    function resolveKoreanName(englishName) {
        if (!englishName) return null;

        const normalized = englishName.trim().toLowerCase();

        return (
            Object.entries(CARD_NAME_MAP).find(
                ([, english]) => english.trim().toLowerCase() === normalized,
            )?.[0] || null
        );
    }

    /* ========================================
   KOREAN CARD LOOKUP
======================================== */

    async function searchKorean(keyword) {
        const query = keyword.trim();

        if (!query) {
            return [];
        }

        const cacheKey = query.toLowerCase();

        if (koreanCache.has(cacheKey)) {
            return koreanCache.get(cacheKey);
        }

        const englishNames = KC_KOREAN_CARD_DATABASE.searchEnglishNamesByKorean(query);

        const results = [];
        const seen = new Set();

        for (const englishName of englishNames.slice(0, 30)) {
            try {
                const cards = await searchEnglish(englishName);

                for (const card of cards) {
                    if (seen.has(card.id)) continue;

                    seen.add(card.id);

                    const koreanName =
                        KC_KOREAN_CARD_DATABASE.getKoreanNameByEnglish(card.englishName) ||
                        englishName;

                    results.push({
                        ...card,
                        koreanName,
                        searchName: koreanName,
                    });
                }
            } catch (error) {
                console.warn(`[KC KOREAN SEARCH] ${englishName}`, error);
            }
        }

        koreanCache.set(cacheKey, results);

        return results;
    }

    /* ========================================
       ENGLISH CARD LOOKUP
    ======================================== */

    async function searchEnglish(keyword) {
        const query = keyword.trim();

        if (!query) {
            return [];
        }

        const cacheKey = query.toLowerCase();

        if (englishCache.has(cacheKey)) {
            return englishCache.get(cacheKey);
        }

        const params = new URLSearchParams({
            fname: query,
            num: "30",
            offset: "0",
        });

        const response = await fetch(`${API.ENGLISH}?${params.toString()}`);

        if (!response.ok) {
            throw new Error(`YGOPRODeck API Error: ${response.status}`);
        }

        const data = await response.json();

        const cards = (data.data || []).map(normalizeEnglishCard).filter(Boolean);

        englishCache.set(cacheKey, cards);

        return cards;
    }

    /* ========================================
       KOREAN → ENGLISH CARD IMAGE RESOLUTION
    ======================================== */

    async function resolveCardImage(card) {
        if (!card) {
            return null;
        }

        if (card.image) {
            return card.image;
        }

        const englishName = card.englishName || CARD_NAME_MAP[card.koreanName];

        if (!englishName) {
            return null;
        }

        const cards = await searchEnglish(englishName);

        const matchedCard = cards.find(
            (item) => item.englishName.toLowerCase() === englishName.toLowerCase(),
        );

        if (!matchedCard) {
            return null;
        }

        Object.assign(card, {
            id: matchedCard.id,
            englishName: matchedCard.englishName,

            image: matchedCard.image,
            imageSmall: matchedCard.imageSmall,
            imageCropped: matchedCard.imageCropped,
        });

        return card.image;
    }

    /* ========================================
   SEARCH AUTO DETECTION
======================================== */

    /* ========================================
   SEARCH ENGINE : KC SMART SEARCH
======================================== */

    async function searchCards(keyword) {
        const query = keyword.trim();

        if (!query) return [];

        const isKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(query);

        /* ========================================
   KOREAN SMART SEARCH
======================================== */

        if (isKorean) {
            const normalize = (text) =>
                String(text || "")
                    .toLowerCase()
                    .replace(/\s+/g, "");

            const normalizedQuery = normalize(query);

            // 1. 기존 수동 매핑 검색
            const manualMatches = Object.keys(CARD_NAME_MAP).filter((name) =>
                normalize(name).includes(normalizedQuery),
            );

            const manualExact = manualMatches.filter((name) => normalize(name) === normalizedQuery);

            // 2. 신규 한국어 데이터베이스 검색
            const databaseMatches = KC_KOREAN_CARD_DATABASE.searchEnglishNamesByKorean(query);

            // 3. 검색 후보 통합 및 중복 제거
            const candidates = [
                ...manualExact.map((name) => CARD_NAME_MAP[name]),
                ...databaseMatches,
                ...manualMatches.map((name) => CARD_NAME_MAP[name]),
            ];

            const uniqueCandidates = [...new Set(candidates.filter(Boolean))].slice(0, 30);

            // 4. 영어 API 검색
            const results = [];
            const seen = new Set();

            for (const englishName of uniqueCandidates) {
                try {
                    const cards = await searchEnglish(englishName);

                    for (const card of cards) {
                        if (seen.has(card.id)) continue;
                        seen.add(card.id);

                        const koreanName =
                            KC_KOREAN_CARD_DATABASE.getKoreanNameByEnglish(card.englishName) ||
                            resolveKoreanName(card.englishName) ||
                            englishName;

                        results.push({
                            ...card,
                            koreanName,
                            searchName: koreanName,
                        });
                    }
                } catch (error) {
                    console.warn(`[KC SEARCH] ${englishName} 검색 실패`, error);
                }
            }

            // 5. 결과 반환
            if (results.length > 0) {
                return results;
            }

            return searchKorean(query);
        }

        /* ========================================
       ENGLISH SEARCH
    ======================================== */

        return searchEnglish(query);
    }

    /* ========================================
       PUBLIC API
    ======================================== */

    return {
        searchCards,
        searchKorean,
        searchEnglish,

        normalizeKoreanCard,
        normalizeEnglishCard,

        resolveCardImage,

        CARD_NAME_MAP,
    };
})();

/* ========================================
   EXPORT
======================================== */

export default KC_CARD_DATABASE;
export { KC_CARD_DATABASE };
