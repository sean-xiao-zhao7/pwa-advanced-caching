var shareImageButton = document.querySelector("#share-image-button");
var createPostArea = document.querySelector("#create-post");
var closeCreatePostModalButton = document.querySelector(
    "#close-create-post-modal-btn"
);
var sharedMomentsArea = document.querySelector("#shared-moments");

function openCreatePostModal() {
    createPostArea.style.display = "block";
    if (deferredPrompt) {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(function (choiceResult) {
            console.log(choiceResult.outcome);

            if (choiceResult.outcome === "dismissed") {
                console.log("User cancelled installation");
            } else {
                console.log("User added to home screen");
            }
        });

        deferredPrompt = null;
    }
}

function closeCreatePostModal() {
    createPostArea.style.display = "none";
}

shareImageButton.addEventListener("click", openCreatePostModal);

closeCreatePostModalButton.addEventListener("click", closeCreatePostModal);

function onSaveButtonClicked(event) {
    console.log("clicked");
}

function createCard() {
    var cardWrapper = document.createElement("div");
    cardWrapper.className = "shared-moment-card mdl-card mdl-shadow--2dp";
    var cardTitle = document.createElement("div");
    cardTitle.className = "mdl-card__title";
    cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
    cardTitle.style.backgroundSize = "cover";
    cardTitle.style.height = "180px";
    cardWrapper.appendChild(cardTitle);
    var cardTitleTextElement = document.createElement("h2");
    cardTitleTextElement.style.color = "white";
    cardTitleTextElement.className = "mdl-card__title-text";
    cardTitleTextElement.textContent = "San Francisco Trip";
    cardTitle.appendChild(cardTitleTextElement);
    var cardSupportingText = document.createElement("div");
    cardSupportingText.className = "mdl-card__supporting-text";
    cardSupportingText.textContent = "In San Francisco";
    cardSupportingText.style.textAlign = "center";

    // if ("caches" in window) {
    //     const testButtonClicked = () => {
    //         caches.open("user-requests").then((cache) => {
    //             cache.addAll([
    //                 "https://httpbin.org/get",
    //                 "/src/images/sf-boat.jpg",
    //             ]);
    //         });
    //     };

    //     const cardTestButton = document.createElement("button");
    //     cardTestButton.innerText = "Click me";
    //     cardTestButton.addEventListener("click", testButtonClicked);
    //     cardSupportingText.appendChild(cardTestButton);
    // }

    var cardSaveButton = document.createElement("button");
    cardSaveButton.textContent = "Save";
    cardSaveButton.addEventListener("click", onSaveButtonClicked);
    cardSupportingText.appendChild(cardSaveButton);
    cardWrapper.appendChild(cardSupportingText);
    componentHandler.upgradeElement(cardWrapper);
    sharedMomentsArea.appendChild(cardWrapper);
}

const cardUrl = "https://httpbin.org/get";
let finished = false;

fetch("https://httpbin.org/get")
    .then(function (res) {
        return res.json();
    })
    .then(function (_) {
        if (!finished) {
            finished = true;
            createCard();
        }
    });

if ("caches" in window) {
    caches
        .match(cardUrl)
        .then((res) => {
            if (res) {
                return res.json();
            }
        })
        .then((_) => {
            if (!finished) {
                finished = true;
                createCard();
            }
        });
}
