# Breathe - Guided Meditation App

A progressive web app (PWA) for guided meditation with sleep timer functionality and choice of meditation guides.

## Features

- Dark mode UI with clean, minimalist design
- Audio controls for meditation playback
- Sleep timer with various duration options
- Choice between different meditation guides
- Background audio playback on mobile devices
- Progressive Web App (PWA) capabilities for offline use
- Responsive design for all device sizes

## Technology Stack

- React.js
- Material UI (MUI)
- HTML5 Audio API
- PWA / Service Workers

## Development

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start development server
npm start
```

The app will be available at http://localhost:3000.

### Building for Production

```bash
# Create optimized production build
npm run build
```

## Deployment

### Netlify Deployment Settings

Use these settings when deploying to Netlify:

- **Build command:** `npm run build`
- **Publish directory:** `build`
- **Environment variables:** None required

### Post-Build Considerations

- Ensure the site has a proper SSL certificate for service worker functionality
- Test audio playback on various devices after deployment
- Verify PWA installation works correctly on mobile devices

## License

MIT