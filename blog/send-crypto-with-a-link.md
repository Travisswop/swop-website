---
title: "Send Crypto With a Link: No Wallet Address Needed"
url: https://www.swopme.co/blog/send-crypto-with-a-link
description: "You can send crypto to someone with a shareable link instead of a wallet address — they claim it into their own wallet when they open it. Here's how it works."
published: 2026-09-14
updated: 2026-09-14
---

[Blog](https://www.swopme.co/blog) / Guides

# Send crypto with a link (no wallet address needed)

Fund a link, send it however you already talk to people, and the recipient claims it into their own wallet. Here's the actual mechanism, and what to check before you trust it with real money.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Sep 14, 2026 Updated Sep 14, 2026 6 min read Copy link [X](https://x.com/intent/tweet?text=How%20to%20send%20crypto%20with%20a%20link%20-%20no%20wallet%20address%20needed&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fsend-crypto-with-a-link) [Farcaster](https://warpcast.com/~/compose?text=How%20to%20send%20crypto%20with%20a%20link%20-%20no%20wallet%20address%20needed&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fsend-crypto-with-a-link)

Contents How a claim link actually works Step by step: sending crypto with a link What happens if nobody claims it Treat the link like cash Where Swop fits FAQ

You can send crypto to someone without knowing their wallet address by creating a claim link: you fund the transfer from your wallet, get back a shareable link (or QR code), and send it to the recipient over text, email, or chat. They open it and claim the funds into their own wallet, creating one on the spot if they don't already have one. Nothing reaches its final destination until the link is claimed, which is the whole point — you're sending to a person, not a string of characters.

## How a claim link actually works

Sending crypto the ordinary way means entering the recipient's public address — a long alphanumeric string that most people have never memorized and will happily mistype. A claim-link transfer removes that step by putting the transfer behind a link instead of an address.

Mechanically, the app moves your funds into a pending, claimable state as soon as you create the link — either held at an intermediate address whose spending key is embedded in the link itself, or marked pending against a claim credential the link encodes. Either way, the link is the thing that unlocks the transfer. When the recipient opens it, the app checks whether it's still valid, has them connect an existing wallet or spin up a new one, and then routes the funds to that wallet under their own keys.

The part worth understanding A working, unclaimed claim link functions like a bearer instrument: whoever holds it — or scans the QR code — can claim the funds it represents, the same way holding a gift card code lets you redeem it. Possession of the link is what matters, not who you meant to send it to.

## Step by step: sending crypto with a link

The exact screens differ between apps, but the pattern for a claim-link transfer is consistent:

- **Open your wallet's send flow** and choose the asset and amount, same as any other transfer.
- **Choose "send via link" (or similar)** instead of entering an address.
- **The app generates a unique claim link and QR code** tied to that specific transfer.
- **Share the link** over whatever channel you'd normally use to reach that person — a text, a DM, an email, an AirDrop.
- **The recipient opens the link** on their phone or desktop.
- **They connect an existing wallet, or create a new one** in the same flow if they don't have one yet.
- **The funds land in their wallet**, under keys only they control.

## What happens if nobody claims it

An unclaimed transfer doesn't stay in limbo forever in most apps that offer this — they typically set an expiration window and return the funds to the sender if nobody claims the link in time, so a stale text thread doesn't turn into a permanent loss. The exact window, and whether a sender can cancel a link manually before it expires, varies by app, so it's worth checking your specific wallet's behavior before you rely on it for anything time-sensitive.

## Treat the link like cash

Because the link itself is the claim on the funds, the security model is closer to handing someone a bearer instrument than sending a normal message:

- **Don't post it publicly.** A claim link in a public group chat, forum post, or social media reply can be claimed by anyone who sees it first, not just the person you meant to reach.
- **Send it over a channel you trust.** The same judgment you'd apply to sharing a one-time password applies here — a channel the recipient actually controls, not a shared inbox or a channel prone to interception.
- **Double-check before you send.** Once a link is out, getting it back before someone else claims it may not be possible, depending on whether your app supports cancellation.
- **Confirm the claim landed correctly.** Ask the recipient to confirm the funds arrived in a wallet they actually control, the same way you'd confirm a bank transfer cleared.

## Where Swop fits

Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them — which holds whether you're sending directly to an address or funding a claim link for someone to open later. Transactions on Swop are gas-sponsored — you don't need to hold SOL or ETH to transact — across the four networks Swop runs on: Solana, Ethereum, Base, and Polygon.

Recipients don't need to have used Swop before to claim a link: losing your phone doesn't mean losing your funds on Swop, since you can log in with your email on any phone and your wallet comes back with it — the same account model that lets a first-time recipient claim into a fresh wallet without a seed phrase to lose track of. Swop is available on [iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) and [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp), and as a web app at [swopme.app](https://swopme.app). For app-specific setup and troubleshooting, see [support.swop.id](https://support.swop.id).

## FAQ

### Do I need the recipient's wallet address to send crypto?

No, not with a claim-link transfer. You fund the link from your wallet and share it over text, email, or chat; the recipient claims it into their own wallet when they open it. You only need an address if you're sending the old-fashioned way, directly to one.

### Is sending crypto with a link safe?

It's as safe as the channel you send it over and how carefully you handle the link. Until it's claimed, a working claim link functions like a bearer instrument — whoever opens it first can claim the funds — so treat it the way you'd treat a gift card code, not a casual text.

### What happens if I send the link to the wrong person?

Whoever claims the link first gets the funds, regardless of who you intended. If you haven't sent it yet, double-check the recipient. If you have and it's unclaimed, check your app for a way to cancel or revoke the link before someone else opens it.

### Does the recipient need a crypto wallet already?

Not necessarily. Most claim-link flows let someone without a wallet create one as part of claiming, so the link works for a first-time recipient the same way it does for someone who already holds crypto.

### Do I need SOL or ETH to send a claim link on Swop?

No. Transactions on Swop are gas-sponsored — you don't need to hold SOL or ETH to transact. That applies whether you're sending directly to an address or funding a claim link.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
