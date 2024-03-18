document.addEventListener('DOMContentLoaded', function() {
    // Функция для загрузки курса валюты
    function loadExchangeRate(currency) {
        fetch('https://open.er-api.com/v6/latest/' + currency)
        .then(response => response.json())
        .then(data => {
            var exchangeRate = data.rates['RUB'];
            var element = document.getElementById(currency.toLowerCase() + '-rate');
            if (element) {
                element.innerText = `Курс ${currency} к RUB: ${exchangeRate.toFixed(2)}`;
            } else {
                console.log(`Элемент с id '${currency.toLowerCase()}-rate' не найден`);
            }
        })
        .catch(error => {
            console.log('Произошла ошибка при получении данных:', error);
        });
    }
    
    // Загрузка курсов валют при загрузке страницы
    loadExchangeRate('USD'); 
    loadExchangeRate('EUR'); 

    // Обработка события при клике на кнопку "Обменять"
    document.getElementById('exchange-button').addEventListener('click', function() {
        var fromCurrency = document.getElementById('from-currency').value;
        var toCurrency = document.getElementById('to-currency').value;
        var amount = parseFloat(document.getElementById('amount').value);

        fetch('https://open.er-api.com/v6/latest/' + fromCurrency)
        .then(response => response.json())
        .then(data => {
            var exchangeRate = data.rates[toCurrency];
            var result = (amount * exchangeRate).toFixed(2);
            document.getElementById('result').innerText = `Вы получите: ${result} ${toCurrency}`;
        })
        .catch(error => {
            console.log('Произошла ошибка при получении данных:', error);
        });
    });

    // Обновление блока с курсом выбранной валюты при изменении выбора
    document.getElementById('from-currency').addEventListener('change', function() {
        var fromCurrency = document.getElementById('from-currency').value;
        loadExchangeRate(fromCurrency);
    });
});
