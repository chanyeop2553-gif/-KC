/* =========================
   KC INTRO CARD SYSTEM
========================= */

const introCards = [
    { name: "DARK MAGICIAN", src: "assets/img/cards/dark-magician.jpg" },
    { name: "ELEMENTAL HERO NEOS", src: "assets/img/cards/neos.jpg" },
    { name: "STARDUST DRAGON", src: "assets/img/cards/stardust.jpg" },
    { name: "NUMBER 39: UTOPIA", src: "assets/img/cards/utopia.jpg" },
    { name: "ODD-EYES PENDULUM DRAGON", src: "assets/img/cards/odd-eyes.jpg" },
    { name: "FIREWALL DRAGON", src: "assets/img/cards/firewall.jpg" },
];

export function initIntro() {
    const introScreen = document.querySelector("#intro-screen");
    const mainScreen = document.querySelector("#main-screen");
    const cardInner = document.querySelector(".intro-card-inner");
    const cardImage = document.querySelector("#intro-card-image");
    const loadingBar = document.querySelector(".intro-loading span");

    if (!introScreen || !mainScreen || !cardInner || !cardImage || !loadingBar) {
        console.error("KC INTRO: HTML ELEMENT NOT FOUND");
        return;
    }

    const ROTATION_TIME = 10000;
    const CARD_CHANGE_TIME = ROTATION_TIME / 2;
    const FINAL_CARD_TIME = 50000;
    const INTRO_DURATION = 60000;

    let currentIndex = 0;
    let availableCards = [];
    let isIntroFinished = false;
    let cardChangeTimer = null;
    let introFinishTimer = null;
    let finalStopTimer = null;

    Promise.all(
        introCards.map(
            (card) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(card);
                    img.onerror = () => {
                        console.warn("KC CARD LOAD ERROR:", card.src);
                        resolve(null);
                    };
                    img.src = card.src;
                }),
        ),
    ).then((results) => {
        availableCards = results.filter(Boolean);

        if (!availableCards.length) {
            console.error("KC INTRO: ALL CARDS FAILED");
            return;
        }

        currentIndex = 0;
        cardImage.src = availableCards[0].src;
        cardImage.alt = availableCards[0].name;

        function changeCard() {
            if (isIntroFinished) return;

            if (currentIndex >= availableCards.length - 1) {
                clearTimeout(cardChangeTimer);
                return;
            }

            currentIndex++;

            const nextCard = availableCards[currentIndex];
            cardImage.src = nextCard.src;
            cardImage.alt = nextCard.name;

            console.log("KC CARD:", nextCard.name);

            if (currentIndex < availableCards.length - 1) {
                cardChangeTimer = setTimeout(changeCard, ROTATION_TIME);
            }
        }

        function finishIntro() {
            if (isIntroFinished) return;

            isIntroFinished = true;

            clearTimeout(cardChangeTimer);
            clearTimeout(introFinishTimer);
            clearTimeout(finalStopTimer);

            introScreen.classList.add("is-exiting");
            mainScreen.classList.add("is-visible");

            console.log("KC INTRO: EXIT");

            setTimeout(() => introScreen.remove(), 1000);
        }

        // 로딩 바: 50초
        loadingBar.style.animationDuration = "50s";
        loadingBar.style.animationPlayState = "running";

        // 카드 회전 시작
        cardInner.style.animationPlayState = "running";

        // 50초에 파이어월 정면 도착 후 회전 정지
        finalStopTimer = setTimeout(() => {
            cardInner.style.animationPlayState = "paused";
        }, FINAL_CARD_TIME);

        // 첫 카드 변경: 5초
        cardChangeTimer = setTimeout(changeCard, CARD_CHANGE_TIME);

        // 파이어월 정면 등장과 동시에 메인 화면 전환
        introFinishTimer = setTimeout(finishIntro, FINAL_CARD_TIME);
    });
}
