import axios from "axios";
 export default {
    name: 'CurrencyConverter',
    data() {
        return {
            currencyRates: [],
            currencyUAH: {
                ccy: "UAH",
                base_ccy: "UAH",
                buy: 1,
                sale: 1
            },
            conversion: {
                amount: 0,
                currencyFrom: null,
                currencyTo: null,
                message: ""
            },

        }
    },

    mounted: function (){
        axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then(response => {
            console.log(response.data)
            this.currencyRates = response.data
        });
    },
    updated() {
        const {currencyFrom, currencyTo, amount} = this.conversion;
        if (!currencyFrom || !currencyTo) return;
        console.log("From: ", currencyFrom, "To: ", currencyTo, "Amount: ", amount)
        const toUAH = parseFloat(currencyFrom.buy)*parseFloat(amount);
        const res = 1/parseFloat(currencyTo.sale)*toUAH;
        this.conversion.message = `${amount} ${currencyFrom.ccy} equals ${res} ${currencyTo.ccy}`;
        console.log(this.conversion.message);
    }
 }

