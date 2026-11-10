---
title: "What Is a Wrapped Token? A Claim on a Bridge"
url: https://www.swopme.co/blog/what-is-a-wrapped-token
description: "A wrapped token represents another asset on a different chain, minted when a bridge locks the original. It's a claim on the bridge, not on the original issuer."
published: 2026-09-28
updated: 2026-09-28
---

[Blog](https://www.swopme.co/blog) / Guides

# What is a wrapped token? A claim on a bridge, not the issuer

It carries the same ticker and tracks the same price as the asset it represents. What it doesn't carry is the same backing — and that gap is invisible in a wallet balance.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Sep 28, 2026 Updated Sep 28, 2026 7 min read Copy link [X](https://x.com/intent/tweet?text=What%20is%20a%20wrapped%20token%3F%20A%20claim%20on%20a%20bridge%2C%20not%20the%20issuer&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fwhat-is-a-wrapped-token) [Farcaster](https://warpcast.com/~/compose?text=What%20is%20a%20wrapped%20token%3F&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fwhat-is-a-wrapped-token)

Contents What a wrapped token is How lock-and-mint works Wrapped tokens you've probably seen What backs it, and what breaks it What to check before trusting one Where Swop fits FAQ

A wrapped token is a token minted on one blockchain to represent an asset that actually lives on a different chain, created when a bridge or custodian locks the original and issues a matching token elsewhere. It carries the original's ticker convention and is designed to track its price, but its backing is whoever holds that lock — not the protocol or company that created the original asset. That distinction doesn't show up anywhere in a wallet balance, and it's the whole difference between holding an asset and holding a promise about one.

## What a wrapped token is

Every wrapped token is built around the same idea: take an asset that only exists on chain A, and make a version of it usable on chain B, where it otherwise couldn't go. The wrapped version is a 1:1 claim — in principle, one wrapped unit is always redeemable for one unit of the original — issued through a smart contract or a named custodian rather than through whatever created the asset in the first place.

The naming is usually a giveaway once you know to look for it: a "w" prefix (wBTC, wETH, wSOL) almost always signals a wrapped representation rather than the native asset. That's a convention, not a rule enforced anywhere, which is part of why checking the actual contract matters more than reading the ticker — more on that in the FAQ.

## How lock-and-mint works

The mechanics are the same whether a centralized custodian or a decentralized bridge is doing the wrapping:

- **Lock.** The original asset is deposited with a custodian or sent into a bridge contract on its native chain, where it sits untouched.
- **Mint.** An equivalent amount of the wrapped token is created on the destination chain and sent to the depositor. Total wrapped supply is meant to always equal the amount locked.
- **Redeem.** To get the original back, the holder sends the wrapped token back to be burned, and the custodian or contract releases the matching amount of the locked original.

Wrapped Bitcoin (WBTC) is the clearest illustration of the custodial version: the Bitcoin backing it sits with a licensed custodian, only identity-verified merchants approved through DAO governance can mint or burn, and [reserves are published on-chain](https://wbtc.network/transparency) so anyone can check them against the wrapped supply on Ethereum. WBTC also shows the risk living inside its own structure: in August 2024 BitGo handed partial control of custody to BiT Global, an arrangement tied to TRON founder Justin Sun. Holders got no vote. MakerDAO offboarded all WBTC collateral from the Sky ecosystem the following month, and Coinbase suspended WBTC trading on December 19, 2024, citing “unacceptable risk.” The Bitcoin in reserve never moved — what changed was who held it, and that was enough. A bridge-run version works the same way mechanically, just with a smart contract standing in for the custodian — deposits are locked in a contract on the source chain, and a [validator or guardian set attests to that lock](https://wormhole.com/docs/protocol/infrastructure/guardians/) before the wrapped token mints on the destination.

The short version Locking never destroys the original asset. It sits, unspendable, as collateral for a second token that trades somewhere the first one can't reach.

## Wrapped tokens you've probably seen

Wrapped tokens show up constantly, often without being labeled that way:

- **WBTC on Ethereum.** Lets Bitcoin's value participate in Ethereum's DeFi contracts, which native Bitcoin's own chain can't run.
- **wETH.** Ether itself isn't an ERC-20 token — wETH wraps it into one so it can be used in contracts that expect that standard.
- **wSOL.** Same idea on Solana: native SOL isn't an SPL token, so contracts that need an SPL-token interface use wrapped SOL instead.
- **Bridged stablecoins.** A "USDC" balance on a chain Circle hasn't natively deployed to is often a bridge-minted wrapped copy rather than Circle-issued USDC — a distinction covered in detail in [USDC vs USDC.e vs pUSD](https://www.swopme.co/blog/usdc-vs-usdce).

Every cross-chain swap that produces a wrapped asset on the receiving end is doing exactly this under the hood. [Cross-chain swap wallet: how swapping between chains actually works](https://www.swopme.co/blog/cross-chain-swap-wallet) goes through that routing layer in more detail; this post is about the token that comes out the other end of it.

## What backs it, and what breaks it

A wrapped token's price is supposed to track the original through arbitrage: if the wrapped version trades below the original, someone can buy the wrapped token, redeem it for the real asset, and pocket the difference — a trade that pushes the price back toward parity. That mechanism depends entirely on redemption actually working.

Three things break it. First, the custodian or bridge contract can be exploited — an attacker drains the locked collateral, and every wrapped token it was backing loses its claim to redeem, even though nothing happened to the original asset sitting elsewhere. Bridges concentrate locked collateral into a single contract, which is why they have produced some of the largest single exploits in crypto — Ronin ($625M), Wormhole ($325M) and Nomad ($190M) among them. Chainalysis found [bridge hacks accounted for 69% of all stolen crypto funds in 2022](https://www.chainalysis.com/blog/cross-chain-bridge-hacks-2022/), with the average bridge exploit roughly 11 times larger than the average non-bridge one. Second, a custodian can become insolvent or freeze redemptions, which has the same effect without requiring a hack. Third, more wrapped tokens can end up minted than collateral actually locked — a bookkeeping failure rather than a theft, but one with the same result: a wrapped token that can no longer be redeemed 1:1.

The original asset is never at risk from any of this. What's at risk is your claim on it.

## What to check before trusting one

- **Who holds the lock.** A named, regulated custodian and an anonymous multisig carry very different risk, even when both mint a token that says the same thing on the label.
- **Is redemption actually open.** A wrapped token you can't redeem for the original is a wrapped token you can only exit by selling to someone else, at whatever price the market will bear.
- **Is the collateral verifiable.** Reserve or proof-of-reserve data that's public and checkable beats a claim you can't audit.
- **The contract address, not the ticker.** Two tokens can both display as "wBTC" while sitting at different addresses with different backing.

## Where Swop fits

You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today, and Swop runs on Solana, Ethereum, Base, and Polygon. Swop has a built-in swap: you get a quote and sign inside the app, without sending funds to an exchange or connecting to a separate site, and Swop routes Solana swaps through Jupiter and EVM swaps through LiFi. That routing treats any token that already exists on a supported chain the same way it treats any other token on that chain — the same pattern used for tokenized real-world assets like PAXG, as covered in [Tokenizing real-world assets](https://www.swopme.co/blog/tokenized-real-world-assets). Transactions on Swop are gas-sponsored, so getting a wrapped asset onto a new chain doesn't also require hunting down that chain's gas token first.

Check it yourself Whether a specific wrapped asset is supported for swapping or receiving on Swop, and whether any particular route surfaces a wrapped intermediate token, is a live product detail rather than something this post can state generally — check the app or [support.swop.id](https://support.swop.id) for current token support.

## FAQ

### What is a wrapped token?

A token minted on one blockchain to represent an asset that actually lives on a different chain. A bridge or custodian locks the original asset and mints a matching token elsewhere, carrying the same ticker convention (like WBTC for Bitcoin) and tracking the same price, but issued by the bridge rather than by whoever created the original asset.

### What backs a wrapped token?

Whatever the bridge or custodian is holding as collateral for the original asset it locked — not the original issuer or protocol. For a custodial wrapped asset that's typically a named custodian holding the real asset in reserve; for a bridge-minted wrapped asset it's the funds locked in that bridge's contract. Either way, the backing is a separate promise from the asset it represents.

### Does a wrapped token always trade at the same price as the original asset?

It's designed to, through a redemption mechanism that lets holders burn the wrapped token for the locked original (or vice versa), which keeps arbitrage pulling the price back to parity. That only works as long as the custodian or bridge is solvent and the redemption path is actually open — when either breaks, the wrapped token can trade below the asset it claims to represent even though the original asset itself hasn't moved.

### What happens to a wrapped token if the bridge behind it is hacked or becomes insolvent?

The wrapped token can lose its peg or become worthless even though the underlying original asset is untouched, because the wrapped token's value depends on the bridge's collateral, not on the original asset directly. Bridge exploits are the most common cause: an attacker drains the locked collateral, and every wrapped token that collateral was backing loses its claim to redeem.

### How can I tell if the token I'm holding is wrapped rather than native?

Check the contract address (or mint address on Solana), not the symbol a wallet displays. The asset's original issuer or chain typically publishes the official native contract address; a balance sitting at a different address with the same ticker is a wrapped or bridged representation, and it may need to be unwrapped or redeemed before it can move somewhere the wrapped version isn't recognized.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
