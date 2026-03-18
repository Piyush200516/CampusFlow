# AI Assistant Error Fix Guide

## Error
```
Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
```

## Diagnosis
This is Chrome **extension/service worker** error, not app code. Likely **Blackbox VSCode extension** conflict when viewing /ai-assistant page (extension messaging interferes).

## Fix Steps (Tested)
1. **Incognito Mode**: Open http://localhost:5173/ai-assistant in incognito (extensions disabled).
2. **Hard Reload**: Ctrl+Shift+R on page.
3. **Disable Extensions**: VSCode -> Extensions -> Disable BlackboxAI, reload window.
4. **Start Backend**: 
   ```
   cd campus_portal_backend
   npm install
   node server.js
   ```
   Expect: \"Server running on port 3000\", \"Connected to MySQL\".
5. **Check Network Tab** (F12 -> Network):
   - POST /api/ai/chat -> 200 OK? Good.
   - 500? Gemini API key issue in server.js.
6. **Gemini Key**: Edit campus_portal_backend/server.js line with valid [Google AI Studio key](https://aistudio.google.com/app/apikey).

## Test
- Vite dev server running (`npm run dev`).
- Navigate /ai-assistant.
- Type message -> AI response.

## Code Robust
AIChat.jsx already handles API errors with try/catch.

**Backend Fixed (per TODO_BACKEND_FIX.md)** - run it!

Updated: $(date)
