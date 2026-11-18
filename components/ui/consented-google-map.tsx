"use client";

import { useSyncExternalStore } from "react";

const consentStorageKey = "mairie-google-maps-consent";
type ConsentSnapshot =
  | "accepted"
  | "not-accepted"
  | "session-only"
  | "storage-unavailable";

let sessionConsent = false;
const listeners = new Set<() => void>();

function getConsentSnapshot(): ConsentSnapshot {
  try {
    if (window.localStorage.getItem(consentStorageKey) === "accepted") {
      return "accepted";
    }
    return sessionConsent ? "session-only" : "not-accepted";
  } catch {
    return sessionConsent ? "session-only" : "storage-unavailable";
  }
}

function getServerSnapshot(): ConsentSnapshot {
  return "not-accepted";
}

function notifyConsentChange() {
  listeners.forEach((listener) => listener());
}

function subscribeToConsent(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === consentStorageKey || event.key === null) {
      notifyConsentChange();
    }
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

type ConsentedGoogleMapProps = {
  title: string;
  src: string;
  className: string;
};

export default function ConsentedGoogleMap({
  title,
  src,
  className,
}: ConsentedGoogleMapProps) {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerSnapshot,
  );
  const isEnabled = consent === "accepted" || consent === "session-only";
  const storageError =
    consent === "session-only" || consent === "storage-unavailable";

  const enableMap = () => {
    try {
      window.localStorage.setItem(consentStorageKey, "accepted");
      sessionConsent = false;
    } catch {
      sessionConsent = true;
    }
    notifyConsentChange();
  };

  if (isEnabled) {
    return (
      <>
        {storageError && (
          <p
            role="status"
            className="mb-2 text-sm leading-relaxed text-stone-600"
          >
            Votre préférence n&apos;a pas pu être mémorisée. La carte ne sera
            activée que pour cette visite.
          </p>
        )}
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className={className}
        />
      </>
    );
  }

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center gap-4 border border-stone-200 bg-stone-50 p-6 text-center ${className}`}
      >
        <p className="max-w-xl text-base leading-relaxed text-stone-700">
          La carte n&apos;est pas chargée. En l&apos;affichant, Google Maps peut
          recevoir des données, notamment votre adresse IP, et utiliser des
          cookies.
        </p>
        <button
          type="button"
          onClick={enableMap}
          className="rounded-sm bg-[#9e5218] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#854311] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e5218]"
        >
          Afficher la carte
        </button>
      </div>
      {storageError && (
        <p role="status" className="mt-2 text-sm leading-relaxed text-stone-600">
          Votre navigateur ne permet pas de mémoriser ce choix. La carte sera
          activée uniquement pour cette visite.
        </p>
      )}
    </>
  );
}
