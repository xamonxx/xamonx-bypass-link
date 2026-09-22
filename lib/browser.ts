import { Resolver } from "node:dns/promises";
import type { Browser } from "puppeteer-core";

// Shortlink ad-gates (the sites this tool bypasses) typically only show their
// "verify/continue" button after an ad script loads. Local ad-blocking (a
// hosts file, Pi-hole, AdGuard Home, etc. on the machine running this) can
// silently sinkhole those domains, which means the button never renders and
// the bypass looks like it "hangs" even though nothing is wrong with the
// click logic. We resolve these specific domains via a real DNS query
// (bypassing the OS hosts file/resolver) and hand Chrome the real IPs, so
// the gate script can load the same way it would for a normal visitor.
const AD_SCRIPT_HOSTS = [
  "pagead2.googlesyndication.com",
  "googleads.g.doubleclick.net",
  "pubads.g.doubleclick.net",
  "securepubads.g.doubleclick.net",
  "adclick.g.doubleclick.net",
  "googleadservices.com",
  "www.googletagservices.com",
];

async function buildAdHostResolverRules(): Promise<string> {
  const resolver = new Resolver();
  resolver.setServers(["8.8.8.8", "1.1.1.1"]);

  const rules = await Promise.all(
    AD_SCRIPT_HOSTS.map(async (host) => {
      try {
        const [ip] = await resolver.resolve4(host);
        return ip ? `MAP ${host} ${ip}` : null;
      } catch {
        return null;
      }
    })
  );

  return rules.filter((rule): rule is string => rule !== null).join(",");
}

// Vercel (and most serverless/Lambda-style hosts) never has a system Chrome
// installed, and there's no room to ship the ~300MB+ browser full `puppeteer`
// downloads for local dev — @sparticuz/chromium ships a Chromium build sized
// and configured (via its own recommended `args`) for that constrained,
// read-only filesystem instead.
const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

export async function launchBrowser(): Promise<Browser> {
  const hostResolverRules = await buildAdHostResolverRules();

  const extraArgs = ["--disable-dev-shm-usage"];
  if (hostResolverRules) {
    extraArgs.push(`--host-resolver-rules=${hostResolverRules}`);
  }

  if (IS_SERVERLESS) {
    const [{ default: puppeteer }, { default: chromium }] = await Promise.all([
      import("puppeteer-core"),
      import("@sparticuz/chromium"),
    ]);

    return puppeteer.launch({
      headless: true,
      args: [...chromium.args, ...extraArgs],
      executablePath: await chromium.executablePath(),
    });
  }

  // Local dev: full `puppeteer` already bundles a matching Chrome build.
  const { default: puppeteer } = await import("puppeteer");
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", ...extraArgs],
  }) as unknown as Promise<Browser>;
}
