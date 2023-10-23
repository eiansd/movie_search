const API_KEY = 'api_key=c929b1fb9912e2f89022f61946d45cac';
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'
+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url){          // 영화 가져오는 함수

  fetch(url).then(res => res.json()).then(data =>{
    console.log(data.results)
    showMovies(data.results);
  })
}

function showMovies(data){        //영화 보여주는 함수
  main.innerHTML = '';            //함수가 실행될때마다 html을 빈 문자열로 설정

  data.forEach(movie => {
    const {title, poster_path, vote_average, overview, id} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <a href="#">
    <img src="${IMG_URL+poster_path}" alt="${title}" onclick= "alert('${id}')">
    </a>

    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>
      <div class="overview">
         ${overview}
      </div>
    `
    main.appendChild(movieEl);
  });
}

function getColor(vote){        // 평점에 따른 색상 변경 함수
  if(vote >= 8){
    return 'green'
  }else if(vote >= 5){
    return "orange"
  }else{
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.split('').reduce((a,c) => {
    if(!c) return a;
    return a + c;
    },'')

  if(searchTerm){
    getMovies(searchURL+'&query='+searchTerm)
  }else{
    getMovies(API_URL);
  }
})