

function createFooter() {
  // <footer class="py-3 my-4">
  document.querySelector("footer").innerHTML = `
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="about.html" class="nav-link px-2 text-muted">About us</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Contact</a></li>
      <li class="nav-item"><a href="user_profile.html" class="nav-link px-2 text-muted">Profile</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Lending Progress</a></li>
    </ul>
    <p class="text-center text-muted">© Copyright 2023</p>
    `
  document.querySelector("footer").classList.add("py-3");
  document.querySelector("footer").classList.add("my-4");
  // </footer>
}


function createHeader() {
  // <header>
  document.querySelector("header").innerHTML = `
    <div class="horizontal-profile-search">

      <a href="index.html"><img src="../img/logo-horizontal.svg" alt="" width="175" height="34"></a>

      <div class="searchboxbox ">
        <input class="searchinput" type="text" placeholder="Search.." size="" onkeydown="clickPress(event)">
        <button class="searchbutton" id="search-function"> <i class="bi bi-search">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" class="bi bi-search"
              viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />

            </svg>
          </i> </button>

      </div>
      
      <img src="../img/person-fill.svg" alt="" width="65" height="65">
    </div>
    `
  // </header>

}



function createSearchBar() {
  let header = document.querySelector("header");
  
  let div = document.createElement("div");
  div.classList.add("horizontally-center-nm");

  // <div class="horizontally-center-nm">
  div.innerHTML = `
  <div class="searchboxbox ">
      <!-- make the button viable for the box -->
      <input class="searchinput" type="text" placeholder="Search.." size="" onkeydown="clickPress(event)">
      <button class="searchbutton" id="search-button" type="submit" onclick="window.location='search.html'">
          <i class="bi bi-search">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor"
                  class="bi bi-search" viewBox="0 0 16 16">
                  <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
          </i>
      </button>

  </div>
  `
  // </div>

  header.appendChild(div);

  // <div class="horizontally-center-nm">
  //           <div class="searchboxbox ">
  //               <!-- make the button viable for the box -->
  //               <input class="searchinput" type="text" placeholder="Search.." size="">
  //               <button class="searchbutton" id="search-button" type="submit" onclick="window.location='search.html'">
  //                   <i class="bi bi-search">
  //                       <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor"
  //                           class="bi bi-search" viewBox="0 0 16 16">
  //                           <path
  //                               d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
  //                       </svg>
  //                   </i>
  //               </button>

  //           </div>
  //       </div>
}