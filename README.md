# Our Garden

A romantic, slide-based React application built with Vite, Framer Motion, and React Router.

## Deployment to GitHub Pages

1. **Initialize a Git repository (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Add your GitHub repository as remote**
   ```bash
   git remote add origin https://github.com/<your-username>/our-garden.git
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```
   This command will automatically build the project and deploy the `dist` folder to the `gh-pages` branch.

## Adding Media
- **Photos**: Place your photos in `public/photos/` and update the `src` props in the `PhotoPolaroid` components within the slide files.
- **Music**: Add a `music.mp3` file to the `public/` directory. It will automatically play on the final slide (Slide 12).
