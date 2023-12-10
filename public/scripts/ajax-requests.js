// ajax-requests.js
const MAX_CHARACTERS = 140;

// Function to load tweets from the server
const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: function (tweets) {
        
      },
      error: function (error) {
        console.error('Error loading tweets:', error);
      }
    });
  };
  
  // Function to submit a new tweet
  const submitTweet = function (form) {
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: form.serialize(),
      success: function (data) {
        console.log('Tweet submitted successfully:', data);
  
        if (data && data.newTweet) {
          const $newTweet = createTweetElement(data.newTweet);
          $('#tweets-container').prepend($newTweet);
        } else {
          loadTweets();
        }
  
        $('#tweet-text').val('');
        $('.counter').text(MAX_CHARACTERS);
        displaySuccess('Tweet submitted successfully');
      },
      error: function (error) {
        console.error('Error submitting tweet:', error);
        $('#success-message').slideUp();
      }
    });
  };
  