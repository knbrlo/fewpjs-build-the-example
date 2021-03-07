// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

window.addEventListener("load", (event) => {
  addEventListenersToHearts()
  dontAllowListItemsSelect();
});

function addEventListenersToHearts() {
  let listOfHearts = document.querySelectorAll('.like-glyph');
  for (let heart of listOfHearts) {
    heart.addEventListener("click", function(event) {
      handleHeartClicked(event.target);
    })
  }
}

function dontAllowListItemsSelect() {
  let listOfListItems = document.querySelectorAll('.like');
  for (let item of listOfListItems) {
    item.classList.add("unselectable");
  }
}

function handleHeartClicked(targetHeart) {
  console.log('heart clicked');
  mimicServerCall()
  .then(function(response) {
    toggleHeart(targetHeart);
  })
  .catch(function(error) {
    if (error != null) {
      displayErrorMessage(error);
    }
  });
}

function toggleHeart(targetHeart) {
  if (targetHeart.classList.contains("activated-heart")) {
    targetHeart.classList.remove("activated-heart");
  } else {
    targetHeart.classList.add("activated-heart");
  }
}

function displayErrorMessage(errorMessage) {
  let errorMessageElement = document.getElementById("modal-message");
  errorMessageElement.innerText = errorMessage;
  let errorElement = document.getElementById("modal");
  errorElement.classList.remove("hidden");
  hideMessageAfterShown();
}

function hideMessageAfterShown() {
  setTimeout(function() {
    hideErrorMessage();
  }, 5000);
}

function hideErrorMessage() {
  let errorElement = document.getElementById("modal");
  errorElement.classList.add("hidden");
}

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
