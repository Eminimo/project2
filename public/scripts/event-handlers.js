// event-handlers.js

    $(document).ready(function () {
    const MAX_CHARACTERS = 140;
  
    // Update the character counter
    $('#tweet-text').on('input', function () {
      const tweetLength = $(this).val().length;
      const remaining = MAX_CHARACTERS - tweetLength;
      const counter = $('.counter');
      counter.text(remaining);
      updateCounterColor(counter, remaining);
    });

    // Find the form inside .new-tweet and attach a submit event listener
    $(".new-tweet form").on('submit', function (event) {
      event.preventDefault();
  
      const tweetContent = $(this).find('textarea').val();
  
      if (tweetContent.trim() === '' || tweetContent.length > MAX_CHARACTERS) {
        const errorMessage = "Tweet must be between 1 and 140 characters.";
        displayError(errorMessage);
      } else {
        clearError();
        submitTweet($(this));
      }
    });
  
    // Initialize character counter and other elements
    // ...
  
    // Initial load of tweets when the page is ready
    loadTweets();
  });