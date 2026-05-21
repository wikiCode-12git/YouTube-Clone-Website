const videoFrame = document.getElementById('video-frame');
const videoTitle = document.getElementById('video-title');
const videoChannel = document.getElementById('video-channel');
const videoViews = document.getElementById('video-views');
const relatedVideos = document.getElementById('related-videos');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const themeBtn = document.getElementById('theme-btn');

// Get video ID from URL
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('v');

let allVideos = [];

// Load video data
async function loadVideo() {
  try {
    const response = await fetch('data/videos.json');
    allVideos = await response.json();
    
    const currentVideo = allVideos.find(v => v.videoId === videoId);
    
    if (!currentVideo) {
      document.querySelector('.watch-left').innerHTML = '<p>Video not found</p>';
      return;
    }

    // Load main video
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
    videoTitle.textContent = currentVideo.title;
    videoChannel.textContent = currentVideo.channel;
    videoViews.textContent = currentVideo.views;

    // Load related videos - exclude current video
    const related = allVideos.filter(v => v.videoId !== videoId);
    displayRelatedVideos(related);

  } catch (error) {
    console.error('Error loading video:', error);
  }
}

function displayRelatedVideos(videos) {
  relatedVideos.innerHTML = videos.map(video => `
    <div class="related-card" onclick="window.location.href='watch.html?v=${video.videoId}'">
      <img src="${video.thumbnail}" alt="${video.title}">
      <div class="related-info">
        <h4>${video.title}</h4>
        <p>${video.channel}</p>
        <p>${video.views}</p>
      </div>
    </div>
  `).join('');
}

// Theme toggle
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const icon = themeBtn.querySelector('.material-icons');
  icon.textContent = document.body.classList.contains('light-mode') ? 'light_mode' : 'dark_mode';
});

// Search redirect to homepage
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) window.location.href = `index.html?search=${encodeURIComponent(query)}`;
});

loadVideo();