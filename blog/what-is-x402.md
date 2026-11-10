---
title: "What Is x402? The Payment Protocol for AI Agents"
url: https://www.swopme.co/blog/what-is-x402
description: "x402 is an open protocol that lets software pay for API access over HTTP using stablecoins — no accounts, API keys, or credit cards. Here's how it works."
published: 2026-09-02
updated: 2026-09-02
---

[Blog](https://www.swopme.co/blog) / Guides

# What is x402? The payment protocol for AI agents

A status code from 1997 that nobody used, repurposed to let software pay for an API call in a single HTTP round trip. Here's the mechanism — and where Swop already runs it in production.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Sep 2, 2026 Updated Sep 2, 2026 6 min read Copy link [X](https://x.com/intent/tweet?text=What%20is%20x402%3F%20The%20payment%20protocol%20for%20AI%20agents&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fwhat-is-x402) [Farcaster](https://warpcast.com/~/compose?text=What%20is%20x402%3F%20The%20payment%20protocol%20for%20AI%20agents&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fwhat-is-x402)

Contents What x402 actually is How the payment flow works Why this matters for AI agents Where it's live, and what it doesn't solve Where Swop fits FAQ

x402 is an open payment protocol that lets a piece of software — an AI agent, a script, or another server — pay for access to an API or a piece of content directly over HTTP, using the dormant "402 Payment Required" status code instead of a login, an API key, or a stored credit card. A server that wants payment responds to a request with 402 and a machine-readable description of what it costs; the client signs a stablecoin payment authorization and retries the request, and a third party called a facilitator verifies and settles it on-chain before the server hands back the resource. Coinbase released x402 in May 2025, and it's since moved to open, multi-party governance under the x402 Foundation.

## What x402 actually is

HTTP has had a "402 Payment Required" status code since the original HTTP/1.1 specification in the late 1990s. It was explicitly reserved "for future use" and then never actually used — every browser and server treats a paywall the way it always has, with a redirect to a signup page or a 403 Forbidden. x402 is the protocol that finally does something with that reserved code: instead of blocking a request outright, a server can respond 402 and say, in a structured way, exactly what it costs to get the resource, in what asset, on what network, and to which address.

That matters because a paywall built for humans assumes a human is there to see it — to read a pricing page, enter a card number, and wait for a receipt. Software making thousands of API calls a day has no interface for that. x402 turns "pay to continue" into something a program can parse and act on in the same request cycle that hit the paywall in the first place, without a separate account or subscription being provisioned in advance.

## How the payment flow works

The exchange runs in four steps, all within ordinary HTTP:

- **Request.** The client asks for a resource — an API endpoint, a dataset, a piece of content — exactly as it would with no payment involved.
- **402 response.** If the resource is paid, the server responds with a 402 status and payment requirements: the price, the accepted asset (typically a stablecoin like USDC), and the chain and address to pay it on.
- **Signed retry.** The client constructs a payment authorization — on EVM chains this is built on the [EIP-3009 "transferWithAuthorization"](https://eips.ethereum.org/EIPS/eip-3009) standard — signs it locally, and retries the original request with the signed payload attached as a header.
- **Verification and settlement.** A facilitator checks the signature, confirms the payer has sufficient balance, and guards against the payload being replayed, then submits the transaction on-chain. Once it settles, the server returns the resource the client originally asked for.

What a facilitator can't do A facilitator exists to spare a resource server from running blockchain infrastructure directly — it verifies and broadcasts, and in most implementations it also covers the network gas fee. It cannot redirect the payment to a different address or change the amount; those are fixed by the client's signature before the facilitator ever sees the payload.

## Why this matters for AI agents

An AI agent that reads market data, calls a research API, or pulls from a paid dataset needs a way to pay per request without a person filling out a checkout form for every call. Subscriptions and provisioned API keys work when a human sets them up ahead of time for a known set of services, but they break down for an agent that discovers a new resource mid-task and needs to pay for exactly one call to it. x402 collapses "discover the price, agree to it, and pay" into the same HTTP exchange that would otherwise have just failed with an error, which is what makes it a fit for machine-to-machine commerce specifically rather than a general checkout replacement.

## Where it's live, and what it doesn't solve

x402 shipped as a [Coinbase project in May 2025](https://www.coinbase.com/developer-platform/discover/launches/x402) and was [handed to independent governance](https://www.linuxfoundation.org/press/linux-foundation-announces-operational-launch-of-x402-foundation-to-standardize-internet-native-payments-for-ai-agents-and-applications) under the x402 Foundation, operating within the Linux Foundation — a deliberate move away from single-company control of the spec. At the foundation's operational launch on July 14, 2026, 40 organizations had joined, with AWS, Cloudflare, Coinbase, Google, Mastercard, Shopify, Solana Foundation, Stripe, and Visa among the premier members. Working implementations you can point at today include [Cloudflare's Agents SDK and MCP servers](https://blog.cloudflare.com/x402/), Stripe's Machine Payments preview, x402 support at the edge in AWS CloudFront and WAF, and [CoinGecko's paid data endpoints](https://docs.coingecko.com/ai-integration/x402), which charge a flat $0.01 in USDC per API call with no account or key.

x402 solves the payment plumbing — proving a specific payment happened for a specific request, without an account. It does not decide what an agent should buy, verify that the resource matches what was advertised, or provide any dispute process once a payment settles; those remain problems for whatever is built on top of it.

## Where Swop fits

Swop implements x402 where it makes sense: commerce. Every SmartSite is an x402 storefront — any product a user adds is automatically payable by AI agents in USDC over the x402 protocol, with payout going directly on-chain to the seller. An agent that discovers a product on a swop.id page can complete the purchase in the same HTTP flow described above, no account or checkout form involved.

Swop's AI trading agent is the deliberate opposite end of the autonomy spectrum: [Swop's agent proposes; you approve. Nothing signs without a tap, and the agent never holds keys.](https://www.swopme.co/blog/agentic-trading-is-live) Full machine autonomy is the right design for buying a product or a $0.01 API call, and the wrong one for a trade that moves your position. Swop ships both, on the side of the transaction where each belongs. You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today, and Swop runs on Solana, Ethereum, Base, and Polygon, on [iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322), [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp), and the web at [swopme.app](https://swopme.app).

## FAQ

### What does the "402" in x402 mean?

402 is an HTTP status code — Payment Required — that was reserved in the original HTTP/1.1 specification but never standardized or used in practice. x402 is the name of the protocol that finally puts that status code to work: a server returns 402 to say a resource requires payment before it will respond, instead of the request just failing or requiring a manual account setup.

### Do I need an account or API key to use x402?

No — that's the specific problem x402 is designed to remove. A client (typically an AI agent or another piece of software) constructs and signs a stablecoin payment authorization on the fly and attaches it to the retried request. There's no signup form, stored credit card, or provisioned API key involved in the payment step itself.

### What currency does x402 use, and on which blockchain?

x402 payments are typically made in a stablecoin such as USDC. Coinbase's original implementation launched on Base, but x402 is chain-agnostic by design, and other networks — including Solana — have since shipped support. The specific chain and asset a given resource accepts are stated in that server's 402 response, not fixed by the protocol.

### Who created x402, and who maintains it now?

Coinbase released x402 as an open, permissionless protocol in May 2025. It's since moved to independent, multi-party governance under the x402 Foundation, operating within the Linux Foundation, so no single company controls the spec going forward.

### Does Swop use x402?

Yes — on the commerce side. Every SmartSite is an x402 storefront: any product a user adds is automatically payable by AI agents in USDC over the x402 protocol, with payout going directly on-chain to the seller. Swop's AI trading agent is the deliberate opposite: it proposes; you approve. Nothing signs without a tap, and the agent never holds keys — selling to autonomous buyers, while keeping a human in the loop when it's your own money moving.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
