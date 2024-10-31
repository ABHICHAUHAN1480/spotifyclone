let song1 = [];
let isPlaying = false;
 let currfolder="my-songs";
let playBtn = document.querySelector('#playBtn'); 

const song12 = [
    {
        imageUrl: 'https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg',
        title: 'my',
        artist: 'songs'
    },

    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e02aad3f4b601ae8763b3fc4e88',
        title: 'Glory',
        artist: 'yoyoHoneysingh'
    },
   
    {
        imageUrl: 'laapata.jpg',
        title: 'Laapata_ladies',
        artist: 'Movies_songs'
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e02aad3f4b601ae8763b3fc4e88',
        title: 'Glory',
        artist: 'Yo Yo Honey Singh'
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e022172b607853fa89cefa2beb4',
        title: 'Future_Nostalgia',
        artist: 'Dua_lipa'
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e02aad3f4b601ae8763b3fc4e88',
        title: 'Glory',
        artist: 'Yo Yo Honey Singh'
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e022172b607853fa89cefa2beb4',
        title: 'Levitating',
        artist: 'Dua Lipa'
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e026404721c1943d5069f0805f3',
        title: 'Aashiqui 2',
        artist: 'Mithoon, Ankit Tiwari, Jeet Ganguli'
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e026404721c1943d5069f0805f3',
        title: 'Aashiqui 2',
        artist: 'Mithoon, Ankit Tiwari, Jeet Ganguli'
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e02aad3f4b601ae8763b3fc4e88',
        title: 'Glory',
        artist: 'Yo Yo Honey Singh'
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e022172b607853fa89cefa2beb4',
        title: 'Levitating',
        artist: 'Dua Lipa'
        
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e02aad3f4b601ae8763b3fc4e88',
        title: 'Glory',
        artist: 'Yo Yo Honey Singh'
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e022172b607853fa89cefa2beb4',
        title: 'Levitating',
        artist: 'Dua Lipa'
    },
    {
        imageUrl: 'https://i1.sndcdn.com/artworks-000258655451-lgcl9g-t500x500.jpg',
        title: 'New Rules',
        artist: 'Dua Lipa'
    },
    {
        imageUrl: 'https://i.scdn.co/image/ab67616d00001e026404721c1943d5069f0805f3',
        title: 'Aashiqui 2',
        artist: 'Mithoon, Ankit Tiwari, Jeet Ganguli'
    },
];
let currentSong =new Audio();
// Function to convert seconds to minutes and seconds (MM:SS format)
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// Function to update the current time and total duration in the playbar
function updateTime() {
    const currentTimeDiv = document.querySelector('.time');
    const totalTimeDiv = document.querySelector('.totaltime');  // Updated to match HTML class
    
    // Update current time and total duration
    if (currentSong.duration) {
        currentTimeDiv.innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        // totalTimeDiv.innerHTML = secondsToMinutesSeconds(currentSong.duration);
    }
}

// Listen for time updates to refresh the current time as the song plays
currentSong.addEventListener('timeupdate', updateTime);

// Listen for the metadata being loaded to display the total duration
// currentSong.addEventListener('loadedmetadata', () => {
//     const totalTimeDiv = document.querySelector('.totaltime');  // Updated to match HTML class
//     totalTimeDiv.innerHTML = secondsToMinutesSeconds(currentSong.duration);
// });




// Function to dynamically add song cards to the page
function  addCard(song) {
    const card = document.createElement('div');
    card.id = 'card';
    card.innerHTML = `
        <img src=${song.imageUrl}>
        <p>${song.title}</p>
        <p>${song.artist}</p>
    `;
    document.getElementById('sec1').appendChild(card);
    card.addEventListener("click",()=>{
        console.log("i m cliked");
        document.getElementById("ul1").innerHTML="";
        currfolder=(`${song.title}-${song.artist}`);
        main();
        document.getElementById("left").style.left ="0";
    })
}
song12.forEach(song => addCard(song));

// Function to fetch song files from a directory
async function getsong(folder) {
    console.log(`${folder}`)
    currfolder=folder;
    song1=[];
    let a = await fetch(`/${folder}/`); 
    // console.log(a);
    let res = await a.text();
    // console.log(res);
    let div = document.createElement("div");
    div.innerHTML = res;
    let lis = div.getElementsByTagName("a");
       console.log(lis);
    for (let index = 0; index < lis.length; index++) {
        const element = lis[index];
        if (element.href.endsWith(".mp3")) {

            const songName = decodeURIComponent(element.href.split("/").pop());
            song1.push(songName);
            // console.log(element.href)
            // console.log(element.href.split(`/${folder}/`)[1]);
            // song1.push(element.href.split(`/${folder}/`)[1]);
        }
    }
    return(song1);
}

// Play music function
function  playmusic(track,title) {
    currentSong.src = `/${currfolder}/` + track;  
    currentSong.play();  
     updatePlaybar(title);
}

// privious or next button ka hai .......................

previous.addEventListener("click",()=>{
    let l=currentSong.src.split(`/${currfolder}/`)[1];
  
    let i1= song1.indexOf(l);
    i1=i1-1;
    if(i1<0){
        i1=song1.length-1;
    }
    l=song1[i1];
    let c = l.replaceAll("%20", " ");
    let f = c.split("-")[0];
    currentSong.src=(`/${currfolder}/`+song1[i1]);
    currentSong.play();
    playBtn.src="https://www.svgrepo.com/show/523589/pause-circle.svg";
    updatePlaybar(f);
})
next.addEventListener("click",()=>{
    let l=currentSong.src.split(`/${currfolder}/`)[1];
    
    let i1= song1.indexOf(l);
    i1=i1+1;
    i1=i1%song1.length;
     l=song1[i1];
     let c = l.replaceAll("%20", " ");
     let f = c.split("-")[0];

    currentSong.src=(`/${currfolder}/`+song1[i1]);
     currentSong.play();
     playBtn.src="https://www.svgrepo.com/show/523589/pause-circle.svg";
    updatePlaybar(f);
    
})


    
function updatePlaybar(title) {
      
    const songInfoElement = document.querySelector(".songinfo"); 
        songInfoElement.innerHTML = `<span>${title}</span>`;
}
// Function to toggle play/pause button
function togglePlay() {
    if (isPlaying) {
        currentSong.pause();
        playBtn.src="https://www.svgrepo.com/show/294571/play-button-movie.svg";
        
    } else {
        currentSong.play();
        playBtn.src="https://www.svgrepo.com/show/523589/pause-circle.svg";
    }
    isPlaying = !isPlaying;
}

playBtn.addEventListener('click', togglePlay);

// seekbar k liye hai backchodi nahi
currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
})


document.querySelector(".slide").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent) / 100;
})

// humburger k liye left khulega
 
document.querySelector(".humbrag").addEventListener('click',()=>{
      document.getElementById("left").style.left ="0";
    //   document.getElementById("playbar2").style.width="60vw";
    //   document.getElementById("playbar2").style.right="0px";
      
})

document.querySelector(".cross").addEventListener("click",()=>{
    document.getElementById("left").style.left="-100%";
    // document.getElementById("playbar2").style.width="100vw";
    // document.getElementById("playbar2").style.right="0px";
    
})



// Main function to load songs and attach click event listeners
async function main() {
      song1=await getsong(`${currfolder}`);
  
    
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
      songul.innerHTML = ""
    for (const song2 of song1) {
        
        let c = decodeURIComponent(song2);
        let parts = c.split("-");
        let f = parts[0];
        let e = parts[1] ? parts[1].split(".mp3")[0].trim() : "";
      
        // Dynamically add songs to the library
        let li = document.createElement('li');
        li.innerHTML = `
            <div id="libmusic" class="flex">
                <img class="music" src="https://www.svgrepo.com/show/532708/music.svg" width="35vw">
                <div class="g1">
                    <p>Song-${f}</p>
                    <p>artist-${e}</p>
                </div>
                <img class="music" src="https://www.svgrepo.com/show/479265/play-button.svg" width="35vw">
            </div>`;
            
        // Add click event listener to play song when clicked
        li.addEventListener('click', () => {
            
            playmusic(song2,f);
            playBtn.src="https://www.svgrepo.com/show/523589/pause-circle.svg";

        });
        
        songul.appendChild(li);
    }
 
}

main();
