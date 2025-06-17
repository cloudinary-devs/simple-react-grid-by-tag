# React Cloudinary Image Gallery

This app is a responsive image gallery that displays all images from your Cloudinary account tagged with "mcp1". It uses Cloudinary's client-side listing feature, so no backend or API keys are required. New images with the tag "mcp1" will automatically appear in the gallery in real time.

## ⚠️ Note on Tag Updates and Caching

Cloudinary's client-side list endpoint (`/image/list/{tag}.json`) is cached by their CDN. When you add or change tags on assets, it may take a few minutes for the changes to appear in the app due to CDN caching. This affects both the gallery and the banner image. For instant updates, you would need to use the Cloudinary Admin API from a backend server (requires authentication).

## How to Run This App Locally

1. Install dependencies (if you haven't already):
   ```
   npm install
   ```
   (or use `yarn install` or `pnpm install`)

2. Start the development server:
   ```
   npm run dev
   ```
   (or use `yarn dev` or `pnpm dev`)

3. Open your browser and go to:
   ```
   http://localhost:5173
   ```

That's it! The app will automatically display all images from your Cloudinary account that are tagged with "mcp1".

## How to Use Your Own Cloudinary Account

If you want to use your own Cloudinary account, update the cloud name in the configuration file:

1. Open `src/cloudinary.config.ts` in your code editor.
2. Find the line that looks like this:
   ```typescript
   const cloudName = 'your-cloud-name-here';
   ```
3. Change `'your-cloud-name-here'` to your actual Cloudinary cloud name (you can find this in your Cloudinary dashboard).
4. Save the file and restart the development server if it's running.

### How to Change the Tag Used for Displayed Images

By default, the app displays images tagged with `mcp1`. If you want to use a different tag:

1. Open `src/App.tsx` in your code editor.
2. Find the line near the top that looks like this:
   ```typescript
   const CLOUDINARY_TAG = 'mcp1';
   ```
3. Change `'mcp1'` to your desired tag (e.g., `'my-custom-tag'`).
4. Save the file and restart the development server if it's running.

Now the app will display images from your Cloudinary account that are tagged with your chosen tag!

### How to Change the Banner Tag

The banner image at the top of the app uses the first asset it finds with the tag `winter-banner`. If you want to use a different tag for the banner, update the following line in `src/App.tsx`:

```typescript
const BANNER_TAG = 'winter-banner';
```

Change `'winter-banner'` to your desired tag and restart the dev server.