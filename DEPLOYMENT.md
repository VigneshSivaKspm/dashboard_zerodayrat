# 🚀 Deployment Guide - Enterprise MDM Dashboard

## 📋 Pre-Deployment Checklist

### ✅ Required Steps
- [ ] Review all environment variables
- [ ] Configure Firebase (if using)
- [ ] Test build locally
- [ ] Verify all routes work
- [ ] Check responsive design
- [ ] Test authentication flow
- [ ] Verify data exports work
- [ ] Review security settings

### ✅ Optional Steps
- [ ] Set up analytics
- [ ] Configure CDN
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Set up CI/CD pipeline
- [ ] Performance testing
- [ ] Security audit

## 🔧 Environment Configuration

### Create `.env` file (if needed):

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain

# Optional: API Endpoints
VITE_API_URL=https://api.yourmdm.com

# Optional: Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_EXPORT=true
```

## 🏗️ Build Process

### Local Build Test

```bash
# Install dependencies
npm install

# Run development server (test)
npm run dev

# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Build Output

The build creates a `/dist` folder containing:
```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
├── index.html
└── [other files]
```

### Build Size (Approximate)
- **Total Size**: ~500-800 KB (gzipped)
- **Initial Load**: ~200-300 KB
- **Lazy Loaded**: Remaining assets

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Instant deployments
- Free tier available

**Steps:**
1. Push code to GitHub
2. Import project in Vercel
3. Connect repository
4. Configure environment variables
5. Deploy

**Command Line:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**vercel.json** (optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Option 2: Netlify

**Steps:**
1. Push code to GitHub
2. New site from Git in Netlify
3. Select repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variables
6. Deploy

**netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Firebase Hosting

**Steps:**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Build the app
npm run build

# Deploy
firebase deploy --only hosting
```

**firebase.json**:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Option 4: AWS S3 + CloudFront

**Steps:**
1. Build the app: `npm run build`
2. Create S3 bucket
3. Enable static website hosting
4. Upload `/dist` contents to S3
5. Create CloudFront distribution
6. Point to S3 bucket
7. Configure custom domain (optional)

**Bucket Policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### Option 5: Traditional Web Server

**Steps:**
1. Build the app: `npm run build`
2. Upload `/dist` contents to server
3. Configure web server

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/mdm-dashboard/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

**Apache Configuration** (.htaccess):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 🔒 Security Configuration

### HTTPS Setup
Always use HTTPS in production:
- Vercel/Netlify: Automatic
- Firebase: Automatic
- AWS: Configure in CloudFront
- Traditional: Use Let's Encrypt

### Security Headers

Add these headers in your hosting configuration:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Firebase Security Rules

If using Firebase Realtime Database:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "devices": {
      "$deviceId": {
        ".validate": "newData.hasChildren(['label', 'model', 'status'])"
      }
    }
  }
}
```

## 📊 Monitoring & Analytics

### Add Google Analytics (Optional)

1. Create GA4 property
2. Add tracking code to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Consider adding:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Datadog** - Performance monitoring

## 🚦 Performance Optimization

### Enable Compression
- Gzip: Reduce file sizes by ~70%
- Brotli: Even better compression

### CDN Configuration
- Cloudflare (recommended)
- AWS CloudFront
- Fastly

### Caching Strategy
```
HTML: no-cache (always validate)
CSS/JS: 1 year (versioned/hashed)
Images: 1 year
Fonts: 1 year
```

### Performance Headers
```
Cache-Control: public, max-age=31536000, immutable  # For hashed assets
Cache-Control: no-cache  # For HTML
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests (if available)
      run: npm test
      
    - name: Build
      run: npm run build
      env:
        VITE_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
        VITE_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🌍 Custom Domain Setup

### DNS Configuration

Add these DNS records:
```
Type: A
Name: @
Value: [Hosting Provider IP]

Type: CNAME
Name: www
Value: [Hosting Provider Domain]
```

### SSL Certificate
Most hosting providers (Vercel, Netlify, Firebase) provide automatic SSL.

For custom: Use Let's Encrypt

## 📱 Mobile App Configuration

If deploying as PWA, add `manifest.json`:

```json
{
  "name": "MDM Dashboard",
  "short_name": "MDM",
  "description": "Enterprise Mobile Device Management Dashboard",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#020617",
  "theme_color": "#4f46e5",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🧪 Post-Deployment Testing

### Checklist
- [ ] Test all pages load correctly
- [ ] Test authentication flow
- [ ] Test device management features
- [ ] Test data logs functionality
- [ ] Test media manager
- [ ] Test analytics and charts
- [ ] Test settings updates
- [ ] Test mobile responsiveness
- [ ] Test on multiple browsers
- [ ] Test HTTPS is working
- [ ] Test 404 page
- [ ] Test performance (Lighthouse)

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 90

## 📈 Scaling Considerations

### For High Traffic
- Enable CDN caching
- Use load balancer
- Implement rate limiting
- Add Redis cache
- Database indexing
- Image optimization

### For Large Fleets
- Implement pagination
- Virtual scrolling
- Lazy loading
- Data aggregation
- Background jobs
- Queue system

## 🆘 Troubleshooting

### Common Issues

**Issue**: Routes not working (404 on refresh)  
**Solution**: Configure server to redirect all routes to index.html

**Issue**: Environment variables not loading  
**Solution**: Ensure variables start with `VITE_` prefix

**Issue**: Build fails  
**Solution**: Clear cache (`rm -rf node_modules dist`), reinstall

**Issue**: Slow performance  
**Solution**: Enable compression, CDN, and caching

**Issue**: Firebase connection fails  
**Solution**: Verify API keys and security rules

## 📞 Support & Maintenance

### Regular Maintenance
- Update dependencies monthly
- Review security advisories
- Monitor error logs
- Check performance metrics
- Backup data regularly
- Review user feedback

### Update Process
```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Test thoroughly
npm run dev

# Deploy
npm run build && [deploy command]
```

## 🎯 Success Criteria

✅ Application loads in < 3 seconds  
✅ All features working correctly  
✅ HTTPS enabled  
✅ Mobile responsive  
✅ No console errors  
✅ Analytics tracking (if enabled)  
✅ Error monitoring active  
✅ Backups configured  

---

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deploying)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

**Deployment Status**: Ready for Production 🚀  
**Estimated Deployment Time**: 10-30 minutes  
**Difficulty**: ⭐⭐ Intermediate

**Good luck with your deployment!** 🎉
