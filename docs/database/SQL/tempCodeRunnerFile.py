books = [{'title': file['items'][i]['volumeInfo']['title'],
#           'publisher': file['items'][i]['volumeInfo']['publisher'],
#           'authors': file['items'][i]['volumeInfo']['authors'],
#           'isbn': file['items'][i]['volumeInfo']['industryIdentifiers'][0]['identifier'],
#           'summary': file['items'][i]['volumeInfo']['description'],
#           'cover_image': file['items'][i]['volumeInfo']['imageLinks']['thumbnail'],
#           'release_date': file['items'][i]['volumeInfo']['publishedDate'],
#           'genre': file['items'][i]['volumeInfo']['categories'],
#           'language': file['items'][i]['volumeInfo']['language'],
#           'edition': file['items'][i]['volumeInfo']['contentVersion']
#         } for i in range(len(file['items'])) ]

# print(books