// Client component for the shipping cost calculator. This component
// handles user input, performs cost estimation calculations and
// displays the result. It is separated from the server page
// component to allow React hooks to be used without marking the
// entire page as a client component.

'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';

interface CalculatorTranslations {
  title: string;
  description: string;
  keywords: string;
  heading: string;
  subheading: string;
  form: {
    weight: string;
    dimensions: string;
    length: string;
    width: string;
    height: string;
    dimensionHint: string;
    value: string;
    service: string;
    services: {
      air: string;
      sea: string;
      express: string;
      land: string;
    };
    insurance: string;
    submit: string;
  };
  result: {
    title: string;
    cost: string;
    currency: string;
  };
}

interface CalculatorFormProps {
  t: CalculatorTranslations;
  locale: Locale;
}

export default function CalculatorForm({ t, locale }: CalculatorFormProps) {
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [value, setValue] = useState('');
  const [service, setService] = useState<'air' | 'sea' | 'express' | 'land'>('air');
  const [insurance, setInsurance] = useState(true);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const l = parseFloat(length);
    const wi = parseFloat(width);
    const h = parseFloat(height);
    const val = parseFloat(value);
    if (isNaN(w) || isNaN(l) || isNaN(wi) || isNaN(h) || isNaN(val)) {
      setResult(null);
      return;
    }
    // Calculate volumetric weight using a divisor (e.g., 6000 for air freight).
    const volumetricWeight = (l * wi * h) / 6000;
    const chargeableWeight = Math.max(w, volumetricWeight);
    const ratePerKg: Record<typeof service, number> = {
      air: 5,
      sea: 1,
      express: 10,
      land: 3,
    };
    const baseCost = chargeableWeight * ratePerKg[service];
    let insuranceCost = 0;
    if (insurance) {
      const excessValue = Math.max(0, val - 300);
      insuranceCost = excessValue * 0.012;
    }
    const total = baseCost + insuranceCost;
    setResult(Math.round(total * 100) / 100);
  };

  return (
    <main className="mx-auto max-w-screen-md py-10 px-4 text-gray-200">
      <h1 className="mb-6 text-3xl font-bold leading-tight text-red-500">
        {t.heading}
      </h1>
      <p className="mb-8 text-gray-400">{t.subheading}</p>
      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Weight input */}
        <div className="grid gap-1">
          <label htmlFor="weight" className="font-medium">
            {t.form.weight}
          </label>
          <input
            id="weight"
            type="number"
            inputMode="decimal"
            step="0.01"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-gray-100 placeholder-gray-400 focus:border-red-600 focus:outline-none"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            aria-label={t.form.weight}
          />
        </div>
        {/* Dimensions */}
        <div className="grid gap-1">
          <label className="font-medium" htmlFor="length">
            {t.form.dimensions}
          </label>
          <div className="flex gap-2">
            <input
              id="length"
              type="number"
              inputMode="decimal"
              step="0.1"
              placeholder={t.form.length}
              className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 p-3 text-gray-100 placeholder-gray-400 focus:border-red-600 focus:outline-none"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              required
              aria-label={t.form.length}
            />
            <input
              id="width"
              type="number"
              inputMode="decimal"
              step="0.1"
              placeholder={t.form.width}
              className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 p-3 text-gray-100 placeholder-gray-400 focus:border-red-600 focus:outline-none"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              required
              aria-label={t.form.width}
            />
            <input
              id="height"
              type="number"
              inputMode="decimal"
              step="0.1"
              placeholder={t.form.height}
              className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 p-3 text-gray-100 placeholder-gray-400 focus:border-red-600 focus:outline-none"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              aria-label={t.form.height}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">{t.form.dimensionHint}</p>
        </div>
        {/* Declared value */}
        <div className="grid gap-1">
          <label htmlFor="value" className="font-medium">
            {t.form.value}
          </label>
          <input
            id="value"
            type="number"
            inputMode="decimal"
            step="0.01"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-gray-100 placeholder-gray-400 focus:border-red-600 focus:outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            aria-label={t.form.value}
          />
        </div>
        {/* Service type */}
        <div className="grid gap-1">
          <label htmlFor="service" className="font-medium">
            {t.form.service}
          </label>
          <select
            id="service"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-gray-100 focus:border-red-600 focus:outline-none"
            value={service}
            onChange={(e) => setService(e.target.value as typeof service)}
            aria-label={t.form.service}
          >
            <option value="air">{t.form.services.air}</option>
            <option value="sea">{t.form.services.sea}</option>
            <option value="express">{t.form.services.express}</option>
            <option value="land">{t.form.services.land}</option>
          </select>
        </div>
        {/* Insurance option */}
        <div className="flex items-center gap-2">
          <input
            id="insurance"
            type="checkbox"
            className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-red-600 focus:ring-red-600"
            checked={insurance}
            onChange={(e) => setInsurance(e.target.checked)}
          />
          <label htmlFor="insurance" className="text-sm">
            {t.form.insurance}
          </label>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="inline-block rounded-md bg-red-600 px-6 py-3 font-semibold text-white shadow transition-colors duration-200 hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          {t.form.submit}
        </button>
      </form>
      {result !== null && (
        <div className="mt-8 rounded-md bg-zinc-800/80 p-6 shadow-inner">
          <h2 className="mb-2 text-xl font-semibold text-red-400">{t.result.title}</h2>
          <p className="text-lg text-gray-200">
            {t.result.cost}: <strong>{result.toLocaleString(locale)} {t.result.currency}</strong>
          </p>
        </div>
      )}
    </main>
  );
}