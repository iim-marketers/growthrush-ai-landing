"use client";

import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const revealedInputs = new WeakSet<HTMLInputElement>();

/**
 * Payload hardcodes `type="password"` on its password inputs and builds the
 * login and account field configs inline, so there is no config hook to attach
 * a reveal control to. A provider wrapping the panel, working off the DOM, is
 * the only slot that reaches all of them.
 */
export function PasswordReveal({ children }: { children?: React.ReactNode }) {
  const [hosts, setHosts] = useState<HTMLSpanElement[]>([]);

  useEffect(() => {
    const mounted = new Map<HTMLInputElement, HTMLSpanElement>();
    let frame: number | null = null;
    let stopped = false;
    let nextId = 0;

    const sync = () => {
      let changed = false;

      for (const [input, host] of mounted) {
        if (input.isConnected) {
          continue;
        }
        release(input);
        host.remove();
        mounted.delete(input);
        changed = true;
      }

      for (const input of document.querySelectorAll<HTMLInputElement>(
        'input[type="password"]',
      )) {
        if (mounted.has(input) || !input.parentElement) {
          continue;
        }

        // Appended as the last child of the element wrapping the input, which
        // is the one position React's reconciler leaves alone: it only ever
        // inserts and removes the nodes it created itself. The button is then
        // portalled into this span, so React owns everything inside it.
        const host = document.createElement("span");
        host.className = "gr-reveal-host";
        host.dataset.grReveal = String(nextId++);
        input.parentElement.appendChild(host);

        guard(input);
        mounted.set(input, host);
        changed = true;
      }

      if (changed) {
        setHosts(Array.from(mounted.values()));
      }
    };

    const schedule = () => {
      if (frame !== null || stopped) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = null;
        sync();
      });
    };

    sync();

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      stopped = true;
      observer.disconnect();
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
      for (const [input, host] of mounted) {
        release(input);
        host.remove();
      }
      mounted.clear();
    };
  }, []);

  return (
    <>
      {children}
      {hosts.map((host) =>
        createPortal(<RevealButton />, host, host.dataset.grReveal),
      )}
    </>
  );
}

/**
 * Holds a revealed field open against React: for a controlled input,
 * `updateInput` assigns `element.type` on every commit with no diffing against
 * the previous props, and Payload always passes `type="password"`. Swallowing
 * that write rather than re-applying ours afterwards means the type never
 * changes while the user types, so the caret stays where they left it.
 */
function guard(input: HTMLInputElement) {
  const native = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "type",
  );

  if (!native?.get || !native.set) {
    return;
  }

  Object.defineProperty(input, "type", {
    configurable: true,
    enumerable: true,
    get() {
      return native.get!.call(this);
    },
    set(next: string) {
      if (next === "password" && revealedInputs.has(this)) {
        return;
      }
      native.set!.call(this, next);
    },
  });
}

function release(input: HTMLInputElement) {
  revealedInputs.delete(input);
  Reflect.deleteProperty(input, "type");
}

function RevealButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [revealed, setRevealed] = useState(false);

  const toggle = () => {
    const input = ref.current?.parentElement?.parentElement?.querySelector("input");

    if (!input) {
      return;
    }

    const next = !revealed;

    // Update the guard first: hiding has to be allowed through the setter it
    // installed, which only lets "password" past once the input is no longer
    // marked as revealed.
    if (next) {
      revealedInputs.add(input);
    } else {
      revealedInputs.delete(input);
    }

    input.type = next ? "text" : "password";
    setRevealed(next);

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  };

  return (
    <button
      aria-label={revealed ? "Hide password" : "Show password"}
      aria-pressed={revealed}
      className="gr-reveal"
      onClick={toggle}
      ref={ref}
      type="button"
    >
      {revealed ? <EyeOff aria-hidden size={16} /> : <Eye aria-hidden size={16} />}
    </button>
  );
}
