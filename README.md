# Medical Image Rating App

This is a React + TypeScript application built for scoring medical images using [NiiVue](https://github.com/niivue/niivue), a WebGL-based medical image viewer. It allows anonymous users to view medical images, rate them, and optionally add comments and tags. The app uses localStorage to persist user state between sessions. 


## Features

- View medical images in 2D and 3D using **NiiVue**
- Anonymous user tracking via persistent browser ID
- Rate images on a scale from 1 to 10
- Add optional comments per image
- Add optional tags per image
- Change slice layout (axial, sagittal, coronal, etc.)
- Prevent double scoring of the same image
- Track and display total time spent rating
- Draggable image control panel
- Fully client-side — no backend required


## Tech Stack

- **React** with **TypeScript**
- **Vite** for fast development
- **Material UI (MUI)** for the UI framework
- **NiiVue** for image visualization


## Folder Structure

```

src/
├── components/       # Reusable components like ScoreBar, NiiVueCanvas
├── context/          # App-wide context for user, image state
├── hooks/            # Custom hooks (e.g., useDraggablePanel)
├── types/            # Centralized TypeScript interfaces / types
├── utils/            # Utility functions (storage, time tracking, etc.)
├── data/             # Image URLs

````


## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/davidstocker95/medical-img-classification-app.git
cd medical-image-rating-app
````

### 2. Install dependencies

```bash
npm install
```


### 3. Run Tests

This project uses **Vitest** and **@testing-library/react** for unit and integration testing.
Run the tests with:

```bash
npm run test
```

### 4. Start the development server

Run with Vite's fast dev server and hot module replacement (HMR):

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.


## Build for Production

```bash
npm run build
```

This will generate a static production build in the `dist/` folder.


## Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com) and log in or create an account.

2. Click **"New Project"** and import your GitHub repository.

3. Choose:

   * **Framework Preset**: `Vite`
   * **Output Directory**: `dist`
   * Leave the rest default (Vercel auto-detects Vite)

4. Click **Deploy** — your app will be live on a Vercel subdomain.


## License

MIT — feel free to fork and adapt this project.

