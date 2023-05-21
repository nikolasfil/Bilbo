select * from BOOK join COPIES where isbn=book_isbn or isbn not in (select isbn from Borrowing);

SELECT b.isbn, b.title
FROM book AS b
LEFT JOIN borrowing AS br ON b.isbn = br.book_isbn
LEFT JOIN return AS r ON b.isbn = r.book_isbn
WHERE br.book_isbn IS NULL OR r.book_isbn IS NOT NULL;


SELECT *
FROM your_table
WHERE return_date <= date('now');


SELECT DISTINCT b.isbn, b.title
FROM book AS b
LEFT JOIN Borrowing AS br ON b.isbn = br.book_isbn
LEFT JOIN Return AS r ON b.isbn = r.book_isbn
WHERE br.book_isbn IS NULL OR (r.book_isbn IS NOT NULL AND r.date_returned <= date('now'));



select isbn,title,COPIES.library_id,date_borrowed,date_returned from BOOK 
join COPIES On isbn=COPIES.book_isbn 
join Borrowing on isbn=Borrowing.book_isbn 
join RETURN on isbn=RETURN.book_isbn
where RETURN.library_id=Borrowing.library_id 
and RETURN.user_id=Borrowing.user_id ;

select DISTINCT isbn from BOOK 
join COPIES On isbn=COPIES.book_isbn 
join Borrowing on isbn=Borrowing.book_isbn 
join RETURN on isbn=RETURN.book_isbn
where RETURN.library_id=Borrowing.library_id 
and RETURN.user_id=Borrowing.user_id 
and RETURN.date_returned<=date('now');



select b.book_isbn,b.library_id,b.user_id,date_borrowed,date_returned from Borrowing as b left outer join Return as r 
where r.book_isbn=b.book_isbn
