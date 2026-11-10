---
title: "The Next Account Primitive: Identity That Transacts, and Proves Without Revealing"
url: https://www.swopme.co/blog/accept-card-payments-merchant-verification
description: "Email made accounts universal but left them inert. The next primitive is an identity that carries money and can prove one fact without disclosing who you are — which is what ZeroProof, still in development, is being built for."
published: 2026-09-23
updated: 2026-09-23
---

[Blog](https://www.swopme.co/blog) / Perspective

# Email gave the internet an account. It never gave it a wallet.

The account primitive is changing — from an address that identifies you to an identity that transacts. The hard part isn’t payments. It’s proving something about yourself without handing over everything.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Sep 23, 2026 Updated Sep 23, 2026 8 min read Copy link [X](https://x.com/intent/tweet?text=Card%20payments%20are%20live%20on%20Swop&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Faccept-card-payments-merchant-verification) [Farcaster](https://warpcast.com/~/compose?text=Card%20payments%20are%20live%20on%20Swop&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Faccept-card-payments-merchant-verification)

Contents The account email built What a transactional account adds The proof problem ZeroProof, and why it matters Why identity, not the payment, is the hard part Where this actually stands FAQ

Every account you have on the internet is built on an email address. Not because email is good at being an identity — it is a routing address for messages, invented to move text between university computers — but because it was the only universal identifier anyone agreed on. Forty years later it is still the login, the password reset, the receipt, and the thing a company means when it says “your account.”

And it cannot do anything. An email address cannot hold value, cannot be paid, cannot prove a single fact about the person behind it. Every capability we needed beyond “deliver a message here” got bolted on by somebody else: a payment processor for money, an identity vendor for verification, a platform for reputation. The account itself stayed inert.

What replaces it is not a better email address. It is an account that can transact and can prove — and the second half is the one nobody has solved well.

## The account email built

Email won as the account primitive because it was federated and free. Anyone could issue one, every service could accept one, and no company owned the namespace. Those are genuinely good properties, and they are why it outlasted every walled-garden login that tried to replace it.

But it made one assumption that has quietly shaped everything since: that identity and capability are separate concerns. The address says where you are. Everything you actually want to do — pay, get paid, prove you are over 18, prove you are a real business — happens somewhere else, mediated by a third party who now holds a copy of your information.

That is the layer being replaced. Not the mailbox. The assumption underneath it.

## What a transactional account adds

A handle like `travis.swop.id` looks like a username and behaves like something closer to an account. It resolves to payment routing, so it can be paid directly — no processor in between deciding whether the transaction is allowed. It carries a page you control. And because every SmartSite is an x402 storefront, any product a seller adds is automatically payable by AI agents in USDC over the x402 protocol, with payout going directly on-chain to the seller.

That last part is the tell that this is a different primitive rather than a nicer profile page. An email address cannot be the counterparty to a transaction. A handle that resolves to a wallet can — including with software on the other side. When an AI agent runs an errand and needs to pay for something, it needs an address that accepts money, not a mailbox it can write to.

And because you control the wallet underneath — nothing moves without your approval, you can export your private key, and Swop never holds your keys — the account is not a balance a company keeps on your behalf. It is yours in the sense that email accounts never were.

## The proof problem

Here is where it gets hard, and where most “web3 identity” work has gone wrong.

An account that transacts will constantly be asked to prove things. Is this a real business? Is this person over 18? Are they allowed to buy this here? Today, answering any of those means surrendering far more than the question asked. You want to prove you are a verified merchant; you hand over your name, your address, your documents, and a permanent record at whoever asked. The question was one bit. The answer was your whole file.

Crypto’s instinctive fix has been to put credentials on-chain — a badge in an NFT, an attestation in a public record. That is worse, not better. A public chain is permanent and globally readable. A verification status written there cannot be revoked, corrected or forgotten, and it can be correlated with every transaction that address ever makes, forever. Verification status changes. Chains do not forget.

Which is why **Swop never writes verification data to ENS, an NFT, or any public chain.** The handle and its payment routing are public because they are meant to be. What you have proven about yourself is not part of that record.

## ZeroProof, and why it matters

The missing piece is a way to answer exactly the question asked and nothing more. That is what we are building as **ZeroProof**.

The shape of it: a site asks for one fact. You see exactly what is being asked and by whom, and you approve it. The site receives a short-lived credential carrying that single yes/no answer — verified merchant, say — and nothing else. No name, no email, no wallet address, no document, no account identifier. It is issued specifically for that verifier, so two sites cannot compare what they received and work out they are talking to the same person. It expires in minutes. It can be revoked. None of it is written to a chain.

Why this is the load-bearing piece rather than a privacy nicety: an account primitive only becomes universal if it is safe to use everywhere. Email became universal partly because handing someone your address costs you almost nothing. An identity that carries money and history is a much heavier thing to hand over — and if using it everywhere means disclosing everything everywhere, it will not be used everywhere. It will be used carefully, in a few places, like a passport.

Minimum disclosure is what makes a heavy identity light enough to present casually. That is the whole argument. Without it, a transactional account is a liability you carry; with it, it is something you can hand to a stranger's website the way you hand over an email address today.

Honest status **ZeroProof is not live. It is in development and disabled in production.** A naming caveat we would rather give than have someone discover: today’s design is a signed, short-lived, per-verifier credential that discloses only the claim asked for, and work on circuit-friendly attestations is in progress — but you should not read the name as a cryptographic zero-knowledge proof yet. It delivers minimum disclosure and unlinkability across verifiers. It is not yet ZK in the formal sense, and we will keep saying so until it is.

## Why identity, not the payment, is the hard part

Moving money is close to solved. Stablecoins settle in seconds, and a handle that resolves to a wallet removes the last piece of friction in getting paid. If payments were the bottleneck, this would already be finished.

The bottleneck is that commerce runs on claims about people, not just transfers between them. Age, jurisdiction, licence, business status, whether you are the same person who bought the thing last time. Every one of those is a question about identity, and every existing answer either leaks too much or requires a trusted intermediary to hold a copy of you.

So the sequence matters: an account that transacts is useful, but an account that transacts and can prove narrowly is what actually replaces the email-plus-processor-plus-identity-vendor stack. One of those is a better wallet. The other is a different internet.

## Where this actually stands

Concretely, so this reads as a roadmap and not a manifesto.

- **Live now.** Swop accepts card payments, and Tap to Pay is live on Android. Tap to Pay on iPhone is not yet — we would rather name the gap than let the phrase imply both.
- **Live, and unchanged by any of the above.** Crypto and x402 payments on Swop are never identity-gated — a seller is payable in USDC the moment they list a product. Only the card rail requires merchant verification, because card networks and banking rules require it and public-chain settlement does not.
- **How that verification is held.** Card-rail verification runs through Stripe. Stripe holds the identity documents; Swop keeps only a revocable record of the decision, not the evidence behind it. Card proceeds never touch a Swop wallet — Stripe holds the fiat balance and pays the merchant’s bank.
- **Not live.** ZeroProof. In development, disabled in production.

The safest way to protect sensitive documents is not to encrypt them well — it is to not be the party holding them. That principle is why the verification architecture looks the way it does today, and it is the same principle ZeroProof extends to everyone you present an identity to.

## FAQ

### Why would an identity replace email as the account primitive?

Email is a routing address for messages: it identifies where to reach you and nothing else. It cannot hold value, be paid, or prove a fact about you, so every capability beyond delivery is supplied by a third party who ends up holding a copy of your information. A handle that resolves to payment routing can be the counterparty to a transaction directly — including with AI agents, which need an address that accepts money rather than a mailbox.

### What is ZeroProof?

A way to answer one question about yourself without disclosing anything else. A site asks for a single fact, you approve it, and it receives a short-lived credential carrying that yes/no answer and nothing more — issued per-verifier so two sites cannot link you, expiring in minutes, revocable, and never written to a chain. It is not live yet: it is in development and disabled in production.

### Is ZeroProof a zero-knowledge proof?

Not in the formal cryptographic sense today. The current design is a signed, short-lived, per-verifier credential that discloses only the claim requested, and work on circuit-friendly attestations is in progress. It delivers minimum disclosure and unlinkability across verifiers, which are the properties that matter in practice — but we will not call it ZK until it is.

### Why not put verification on-chain?

Because a public chain is permanent and globally readable. A verification status written there cannot be revoked, corrected or forgotten, and can be correlated with every transaction that address ever makes. Swop never writes verification data to ENS, an NFT, or any public chain.

### Do I need to verify my identity to accept crypto on Swop?

No. Crypto and x402 payments on Swop are never identity-gated — a seller is payable in USDC the moment they list a product. Only the card rail requires merchant verification.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
