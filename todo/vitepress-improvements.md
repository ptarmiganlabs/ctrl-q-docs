# VitePress Configuration Improvements

Source: butler-sos-docs repo (applied July 2026)
Target: ctrl-q-docs repo

---

## 1. Add OG Image Meta Tag

**Problem:** Social shares (Twitter, Slack, LinkedIn) show no preview image.

**Solution:** Create OG banner and add meta tag.

**Steps:**

### 1a. Create OG Banner
1. Create image: 1200×630px PNG
2. Use Ctrl-Q logo + brand colors
3. Save as `docs/public/og-banner.png`

### 1b. Add Meta Tag
**File:** `docs/.vitepress/config.ts`

**Change:**
```typescript
// Add to head array (after og:description, around line 42):
[
  "meta",
  {
    property: "og:image",
    content: "https://ctrl-q.ptarmiganlabs.com/og-banner.png",
  },
],
```

**Verification:**
1. Run `npm run build`
2. Open any HTML page: `docs/.vitepress/dist/docs/index.html`
3. Search for `og:image`: `grep 'og:image' docs/.vitepress/dist/docs/index.html`
4. Verify meta tag is present with correct URL
5. Test with Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/

---

## 2. Customize Last Updated Date Format (Optional)

**Problem:** Default date format may be verbose.

**Solution:** Add custom date format to themeConfig.

**File:** `docs/.vitepress/config.ts`

**Change:**
```typescript
// Add to themeConfig (after footer, around line 208):
lastUpdated: {
  text: "Updated at",
  formatOptions: {
    dateStyle: "long",
    timeStyle: "short",
  },
},
```

**Verification:**
1. Run `npm run build`
2. Open any page in dev mode: `npm run dev`
3. Look for "Updated at" text on a page
4. Verify format is "July 5, 2026 at 3:45 PM"

---

## 3. Add Dynamic Copyright Year

**Problem:** Copyright has no year: `"Copyright Ptarmigan Labs AB"` — looks incomplete and doesn't show when the project started.

**Solution:** Add a start year with dynamic current year.

**File:** `docs/.vitepress/config.ts`

**Change:**
```typescript
// FROM (line 207):
copyright: "Copyright Ptarmigan Labs AB",

// TO:
copyright: `Copyright © 2023–${new Date().getFullYear()} Ptarmigan Labs AB`,
```

**Note:** Adjust the start year (2023) to match when Ctrl-Q was first released.

**Verification:**
1. Run `npm run build`
2. Open any HTML page in `docs/.vitepress/dist/`
3. Search for "Copyright" in the footer
4. Verify year shows "2023–2026" (or current year)

---

## Summary Checklist

- [ ] 1. OG banner created and meta tag added
- [ ] 2. Date format customized (optional)
- [ ] 3. Dynamic copyright year added

**Final verification:** Run `npm run build` and confirm no errors.
