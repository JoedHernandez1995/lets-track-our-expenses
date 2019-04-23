const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models/index');

const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/getAllUsers', (req, res) => {
	models.User.findAll()
	.then((result) => {
		res.json(result);
	})
});

app.post('/authentication/loginUser', (req, res) => {
	models.User.findOne({
		where: {
			email: req.body.email,
			password: req.body.password
		}
	}).then((result) => {
		if(result){
			const UserData = {
				email: result.email,
				UserId: result.id
			}
			res.json(UserData);
		}
	})
});

app.post('/authentication/createNewUser', (req, res) => {
	models.User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password
	}).then((user) => {
		res.json(user);
	})
});

app.post('/expenses/createNewExpense', (req, res) => {
	models.Expense.create({
		expenseType: req.body.expenseType,
		category: req.body.category,
		subcategory: req.body.subcategory,
		location: req.body.location,
		note: req.body.note,
		date: req.body.date,
		cost: req.body.cost,
		UserId: req.body.UserId
	}).then((expense) => {
		res.json(expense);
	})
});

app.get('/getAllExpenses', (req, res) => {
	models.Expense.findAll()
	.then((result) => {
		res.json(result);
	})
});






//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}


//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

//Router setup
app.get('/', (req, res) => {
	res.send('root route');
});

//Start Server
app.listen(port, (req, res) =>{
	console.log(`Server running on port ${port}`);
})