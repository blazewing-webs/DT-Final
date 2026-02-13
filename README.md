# Dravida Thalaimurai - Web App

## Deployment to GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Steps to Enable Deployment:

1.  **Push the code** to your GitHub repository:
    ```bash
    git add .
    git commit -m "feat: configure github pages deployment"
    git push
    ```

2.  **Go to GitHub Repository Settings**:
    - Navigate to your repository on GitHub.
    - Click on **Settings** > **Pages** (in the sidebar).

3.  **Change Source to GitHub Actions**:
    - Under **Build and deployment** > **Source**, select **GitHub Actions** from the dropdown menu.
    - (The default is usually "Deploy from a branch", change it to "GitHub Actions").

4.  **Wait for Workflow**:
    - Go to the **Actions** tab in your repository.
    - You should see a workflow named "Deploy Next.js site to Pages" running.
    - Once it completes (green checkmark), your site will be live.

5.  **Visit your Site**:
    - The URL will be: `https://diravidathalaimurai.com/`

### Important Note on Images
- Since we are using a custom domain at the root, we removed `basePath` from `next.config.js`.
- All images in the `public` folder are referenced correctly using `next/image` or relative paths (e.g., `/image.png`).
