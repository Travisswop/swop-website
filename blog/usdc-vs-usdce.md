---
title: "USDC vs USDC.e vs pUSD: What's the Difference?"
url: https://www.swopme.co/blog/usdc-vs-usdce
description: "USDC is Circle's native dollar token. USDC.e is a bridged copy from a third-party bridge, not Circle. pUSD is Polymarket's own 1:1-backed settlement token."
published: 2026-09-09
updated: 2026-09-09
---

[Blog](https://www.swopme.co/blog) / Guides

# USDC vs USDC.e vs pUSD: stablecoin naming, demystified

Same $1, three different tickers. Here's who actually backs each one, and why the difference matters the moment you try to move money between chains.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Sep 9, 2026 Updated Sep 9, 2026 6 min read Copy link [X](https://x.com/intent/tweet?text=USDC%20vs%20USDC.e%20vs%20pUSD%3A%20what%27s%20the%20difference%3F&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fusdc-vs-usdce) [Farcaster](https://warpcast.com/~/compose?text=USDC%20vs%20USDC.e%20vs%20pUSD%3A%20what%27s%20the%20difference%3F&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fusdc-vs-usdce)

Contents What USDC actually is USDC.e: what "bridged" means pUSD: Polymarket's own settlement token How to tell which one you're holding Where Swop fits FAQ

USDC is the dollar-pegged stablecoin Circle issues directly, redeemable 1:1 through Circle's own reserves. USDC.e is a different token: a bridged, wrapped copy of USDC created by a third-party bridge on chains where Circle hadn't yet deployed a native version, backed by whatever collateral that bridge holds rather than by Circle's reserves directly. pUSD is a third kind of dollar token again — Polymarket's own in-house settlement asset, backed 1:1 by USDC under Polymarket's own contract rather than issued by Circle or a generic bridge. All three are meant to trade at $1. Only one of them is actually issued by the company whose name is on the ticker.

## What USDC actually is

Circle mints USDC directly through a Circle-controlled smart contract on each chain it supports, and every native unit is meant to correspond to a dollar of reserves Circle holds at regulated custodians. Circle publishes the official contract address for native USDC on every chain it's deployed to — that address, not the "USDC" label a wallet shows you, is what actually determines whether a balance is real native USDC.

Native USDC can also move chain to chain through Circle's own bridge, [CCTP](https://www.circle.com/blog/bridged-usdc-standard): it burns USDC on the source chain and mints new native USDC on the destination chain, with no wrapped token and no third-party bridge contract sitting in between. That matters because it's the mechanism that keeps native USDC fungible across chains — the same asset, the same backing, wherever it lands.

## USDC.e: what "bridged" means

Bridged USDC exists because plenty of chains built out an ecosystem before Circle deployed a native version there. A generic token bridge would lock USDC on one chain and mint a wrapped representation on the destination chain so builders had dollar liquidity on day one — that wrapped token is what typically gets labeled USDC.e. It isn't issued by Circle, and Circle doesn't back it directly: its peg depends on the bridge's own locked collateral being solvent and uncompromised, which is a materially different trust assumption than "Circle holds a dollar in reserve for every token," even though both show up in a wallet as "USDC."

Getting from USDC.e back to native USDC on the same chain usually means bridging back through the same route it came from, or swapping through a venue that holds both — it isn't a 1:1 relabeling. That extra step, and the bridge-risk it carries, is the whole reason [Circle has pushed native issuance and CCTP](https://www.usdc.com/learn/whats-the-difference-between-usdc-and-usdce) as the long-term replacement for bridged USDC on the chains where it's now available.

## pUSD: Polymarket's own settlement token

pUSD — short for Polymarket USD — is a third pattern again: a token issued by a single application, not a chain-bridging protocol. It's an ERC-20 token on Polygon, backed 1:1 by USDC held under Polymarket's own smart contract, with that backing enforced onchain rather than resting on an algorithmic peg or a fractional reserve. Polymarket [migrated its collateral asset from USDC.e to pUSD on April 28, 2026](https://help.polymarket.com/en/articles/14762452-polymarket-exchange-upgrade-april-28-2026), alongside a smart-contract upgrade to its exchange, replacing a third party's bridged token with one Polymarket backs and controls itself.

Practically, this changes less than it sounds like for a trader: [deposits and withdrawals still happen in USDC](https://docs.polymarket.com/v2-migration), and the protocol settles all trading activity in native USDC — though Polymarket notes deposits and withdrawals may carry conversion or routing costs. pUSD is the token that actually sits inside an open position in between — which means if you've held a Polymarket balance since the migration, part of what you're holding isn't USDC or USDC.e at all, even though the dollar amount reads the same.

## How to tell which one you're holding

The display label in a wallet or app is the least reliable signal — "USDC" is used loosely for all three of these. What actually distinguishes them is the contract address (on EVM chains) or mint address (on Solana) the balance lives at:

- **Native USDC.** Sits at the address Circle publishes for that specific chain. Movable via CCTP with no wrapping involved.
- **USDC.e / bridged USDC.** Sits at a bridge contract's address, distinct from Circle's. Redeeming it as native USDC generally means routing back through the same bridge, or swapping through a venue that holds both.
- **pUSD / other venue-issued dollar tokens.** Sits at that venue's own contract. It typically isn't meant to circulate outside the app that issued it — it's collateral for a specific product, not a general-purpose bridged asset.

The one habit that avoids surprises Before assuming a "$1 balance" behaves identically everywhere, check what it's actually backed by and where it can move. A dollar-denominated token that can't leave the platform it was minted on is a different asset than one that can, even when both display the same number.

## Where Swop fits

Swop runs on Solana, Ethereum, Base, and Polygon. You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today. Because Swop spans multiple chains, the distinction in this post is a practical one, not just trivia: a dollar balance you hold on one chain and a dollar balance you hold on another aren't automatically the same token underneath, and moving value between chains or off Swop entirely is where that difference actually surfaces. Transactions on Swop are gas-sponsored — you don't need to hold SOL or ETH to transact — but that doesn't change what a given dollar token is backed by or where it can go once it leaves the chain it's on.

If you use prediction markets and want the mechanics of how their prices work, see [Prediction markets 101](https://www.swopme.co/blog/prediction-markets-101). Swop is available on [iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) and [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp), and as a web app at [swopme.app](https://swopme.app).

## FAQ

### What is USDC.e and how is it different from USDC?

USDC is minted directly by Circle through a Circle-controlled contract on each chain it supports, and is redeemable 1:1 through Circle. USDC.e is a bridged representation created by a third-party bridge, not by Circle: USDC is locked on one chain and a wrapped copy is minted on another. USDC.e exists mainly on chains where a bridge deployed dollar liquidity before Circle shipped a native version there.

### Is USDC.e still worth $1?

It's designed to be, as long as the bridge holding the underlying USDC collateral remains solvent and uncompromised. That's the actual difference from native USDC: native USDC's backing is Circle's reserves, while USDC.e's backing is whatever bridge minted it, and a bridge exploit or insolvency is a real, historically demonstrated risk that doesn't apply to Circle-issued USDC in the same way.

### What is pUSD, and why did Polymarket create it?

pUSD (Polymarket USD) is Polymarket's own ERC-20 settlement token on Polygon, backed 1:1 by USDC under its own smart contract. Polymarket migrated its collateral from USDC.e to pUSD on April 28, 2026, alongside a CTF Exchange V2 upgrade, to hold its own onchain-enforced backing instead of depending on a third-party bridge's. Day to day, traders still deposit and withdraw USDC; pUSD is the token that sits inside open positions in between.

### How can I tell whether a "USDC" balance is native or a wrapped or venue-specific version?

Check the token's contract address, not the symbol a wallet or app displays. Circle publishes the official native USDC contract address for every chain it supports; a balance sitting at a different address with the same "USDC" label is a bridged or venue-issued copy, and it may not move freely off that chain or that platform without first unwrapping or redeeming it through wherever it was issued.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
