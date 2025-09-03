# Content Security Policy (CSP) Troubleshooting Guide

## Issue: Blob URL Images Blocked

### Problem
When uploading images to blog posts, you get this error:
```
Refused to load the image 'blob:https://trazor.cloud/59c8cdf0-bb8a-484c-a54a-0a4ca79eff2c' 
because it violates the following Content Security Policy directive: "img-src 'self' data: https:"
```

### Root Cause
The Content Security Policy (CSP) header in nginx was blocking `blob:` URLs, which are used when:
- Images are uploaded via file input
- Images are displayed as previews before being saved to server
- Images are processed in the browser before upload

### Solution Applied
Updated the CSP header in `nginx/conf.d/trazor.cloud.conf`:

**Before:**
```nginx
img-src 'self' data: https:
```

**After:**
```nginx
img-src 'self' data: blob: https:
```

### How to Apply Changes
```bash
# Restart nginx to apply CSP changes
docker-compose restart nginx

# Or restart all services
docker-compose restart
```

## CSP Directive Reference

### Common Image Sources
- `'self'` - Same origin
- `data:` - Data URLs (base64 encoded images)
- `blob:` - Blob URLs (file uploads/previews)
- `https:` - HTTPS URLs
- `http:` - HTTP URLs (not recommended for production)

### Complete CSP Example
```nginx
add_header Content-Security-Policy "
  default-src 'self'; 
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' data: blob: https:; 
  font-src 'self'; 
  connect-src 'self' https://trazor.cloud https://www.google-analytics.com; 
  frame-src 'none';
" always;
```

## Testing CSP

### Browser Developer Tools
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for CSP violation messages
4. Check Network tab for blocked requests

### Common CSP Violations
- **Images**: Missing `blob:` or `data:` in `img-src`
- **Scripts**: Missing domains in `script-src`
- **Styles**: Missing `'unsafe-inline'` in `style-src`
- **Fonts**: Missing domains in `font-src`

## Security Considerations

### Blob URLs
- **Security**: Blob URLs are temporary and scoped to the current page
- **Lifetime**: Automatically cleaned up when page unloads
- **Risk**: Low - they can't be accessed from other origins

### Best Practices
1. **Minimal Permissions**: Only allow necessary sources
2. **HTTPS Only**: Use `https:` instead of `http:` in production
3. **Regular Review**: Monitor CSP violations and adjust as needed
4. **Testing**: Test file uploads and image previews thoroughly

## Troubleshooting Steps

### 1. Check Current CSP
```bash
# View nginx configuration
docker-compose exec nginx cat /etc/nginx/conf.d/trazor.cloud.conf
```

### 2. Test Image Upload
1. Go to admin panel
2. Create/edit a blog post
3. Upload an image
4. Check if preview displays correctly

### 3. Monitor CSP Violations
```bash
# View nginx logs
docker-compose logs nginx

# View browser console for CSP errors
```

### 4. Update CSP if Needed
```bash
# Edit nginx configuration
nano nginx/conf.d/trazor.cloud.conf

# Restart nginx
docker-compose restart nginx
```

## Additional Resources

- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Validator](https://csp-evaluator.withgoogle.com/)
- [CSP Level 3 Specification](https://www.w3.org/TR/CSP3/)
