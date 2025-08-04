# 🚀 Deployment Guide

FOR OTHER TEAM MEMBERS --
(MANSI UPRETI)

## 📋 Prerequisites

- Node.js installed (v14 or higher)
- Git repository set up
- Firebase project configured
- Build tested locally (`npm run build`)

## 🌐 Netlify Deployment

### Option 1: Drag & Drop (Quick)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag the `build` folder to the deploy area
   - Your site will be live instantly!

### Option 2: Git Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

3. **Configure Environment Variables** (if using Firebase)
   - Go to Site settings > Environment variables
   - Add your Firebase config variables

## ⚡ Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Set build settings automatically
   - Deploy!

### Git Integration with Vercel

1. **Connect GitHub repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect React settings

2. **Automatic deployments**
   - Every push to main branch triggers deployment
   - Preview deployments for pull requests

## 🔥 Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Configure hosting**
   - Select your project
   - Set public directory: `build`
   - Configure as single-page app: `Yes`
   - Don't overwrite index.html: `No`

5. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🐳 Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:16-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**
   ```nginx
   server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **Build and run**
   ```bash
   docker build -t intern-dashboard .
   docker run -p 80:80 intern-dashboard
   ```

## 🔧 Environment Variables

### For Production

Create a `.env.production` file:

```env
REACT_APP_FIREBASE_API_KEY=your-production-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### Platform-Specific Setup

#### Netlify
- Go to Site settings > Environment variables
- Add each variable from `.env.production`

#### Vercel
- Go to Project settings > Environment variables
- Add each variable from `.env.production`

#### Firebase Hosting
- Use Firebase Functions for environment variables
- Or set them in the build process

## 🔒 Security Considerations

### Firebase Rules

Update your Firebase Realtime Database rules:

```json
{
  "rules": {
    "interns": {
      ".read": true,
      ".write": false
    }
  }
}
```

### CORS Configuration

If you encounter CORS issues:

1. **For Firebase Hosting**
   - Add CORS headers in `firebase.json`:
   ```json
   {
     "hosting": {
       "headers": [
         {
           "source": "**",
           "headers": [
             {
               "key": "Access-Control-Allow-Origin",
               "value": "*"
             }
           ]
         }
       ]
     }
   }
   ```

2. **For Netlify**
   - Create `_headers` file in `public` folder:
   ```
   /*
     Access-Control-Allow-Origin: *
   ```

## 📱 PWA Configuration

To make your app a Progressive Web App:

1. **Update manifest.json**
   ```json
   {
     "short_name": "Intern Dashboard",
     "name": "Intern Fundraising Dashboard",
     "icons": [
       {
         "src": "favicon.ico",
         "sizes": "64x64 32x32 24x24 16x16",
         "type": "image/x-icon"
       }
     ],
     "start_url": ".",
     "display": "standalone",
     "theme_color": "#667eea",
     "background_color": "#ffffff"
   }
   ```

2. **Register service worker**
   - Uncomment service worker registration in `src/index.js`
   - Create `src/serviceWorker.js` if needed

## 🔍 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify Firebase connection works
- [ ] Test responsive design on mobile
- [ ] Check all links and navigation
- [ ] Verify authentication flow
- [ ] Test leaderboard functionality
- [ ] Check console for errors
- [ ] Test on different browsers
- [ ] Verify environment variables are set
- [ ] Check loading states and error handling

## 🚨 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Firebase Connection Issues
- Verify API keys are correct
- Check Firebase project settings
- Ensure Realtime Database is enabled
- Verify database rules allow read access

### Routing Issues
- Ensure all routes redirect to `/index.html`
- Check for 404 errors on page refresh
- Verify React Router is configured correctly

### Performance Issues
- Enable gzip compression
- Optimize images
- Use CDN for static assets
- Enable caching headers

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Test with a fresh build
4. Check Firebase console for database issues
5. Review deployment platform logs

---

**Happy Deploying! 🎉** 
