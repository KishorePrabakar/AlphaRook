# AlphaRook — Implementation Plan

Roadmap for all features currently in the README To-Do list, ordered by dependency,
risk, and user value. Each phase lists backend changes, frontend changes, and the
WebSocket protocol additions required.

---

## Phase 0 — Foundation & Code Health (prerequisite)

**Goal:** Make the codebase safe to extend before adding features.

| Task | Area | Notes |
|---|---|---|
| Move WebSocket listeners out of render | Frontend | `Chat.jsx` / `ChatOpened.jsx` / `Game.jsx` register `addEventListener("message")` on every mount → duplicate handlers. Centralize in one dispatcher (context or a small event bus). |
| Single source of truth for game state | Frontend | Lift board/FEN/turn state into `Game.jsx` or a React context; components become pure views. |
| Server-side room state object | Backend | Track players, colors, FEN, status, rematch flags per room in `server/room.go`. |
| Protocol versioning convention | Both | Add `type` field to every WS message for forward compatibility. |
| **Render-specific: Set environment variables** | Both | Backend: `PORT=8080`; Frontend: `VITE_BASE_URL_SERVER=https://alpharook-backend.onrender.com` |

**Estimate:** 2–3 days

---

## Phase 1 — Core Gameplay Essentials

**Goal:** Players can finish games properly and recover from accidents.

### 1a. Resign & draw offers
- Backend: new actions `GAME_RESIGN`, `DRAW_OFFER`, `DRAW_ACCEPT`, `DRAW_DECLINE`.
- Frontend: resign button (with confirm), draw offer banner + accept/decline UI.
- End-game overlay shows "won by resignation" / "draw by agreement".

### 1b. Takeback requests
- Actions: `TAKEBACK_REQUEST`, `TAKEBACK_ACCEPT`, `TAKEBACK_DECLINE`.
- Requester's board reverts to previous FEN on accept; disabled once game ends.
- Optional rule: max 2 takebacks per player per game.

### 1c. Premove support
- Frontend-only: queue next move while opponent thinks; validate against new FEN on turn start; discard if illegal.
- Visual cue: ghost piece on destination square.

### 1d. Disconnect recovery
- Backend: issue each client a short-lived `rejoinToken` (room ID + player slot + HMAC).
- On reconnect (`/rejoin-room?id=...&token=...`), restore full room state (FEN, chat history, clocks).
- Grace period (~60s) before a disconnected player forfeits.

### 1e. Auto color swap on rematch
- Backend: swap `White`/`Black` slots when both players accept rematch; emit `START_GAME` with new color assignment.

**Estimate:** 4–6 days total

---

## Phase 2 — Board UX Polish

**Goal:** Bring the board to modern standards.

- **Legal move indicators** — chess.js `.moves({ verbose: true })` → dots on targets; capture squares get ring markers.
- **Last move highlight** — store `{from, to}` of latest move; tint both squares.
- **Captured pieces display** — derive from FEN diff; show piece icons + material advantage (+3 etc.) beside each player.
- **Tap-to-move** — tap source, tap destination; coexists with drag-and-drop via chessboardjsx click handlers.
- **Dark mode toggle** — Tailwind `dark:` classes already partially present; add toggle persisted to `localStorage`.
- **Keyboard accessibility** — arrow-key square cursor, Enter to select/move, visible focus ring.
- **QR code join** — generate QR of room URL with `qrcode.react`; shown on waiting screen.

**Estimate:** 5–7 days

---

## Phase 3 — Time Control & Game Record

**Goal:** Real chess pacing and a visible move record.

### 3a. Chess clock (Bullet 1+0 / Blitz 3+2 / Rapid 10+0)
- **Server-authoritative**: clock state lives in `room.go`, decremented server-side, broadcast with each `GAME_MOVE` (remaining ms for both players).
- New action `FLAG_FALL` when time hits zero → game over on timeout.
- Client renders countdown from server timestamps (compensate network latency using last-sync offset).

### 3b. Move history panel
- Build SAN list incrementally from chess.js `.history()`; two-column scrollable panel (move no. | white | black).
- Clicking a past move previews that position (read-only) with a "return to live" button.

### 3c. Pass-and-play local mode
- New route `/local` — no WebSocket; single device, board auto-flips after each move; optional hide-move ("your turn, don't peek") overlay.

**Estimate:** 6–8 days

---

## Phase 4 — Matchmaking & Presence

**Goal:** One-click play against strangers.

### 4a. Online player count
- Backend: global hub counting connected sockets; broadcast `ONLINE_COUNT` on connect/disconnect (throttled to 1/sec).
- Frontend: badge on Home screen; if count ≤ 1 when someone clicks Quick Play → alert "No other players online right now".

### 4b. Quick Play
- Action `QUICK_PLAY_JOIN` puts client into a matchmaking pool in `matchmaking.go`.
- When pool has 2 players → server creates room, sends both a `QUICK_PLAY_MATCHED` with room ID + colors; clients redirect into the game flow.

### 4c. Full matchmaking queue
- Extends 4b with rating bands (post-Phase 5), estimated wait display, cancel button, and re-pairing after aborts.

**Estimate:** 4–5 days

---

## Phase 5 — Accounts & Intelligence

**Goal:** Persistence, identity, and an AI opponent.

### 5a. Player profiles with JWT auth
- Backend: `/register`, `/login` endpoints; bcrypt password hashing; JWT issued on login, refreshed silently by frontend.
- Store profiles in SQLite (simplest ops) or Postgres; link rooms to player IDs.

### 5b. Stockfish AI opponent
- Load Stockfish WASM in a Web Worker (no backend load); difficulty = skill level + search depth limits.
- "Play vs AI" mode reuses the whole board stack locally; AI moves injected as normal `GAME_MOVE`s.

### 5c. Opening name explorer
- Map move sequence → opening name via a bundled ECO book JSON (~3k lines); show name under move history.

### 5d. Post-game position analysis
- After game end, replay through local Stockfish: eval graph, blunder/brilliant classification per move, jump-to-position from graph.

**Estimate:** 8–12 days

---

## Phase 6 — Fun & Novelty

**Goal:** Personality and delight.

- **Floating emoji reactions** — action `EMOJI_REACTION`; CSS keyframe float-up animation near sender's avatar; rate-limited (1 per 3s).
- **Victory animations** — canvas-confetti on checkmate win; subtle gray fade for losses; draw handshake icon. Respect `prefers-reduced-motion`.

**Estimate:** 2 days

---

## Suggested WebSocket Protocol Additions (summary)

| Action | Direction | Phase |
|---|---|---|
| `GAME_RESIGN` | C → S | 1 |
| `DRAW_OFFER` / `DRAW_ACCEPT` / `DRAW_DECLINE` | Bidirectional | 1 |
| `TAKEBACK_REQUEST` / `TAKEBACK_ACCEPT` / `TAKEBACK_DECLINE` | Bidirectional | 1 |
| `REJOIN_ROOM` | C → S | 1 |
| `CLOCK_SYNC` / `FLAG_FALL` | S ↔ C | 3 |
| `ONLINE_COUNT` | S → C | 4 |
| `QUICK_PLAY_JOIN` / `QUICK_PLAY_MATCHED` | C → S / S → C | 4 |
| `EMOJI_REACTION` | Bidirectional | 6 |

## Milestone Timeline (solo dev, rough)

```
Week 1      Phase 0 + 1a–1b        (foundation, resign/draw/takeback)
Week 2      Phase 1c–1e + 2        (premove, recovery, board polish)
Week 3      Phase 3                (clock, history, pass-and-play)
Week 4      Phase 4 + 6            (matchmaking, presence, fun bits)
Week 5–6    Phase 5                (auth, AI, analysis)
```

## Key Risks

1. **Clock fairness** — must be server-authoritative from day one; retrofitting client-side clocks later is painful.
2. **Duplicate WS listeners** (existing bug) — will cause double moves/chat if not fixed in Phase 0.
3. **Reconnect security** — rejoin tokens must be single-use and expire to prevent room hijacking.
4. **Stockfish bundle size** — lazy-load the WASM worker only when vs-AI mode is opened.

## Render-Specific Notes

- **Backend**: Deploy as Go Web Service, set `PORT=8080` env var
- **Frontend**: Deploy as Static Site, set `VITE_BASE_URL_SERVER` to backend URL
- **Free tier**: 750hrs/month per service (sufficient for hobby project)
- **Sleeping**: Services sleep after 15 min inactivity; first move "wakes" them (~30s delay)
- **Custom domains**: Add `alpharook.com` later via Render dashboard
- **Database**: Not needed for current feature set (in-memory + localStorage)