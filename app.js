const express = require('express');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
  });

// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" }
//   ]
  
app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
      })
      .catch(err => {
        console.log(err);
      })
  })

  // NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
  })

// CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      console.log(review);
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })