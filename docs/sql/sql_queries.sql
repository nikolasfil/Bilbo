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