document.addEventListener('DOMContentLoaded', () => {
    try {
      // Your existing code...
  
      // Additional logic related to Notification permissions or other setup
    } catch (error) {
      console.error('Error while loading timer data:', error);
    }
  
    // Add event listener for the spotify-btn to toggle the Spotify container
    document.querySelector('.spotify-btn').addEventListener('click', () => {
      document.querySelector('.spotify').classList.toggle('active');
      
      // Call the function to load Spotify playlists when the button is clicked
      loadSpotifyPlaylists();
    });
  });
  
  // Function to load Spotify playlists dynamically
  function loadSpotifyPlaylists() {
    // Get necessary elements
    const playlistsContainer = document.getElementById('spotifyPlayersContainer');
    const playlists = [
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWYoYGBbGKurt?utm_source=generator&theme=0",
      "https://open.spotify.com/embed/playlist/37i9dQZF1DXc8kgYqQLMfH?utm_source=generator",
      "https://open.spotify.com/embed/playlist/3fKOnwgR2v4Qc0DH09KJKz?utm_source=generator",
      "https://open.spotify.com/embed/playlist/7Cq5O9cTVa1OEutcLTYm5x?utm_source=generator"
    ];
  
    // Clear existing playlists if any
    playlistsContainer.innerHTML = '';
  
    // Loop through each playlist URL and create iframe
    playlists.forEach(url => {
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.style.borderRadius = '12px';
      iframe.width = '100%';
      iframe.height = '500';
      iframe.frameborder = '0';
      iframe.allowfullscreen = '';
      iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
      iframe.loading = 'lazy';
      
      // Append the iframe to the container
      playlistsContainer.appendChild(iframe);
    });
  }
  