import requests

#  https://www.googleapis.com/books/v1/volumes?q=title:python
#  https://www.googleapis.com/books/v1/volumes?q=isbn:9781789534330


def save_bookdata(title):
    def api_title(
        x): return f'https://www.googleapis.com/books/v1/volumes?q=title:{x}'
    def api_isbn(
        x): return f'https://www.googleapis.com/books/v1/volumes?q=isbn:{x}'

    # get the data from the api and load them into a dictionary
    def get_data(url): return requests.get(url).json()

    with open(f'{title}.json', 'w') as f:
        f.write(str(get_data(api_title(title))))


def load_bookdata(title, num=1):

    with open(f'../bookdata/{title}.json', 'r') as f:
        file = eval(f.read())

    def books(num): return [bookformat(file['items'][i]) for i in range(num)]

    return books(num)


def bookformat(file):

    book = {i: None for i in ['title', 'publisher', 'authors', 'isbn',
                              'summary', 'cover_image', 'release_date', 'genre', 'language', 'edition']}

    if 'title' in file['volumeInfo']:
        book['title'] = file['volumeInfo']['title']

    if 'publisher' in file['volumeInfo']:
        book['publisher'] = file['volumeInfo']['publisher']

    if 'authors' in file['volumeInfo']:
        book['authors'] = file['volumeInfo']['authors']

    if 'industryIdentifiers' in file['volumeInfo']:
        book['isbn'] = file['volumeInfo']['industryIdentifiers'][0]['identifier']

    if 'description' in file['volumeInfo']:
        book['summary'] = file['volumeInfo']['description']

    if 'imageLinks' in file['volumeInfo']:
        book['cover_image'] = file['volumeInfo']['imageLinks']['thumbnail']

    if 'publishedDate' in file['volumeInfo']:
        book['release_date'] = file['volumeInfo']['publishedDate']

    if 'categories' in file['volumeInfo']:
        book['genre'] = file['volumeInfo']['categories']

    if 'language' in file['volumeInfo']:
        book['language'] = file['volumeInfo']['language']

    if 'contentVersion' in file['volumeInfo']:
        book['edition'] = file['volumeInfo']['contentVersion']
    return book


def main():
    titles = ['python', 'java', 'javascript', 'html', 'css', 'php', 'sql', 'ruby', 'perl', 'r', 'go', 'swift', 'kotlin', 'rust', 'typescript', 'bash', 'powershell', 'matlab', 'assembly', 'vba', 'visual basic', 'dart', 'groovy', 'scala',
              'history', 'calculus',
              'the lord of the rings', 'the hobbit', 'the silmarillion', 'the children of hurin', 'the fall of gondolin', 'the book of lost tales', 'the book of lost tales part 2', 'the lay of aotrou and itroun', 'the lay of leithian', 'the shaping of middle-earth', 'the lost road and other writings', 'the return of the shadow', 'the treason of isengard', 'the war of the ring', 'sauron defeated', 'morgoths ring', 'the war of the jewels', 'the peoples of middle-earth',
              ]

    # for title in titles:
    #     print(title)
    #     save_bookdata(title)

    for title in titles:
        print(title)
        print(load_bookdata(title))


if __name__ == '__main__':
    main()
