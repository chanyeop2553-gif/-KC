/* ========================================
   KC DUELIST NETWORK - IDENTITY SYSTEM
======================================== */

const IDENTITY_STORAGE_KEY = "kc-duelist-identity";

/* ========================================
   IDENTITY DEFAULTS
======================================== */

const DEFAULT_IDENTITY = {
    name: "",
    title: "",
    bio: "",
    number: "",
};

/* ========================================
   STORAGE
======================================== */

function loadIdentity() {
    try {
        const saved = localStorage.getItem(IDENTITY_STORAGE_KEY);

        if (!saved) {
            return { ...DEFAULT_IDENTITY };
        }

        return {
            ...DEFAULT_IDENTITY,
            ...JSON.parse(saved),
        };
    } catch (error) {
        console.error("[KC IDENTITY] Failed to load:", error);
        return { ...DEFAULT_IDENTITY };
    }
}

function saveIdentity(identity) {
    try {
        localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(identity));

        return true;
    } catch (error) {
        console.error("[KC IDENTITY] Failed to save:", error);
        return false;
    }
}

/* ========================================
   DUELIST NUMBER GENERATOR
======================================== */

function generateDuelistNumber() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    return `KC-${randomNumber}`;
}

/* ========================================
   TOAST
======================================== */

function showIdentityToast(message, type = "success") {
    let toast = document.getElementById("identity-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "identity-toast";

        Object.assign(toast.style, {
            position: "fixed",
            right: "24px",
            bottom: "24px",
            zIndex: "99999",
            padding: "16px 22px",
            border: "1px solid rgba(121,217,255,0.4)",
            borderRadius: "12px",
            background: "rgba(5,15,30,0.95)",
            color: "#79d9ff",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "0.04em",
            boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
            opacity: "0",
            transform: "translateY(12px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            pointerEvents: "none",
        });

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.style.color = type === "error" ? "#ff8585" : "#79d9ff";

    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    clearTimeout(toast._hideTimer);

    toast._hideTimer = setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(12px)";
    }, 2600);
}

/* ========================================
   PREVIEW
======================================== */

function updateIdentityPreview(identity) {
    const previewName = document.getElementById("id-preview-name");
    const previewNumber = document.getElementById("id-preview-number");

    if (previewName) {
        previewName.textContent = identity.name.trim() || "GUEST DUELIST";
    }

    if (previewNumber) {
        previewNumber.textContent = identity.number || "KC-000000";
    }
}

/* ========================================
   FORM DATA
======================================== */

function getIdentityFormData() {
    const nameInput = document.getElementById("duelist-name");
    const titleInput = document.getElementById("duelist-title");
    const bioInput = document.getElementById("duelist-bio");

    return {
        name: nameInput?.value.trim() || "",
        title: titleInput?.value.trim() || "",
        bio: bioInput?.value.trim() || "",
    };
}

/* ========================================
   RESTORE IDENTITY
======================================== */

function restoreIdentity() {
    const identity = loadIdentity();

    const nameInput = document.getElementById("duelist-name");
    const titleInput = document.getElementById("duelist-title");
    const bioInput = document.getElementById("duelist-bio");

    if (nameInput) nameInput.value = identity.name;
    if (titleInput) titleInput.value = identity.title;
    if (bioInput) bioInput.value = identity.bio;

    updateIdentityPreview(identity);
}

/* ========================================
   SAVE IDENTITY
======================================== */

function handleIdentitySubmit(event) {
    event.preventDefault();

    const formData = getIdentityFormData();

    if (!formData.name) {
        showIdentityToast("DUELIST NAME IS REQUIRED.", "error");
        return;
    }

    const previousIdentity = loadIdentity();

    const identity = {
        ...formData,

        // Preserve the existing KC number.
        number: previousIdentity.number || generateDuelistNumber(),
    };

    const saved = saveIdentity(identity);

    if (!saved) {
        showIdentityToast("IDENTITY SAVE FAILED.", "error");
        return;
    }

    updateIdentityPreview(identity);

    showIdentityToast("IDENTITY VERIFIED. " + identity.number);
}

/* ========================================
   LIVE PREVIEW
======================================== */

function handleIdentityInput() {
    const formData = getIdentityFormData();
    const previousIdentity = loadIdentity();

    updateIdentityPreview({
        ...formData,
        number: previousIdentity.number,
    });
}

/* ========================================
   PNG DOWNLOAD
======================================== */

function downloadDuelistID() {
    const identity = loadIdentity();

    if (!identity.name.trim()) {
        showIdentityToast("SAVE YOUR IDENTITY FIRST.", "error");
        return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = 1200;
    canvas.height = 700;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        showIdentityToast("IMAGE GENERATION FAILED.", "error");
        return;
    }

    /* BACKGROUND */

    const background = ctx.createLinearGradient(0, 0, 1200, 700);

    background.addColorStop(0, "#102b52");
    background.addColorStop(0.5, "#07162d");
    background.addColorStop(1, "#020813");

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, 1200, 700);

    /* BORDER */

    ctx.strokeStyle = "#79d9ff";
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 1152, 652);

    ctx.strokeStyle = "rgba(121,217,255,0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 1120, 620);

    /* HEADER */

    ctx.fillStyle = "#79d9ff";
    ctx.font = "bold 28px Arial";
    ctx.fillText("KAIBA CORPORATION", 70, 100);

    ctx.font = "bold 24px Arial";
    ctx.textAlign = "right";
    ctx.fillText("KC / ID", 1130, 100);

    ctx.textAlign = "left";

    ctx.strokeStyle = "rgba(121,217,255,0.4)";
    ctx.beginPath();
    ctx.moveTo(70, 125);
    ctx.lineTo(1130, 125);
    ctx.stroke();

    /* KC EMBLEM */

    ctx.fillStyle = "rgba(121,217,255,0.08)";
    ctx.beginPath();
    ctx.arc(190, 330, 105, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#79d9ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(190, 330, 105, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#b9edff";
    ctx.font = "bold 92px Arial";
    ctx.textAlign = "center";
    ctx.fillText("KC", 190, 360);

    ctx.textAlign = "left";

    /* AUTHORIZATION */

    ctx.fillStyle = "#79d9ff";
    ctx.font = "bold 22px Arial";
    ctx.fillText("AUTHORIZED DUELIST", 350, 200);

    /* NAME */

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px Arial";

    const displayName = identity.name || "GUEST DUELIST";

    ctx.fillText(displayName.substring(0, 24), 350, 280);

    /* TITLE */

    if (identity.title) {
        ctx.fillStyle = "#a9c9e8";
        ctx.font = "26px Arial";

        ctx.fillText(identity.title.substring(0, 40), 350, 330);
    }

    /* DUELIST NUMBER */

    ctx.fillStyle = "#79d9ff";
    ctx.font = "bold 34px monospace";

    ctx.fillText(identity.number, 350, 410);

    /* PROFILE DESCRIPTION */

    if (identity.bio) {
        ctx.fillStyle = "#9cb4d0";
        ctx.font = "22px Arial";

        const bioLines = wrapCanvasText(ctx, identity.bio, 350, 470, 700, 34);

        bioLines.slice(0, 3).forEach((line, index) => {
            ctx.fillText(line, 350, 470 + index * 34);
        });
    }

    /* FOOTER */

    ctx.strokeStyle = "rgba(121,217,255,0.35)";
    ctx.beginPath();
    ctx.moveTo(70, 570);
    ctx.lineTo(1130, 570);
    ctx.stroke();

    ctx.fillStyle = "#79d9ff";
    ctx.font = "bold 24px Arial";
    ctx.fillText("DUELIST NETWORK", 70, 620);

    ctx.fillStyle = "#7fffd4";
    ctx.textAlign = "right";
    ctx.fillText("VERIFIED", 1130, 620);

    ctx.textAlign = "left";

    /* DOWNLOAD */

    canvas.toBlob((blob) => {
        if (!blob) {
            showIdentityToast("PNG EXPORT FAILED.", "error");
            return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${identity.number}-ID.png`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);

        showIdentityToast("DUELIST ID DOWNLOADED.");
    }, "image/png");
}

/* ========================================
   CANVAS TEXT WRAPPER
======================================== */

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(/\s+/);
    const lines = [];

    let currentLine = "";

    words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;

        const width = ctx.measureText(testLine).width;

        if (width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    });

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines;
}

/* ========================================
   INITIALIZE
======================================== */

export function initIdentity() {
    const page = document.getElementById("page-identity");

    if (!page) return;

    // Prevent duplicate event listeners.
    if (page.dataset.identityInitialized === "true") {
        return;
    }

    page.dataset.identityInitialized = "true";

    const form = document.getElementById("identity-form");
    const downloadButton = document.getElementById("download-id-button");

    const nameInput = document.getElementById("duelist-name");
    const titleInput = document.getElementById("duelist-title");
    const bioInput = document.getElementById("duelist-bio");

    /* RESTORE */

    restoreIdentity();

    /* FORM SUBMIT */

    if (form) {
        form.addEventListener("submit", handleIdentitySubmit);
    }

    /* LIVE PREVIEW */

    [nameInput, titleInput, bioInput].forEach((input) => {
        if (!input) return;

        input.addEventListener("input", handleIdentityInput);
    });

    /* PNG DOWNLOAD */

    if (downloadButton) {
        downloadButton.addEventListener("click", downloadDuelistID);
    }
}
