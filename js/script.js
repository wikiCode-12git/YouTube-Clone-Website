const videoGrid = document.getElementById('video-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const themeBtn = document.getElementById('theme-btn');

let allVideos = [];

// Load videos from JSON file
async function loadVideos() {
  try {
    const response = await fetch('data/videos.json');
    allVideos = await response.json();
    displayVideos(allVideos);
  } catch (error) {
    console.error('Error loading videos:', error);
    videoGrid.innerHTML = '<p>Failed to load videos</p>';
  }
}

// Display videos in the grid
function displayVideos(videos) {
  if (videos.length === 0) {
    videoGrid.innerHTML = '<p>No videos found</p>';
    return;
  }

  videoGrid.innerHTML = videos.map(video => `
    <div class="video-card" onclick="openVideo('${video.videoId}')">
      <img src="${video.thumbnail}" alt="${video.title}">
      <div class="video-info">
        <h3>${video.title}</h3>
        <p>${video.channel}</p>
        <p>${video.views}</p>
      </div>
    </div>
  `).join('');
}

// Search functionality
function searchVideos() {
  const query = searchInput.value.toLowerCase().trim();
  const filteredVideos = allVideos.filter(video => 
    video.title.toLowerCase().includes(query) || 
    video.channel.toLowerCase().includes(query)
  );
  displayVideos(filteredVideos);
}

// Open video on watch page
function openVideo(videoId) {
  window.location.href = `watch.html?v=${videoId}`;
}

// Sidebar toggle for mobile
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});

// Dark/Light mode toggle
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const icon = themeBtn.querySelector('.material-icons');
  icon.textContent = document.body.classList.contains('light-mode') ? 'light_mode' : 'dark_mode';
});

// Event listeners
searchBtn.addEventListener('click', searchVideos);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') searchVideos();
});

// Load videos when page loads
loadVideos();