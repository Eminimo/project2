// Function to create a tweet element
const createTweetElement = function (tweet) {
    // Calculate the time ago
    const timeAgo = timeago.format(tweet.created_at);
  
    // Create a tweet element dynamically based on the tweet data
    let $tweet = $(`
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars}" alt="User Avatar">
          <span>${tweet.user.name}</span>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p class="tweet-content">${tweet.content.text}</p>
        <footer>
          <span class="timestamp">${timeAgo}</span>
        </footer>
      </article>
    `);
  
    return $tweet;
  };
  
  // Function to render tweets
  const renderTweets = function (tweets) {
    // Empty the #tweets-container to start fresh
    $('#tweets-container').empty();
  
    // Loop through tweets
    for (const tweet of tweets) {
      // Call createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
  
      // Append the tweet to the #tweets-container
      $('#tweets-container').append($tweet);
    }
  };
  
  // Event listener for the form submission
  $(document).ready(function () {
    $('#submit-tweet').click(function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the tweet text from the textarea
      const tweetText = $('#tweet-text').val();
  
      // Perform validation if needed
      if (tweetText.length === 0 || tweetText.length > 140) {
        // Show an error message
        $('#error-message').text('Tweet must be between 1 and 140 characters').slideDown();
        return;
      }
  
      // Hide any existing error message
      $('#error-message').slideUp();
  
      // AJAX POST request to submit the tweet data
      $.ajax({
        method: 'POST',
        url: '/tweets', // Update the URL to match your server endpoint
        data: { text: tweetText },
        success: function (data) {
          // Handle the success response from the server
          console.log('Tweet submitted successfully:', data);
  
          // Optionally, you can append the new tweet to the UI without a page refresh
          const $newTweet = createTweetElement(data);
          $('#tweets-container').prepend($newTweet);
  
          // Clear the textarea after submission
          $('#tweet-text').val('');
  
          // Show a success message
          $('#success-message').text('Tweet submitted successfully').slideDown();
        },
        error: function (error) {
          // Handle the error response from the server
          console.error('Error submitting tweet:', error);
        }
      });
    });
  });
  
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    // Add more tweets if needed...
  ];
  
  // Call renderTweets with the data array
  renderTweets(data);
  