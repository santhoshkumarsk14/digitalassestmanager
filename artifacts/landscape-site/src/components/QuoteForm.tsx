import { type SyntheticEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, Upload } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY ?? '';

type StepField = {
  key: 'service' | 'property' | 'timeline' | 'budget';
  label: string;
  options: string[];
};

const steps: StepField[] = [
  {
    key: 'service',
    label: 'What can we help with?',
    options: [
      'Landscape Master Plan',
      'Design & Installation',
      'Maintenance',
      'Tree Pruning & Removal',
      'Construction',
      'Not sure yet',
    ],
  },
  {
    key: 'property',
    label: 'Tell us about the property',
    options: ['Private home', 'Private estate', 'Commercial / campus', 'Condo / MCST', 'Government / tender'],
  },
  {
    key: 'timeline',
    label: 'When are you hoping to begin?',
    options: ['As soon as possible', 'Within 3 months', '3–6 months', '6–12 months', 'Just exploring'],
  },
  {
    key: 'budget',
    label: 'What is the investment range?',
    options: ['Under $10k', '$10k–$50k', '$50k–$150k', '$150k+', 'I need guidance'],
  },
];

type FormState = {
  service: string;
  property: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  details: string;
};

const initialState: FormState = {
  service: '',
  property: '',
  timeline: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  details: '',
};

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initialState);
  const [photos, setPhotos] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const finalStep = steps.length;
  const totalSteps = steps.length + 1;

  const update = (key: keyof FormState, value: string) => setData((current) => ({ ...current, [key]: value }));
  const next = () => setStep((current) => Math.min(current + 1, finalStep));
  const back = () => setStep((current) => Math.max(current - 1, 0));

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus('error');
      return;
    }
    setStatus('submitting');

    const payload = new FormData();
    payload.append('access_key', WEB3FORMS_ACCESS_KEY);
    payload.append('subject', `New quote request — ${data.service || 'General enquiry'}`);
    payload.append('from_name', data.name);
    payload.append('service', data.service);
    payload.append('property_type', data.property);
    payload.append('timeline', data.timeline);
    payload.append('budget_range', data.budget);
    payload.append('name', data.name);
    payload.append('email', data.email);
    payload.append('phone', data.phone);
    payload.append('details', data.details);
    photos.forEach((file) => payload.append('attachment', file));

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });
      const result = await response.json();
      setStatus(result.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8" data-testid="status-quote-success">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-ink">
          <Check size={20} />
        </span>
        <h3 className="font-display mt-6 text-2xl text-ink">Thanks — that's with us.</h3>
        <p className="mt-3 max-w-sm text-sm text-ink/65">
          We'll review your brief and come back to you within two working days.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setStep(0);
            setData(initialState);
            setPhotos([]);
          }}
          className="mt-6 border-b border-ink/40 pb-1 text-sm font-medium text-ink hover:border-primary"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between border-b border-ink/10 pb-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink/50">
          Step {step + 1} of {totalSteps}
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }, (_, index) => (
            <span key={index} className={`h-1 w-7 rounded-full ${index <= step ? 'bg-accent' : 'bg-ink/10'}`} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          {step < finalStep && (
            <fieldset>
              <legend className="font-display text-2xl text-ink">{steps[step].label}</legend>
              <div className="mt-6 grid gap-2">
                {steps[step].options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => update(steps[step].key, option)}
                    className={`flex w-full items-center justify-between rounded-lg border px-4 py-3.5 text-left text-sm transition ${
                      data[steps[step].key] === option
                        ? 'border-primary bg-primary text-surface'
                        : 'border-ink/15 text-ink hover:border-primary'
                    }`}
                  >
                    {option}
                    <Check size={15} className={data[steps[step].key] === option ? 'opacity-100' : 'opacity-0'} />
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === finalStep && (
            <fieldset className="space-y-5">
              <legend className="font-display text-2xl text-ink">A few details to reach you</legend>
              <label className="block text-sm font-medium text-ink/70">
                Your name
                <input
                  type="text"
                  required
                  value={data.name}
                  onChange={(event) => update('name', event.target.value)}
                  className="mt-1.5 block w-full rounded-lg border border-ink/15 px-3 py-2.5 text-base text-ink outline-none focus:border-primary"
                />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-ink/70">
                  Email
                  <input
                    type="email"
                    required
                    value={data.email}
                    onChange={(event) => update('email', event.target.value)}
                    className="mt-1.5 block w-full rounded-lg border border-ink/15 px-3 py-2.5 text-base text-ink outline-none focus:border-primary"
                  />
                </label>
                <label className="block text-sm font-medium text-ink/70">
                  Phone
                  <input
                    type="tel"
                    required
                    value={data.phone}
                    onChange={(event) => update('phone', event.target.value)}
                    className="mt-1.5 block w-full rounded-lg border border-ink/15 px-3 py-2.5 text-base text-ink outline-none focus:border-primary"
                  />
                </label>
              </div>
              <label className="block text-sm font-medium text-ink/70">
                Anything else we should know?
                <textarea
                  rows={4}
                  value={data.details}
                  onChange={(event) => update('details', event.target.value)}
                  placeholder="The site, the ambition, the question..."
                  className="mt-1.5 block w-full resize-none rounded-lg border border-ink/15 px-3 py-2.5 text-base text-ink outline-none focus:border-primary"
                />
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-ink/25 p-4 text-sm text-ink/70 hover:border-primary">
                <Upload size={16} />
                <span>
                  {photos.length ? `${photos.length} photo${photos.length > 1 ? 's' : ''} selected` : 'Add site photographs (optional)'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(event) => setPhotos(Array.from(event.target.files ?? []))}
                />
              </label>
              {status === 'error' && (
                <p role="alert" className="text-sm text-red-600">
                  Something went wrong sending your request. Please try again, or email us directly.
                </p>
              )}
            </fieldset>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-medium text-ink"
          >
            <ChevronLeft size={15} /> Back
          </button>
        ) : (
          <span />
        )}

        {step < finalStep ? (
          <button
            type="button"
            disabled={!data[steps[step].key]}
            onClick={next}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue <ArrowRight size={15} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Get Your Free Quote'} <ArrowRight size={15} />
          </button>
        )}
      </div>
    </form>
  );
}
