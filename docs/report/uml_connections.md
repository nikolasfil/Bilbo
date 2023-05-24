```plantuml

@startuml

usecase "Home Page" as Homepage 

usecase "Search Page" as SearchPage 

usecase "Profile Page" as ProfilePage 

usecase "About Us Page" as AboutUsPage 

usecase "Book Info Page" as BookInfoPage 

usecase "Library Info Page" as LibraryInfoPage 


Homepage --> SearchPage 
Homepage --> ProfilePage 
Homepage --> AboutUsPage 
Homepage --> SearchPage 
Homepage --> SearchPage 
Homepage --> SearchPage 

```