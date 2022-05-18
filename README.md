# HACKER NEWS

Hacker news is a simple react web app that gets news and comments/replies via an api

### SETUP

Clone the repo and run the commands below in the root directory

```
npm install
```

```
npm start
```
### HOW IT WORKS

There are 3 pages in the app, the homepage that gets headlines, i sent api request with the query as headlines.

![Alt text](public/pic1.png?raw=true "Title")

when you enter a search term in the search box and click the search button, it takes you to search page and gives you your search results there.

![Alt text](public/pic2.png?raw=true "Title")

when you click on the read more link in every article, it takes you to the artcle page where you see details about the very article

article can have comments, child reply(blue), kid reply(red) and todler reply(green)

![Alt text](public/pic3.png?raw=true "Title")

### HOW CAN THE PROJECT BE IMPROVED

adding pagination will be very nice, keeping child, kid and todler comments in accordions