import requests

#  https://www.googleapis.com/books/v1/volumes?q=title:python 
#  https://www.googleapis.com/books/v1/volumes?q=isbn:9781789534330 


    api_title = lambda x: f'https://www.googleapis.com/books/v1/volumes?q=title:{x}'
    api_isbn = lambda x: f'https://www.googleapis.com/books/v1/volumes?q=isbn:{x}'

    # get the data from the api and load them into a dictionary
    get_data = lambda url: requests.get(url).json()

    with open('python.json','w') as f:
        f.write(str(get_data(api_title('python'))))

    with open('python.json','r') as f:
        file = eval(f.read())




    # file = get_data(api_title('python'))

    books = lambda num : [{'title': file['items'][i]['volumeInfo']['title'],
            'publisher': file['items'][i]['volumeInfo']['publisher'],
            'authors': file['items'][i]['volumeInfo']['authors'],
            'isbn': file['items'][i]['volumeInfo']['industryIdentifiers'][0]['identifier'],
            'summary': file['items'][i]['volumeInfo']['description'],
            'cover_image': file['items'][i]['volumeInfo']['imageLinks']['thumbnail'],
            'release_date': file['items'][i]['volumeInfo']['publishedDate'],
            'genre': file['items'][i]['volumeInfo']['categories'],
            'language': file['items'][i]['volumeInfo']['language'],
            'edition': file['items'][i]['volumeInfo']['contentVersion']
            } for i in range(num) ]

    print(books(1))



# for i in range(len(file['items'])):
#     print(f'--------{i}-----------')
#     print(file['items'][i]['volumeInfo']['title'])    
#     # print publisher 
#     print(file['items'][i]['volumeInfo']['publisher'])
#     # print authors
#     print(file['items'][i]['volumeInfo']['authors'])
#     # print isbn
#     print(file['items'][i]['volumeInfo']['industryIdentifiers'][0]['identifier'])
#     # print summary
#     # print(file['items'][i]['volumeInfo']['description'])
#     # print cover image
#     print(file['items'][i]['volumeInfo']['imageLinks']['thumbnail'])
#     # print release date
#     print(file['items'][i]['volumeInfo']['publishedDate'])
#     # print genre
#     print(file['items'][i]['volumeInfo']['categories'])
#     # print language
#     print(file['items'][i]['volumeInfo']['language'])
#     # print edition
#     print(file['items'][i]['volumeInfo']['contentVersion'])


#     print(file['items'][i]['volumeInfo'])
# # # print(file.items())

