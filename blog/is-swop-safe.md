---
title: "Is Swop Safe? How Self-Custody and Signing Work"
url: https://www.swopme.co/blog/is-swop-safe
description: "You control your Swop wallet: nothing moves without your approval, you can export your private key, and its AI agent can propose trades but never sign for you."
published: 2026-09-01
updated: 2026-09-01
---

[Blog](https://www.swopme.co/blog) / Guides

# Is Swop safe? How self-custody and signing work

"Safe" means something specific for a self-custodial wallet with an AI agent attached. Here's who holds the keys, what requires your signature, and what Swop's agent can and can't do without you.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Sep 1, 2026 Updated Sep 1, 2026 6 min read Copy link [X](https://x.com/intent/tweet?text=Is%20Swop%20safe%3F%20How%20self-custody%20and%20signing%20actually%20work&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fis-swop-safe) [Farcaster](https://warpcast.com/~/compose?text=Is%20Swop%20safe%3F%20How%20self-custody%20and%20signing%20actually%20work&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fis-swop-safe)

Contents What "safe" means here Who holds the keys Nothing moves without your tap The AI agent's confirmation model What to verify yourself FAQ

Swop is safe in the specific ways that matter for a wallet you control: nothing moves without your approval, you can export your private key, Swop never holds your keys, and Swop's AI trading agent can propose trades but cannot sign or move funds on its own. That doesn't make it risk-free — your login is part of your security, and no wallet, Swop included, can undo a transaction you approved by mistake.

## What "safe" means here

"Is this wallet safe" usually bundles together three different questions, and it's worth separating them before answering any of them. First: can the company behind the wallet lose or misuse your funds, the way an exchange can? Second: can a transaction move your money without your explicit approval? Third, if the wallet has any automation or AI feature, can that automation act on its own? A wallet can score well on one of these and poorly on another, so "is it safe" only means something once you know which question you're asking.

This post answers all three for Swop, in order, and points to where you can check each claim yourself rather than take our word for it.

## Who holds the keys

You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today. That answers the first question above: your funds are not a balance sitting in a Swop-controlled account, because Swop never holds your keys. Swop runs on Solana, Ethereum, Base, and Polygon, and the same model applies across all four.

The tradeoff is not the one a seed-phrase wallet makes. Login and wallets run on a partner, Privy, so using the app depends on that service, and your login is part of your security — protect the email behind it with a strong second factor. The way out is always open: export your private key and you can open your assets in any wallet you choose.

## Nothing moves without your tap

The second question — can a transaction move money without your approval — comes down to the signing step. On every chain Swop supports, a transaction only becomes valid once it's signed with the private key controlling the account, and that signing happens when you approve it. An interface can show you whatever it wants; nothing actually moves until that signature exists.

That's also true for transactions Swop sponsors the gas on. Transactions on Swop are gas-sponsored — you don't need to hold SOL or ETH to transact — but gas sponsorship only changes who pays the network fee, not who authorizes the transaction. Signing and paying are separate steps, and Swop's sponsorship only ever touches the second one.

## The AI agent's confirmation model

The third question is the one people ask most often once a wallet ships an AI feature: can it trade for you without asking? On Swop, the answer is the same across manual and agent-initiated actions. Swop's agent proposes; you approve. Nothing signs without a tap, and the agent never holds keys. A trade proposal from the agent goes through the identical signature gate described above — it just arrives with the agent's reasoning attached instead of your own. [We covered that confirmation model in more depth when agentic trading shipped.](https://www.swopme.co/blog/agentic-trading-is-live)

Since then, agent-initiated transactions have picked up an additional layer. Swop's Goldman trading agent runs under an ERC-8196-inspired policy layer: each vault carries a versioned policy, expanding a policy's authority requires the owner's EIP-712 signature, and every enforcement decision is written to a per-vault hash-chained audit log. In plain terms: the agent operates inside limits you set, widening those limits needs your cryptographic sign-off, and every decision the policy layer makes is logged in a way that can't be quietly edited afterward.

What the policy layer doesn't do Risk-reducing actions — exits, cancels, and withdrawals back to the owner — are never blocked by the policy layer. The owner can always get out. A policy can restrict what the agent opens; it cannot trap you inside a position.

It's worth being precise about what this guarantees and what it doesn't. Enforcement happens at Swop's backend signing seam — the point every agent transaction must pass to be signed — and the audit chain makes any violation provable. It is not an on-chain guarantee. That's an honest tradeoff, not a marketing gap: the policy layer shipped Aug 28, 2026 and is running in shadow (observe-and-log) mode while it soaks, with enforcement mode following once that data confirms the rules behave as intended.

## What to verify yourself

Don't take a wallet's own safety claims at face value — verify what you can independently. Swop is available on [iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) and [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp), and as a web app at [swopme.app](https://swopme.app); Swop is rated 5.0 out of 5 on the [iOS App Store](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322), which you can check directly on the listing. For deeper technical questions — key storage specifics or backup and recovery flows — the authoritative source is [Swop's support documentation](https://support.swop.id), not this post; docs get updated more often than a blog article should be trusted to track.

The general rule holds for any wallet, not just Swop: "self-custodial" and "audited" and "the AI can't move funds alone" are three separate claims. Check each one on its own terms before deciding a wallet is safe for what you intend to do with it.

## FAQ

### Is Swop custodial or non-custodial?

Non-custodial. You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today. Your funds are never a balance sitting in a Swop-controlled account.

### Can Swop or its team move my funds without me?

No. Nothing moves without your approval, and Swop never holds your keys. You can also export your private key and open your assets in any wallet you choose.

### Does Swop's AI agent trade on its own?

No. Swop's agent proposes; you approve. Nothing signs without a tap, and the agent never holds keys. Agent-initiated transactions additionally run under a policy layer, but the approval step is the same one every manual transaction goes through.

### What happens if I lose my phone?

Losing your phone doesn't mean losing your funds: log in with your email on any phone and your Swop wallet comes back with it. You can also save your private key, which lets you open your assets in any wallet you choose — the key is yours, not Swop's. That said, an exported private key is only as safe as wherever you store it, so treat it like cash.

### Has Swop been audited by a third party?

Swop has not commissioned a third-party security audit to date — we'd rather say that plainly than imply otherwise. What is verifiable today: Swop's agent policy layer writes every enforcement decision to a per-vault hash-chained audit log, and enforcement happens at Swop's backend signing seam — the point every agent transaction must pass to be signed — which makes any violation provable after the fact, though it is not an on-chain guarantee.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
