// Function to create a tweet element
function createTweetElement(tweetData) {
  const $tweet = $('<article>').addClass('tweet');

  // Header
  const $header = $('<header>').addClass('tweet-header');
  const $avatar = $('<img>').attr('src', tweetData.user.avatars).addClass('avatar');
  const $name = $('<h2>').text(tweetData.user.name);
  const $handle = $('<span>').text(tweetData.user.handle);
  $header.append($avatar, $name, $handle);

  // Body
  const $content = $('<div>').addClass('tweet-content').text(tweetData.content.text);

  // Footer
  const timeAgo = timeago.format(new Date(tweetData.created_at));
  const $footer = $('<footer>').append($('<span>').addClass('time-ago').text(timeAgo));
  const iconcontainer=$("<span>").append($('<i>').addClass('fa-solid fa-heart').text(''))
  .append($('<i>').addClass('fa-solid fa-flag').text(''))
  .append($('<i>').addClass('fa-solid fa-retweet').text(''));
  $footer.append(iconcontainer);
  // Append header, body, and footer to the tweet
  $tweet.append($header, $content, $footer);

  return $tweet;
}

// Function to render tweets on the page
function renderTweets(tweets) {
  const sortedTweets = tweets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const $tweetsContainer = $('#tweets-container');
  $tweetsContainer.empty();

  sortedTweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.append($tweet);
  });
}
$(document).ready(function () {
  const MAX_CHARACTERS = 140;

  // Function to load tweets from the server
  const loadTweets = function () {
    console.log("inside load tweets")
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: function (tweets) {
        console.log("/tweet result", tweets)
        renderTweets(tweets);
      },
      error: function (error) {
        console.error('Error loading tweets:', error);
      }
    });
  };

  // Function to clear any existing error messages
  function clearError() {
    const errorContainer = $(".new-tweet .error-message");
    errorContainer.text('').slideUp();
  }

  // Function to display an error message
  function displayError(message) {
    const errorContainer = $(".new-tweet .error-message");
    errorContainer.text(message).slideDown();
  }

  // Function to display a success message
  function displaySuccess(message) {
    const successContainer = $("#success-message");
    successContainer.text(message).slideDown();
  }

  // Function to update counter color based on characters remaining
  function updateCounterColor(counter, remaining) {
    if (remaining < 0) {
      counter.addClass('exceeded');
    } else {
      counter.removeClass('exceeded');
    }
  }

  // Event listener for textarea input
  $('#tweet-text').on('input', function () {
    const tweetLength = $(this).val().length;
    const remaining = MAX_CHARACTERS - tweetLength;
    const counter = $('.counter');
    counter.text(remaining);
    updateCounterColor(counter, remaining);
  });

  // Submit event listener for new tweet form
  $(".new-tweet form").on('submit', function (event) {
    event.preventDefault();

    const tweetContent = $(this).find('textarea').val();

    if (tweetContent.trim() === '' || tweetContent.length > MAX_CHARACTERS) {
      const errorMessage = "Tweet must be between 1 and 140 characters.";
      displayError(errorMessage);
    } else {
      clearError();

      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
        success: function (data) {
          console.log('Tweet submitted successfully:', data);
          loadTweets();
          $('#tweet-text').val('');
          displaySuccess('Tweet posted successfully');
        },
        error: function (error) {
          console.error('Error submitting tweet:', error);
          $('#success-message').slideUp();
        }
      });
    }
  });

  // Load tweets on page load
  loadTweets();
});
