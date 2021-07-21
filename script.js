function searchbox() {
    const searchcontainer = document.createElement("div");
    searchcontainer.className = "search-container";
         searchcontainer.innerHTML =   `<h1 class = "header">Feel Free to Search</h1>
         <p class = "question">What is your favorite ANIME?</p></br>
  
         <input class='new-anime-name' placeholder='Enter Anime Name eg."Naruto"'/>
            <button class="submit-animes" onclick="getanimes()"> Search </button>
            <button class="sort-animes" onclick="sortanimes()"> Sort by imdb rating </button>
            `;
            
            document.body.append(searchcontainer);
            
  }
  
  
            
  function loadanimes(animes) {
      const animeList = document.createElement("div");
      animeList.className = "anime-list";
      animes.forEach((anime) => {
        const animeContainer = document.createElement("div");
        animeContainer.className = "anime-container";
    
        animeContainer.innerHTML = `
        <img class="anime-image"  src=${anime.image_url}> </img>
        
        <div>
        <h1 class="title">${anime.title}</h1>
        <h3 class="anime-score">imdb rating - <span>${anime.score}</span></h3>
          <h3 class="anime-type">type - <span>${anime.type}</span></h3>
          <p class="anime-time" >${new Date(anime.start_date).toDateString()} - ${new Date(anime.end_date).toDateString()}</p>
        </div>
        `;
    
        animeList.append(animeContainer);
      });
    
      document.body.append(animeList);
    }
    
    
    
    async function getanimes() {
      
      try{
        const title = document.querySelector(".new-anime-name").value;
      const data = await fetch(
        `https://api.jikan.moe/v3/search/anime?q=${title}`,
        {
          method: "GET"
        }
      );
      
        const animejson = await data.json();
      const animes = animejson.results;
      localStorage.setItem("searchedanime",JSON.stringify(animes));
      refreshanimes();
      loadanimes(animes);
      }
  
     catch{
       alert("enter valid anime name? check your internet connection")
  
     }
     
    }
  
  function sortanimes() {
    const searchedanime = JSON.parse(localStorage.getItem("searchedanime"));
    console.log(searchedanime);
   var sortedanimes = searchedanime.sort((a,b) => b.score - a.score);
    refreshanimes();
      loadanimes(sortedanimes);
      localStorage.removeItem("searchedanime");
  }
  
    function refreshanimes() {
      // animeList
      if(document.querySelector(".anime-list") != undefined)
      document.querySelector(".anime-list").remove();
     
    }
  