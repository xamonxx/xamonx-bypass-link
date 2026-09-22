import { launchBrowser } from "./browser";
import { isKnownHost } from "./shared/hosts";

export { SUPPORTED_HOSTS, isSupportedUrl } from "./shared/hosts";

const POLL_INTERVAL_MS = 250;
// The real gates are multi-step (e.g. sfl.gl bounces through two
// khaddavi.net "wait" pages, each with its own ~10s countdown, before
// reaching sfl.gl/ready/go), so 30s isn't always enough headroom.
const TIMEOUT_MS = 60_000;

/**
 * Runs the same auto-click sequence as hollow.node's main.user.js
 * (https://github.com/0xf1c40f/hollow.node/blob/main/src/main.user.js),
 * server-side via Puppeteer, and resolves once the page navigates to a
 * host outside the known shortlink domains.
 */
export async function runBypass(startUrl: string): Promise<string> {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();

    // Port of the userscript's window.open no-op + timer-speedup trick,
    // re-injected automatically on every new document/navigation.
    await page.evaluateOnNewDocument(() => {
      window.open = () => null;
      const nativeTimeout = window.setTimeout;
      const nativeInterval = window.setInterval;
      window.setTimeout = ((fn: TimerHandler, ms?: number, ...rest: unknown[]) =>
        nativeTimeout(fn, (ms ?? 0) / 1e7, ...rest)) as typeof window.setTimeout;
      window.setInterval = ((fn: TimerHandler, ms?: number, ...rest: unknown[]) =>
        nativeInterval(fn, (ms ?? 0) / 1e7, ...rest)) as typeof window.setInterval;
    });

    await page.goto(startUrl, { waitUntil: "domcontentloaded" });

    const deadline = Date.now() + TIMEOUT_MS;

    while (Date.now() < deadline) {
      try {
        await page.evaluate(() => {
          const clickIfVisible = (selector: string, skipText?: string) => {
            const el = document.querySelector<HTMLElement>(selector);
            if (!el || el.offsetParent === null) return;
            if (skipText && el.textContent?.trim() === skipText) return;
            el.click();
          };

          clickIfVisible("#submit-button");
          clickIfVisible("#btn-2");
          clickIfVisible("#verify > a", "Scroll Down");
          clickIfVisible("#verify > button");
          clickIfVisible("#first_open_button_page_1");
          clickIfVisible("#second_open_placeholder a");
          clickIfVisible("#second_open_placeholder button");
          clickIfVisible("#btn-3");

          if (location.href.includes("sfl.gl/ready/go")) {
            const openLink = Array.from(
              document.querySelectorAll<HTMLElement>("span.font-medium.text-base")
            ).find((n) => n.textContent?.trim() === "OPEN LINK");
            openLink?.click();
          }
        });
      } catch {
        // Execution context gets destroyed mid-navigation; ignore and retry next tick.
      }

      let currentUrl: URL;
      try {
        currentUrl = new URL(page.url());
      } catch {
        await sleep(POLL_INTERVAL_MS);
        continue;
      }

      if (
        (currentUrl.protocol === "http:" || currentUrl.protocol === "https:") &&
        !isKnownHost(currentUrl.hostname)
      ) {
        return currentUrl.toString();
      }

      await sleep(POLL_INTERVAL_MS);
    }

    throw new Error(
      "Timeout: gagal mencapai link tujuan dalam 60 detik. Situs mungkin mengubah struktur halamannya."
    );
  } finally {
    await browser.close();
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
