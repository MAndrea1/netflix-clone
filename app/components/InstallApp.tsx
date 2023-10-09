import { useState, useEffect } from 'react'

// Seems BeforeInstallPromptEvent is not a valid type for TypeScript yet,
// so it must be added manually, either as an interface or as a type:

// interface BeforeInstallPromptEvent extends Event {
//   readonly platforms: Array<string>;
//   readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
//   prompt(): Promise<void>;
// }
type BeforeInstallPromptEvent = Event & {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
  prompt(): Promise<void>;
}

const InstallApp = () => {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent  | null>(null)
  const [isInstalled, setIsInstalled] = useState(false);

  // Adding an eventListener to capture the prompt to install the PWA.
  // Adding this behavior in the useEffect didn't work, probably because by the time it is fired
  // the browser still didn't detect the website is a PWA.
  // So we add this outside the useEffect, but make sure to remove it when the component unmounts.
  const beforeInstallPromptHandler = (e: Event) => {
    e.preventDefault();
    // This variable will save the event for later use.
    setInstallEvent(e as BeforeInstallPromptEvent);
  }; 
  window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

  // To trigger the event manually from console:
  // const event = new Event('beforeinstallprompt');
  // window.dispatchEvent(event);

  useEffect(() => {
    // check if the app is being seen from minimal-ui -meaning the user has installed it-
    if (window.matchMedia('(display-mode: minimal-ui)').matches) {
      setIsInstalled(true)
    }  

    return() => {
      // If we unmount this component, the listeners won't be automatically removed. We should remove them explicitly to avoid unexpected behavior.
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    }
  }, [isInstalled])

  const handleInstallClick = () => {
    installEvent?.prompt();
    setIsInstalled(true);    
  };    

  return (<>
        {!isInstalled ? <li className="headerLink bg-red-700 py-1 px-2 rounded hover:text-white hover:bg-red-600"><button onClick={handleInstallClick}>Install App</button></li> : ""}
    </>
  )
}

export default InstallApp