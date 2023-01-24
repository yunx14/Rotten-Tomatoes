const express = require('express');
var exphbs = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

let reviews = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" }
  ]
  
  // INDEX
  app.get('/', (req, res) => {
    res.render('reviews-index', { reviews: reviews });
  })