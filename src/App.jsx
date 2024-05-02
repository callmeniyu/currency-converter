import { useState } from "react"
import { InputComp } from "./components/index.js"
import useCurrencyInfo from "./hooks/useCurrencyInfo.js"
import "./App.css"

function App() {
    const [amount, setAmount] = useState(0)
    const [currency, setCurrency] = useState("usd")
    const [convertedCurrency, setConvertedCurrency] = useState("inr")
    const [convertedAmount, setConvertedAmount] = useState(0)

    const currencyInfo = useCurrencyInfo(currency)
    const options = Object.keys(currencyInfo)

    function amountConverter() {
        setConvertedAmount((amount * currencyInfo[convertedCurrency]).toFixed(2))
    }

    function swap() {
        setCurrency(convertedCurrency)
        setConvertedCurrency(currency)
        setAmount(0)
        setConvertedAmount(0)
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                amountConverter()
            }}
        >
            <div className="base">
                <InputComp
                    label="from"
                    amount={amount}
                    currency={currency}
                    onAmountChange={(amount) => setAmount(amount)}
                    onCurrencyChange={(currency) => {
                        setCurrency(currency)
                        amountConverter()
                    }}
                    options={options}
                />
                <button className="swap" onClick={swap}>
                    Swap
                </button>
                <InputComp
                    label="to"
                    isReadOnly={true}
                    convertedAmount={convertedAmount}
                    convertedCurrency={convertedCurrency}
                    onCurrencyChange={(currency) => setConvertedCurrency(currency)}
                    options={options}
                />
                <button className="main-btn" type="submit">
                    Convert from {currency.toUpperCase()} to {convertedCurrency.toUpperCase()}
                </button>
            </div>
        </form>
    )
}

export default App
