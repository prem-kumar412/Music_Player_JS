const songsJSON = [
    { songTitle: "ABRAR'S ENTRY", songBy: "Animal", audio: "audio/ABRAR'S ENTRY.mp3" , industry: "hindi", img:"./images/Bobby-Deol-Entrance.jpg",index:0},
    { songTitle: "Kala Chashma", songBy: "Baar Baar Dekho", audio: "audio/Kala Chashma.mp3", industry: "hindi", img:"images/kala-chasma.jpg",index:1},
    { songTitle: "Chikni Chameli", songBy: "Agneepath", audio: "audio/Chikni Chameli.mp3" , industry: "hindi", img:"images/chikni-chameli.jpg" ,index:2},
    { songTitle: "Dilbar", songBy: "Sirf Tum", audio: "audio/Dilbar.mp3" , industry: "hindi", img:"./images/dilbar.jpeg" ,index:3},
    
    { songTitle: "Dum Masala", songBy: "Guntur karam", audio: "audio/Dum Masala.mp3", industry: "Telugu", img:"images/Guntur-Karam-Song.jpg",index:4},
    { songTitle: "You and I", songBy: "Jalsa", audio: "./audio/You & I.mp3", industry: "Telugu", img:"images/you-and-I.jpg" ,index:5},
    { songTitle: "Chaila Chaila", songBy: "Shankar Dada Mbbs", audio: "audio/Chaila Chaila.mp3", industry: "Telugu", img:"images/chaila-chaila.jpg",index:6},
    
];

// Selecting elements from the HTML
const songImg = document.querySelector(".song-img");
const songHead = document.querySelector(".song-box h3");
const songBy = document.querySelector(".song-box p");
const allSongs = document.querySelector(".all-songs");
const industryDropdown = document.querySelector("#industry");
const audioTag = document.querySelector("#audio-player");
const playlistInput = document.querySelector(".right-container input");
const currentPlaylistContainer = document.querySelector(".current-playlist");
const addedPlaylistContainer = document.querySelector(".added-playlist");
const leftArrow = document.querySelector(".left-btn")
const rightArrow = document.querySelector(".right-btn")

let currentSongIndex=0;
const addToCurrentPlaylist= document.querySelector(".add-to-playlist-button")
let darkModeEnabled = false;

// Function to toggle dark mode
const toggleDarkMode = () => {
    darkModeEnabled = !darkModeEnabled;
    document.body.classList.toggle('dark-mode', darkModeEnabled);

    // Update button position and background color based on dark mode state
    const toggleButton = document.querySelector('#toggle');
    toggleButton.style.justifyContent = darkModeEnabled ? 'flex-end' : 'flex-start';
    toggleButton.style.backgroundColor = darkModeEnabled ? '#fff' : '#000';
};




// Function to update the center content based on the selected song
const updateCenterContent = (song) => {
    songImg.style.backgroundImage = `url(${song.img})`;
    songHead.textContent = song.songTitle;
    songBy.textContent = song.songBy;
    audioTag.querySelector("source").setAttribute("src", song.audio);
    audioTag.load();
    audioTag.play();
    currentSongIndex=song.index

};
addToCurrentPlaylist.addEventListener('click',()=>{
    const btn=document.createElement('button')
    song=songsJSON[currentSongIndex]
    btn.textContent=song.songTitle
    currentPlaylistContainer.appendChild(btn)

    
})
// Function to create buttons for songs
const createButtonsForSongs = (songs) => {
    songs.forEach(element => {

        let btn = document.createElement("button");
        btn.textContent = element.songTitle;
        btn.addEventListener('click', () => {
            updateCenterContent(element);
        });
        allSongs.appendChild(btn);
    });
};

// Event listener for the industry dropdown
industryDropdown.addEventListener("change", () => {
    allSongs.innerHTML = "";

    switch (industryDropdown.value) {
        case "all":
            // If "All" is selected, display all songs
            allSongs.innerHTML = "<h3>All Songs</h3>";
            createButtonsForSongs(songsJSON);
            break;
        case "bol":
            // If "Bollywood" is selected, display Bollywood songs
            allSongs.innerHTML = "<h3>Hindi</h3>";
            const Hindi = songsJSON.filter(val => val.industry.toLowerCase() === "hindi");
            createButtonsForSongs(Hindi);
            break;
        case "telugu":
            // If "telugu" is selected, display Telugu songs
            allSongs.innerHTML = "<h3>Telugu</h3>";
            const Telugu = songsJSON.filter(val => val.industry.toLowerCase() === "telugu");
            createButtonsForSongs(Telugu);
            break;
        default:
            break;
    }
});




// Event listener for "Enter" key press in the input field
playlistInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        const playlistName = playlistInput.value.trim();

        if (playlistName !== "" && !(set.has(playlistName))) {
            const playlistButton = document.createElement("button");
            playlistButton.textContent = playlistName;

            addedPlaylistContainer.appendChild(playlistButton);

            playlistInput.value = "";
        }
    }
});

const createPlaylistButton = document.querySelector(".right-container button");

// Event listener for "Create Playlist" button click
createPlaylistButton.addEventListener("click", () => {
    if (playlistInput.value!=""){
        const playlistName = playlistInput.value.trim();
        const playlistButton = document.createElement("button");
        playlistButton.textContent = playlistName;
        addedPlaylistContainer.appendChild(playlistButton);
        playlistInput.value="";

    }
});
// Function to move to the previous song
const movesongBefore = () => {
    let newIndex=currentSongIndex-1;
    if (newIndex<0){
        newIndex=songsJSON.length
        currentSongIndex=newIndex
    }

    updateCenterContent(songsJSON[newIndex]);
    audioTag.play();
};

// Function to move to the next song
const movesongAfter = () => {

    let newIndex = currentSongIndex + 1
    if (newIndex==songsJSON.length){
        newIndex=0;
        currentSongIndex=0;
    }
    updateCenterContent(songsJSON[newIndex]);
    audioTag.play();
};

leftArrow.addEventListener('click',movesongBefore)
rightArrow.addEventListener('click',movesongAfter)

document.addEventListener('DOMContentLoaded', function() {
    var currentSongIndex = idx;
    updateCenterContent(ele);
});
