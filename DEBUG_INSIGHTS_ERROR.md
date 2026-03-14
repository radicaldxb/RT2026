# How to find the Internal Server Error (from your side)

## 1. Check the terminal where the dev server runs

When you run `npm run dev` or `npm run dev:local`, the **same terminal** shows errors.

- Open that terminal window.
- Reproduce the error: go to http://localhost:3000/insights (or refresh).
- Scroll up in the terminal and look for red text or a **stack trace** (lines starting with `at ...`).
- **Copy the full error message and stack trace** and share it (e.g. paste in chat or a file). That tells us exactly what is breaking.

Example of what to look for:
```
Error: ...
    at ...
    at ...
```

## 2. Check the browser (error boundary)

An **error page** was added for the insights section. When something goes wrong:

- You may see a white/red box with **“Something went wrong on Insights”** and an error **Message**.
- **Copy that message** (and “Digest” if shown) and share it.

That message is the same error we need to fix.

## 3. Check the browser console (optional)

- Open DevTools: **F12** or **Right‑click → Inspect → Console**.
- Go to http://localhost:3000/insights (or refresh).
- Look for red errors. One may say **“Insights route error:”** with an object.
- Expand it and copy the **message** (and stack if visible).

## 4. Try the minimal test page (to see if the route works)

If you want to confirm the route itself works:

1. Open `src/app/insights/page.js`.
2. **Temporarily replace the whole file** with only:

```js
export default function InsightsIndexPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Insights test</h1>
      <p>If you see this, the /insights route works.</p>
    </div>
  );
}
```

3. Save, then open http://localhost:3000/insights.

- If you see **“Insights test”**: the route is fine; the error comes from the real content (data, Image, or a component). Restore the original `page.js` and share the error from step 1 or 2.
- If you still get Internal Server Error: the problem may be the layout or something else in the app. Share what you see in the terminal (step 1).

## 5. Restart the dev server

Sometimes the dev server keeps an old state:

1. In the terminal where the dev server runs, press **Ctrl+C**.
2. Run again: `npm run dev:local` (or `npm run dev`).
3. Try http://localhost:3000/insights again and repeat steps 1–2 if the error persists.

---

**What to send back:** The **exact error message** (and stack trace or digest if you have them) from the terminal and/or the error boundary page. With that we can fix the root cause.
