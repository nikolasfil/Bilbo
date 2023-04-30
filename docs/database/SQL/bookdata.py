import requests

#  https://www.googleapis.com/books/v1/volumes?q=title:python 
#  https://www.googleapis.com/books/v1/volumes?q=isbn:9781789534330 


api_title = lambda x: f'https://www.googleapis.com/books/v1/volumes?q=title:{x}'
api_isbn = lambda x: f'https://www.googleapis.com/books/v1/volumes?q=isbn:{x}'

# get the data from the api and load them into a dictionary
def get_data(url):
    data = requests.get(url).json()
    return data

file = get_data(api_title('python'))

print(file['items'][0]['volumeInfo']['title'])    
# print publisher 
print(file['items'][0]['volumeInfo']['publisher'])
# print authors
print(file['items'][0]['volumeInfo']['authors'])
# print isbn
print(file['items'][0]['volumeInfo']['industryIdentifiers'][0]['identifier'])
# print summary
# print(file['items'][0]['volumeInfo']['description'])
# print cover image
print(file['items'][0]['volumeInfo']['imageLinks']['thumbnail'])
# print release date
print(file['items'][0]['volumeInfo']['publishedDate'])
# print genre
print(file['items'][0]['volumeInfo']['categories'])
# print language
print(file['items'][0]['volumeInfo']['language'])
# print edition
print(file['items'][0]['volumeInfo']['contentVersion'])


print(file['items'][0]['volumeInfo'])

