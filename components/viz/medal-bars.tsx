import { ChevronDown } from 'lucide-react'
import { SWIM_MEETS, SWIM_MEDAL_TOTAL, type SwimResult } from '@/app/data'

const PLACES = {
  1: { label: 'Gold', ordinal: '1st', color: '#89651e', background: '#eee5cd' },
  2: {
    label: 'Silver',
    ordinal: '2nd',
    color: '#5e666b',
    background: '#e5e7e7',
  },
  3: {
    label: 'Bronze',
    ordinal: '3rd',
    color: '#855a3a',
    background: '#eadeD3',
  },
}

function ResultList({ results }: { results: SwimResult[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {results.map((result) => {
        const place = PLACES[result.place]
        return (
          <li key={result.event} className="flex items-start gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium"
              style={{ color: place.color, backgroundColor: place.background }}
              aria-label={`${place.label}, ${place.ordinal} place`}
            >
              {place.ordinal}
            </span>
            <span className="text-ink pt-1 text-[15px] leading-snug">
              {result.event}
              {result.detail && (
                <span className="text-ink-soft mt-1 block text-xs">
                  {result.detail}
                </span>
              )}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function MedalBars({ className = '' }: { className?: string }) {
  const [latest, ...previous] = SWIM_MEETS

  return (
    <div className={className}>
      <div className="border-line flex flex-wrap items-baseline justify-between gap-2 border-b pb-4">
        <h3 className="text-ink text-[20px] font-medium">Meet results</h3>
        <p className="text-ink-soft text-sm">
          {SWIM_MEDAL_TOTAL} medals · 3× team MVP · 1 school record
        </p>
      </div>
      <section
        aria-labelledby="latest-swim-meet"
        className="border-line grid gap-6 border-b py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
      >
        <div>
          <p className="text-ink-soft mb-2 text-xs">
            {latest.year} · latest meet
          </p>
          <h4 id="latest-swim-meet" className="text-ink text-base font-medium">
            {latest.name} · {latest.venue}
          </h4>
          <p className="text-ink-soft mt-2 text-xs">1 gold · 5 silver</p>
        </div>
        <ResultList results={latest.results} />
      </section>
      {previous.map((meet) => (
        <details key={meet.id} className="group border-line border-b">
          <summary className="focus-visible:outline-accent flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 py-5 outline-offset-4 focus-visible:outline-2 [&::-webkit-details-marker]:hidden">
            <span className="text-ink-soft text-xs tabular-nums sm:w-12">
              {meet.year}
            </span>
            <span className="text-ink min-w-0 flex-1 text-[15px]">
              {meet.name}
              {meet.venue && (
                <span className="text-ink-soft"> · {meet.venue}</span>
              )}
            </span>
            <span className="text-ink-soft order-last flex w-full gap-3 text-xs sm:order-none sm:w-auto">
              {([1, 2, 3] as const).map((place) => {
                const count = meet.results
                  .filter((result) => result.place === place)
                  .reduce((total, result) => total + (result.medals ?? 1), 0)
                return (
                  count > 0 && (
                    <span key={place} className="flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: PLACES[place].color }}
                      />
                      {count} {PLACES[place].label.toLowerCase()}
                    </span>
                  )
                )
              })}
            </span>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className="text-ink-soft transition-transform group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <div className="pb-6 sm:pl-16">
            <ResultList results={meet.results} />
            {meet.note && (
              <p className="text-ink-soft mt-4 text-xs">{meet.note}</p>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
