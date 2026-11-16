/* ========================================
   KC APPLICATION
======================================== */

import { initIntro } from "./section/intro.js";
import { initNavigation } from "./section/navigation.js";
import { initLobby } from "./section/lobby.js";
import { initToast } from "./section/toast.js";
import DeckSystem from "./section/deck.js";
import KC_KOREAN_CARD_DATABASE from "./database/card-korean-database.js";
import { initArchive } from "./section/archive.js";
import { initAuth } from "./section/auth.js";
import { initLive } from "./section/live.js";
import { initIdentity } from "./section/identity.js";

/* ========================================
   APPLICATION INITIALIZATION
======================================== */

document.addEventListener("DOMContentLoaded", async () => {
    await KC_KOREAN_CARD_DATABASE.load();

    initIntro();
    initNavigation();
    initLobby();
    initToast();
    initArchive();
    initAuth();
    initLive();
    initIdentity();

    DeckSystem.init();
});
