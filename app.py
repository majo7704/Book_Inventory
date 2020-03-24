import flask
import re
import csv  # file reading and writing module
from flask import Flask, render_template, url_for, redirect, flash
app = Flask(__name__, static_url_path='/static')
app.secret_key = 'flash message'
# Constructor Book with parameters and a method add_book


class Book:
    def __init__(self, title, author, date):
        self.title = title
        self.author = author
        self.date = date

    def add_book(self):
        with open('books.csv', 'a') as csv_file:
            books_data = [
                {
                    'Title': self.title,
                    'Author': self.author,
                    'Date': self.date
                }
            ]
            csv_columns = ['Title', 'Author', 'Date']
            if self.title or self.author or self.date != None:
                csv_writer = csv.DictWriter(csv_file, fieldnames=csv_columns)
                # csv_writer.writeheader()
                for line in books_data:
                    csv_writer.writerow(line)

# Routes
@app.route('/')
def home_page():
    return render_template('index.html')


@app.route('/add')
def add_page():
    title = str(flask.request.args.get("title")).strip()
    author = str(flask.request.args.get("author")).strip()
    date = flask.request.args.get("date")
    # to capitalize 1st letters of each word
    title = ' '.join(word[0].upper() + word[1:] for word in title.split())
    author = ' '.join(word[0].upper() + word[1:] for word in author.split())
    if title and author and date:
        Book(title, author, date).add_book()
        flash("Your book was added successfully")
        return render_template('add_a_book.html')
    else:
        flash("Please fill all the fields")
    return render_template('add_a_book.html')


@app.route('/books')
def books_page():
    with open('books.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        books_data = list(csv_reader)
        # next(csv_reader)# skips the first row keys
        return render_template('books.html', books=books_data)

# Search by a title or author
@app.route('/search')
def search_page():
    query = str(flask.request.args.get("search")).strip().lower()
    if not query:
        flash("You did not search for anything")
        return render_template('search.html')
    elif query:
        with open('books.csv', 'r') as csv_file:
            csv_reader = csv.reader(csv_file)
            books = list(csv_reader)
            found_books = list()
            for book in books:
                if book[0].lower().find(str(query)) != -1 or book[1].lower().find(str(query)) != -1:
                    found_books.extend([book])
            if found_books == []:
                flash("Nothing to display")
        return render_template('search.html', books=found_books)


# no need to refresh the server
if __name__ == "__main__":
    app.run(debug=True)
