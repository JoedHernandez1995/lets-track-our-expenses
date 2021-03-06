const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models/index');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


function getTodaysDate(){
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth() ;
	m += 1;
	var y = date.getFullYear();
	return m + "/" + d + "/" + y; 
}

function getCurrentMonth(){
	var date = new Date();
	var m = date.getMonth();
	m += 1;
	return m
}


function getMonthFromDate(input){
	var date = new Date(input);
	var m = date.getMonth();
	m += 1;
	return m 
}

function GetFormattedDate(input){
	var date = new Date(input);
	var d = date.getDate();
	var m = date.getMonth();
	m += 1;
	var y = date.getFullYear();
	return m + "/" + d + "/" + y; 
}

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
			email: req.body.email
		}
	}).then((user) => {
		console.log(req.body.password);
		console.log(user.password);
		if(user){
			bcrypt.compare(req.body.password, user.password, function(err, result){
				console.log(result);
				if(result == true){
					const UserData = {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						UserId: user.id
					}
					res.json(UserData);
				}else{
					res.status(401);
					res.send("Incorrect Password!");
				}
			});
		}else{
			res.status(403);
			res.send("Email not found!");
		}
	}).catch((error) => {
		res.status(500);
		res.send("Internal Error Occured");
	})
});

app.post('/authentication/createNewUser', (req, res) => {

	models.User.findOne({
		where: {
			email: req.body.email
		}
	}).then((result) => {
		if(result){
			res.status(403);
			res.send("User with email already exists!")
		}else{
			bcrypt.hash(req.body.password, 10, function(err,hash){
				models.User.create({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					password: hash
				}).then((user) => {
					const UserData = {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						UserId: user.id
					}
					res.json(UserData);
				})
			})
		}
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
	.then((expenseResult) => {
		models.Income.findAll({
			where: {
				UserId: req.body.UserId
			}
		})
		.then((incomeResult) =>{
			var totalExpenses = 0;
			var totalSpentToday = 0.0;
			var totalExpensesCurrentMonth = 0.0;
			var totalIncome = 0;
			expenseResult.forEach((entry) => {
				entry.dataValues.date = GetFormattedDate(entry.dataValues.date);
				totalExpenses += entry.dataValues.cost;

				if(entry.dataValues.date == getTodaysDate()){
					totalSpentToday += entry.dataValues.cost;
				}

				if(getMonthFromDate(entry.dataValues.date) == getCurrentMonth()){
					totalExpensesCurrentMonth += entry.dataValues.cost;
				}
			});

			incomeResult.forEach((entry) => {
				totalIncome += entry.dataValues.amount;
			});

			var categories = ["General","Personal","House","Food & Drinks","Transport","Clothes","Fun","Miscellaneous"];
			var categoryTotals = [];
			for(var i = 0;i < categories.length; i++){
				var categoryTotal = 0.0;
				for(var j = 0; j < expenseResult.length; j++){
					if (categories[i] == expenseResult[j].category){
						categoryTotal += expenseResult[j].cost;
					}
				}
				categoryTotals.push(
					{
						categoryName: categories[i],
						categoryTotal: categoryTotal
					}
				);
			}

			var expenseData = {
				expenseList: expenseResult,
				totalsByCategory: categoryTotals,
				todaySpent: totalSpentToday,
				totalExpensesCurrentMonth: totalExpensesCurrentMonth,
				totalExpenses: totalExpenses,
				remainingBudget: totalIncome - totalExpenses,
			}
			res.json(expenseData);
		})
		
	})
});

app.post('/dashboard/getFullDashboardData', (req, res) => {
	models.Expense.findAll({
		where: {
			UserId: req.body.UserId,
			date: {
				[Op.gte]: req.body.startDate, 
				[Op.lte]: req.body.endDate
			}
		}
	})
	.then((expenseResult) => {
		models.Income.findAll({
			where: {
				UserId: req.body.UserId,
				date: {
					[Op.gte]: req.body.startDate, 
					[Op.lte]: req.body.endDate
				}
			}
		})
		.then((incomeResult) => {
			//All Logic Code goes inside here



			//Data for Expenses Categories Bar chart
			var categories = ["General","Personal","House","Food & Drinks","Transport","Clothes","Fun","Miscellaneous"];
			var categoryTotals = [];
			for(var i = 0;i < categories.length; i++){
				var categoryTotal = 0.0;
				for(var j = 0; j < expenseResult.length; j++){
					if (categories[i] == expenseResult[j].category){
						categoryTotal += expenseResult[j].cost;
					}
				}
				categoryTotals.push(categoryTotal);
			}

			var expensesbyCategories = {
				labels: categories,
				datasets: [
	   				{
	   						label: "Categories",
	   						data: categoryTotals,
	   						backgroundColor: 'rgba(255,99,132,0.2)',
					      	borderColor: 'rgba(255,99,132,1)',
					      	borderWidth: 1,
					      	hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					      	hoverBorderColor: 'rgba(255,99,132,1)',
	   				}
	   			]
			}

			//Data for Expenses vs Income by date
			var startMonth = (new Date(req.body.startDate)).getMonth() + 1;
			var endMonth = (new Date(req.body.endDate)).getMonth() + 1;
			//var currentMonth = (new Date()).getMonth() + 1;
			var expenseTotalsByMonth = [];
			var incomeTotalsByMonth = [];
			var monthsUsed = [];
			let months = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]

			
			for(var i = startMonth; i <= endMonth; i++){
				monthsUsed.push(months[(i-1)]);
				var totalExpensesByMonth = 0.0;
				var totalIncomeByMonth = 0.0;
				//Expenses Data by Months
				for (var j = 0; j < expenseResult.length; j++){
					var expenseDate = new Date(expenseResult[j].date);
					var expenseMonth = expenseDate.getMonth()+1;
					
					if (i == expenseMonth){
						totalExpensesByMonth += expenseResult[j].cost;
					} 
				}
				expenseTotalsByMonth.push(totalExpensesByMonth);
				//Income Data by Months
				for (var j = 0; j < incomeResult.length; j++){
					var incomeDate = new Date(incomeResult[j].date);
					var incomeMonth = incomeDate.getMonth()+1;
					
					if (i == incomeMonth){
						totalIncomeByMonth += incomeResult[j].amount;
					} 
				}
				incomeTotalsByMonth.push(totalIncomeByMonth);
			}

			var incomeVsExpense = {
				labels: monthsUsed,
				datasets: [
					{
						label: "Expenses",
						data: expenseTotalsByMonth,
						fill: false,
				      	lineTension: 0.1,
				      	backgroundColor: 'rgba(193, 68, 68, 0.4)',
				      	borderColor: 'rgba(193, 68, 68, 1)',
				      	borderCapStyle: 'butt',
				      	borderDash: [],
				      	borderDashOffset: 0.0,
				      	borderJoinStyle: 'miter',
				      	pointBorderColor: 'rgba(193, 68, 68, 1)',
				      	pointBackgroundColor: '#fff',
				      	pointBorderWidth: 1,
				      	pointHoverRadius: 5,
				      	pointHoverBackgroundColor: 'rgba(193, 68, 68, 1)',
				      	pointHoverBorderColor: 'rgba(220,220,220,1)',
				      	pointHoverBorderWidth: 2,
				      	pointRadius: 1,
				      	pointHitRadius: 10,
					},
					{
						label: "Income",
						data: incomeTotalsByMonth,
						fill: false,
				      	lineTension: 0.1,
				      	backgroundColor: 'rgba(75,192,192,0.4)',
				      	borderColor: 'rgba(75,192,192,1)',
				      	borderCapStyle: 'butt',
				      	borderDash: [],
				      	borderDashOffset: 0.0,
				      	borderJoinStyle: 'miter',
				      	pointBorderColor: 'rgba(75,192,192,1)',
				      	pointBackgroundColor: '#fff',
				      	pointBorderWidth: 1,
				      	pointHoverRadius: 5,
				      	pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				      	pointHoverBorderColor: 'rgba(220,220,220,1)',
				      	pointHoverBorderWidth: 2,
				      	pointRadius: 1,
				      	pointHitRadius: 10,
					}
				]
			}

			//Data for Income by types Bar Chart
			var types = ["Active","Passive","Portfolio"];
			var typeTotals = [];
			for(var i = 0;i < types.length; i++){
				var typeTotal = 0.0;
				for(var j = 0; j < incomeResult.length; j++){
					if (types[i] == incomeResult[j].incomeType){
						typeTotal += incomeResult[j].amount;
					}
				}
				typeTotals.push(typeTotal);
			}

			var incomeByTypes = {
				labels: types,
				datasets: [
	   				{
	   						label: "Types",
	   						data: typeTotals,
	   						backgroundColor: 'rgba(75,192,192,0.2)',
					      	borderColor: 'rgba(75,192,192,1)',
					      	borderWidth: 1,
					      	hoverBackgroundColor: 'rgba(75,192,192,0.4)',
					      	hoverBorderColor: 'rgba(75,192,192,1)',
	   				}
	   			]
			}


			var totalDashboardData = {
				expensesByCategories: expensesbyCategories,
				incomeByTypes: incomeByTypes,
				incomeVsExpense: incomeVsExpense
			}

			res.json(totalDashboardData);



		})

		
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
		res.json({deletedIndex: req.body.index});
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
		UserId: req.body.UserId,
		incomeType: req.body.incomeType,
		incomeTypeCategory: req.body.incomeTypeCategory,
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
	models.Expense.findAll({
		where: {
			UserId: req.body.UserId,
		}
	})
	.then((expenseResult) => {
		models.Income.findAll({
			where: {
				UserId: req.body.UserId
			}
		})
		.then((incomeResult) =>{
			var totalIncome = 0;
			var totalEarnedToday = 0.0;
			var totalIncomeCurrentMonth = 0.0;
			var totalExpenses = 0;
			incomeResult.forEach((entry) => {
				entry.dataValues.date = GetFormattedDate(entry.dataValues.date);
				totalIncome += entry.dataValues.amount;

				if(entry.dataValues.date == getTodaysDate()){
					totalEarnedToday += entry.dataValues.amount;
				}

				if(getMonthFromDate(entry.dataValues.date) == getCurrentMonth()){
					totalIncomeCurrentMonth += entry.dataValues.amount;
				}
			});

			expenseResult.forEach((entry) => {
				totalExpenses += entry.dataValues.cost;
			});

			var incomeData = {
				incomeList: incomeResult,
				todayEarned: totalEarnedToday,
				totalIncomeCurrentMonth: totalIncomeCurrentMonth,
				totalIncome: totalIncome,
				remainingBudget: totalIncome - totalExpenses
			}
			res.json(incomeData);
		})
		
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

app.post('/incomes/deleteIncomeByIncomeId', (req, res) => {
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