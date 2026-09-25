/* ==========================================================================
   ARCHIVA – script.js
   Un seul fichier JS chargé sur toutes les pages (principe DRY).
   Chaque fonctionnalité vérifie d'abord que ses éléments existent avant
   d'agir : le même fichier peut donc être inclus partout sans provoquer
   d'erreur sur les pages qui n'utilisent pas telle ou telle fonctionnalité.

   Sommaire
   1. Bandeau de bienvenue (remplace l'alert() bloquant)
   2. Formulaire de contact : validation avec messages inline
   3. Bouton "Voir plus" (CERs supplémentaires)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initWelcomeBanner();
    initContactForm();
    initLoadMore();
});


/* 1. BANDEAU DE BIENVENUE
   Affiché une seule fois par session (pas à chaque page), et fermable.
   ========================================================================== */
function initWelcomeBanner() {
    const banner = document.querySelector("[data-welcome-banner]");
    if (!banner) return; // la page n'a pas de bandeau : on ne fait rien

    // Déjà vu pendant cette session de navigation ? On ne le remontre pas.
    if (sessionStorage.getItem("archiva-welcome-seen")) {
        banner.remove();
        return;
    }

    banner.hidden = false;

    const closeBtn = banner.querySelector("[data-welcome-close]");
    closeBtn?.addEventListener("click", () => {
        banner.remove();
        sessionStorage.setItem("archiva-welcome-seen", "1");
    });
}


/* 2. FORMULAIRE DE CONTACT
   Validation email + message non vide, avec messages d'erreur affichés
   sous chaque champ (accessible, non bloquant).
   ========================================================================== */
function initContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector("textarea");
    const successBox = document.querySelector("[data-form-success]");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // pas de serveur réel dans ce prosit

        const emailOk = setFieldError(
            emailInput,
            isValidEmail(emailInput.value) ? "" : "Veuillez saisir une adresse email valide."
        );
        const messageOk = setFieldError(
            messageInput,
            messageInput.value.trim() !== "" ? "" : "Le message ne peut pas être vide."
        );

        if (emailOk && messageOk) {
            // .form définit "display: grid", qui l'emporterait sur l'attribut
            // hidden : on force donc la disparition via le style en ligne.
            form.style.display = "none";
            if (successBox) {
                successBox.hidden = false;
                successBox.focus();
            }
        }
    });

    // Efface l'erreur dès que la personne recommence à corriger le champ
    [emailInput, messageInput].forEach((field) => {
        field?.addEventListener("input", () => setFieldError(field, ""));
    });
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function setFieldError(field, message) {
    if (!field) return true;
    const errorEl = document.getElementById(`${field.id}-error`);
    if (errorEl) errorEl.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    field.classList.toggle("form__control--invalid", Boolean(message));
    return !message;
}


/* 3. BOUTON "VOIR PLUS"
   Affiche/masque des CERs supplémentaires sans recharger la page.
   ========================================================================== */
function initLoadMore() {
    const button = document.querySelector("[data-load-more]");
    const moreContent = document.querySelector("[data-more-content]");
    if (!button || !moreContent) return;

    button.addEventListener("click", () => {
        const isHidden = moreContent.hidden;
        moreContent.hidden = !isHidden;
        button.textContent = isHidden ? "Voir moins" : "Voir plus";
        button.setAttribute("aria-expanded", String(isHidden));
    });
}
