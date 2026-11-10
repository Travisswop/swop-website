---
title: "ERC-8196 in production: how Swop polices its trading agent — Swop"
url: https://www.swopme.co/blog/erc-8196-agent-policy
description: "ERC-8196 standardizes policy-bound AI agent wallets. Here's how Swop's trading agent runs under an ERC-8196-inspired policy layer — versioned policies, EIP-712 owner signatures, and a hash-chained audit log."
published: 2026-08-31
updated: 2026-08-31
---

[Blog](https://www.swopme.co/blog) / Engineering

# ERC-8196 in production: how Swop polices its trading agent

An AI agent that trades needs rules it cannot rewrite. Here is the standard that defines those rules, and how Swop applies its ideas in production.

ST Swop Team Aug 31, 2026 7 min read Copy link [X](https://x.com/intent/tweet?text=ERC-8196%20in%20production%20on%20Swop&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Ferc-8196-agent-policy) [Farcaster](https://warpcast.com/~/compose?text=ERC-8196%20in%20production%20on%20Swop&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Ferc-8196-agent-policy)

Contents What ERC-8196 standardizes Why an agent needs a policy layer How Swop applies it What the policy can never do Where it stands today FAQ

ERC-8196 is a finalized Ethereum standard for AI-agent-authenticated wallets: a wallet that will execute an agent's transaction only when it arrives with verifiable proof that the action complies with a policy the asset owner defined. Swop's Goldman trading agent runs under an ERC-8196-inspired policy layer in production — each vault carries a versioned policy, expanding a policy's authority requires the owner's EIP-712 signature, and every enforcement decision is written to a per-vault hash-chained audit log. This post explains what the standard says, what we adopted from it, and where our implementation is honest about differing.

## What ERC-8196 standardizes

The standard ( [EIP-8196](https://eips.ethereum.org/EIPS/eip-8196), Standards Track, status Final) defines a policy structure and the cryptography that binds an agent to it. A policy spells out what an agent may do: allowed actions, contract allowlists and blocklists, per-transaction value caps, and time windows in which the delegation is valid. Agent actions are bound to a specific policy through EIP-712 typed signatures carrying the policy's hash, so an action under one policy cannot be replayed under another.

Two pieces matter most for anyone evaluating agent wallets. First, the policy is the owner's artifact — the agent operates inside it and cannot expand it. Second, the standard mandates a hash-chained audit trail: every entry carries the hash of the previous one, so a record that has been deleted or edited after the fact is detectable by anyone replaying the chain.

## Why an agent needs a policy layer

An agent that can propose trades is a convenience. An agent whose boundaries exist only in its prompt is a liability — prompts drift, models update, and "the agent decided to" is not an acceptable root cause when money moved. The point of a policy layer is that the boundary lives outside the agent, in a place the agent cannot reach, and that every decision the boundary makes leaves a record neither the agent nor the operator can quietly rewrite.

The boundary has to live outside the agent, in a place the agent cannot reach.

This is the same design conclusion we shipped with [agentic trading](https://www.swopme.co/blog/agentic-trading-is-live): Swop's agent proposes; you approve. Nothing signs without a tap, and the agent never holds keys. The policy layer extends that from the signing moment backward into everything the agent is allowed to even propose and route for signing.

## How Swop applies it

Swop's implementation is ERC-8196-inspired rather than a byte-for-byte implementation of the interface, and the differences are deliberate:

- **Versioned policies per vault.** Each vault carries a versioned policy. The standard identifies policies by immutable hash; we keep the hash binding and add explicit versioning so a vault's policy history reads as a sequence, not a pile of hashes.
- **Owner signatures to expand authority.** Expanding a policy's authority requires the owner's EIP-712 signature. Narrowing it does not — reducing what the agent may do never needs ceremony.
- **A per-vault hash-chained audit log.** Every enforcement decision — allowed, flagged, or blocked — is appended to the vault's chain, exactly in the standard's tamper-evident spirit.

Honest framing Enforcement happens at Swop's backend signing seam — the point every agent transaction must pass to be signed — and the audit chain makes any violation provable. It is not an on-chain guarantee. ERC-8196 describes wallets that verify policy proofs on-chain; our enforcement point is our infrastructure, and the audit chain is what makes us accountable to it.

## What the policy can never do

A policy layer that can strand your funds is worse than no policy layer. So one rule sits above every policy, in every version, and cannot be configured away: risk-reducing actions — exits, cancels, and withdrawals back to the owner — are never blocked by the policy layer. The owner can always get out.

The policy constrains what the agent may start, never what the owner may stop. If the two ever seem to conflict, the exit wins.

## Where it stands today

The policy layer shipped Aug 28, 2026 and is running in shadow (observe-and-log) mode while it soaks; enforcement mode follows. Shadow mode means the layer evaluates every agent action against the vault's policy and writes its verdict to the audit chain without yet blocking — so by the time enforcement turns on, the decision history already exists to check it against.

Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them — and runs on Solana, Ethereum, Base, and Polygon. The agent, and the policy layer above it, live in the app you already have: iOS, Android, and the web app at swopme.app.

## FAQ

### What is ERC-8196?

A finalized Ethereum standard for AI-agent-authenticated wallets: transactions execute only with verifiable proof they comply with an owner-defined policy — allowed actions, contract allowlists, value caps, time windows — bound by EIP-712 signatures and recorded in a hash-chained audit trail.

### Does Swop implement ERC-8196 exactly?

No — and we say so. Swop's Goldman trading agent runs under an ERC-8196-inspired policy layer: versioned per-vault policies, EIP-712 owner signatures to expand authority, and a per-vault hash-chained audit log, enforced at Swop's backend signing seam rather than on-chain.

### Can the policy layer lock me out of my funds?

No. Risk-reducing actions — exits, cancels, and withdrawals back to the owner — are never blocked by the policy layer. The owner can always get out.

### Does Swop's agent hold my keys?

No. Swop's agent proposes; you approve. Nothing signs without a tap, and the agent never holds keys.

### Is the policy layer enforcing today?

It shipped Aug 28, 2026 in shadow (observe-and-log) mode while it soaks; enforcement mode follows.

ST

Swop Team

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
