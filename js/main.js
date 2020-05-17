let btn = document.getElementById('start'),
    budget = document.querySelector('.budget-value'),
    daybudget = document.querySelector('.daybudget-value'),
    level = document.querySelector('.level-value'),
    expenses = document.querySelector('.expenses-value'),
    optionalexpenses = document.querySelector('.optionalexpenses-value'),
    income = document.querySelector('.income-value'),
    monthSavings = document.querySelector('.monthsavings-value'),
    yearSavings = document.querySelector('.yearsavings-value'),
    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesBtn = document.querySelector('.expenses-item-btn'),
    optionalexpensesBtn = document.querySelector('.optionalexpenses-btn'),
    countBudgetBtn = document.querySelector('.count-budget-btn'),
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    savings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    startBtn = document.querySelector('#start'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value');

let money,
    time;

startBtn.addEventListener('click', function () {
    time = prompt("Введіть дату в форматі YYYY-MM-DD");
    money = +prompt("Ваш бюджет на місяць?");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на місяць?");
    }

    appData.budget = money;
    appData.timeData = time;
    budget.textContent = money.toFixed();

    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();

    expensesBtn.removeAttribute("disabled");
    optionalexpensesBtn.removeAttribute("disabled");
    countBudgetBtn.removeAttribute("disabled");
});

expensesBtn.addEventListener('click', function () {
    let sum = 0;

    let i = 0;
    do {
        let a = expensesItem[0].value,
            b = expensesItem[++i].value;

        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null &&
            a != '' && b != '' && a.length < 20) {
            console.log("done");
            appData.expenses[a] = b;
            sum += +b;
            i++;
        } else {

        }

    } while (i < expensesItem.length);

    expenses.textContent = sum;
});

optionalexpensesBtn.addEventListener('click', function () {
    for (let i = 0; i < optionalexpensesItem.length; i++) {
        let opt = optionalexpensesItem[i].value;
        appData.optionalExpenses[i] = opt;

        optionalexpenses.textContent += appData.optionalExpenses[i] + ' ';
    }

});

countBudgetBtn.addEventListener('click', function () {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expenses.textContent) / 30).toFixed(2);
        daybudget.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            level.textContent = "Мінімальний рівень достатку";
        } else if (appData.moneyPerDay < 200) {
            level.textContent = "Середній рівень достатку";
        } else if (appData.moneyPerDay < 500) {
            level.textContent = "Високий рівень достатку";
        } else {
            level.textContent = "Найвищий рівень достатку";
        }
    } else {
        daybudget.textContent = 'Відбулася помилка, введіть бюджет';
    }
});

chooseIncome.addEventListener('input', function () {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    income.textContent = appData.income;
});

savings.addEventListener('click', function () {
    if (appData.savings == false) {
        appData.savings = true;
    } else {
        appData.savings = false;
    }
});

chooseSum.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;

        appData.monthIncome = (sum / 100 / 12 * percent).toFixed(2);
        appData.yearIncome = (sum / 100 * percent).toFixed(2);

        monthSavings.textContent = appData.monthIncome;
        yearSavings.textContent = appData.yearIncome;
    }
});

choosePercent.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;

        appData.monthIncome = (sum / 100 / 12 * percent).toFixed(2);
        appData.yearIncome = (sum / 100 * percent).toFixed(2);

        monthSavings.textContent = appData.monthIncome;
        yearSavings.textContent = appData.yearIncome;
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};
