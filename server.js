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


//Expenses

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

app.get('/expenses/getAllExpenses', (req, res) => {
	models.Expense.findAll()
	.then((result) => {
		res.json(result);
	})
});

app.post('/expenses/getAllExpensesByUserId', (req, res) => {
	models.Expense.findAll({
		where: {
			UserId: req.body.UserId,
		}
	})
	.then((result) => {
		var totalExpenses = 0;
		result.forEach((entry) => {
			totalExpenses += entry.dataValues.cost;
		});
		var expenseData = {
			expenseList: result,
			totalExpenses: totalExpenses
		}
		res.json(expenseData);
	})
});

app.post('/expenses/getExpenseDataByIdAndUserId', (req, res) => {
	models.Expense.findAll({
		where: {
			UserId: req.body.UserId,
			id: req.body.id
		}
	})
	.then((result) => {
		res.json(result);
	})
});

app.post('/expenses/deleteExpenseByExpenseId', (req, res) => {
	models.Expense.destroy({
		where: {
			id: req.body.id
		}
	})
	.then((result) => {
		res.json(result);
	})
});

app.post('/expenses/updateExpenseByExpenseId', (req, res) => {
	models.Expense.update(
		{
			expenseType: req.body.expenseType,
			category: req.body.category,
			subcategory: req.body.subcategory,
			location: req.body.location,
			note: req.body.note,
			date: req.body.date,
			cost: req.body.cost
		},
		{
			where: {
				id: req.body.id,
				UserId: req.body.UserId
			}
		}
	)
	.then((result) => {
		res.json(result);
	})
});


app.post('/incomes/createNewIncome', (req, res) => {
	models.Income.create({
		amount: req.body.amount,
		date: req.body.date,
		label: req.body.label,
		UserId: req.body.UserId
	}).then((expense) => {
		res.json(expense);
	})
});

app.get('/incomes/getAllIncomes', (req, res) => {
	models.Income.findAll()
	.then((result) => {
		res.json(result);
	})
});

app.post('/incomes/getAllIncomesByUserId', (req, res) => {
	console.log(req);
	models.Income.findAll({
		where: {
			UserId: req.body.UserId,
		}
	})
	.then((result) => {
		var totalIncome = 0;
		result.forEach((entry) => {
			totalIncome += entry.dataValues.amount;
		});
		var incomeData = {
			incomeList: result,
			totalIncome: totalIncome
		}
		res.json(incomeData);
	})
});


app.post('/incomes/getIncomeDataByIdAndUserId', (req, res) => {
	models.Income.findAll({
		where: {
			UserId: req.body.UserId,
			id: req.body.id
		}
	})
	.then((result) => {
		res.json(result);
	})
});


app.post('/incomes/updateIncomeByIncomeId', (req, res) => {
	models.Income.update(
		{
			amount: req.body.amount,
			date: req.body.date,
			label: req.body.label,
		},
		{
			where: {
				id: req.body.id,
				UserId: req.body.UserId
			}
		}
	)
	.then((result) => {
		res.json(result);
	})
});

app.post('/expenses/deleteIncomeByIncomeId', (req, res) => {
	models.Income.destroy({
		where: {
			id: req.body.id
		}
	})
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