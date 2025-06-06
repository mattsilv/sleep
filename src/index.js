import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: registration => {
    // Force refresh when new content is available
    const waitingServiceWorker = registration.waiting;
    
    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener("statechange", event => {
        if (event.target.state === "activated") {
          window.location.reload();
        }
      });
      
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    }
  }
});

// Listen for version update messages from service worker
navigator.serviceWorker.addEventListener('message', event => {
  if (event.data && event.data.type === 'NEW_VERSION_AVAILABLE') {
    // Force a hard refresh to get the latest content
    window.location.reload(true);
  }
});