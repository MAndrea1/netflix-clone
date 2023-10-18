'use client'
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

type Outcome = {
  outcome: string,
  platform: string
}

const InstallApp = () => {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent  | null>(null)
  const [isInstalled, setIsInstalled] = useState(true);
  const [installationAccepted, setInstallationAccepted] = useState(false)

  useEffect(() => {
    // check if the app is being seen from minimal-ui -meaning the user has installed it-

    if (!window.matchMedia('(display-mode: minimal-ui)').matches && !installationAccepted) {
      // console.log('(display-mode: not minimal-ui)')
      setIsInstalled(false)
    } else {
      // console.log('(display-mode: minimal-ui)')
    }

    const beforeInstallPromptHandler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      // This variable will save the event for later use.
      setInstallEvent(e as BeforeInstallPromptEvent);
    };     

    // This won't fire in dev mode, but it does in prod (run start, after having run build)
    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler as any);  

    // To trigger the event manually from console:
    // const event = new Event('beforeinstallprompt');
    // window.dispatchEvent(event);

    return() => {
      // If we unmount this component, the listeners won't be automatically removed. We should remove them explicitly to avoid unexpected behavior.
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler as any);
    }
  }, [isInstalled])

  const handleInstallClick = async () => {
    console.log("installing...")
    const result = await installEvent?.prompt();
    // console.log(`Install prompt was: ${result}`);
    // console.log(result);
    if (result && (result as Outcome).outcome === "accepted") {
      setInstallationAccepted(true);
      setIsInstalled(true)
    }
  };    

  return (<>
        {!isInstalled ? <li className="headerLink bg-red-700 py-1 px-2 rounded hover:text-white hover:bg-red-600"><button onClick={handleInstallClick}>Install App</button></li> : ""}
    </>
  )
}

export default InstallApp