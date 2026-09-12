# Team split — 4 roles

`main` is now a bare scaffold (configs, shared types, base styles, placeholder pages) —
**not** the finished app. Each of the 4 feature branches already has its own real commit
history building that role's piece on top of the scaffold, so pushing this repo and opening
a pull request from each branch into `main` will show an actual, meaningful diff — not an
empty "already up to date."

## Before anyone starts: the frozen contracts

Already on `main`, shared by all 4 roles. **Don't change these without telling the team
first** — everyone else's branch assumes these shapes:

- `LatLng = { lat: number; lng: number }` (`frontend/lib/types.ts`, `backend/lib/geo.ts`)
- `TransportMode = "walk" | "transit" | "drive"`
- `POST /api/route` request: `{ origin: LatLng, destination: LatLng, eventTime: string (ISO), bufferMinutes: number, mode: TransportMode }`
- `POST /api/route` response: `{ estimate: {...}, eventTime, bufferMinutes, departureDeadline, odsayConfigured }`

## The branches, in the order they should be opened as PRs

**1. `feature/location-input`** — Role: Location Input. 3 commits building
`hooks/useGeolocation.ts` → `lib/presets.ts` → `components/LocationPicker.tsx` (plus its
slice of `globals.css`). Fully independent — no dependency on the other roles.

**2. `feature/routing-api`** — Role: Transit Routing & ETA API. 4 commits building
`lib/geo.ts` → `lib/odsay.ts` → `lib/transit.ts` → `app/api/route/route.ts`. Backend only,
fully independent. Test with `curl` against `http://localhost:4000/api/route` — no frontend
needed.

**3. `feature/departure-countdown`** — Role: Departure Countdown & Alerts. 4 commits
building `hooks/useCountdown.ts` → `hooks/useNotification.ts` → `lib/time.ts` (both
projects) → `components/DepartureBanner.tsx` (plus its slice of `globals.css`).
Independent of Location/Routing.

**4. `feature/app-shell`** — Role: Trip Form, Theme & Integration. This branch already has
1–3 merged into it (so it builds and runs standalone right now), plus its own commits on
top: `components/EventForm.tsx` → `components/ThemeToggle.tsx` → the real
`app/layout.tsx` → the real `app/page.tsx` (wires everything together and calls the
backend), plus the rest of `globals.css`.
**Open this PR last, after 1–3 are merged into `main`** — GitHub will then only show this
PR's own commits as the diff, since the rest will already be in `main`. Open it before that
and the diff will look huge (it'll include 1–3's changes too) — not wrong, just noisier.

## Suggested workflow

1. Push everything: `git remote add origin <your-github-repo-url>` then `git push --all`.
2. Open 4 PRs on GitHub, `feature/x` → `main`, in the order above.
3. Merge PR 1, 2, 3 (any order among themselves — they don't touch the same files). Then
   merge PR 4.
4. Each person can also keep committing to their own branch after the initial push — the
   history above is a real starting point to build from, not a final state. Rebase onto
   `main` (or merge `main` into your branch) if you're still working after another PR lands,
   so your branch doesn't go stale.
5. Leave real time before the 21:00 submission to run the whole thing together on `main`
   after all 4 PRs are in — that's when integration bugs show up.
6. Whoever finishes first can help get a real ODsay key, verify the preset coordinates
   against an actual map, or start on deployment/the demo.

## Local dev while your PR isn't merged yet

Each branch installs and runs the same way as `main` (see the root `README.md`) —
`npm install` then `npm run dev` in whichever project(s) your branch touches. Branches 1–3
run standalone; branch 4 (`feature/app-shell`) already includes 1–3, so it runs the full
app on its own too.
