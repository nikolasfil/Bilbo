
```plantuml
@startuml

' skinparam linetype ortho 


usecase "Home Page" as Home 
usecase "Search Page" as Search 
usecase "Profile Page" as Profile 
usecase "About Us Page" as About 
usecase "Book Info Page" as Book 
usecase "Library Info Page" as Library 


Home --right--> Search 
Home --right--> Profile 
Home --right--> About 
Home --right--> Book 
Home --right--> Library 

Book -right-> Home 
Book -right-> Search 
Book -right-> Profile 
Book -right-> About
Book -right-> Library

Library -right-> Home 
Library -right-> Search 
Library -right-> Profile 
Library -right-> About
Library -right-> Book

Search -right-> Home 
Search -right-> Profile 
Search -right-> About 
Search -right-> Book 


Profile -right-> Home 
Profile -right-> Search 
Profile -right-> About
Profile -right-> Book

About -right-> Home
About -right-> Search
About -right-> Profile


```


## Homepage 
Profile ,book info,library ,search ,about 
## Book info 
homepage,search,profile,library,about
## Library 
homepage ,search ,profile,book info ,about 
## Search
homepage,profile ,about ,book info 
## profile 
homepage ,search ,about ,book info ,library 
## about 
homepage ,search ,profile


```plantuml
@startuml
skinparam linetype ortho

object Item1
object Item2
object Item3


Item1 -right-> Item2 
' -right-> Item3

' Item1 --> Item2 --> Item3

@enduml
```



```plantuml

@startuml
skinparam linetype ortho

left to right direction

' actor User
rectangle "Home Page" as Home
rectangle "Search Page" as Search
rectangle "Profile Page" as Profile
rectangle "About Us Page" as About
rectangle "Book Info Page" as Book
rectangle "Library Info Page" as Library

' User -- Home
' User -- Search
' User -- Profile
' User -- About

Home -- Book
Home -- Library

Search -- Book

Profile -- Book

About -- Book

Library -- Book

@enduml

```