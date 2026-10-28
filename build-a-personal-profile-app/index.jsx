import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

export const RATES = Object.freeze({ USD: 1, EUR: 0.92, GBP: 0.78, JPY: 156.7 });
const CURRENCIES = Object.keys(RATES);

export function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  // Keep destination out of this dependency list: changing only "to" reuses this base.
  const baseAmount = useMemo(() => {
    const numericAmount = Number(amount);
    return Number.isFinite(numericAmount) ? numericAmount / RATES[fromCurrency] : 0;
  }, [amount, fromCurrency]);
  const convertedAmount = baseAmount * RATES[toCurrency];

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Common Currency home">
          <span className="brand-mark" aria-hidden="true">↗</span>
          <span>common<span className="brand-light">currency</span></span>
        </a>
        <span className="topbar-note"><span className="live-dot" /> Rate guide · Refreshed today</span>
      </header>
      <section className="hero" id="top" aria-labelledby="page-title">
        <div className="eyebrow"><span>✳</span> MONEY, MADE CLEAR</div>
        <h1 id="page-title">A little closer,<br /><em>wherever you are.</em></h1>
        <p className="intro">A simple way to see what your money means somewhere else.</p>
        <section className="converter-card" aria-label="Currency converter">
          <div className="card-heading"><div><span className="section-kicker">CONVERT</span><h2>Your amount</h2></div><span className="card-index">01 <span>/ 02</span></span></div>
          <div className="field-label-row"><label htmlFor="amount">AMOUNT</label><span>Enter an amount to begin</span></div>
          <div className="amount-wrap">
            <span className="amount-symbol" aria-hidden="true">{fromCurrency === 'JPY' ? '¥' : fromCurrency === 'GBP' ? '£' : fromCurrency === 'EUR' ? '€' : '$'}</span>
            <input id="amount" type="number" min="0" step="any" inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} aria-label="Amount to convert" />
          </div>
          <div className="currency-row">
            <div className="currency-field"><label htmlFor="from-currency">FROM</label><select id="from-currency" value={fromCurrency} onChange={(event) => setFromCurrency(event.target.value)}>{CURRENCIES.map((currency) => <option value={currency} key={currency}>{currency}</option>)}</select></div>
            <span className="swap-mark" aria-hidden="true">↗</span>
            <div className="currency-field"><label htmlFor="to-currency">TO</label><select id="to-currency" value={toCurrency} onChange={(event) => setToCurrency(event.target.value)}>{CURRENCIES.map((currency) => <option value={currency} key={currency}>{currency}</option>)}</select></div>
          </div>
          <div className="result-panel" aria-live="polite"><span className="result-label">YOU’LL RECEIVE</span><output className="result-amount" aria-label="Converted amount">{convertedAmount.toFixed(2)} <span>{toCurrency}</span></output><span className="result-caption">A helpful estimate for your next move.</span></div>
          <footer className="card-footer"><span>✳ Thoughtful conversions, wherever life takes you.</span><span>RATES ARE FOR DEMONSTRATION</span></footer>
        </section>
      </section>
      <footer className="site-footer"><span>COMMON CURRENCY</span><span>Go well. Spend wisely.</span></footer>
    </main>
  );
}

export default CurrencyConverter;

const rootElement = document.getElementById('root');
if (rootElement && !rootElement.hasChildNodes()) {
  createRoot(rootElement).render(<CurrencyConverter />);
}
