

```plantuml

@startuml
skinparam linetype ortho

left to right direction

' actor User
rectangle "Home Page" as Home #LightGreen
rectangle "Search Page" as Search #LightBlue
rectangle "Profile Page" as Profile #Pink
rectangle "About Us Page" as About #Yellow
rectangle "Book Info Page" as Book #df80ff
rectangle "Library Info Page" as Library

Home --> Book #Green
Home --> Profile #Green
Home --> About #Green
Home --> Search #Green
Home --> Library #Green

Search --> Home #Blue
Search --> Profile #Blue
Search --> About #Blue
Search --> Book #Blue

Profile --> Book #Red
Profile --> Home #Red
Profile --> About #Red
Profile --> Search #Red

About --> Home #999900
About --> Profile #999900
About --> Search #999900

Library --> Book
Library --> Home
Library --> Profile
Library --> Search
Library --> About


Book --> Home #cc33ff
Book --> Search #cc33ff
Book --> Profile #cc33ff
Book --> About #cc33ff
Book --> Library #cc33ff




@enduml

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

left to right direction

' actor User
rectangle "Home Page" as Home1 #LightGreen
rectangle "Search Page" as Search1 #LightBlue
rectangle "Profile Page" as Profile1 #Pink
rectangle "About Us Page" as About1 #Yellow
rectangle "Book Info Page" as Book1 #df80ff
rectangle "Library Info Page" as Library1

rectangle "Home Page" as Home #LightGreen
rectangle "Search Page" as Search #LightBlue
rectangle "Profile Page" as Profile #Pink
rectangle "About Us Page" as About #Yellow
rectangle "Book Info Page" as Book #df80ff
rectangle "Library Info Page" as Library

Home1 --> Book #Green
Home1 --> About #Green
Home1 --> Profile #Green
Home1 --> Search #Green
Home1 --> Library #Green

Search1 --> Book #Blue
Search1 --> About #Blue
Search1 --> Profile #Blue
Search1 --> Home #Blue

Profile1 --> Book #Red
Profile1 --> Home #Red
Profile1 --> About #Red
Profile1 --> Search #Red

About1 --> Home #999900
About1 --> Profile #999900
About1 --> Search #999900

Library1 --> Book
Library1 --> Home
Library1 --> Profile
Library1 --> Search
Library1 --> About


Book1 --> Library #cc33ff
Book1 --> Home #cc33ff
Book1 --> Profile #cc33ff
Book1 --> Search #cc33ff
Book1 --> About #cc33ff




@enduml

```
