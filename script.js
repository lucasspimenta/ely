document.addEventListener("DOMContentLoaded", function() {
    const musicForm = document.getElementById('musicForm');
    const songNameInput = document.getElementById('songName');
    const artistInput = document.getElementById('artist');
    const genreInput = document.getElementById('genre');
    const yearInput = document.getElementById('year');
    const durationInput = document.getElementById('duration');
    const musicList = document.getElementById('musicList');
  
    musicForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const songName = songNameInput.value;
      const artist = artistInput.value;
      const genre = genreInput.value;
      const year = yearInput.value;
      const duration = durationInput.value;
  
      const music = {
        name: songName,
        artist: artist,
        genre: genre,
        year: year,
        duration: duration
      };
  
      let savedMusic = localStorage.getItem('musicList');
      let musicArray = savedMusic ? JSON.parse(savedMusic) : [];
      musicArray.push(music);
      localStorage.setItem('musicList', JSON.stringify(musicArray));
  
      renderMusicList();
      musicForm.reset();
    });
  
    function renderMusicList() {
      musicList.innerHTML = '';
      let savedMusic = localStorage.getItem('musicList');
      let musicArray = savedMusic ? JSON.parse(savedMusic) : [];
  
      musicArray.forEach(function(music, index) {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${music.name}</strong> - ${music.artist} (${music.year}) - ${music.genre} - ${music.duration}
          <button onclick="deleteMusic(${index})">Excluir</button>
        `;
        musicList.appendChild(li);
      });
    }
  
    window.deleteMusic = function(index) {
      let savedMusic = localStorage.getItem('musicList');
      let musicArray = savedMusic ? JSON.parse(savedMusic) : [];
      musicArray.splice(index, 1);
      localStorage.setItem('musicList', JSON.stringify(musicArray));
      renderMusicList();
    };
  
    renderMusicList();
  });
  