---
title: "Swop Whitepaper: identity, money, agents and the SWOP token"
url: https://www.swopme.co/whitepaper
description: "The Swop whitepaper: how Swop works and how the SWOP token runs through it. Contract address, on-chain supply, Ovi credits, fee flows, El Dorado, tokenomics, Swop Chain and roadmap."
published: 2026-11-22
updated: 2026-11-22
---

Swop Whitepaper · v1.3 · November 2026

# Your name. Your money. Your agents.

How Swop works, and how the **SWOP token** runs through it: one swop.id for payments, trading, AI and a virtual world, the token that pays for Ovi and rewards activity, where fees go, and what comes next.

[Download the PDF ↓](https://www.swopme.co/assets/swop-whitepaper-v1.3.pdf) Jump to the token

23-page PDF Every claim status-tagged Informational only

SWOP at a glance · read on-chain

Contract (Solana mint) `GAehkgN1ZDNvavX81FmzCcwRnzekKMkSyUNq8WkMsjX1`

Supply

9,999,998,190

Minting

Revoked

Freezing

None

Decimals

9

[Verify on Solscan](https://solscan.io/token/GAehkgN1ZDNvavX81FmzCcwRnzekKMkSyUNq8WkMsjX1)

Status tags: Live Beta Building Planned Vision Nothing tagged Building, Planned or Vision is available today.

01

## Summary

**Mission:** help anyone own their identity and move money: with friends, with businesses, and with the AI agents working for them.

Swop is a social network where people, businesses and AI agents move value. Every account gets a **swop.id**: a name that is also a profile page (SmartSite), a storefront, a login and a wallet. From the Swop app on iOS, Android and the web, people swap tokens at the best route, sell anything with one link and get paid in USDC, follow and copy on-chain traders, trade prediction markets and perpetual futures, and send money to a name instead of an address.

Swop works on Solana, Ethereum, Base, Polygon and Arbitrum, and network fees are covered on supported chains. You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today.

**Ovi**, Swop's AI, proposes trades, payments and sales that you approve, inside caps you set, and runs on Swop Credits funded with SWOP. The**Swop MCP**puts the same tools inside ChatGPT, Claude and Grok, and every Swop product link can be paid by an AI agent in USDC.**El Dorado** is Swop's virtual world, where your swop.id gets a house that shows your SmartSite.

**2,231** registered signups

**5.0** App Store, 36 ratings

**51** Swop MCP tools

**0.5%** checkout & swap fee

02

## The problem

Six frictions keep everyday people, small businesses and AI agents out of on-chain money:

- **Fragmentation.** A wallet, a DEX, a bridge, a payments app, a marketplace and a profile page, each with its own login and gas.
- **Ownership vs. complexity.** Custodial apps are easy but hold your funds; your own wallet has meant seed phrases and 40-character addresses.
- **Identity belongs to platforms.** Your name, reputation and verification live inside each app, and proving one fact means handing over a whole document.
- **Following good traders is hard.** No clean way to see what other traders do and mirror it from your own wallet.
- **Payments are separate.** Merchants lack simple stablecoin checkout and tap-to-pay; buyers lack a spend experience that feels normal.
- **AI can talk, but it can't pay.** Assistants can't safely buy or move money for you, and most stores can't sell to an agent.

03

## The Swop solution

One name, one balance view, one wallet, and seven pillars on top of it. Every pillar shares the same swop.id and wallet.

| Pillar | What it does | Status

| swop.id & SmartSite | Your name is your page, wallet and login (name.swop.id), resolvable wherever ENS names work, readable by AI agents. | Live

| Swop Pay | One link to sell anything. People pay by card or crypto; AI agents pay in USDC over x402. In person: NFC chips, cards, keypad. | Live

| Swaps & trading | Best-route swaps via Jupiter and LI.FI, perps via Hyperliquid, prediction markets via Polymarket. | Live

| Copy trading | Trades post to a public feed; a copy executes in the follower's own wallet. | Live

| Geo Bucks & Drops | Merchant store credit (1 Buck = $1 at their stores) and rewards on a map claimed in person. | Live

| Swop Live | Go live from phone or browser and sell while you stream. | Live

| Ovi | Swop's AI in the app, in group chats, over iMessage and as a standalone app. Approve-first, inside your caps. | Beta

04

## swop.id, the identity layer

One name for every person, business, bot and agent: a public page, a login and a wallet address, plus a private way to prove facts about yourself without handing over documents.

### A name that works everywhere Live

swop.id is a domain imported into ENS. Each subname (like maya.swop.id) is an off-chain ENS name resolved through CCIP Read, so it works in Swop, for Ovi, and in other ENS-aware wallets. It isn't an NFT and costs nothing to move. The same name signs you into apps built on Swop, including El Dorado.

### SmartSite, the public side Live

Every swop.id has a SmartSite: profile, storefront and link hub, with templates for tips, booking, token gates, commerce and media. Every public SmartSite carries structured data so AI agents can read it. NFC cards tap to it; El Dorado houses display it.

### ZeroProof: prove one fact, share nothing else Live

Merchant verification runs through Stripe, and Swop keeps only an allow-listed summary. From it, Swop issues a **ZeroProof** credential: a short-lived, signed answer to one yes/no question, such as verified merchant, over 18, verified human or jurisdiction, issued for one verifier and only with your consent. Today the only verifier is Swop's own backend.

**Precise wording:** ZeroProof is a selective-disclosure credential signed by Swop. It is not a zero-knowledge proof, and it isn't open to other apps yet. Zero-knowledge credentials are planned for Swop Chain.

### Sign in with Swop Beta

Through Swivy, Swop's own wallet and login platform, any app can offer "Sign in with Swop", so your name, wallet and verification travel with you.

### Where identity goes next Planned

On Swop Chain, a swop.id becomes an account with passkeys and guardian recovery, verifiable trading records (Proof-of-PnL) and zero-knowledge credentials, so you can prove a fact on-chain without revealing who you are. Targeted for 2028 and later.

05

## Wallets, rails & AI safety

### Wallets and covered gas

Solana and EVM wallets are created at sign-in, with no seed phrase. Swop covers network fees on supported chains: on Solana the backend pays the fee (and pre-funds a first-time recipient's refundable token-account deposit); on EVM chains gas is sponsored. **Swivy** Beta, Swop's own wallet platform with passkeys and an isolated signer, has published SDKs and runs on Swop's own server in staging; it replaces Privy before Swop passes 10,000 monthly users.

### Two payment rails

**Crypto:**buyers pay with supported tokens or USDC; AI agents pay over x402 (USDC on Base) with no platform fee at launch. Sellers never need to verify identity to receive crypto.**Card:** Stripe Connect, for verified merchants, with its own fee shown. An order settled by card never also pays out on-chain.

### AI safety: approve-first and caps

Every AI path (Ovi, assistants connected through the Swop MCP, local agents, and agents paying over x402) runs inside limits you set: AI spending can be switched off, per-transaction and daily caps apply, and any assistant can be disconnected. The model can advise or veto, but deterministic code decides: a model can never raise a limit, add a venue or invent a trade.

### Owning the stack

| Layer | Direction | Status

| Wallets & login | Swivy replaces third-party wallets; offered to other developers. | Beta

| RPC & nodes | Swop's own gateway (rpc.swopme.co), then its own nodes, with providers as failover. | Building

| Indexing | Event-driven balances from Swop's own indexer. | Building

| Swop Chain | A chain for identity, reputation and user-owned data. | Planned

06

## The SWOP token

An SPL token on Solana with a capped supply, used inside Swop. Its role is defined by what it's used for, not by any return.

### Token facts (read on-chain, November 2026)

Name / ticker

Swop · SWOP

Chain & standard

Solana · SPL Token

Contract (mint)

`GAehkgN1ZDNvavX81FmzCcwRnzekKMkSyUNq8WkMsjX1`

Decimals

9

Total supply

9,999,998,190 SWOP (10,000,000,000 minted; about 1,809 since burned)

Mint authority

Revoked: no more SWOP can ever be created

Freeze authority

None: no one can freeze anyone's SWOP

Created

27 September 2024

**Check the address before you transact.** The mint above is the only SWOP that Swop's apps recognise. Any other token using the SWOP name or ticker is not Swop's.

### What SWOP is used for

| Use | What it does | Status

| Swop Credits for Ovi | SWOP funds the credits that pay for every Ovi model call. | Live

| Copy-trade rewards | A trader whose trade is copied gets 50% of that swap's fee, bought back as SWOP. | Live

| Referral rewards | 50% of a referred friend's swap fees for 12 months, paid in SWOP. | Live

| AI access | Holding 1,000+ SWOP unlocks Ovi on web and Android, as an alternative to Premium. | Live

| Local Ovi | Holding 10,000+ SWOP for 7 days unlocks free Ovi on your own Mac with a local model. | Beta

| In-app spending | Marketplace purchases, feed ads, subscriptions and swap fees. | Live

| El Dorado | World tokens are pegged 1:1 to SWOP; real SWOP stays off until legal review. | Beta

| Swop Chain roles | Verification stake, agent bonds, gas, then sequencer roles. | Planned

**What SWOP is not:** not a share of Swop, not a claim on fees or treasury, not an investment product. Rewards are paid for activity, not for holding. There is no SWOP staking today.

07

## SWOP powers Ovi

Every Ovi model call is paid from Swop Credits, and Swop Credits are funded with SWOP. Live

- **Fund.** Your Ovi has its own credit account with a Solana deposit address. Deposit SWOP (from about $2). Where auto-conversion is on, other supported Solana tokens are converted into SWOP first.
- **Reserve.** Before each call, Ovi holds an estimate of the cost. A call your balance or your 30-day cap can't cover is refused, never run on credit.
- **Settle.** After the call, Swop prices the actual model usage, applies the markup once, charges the SWOP equivalent and releases the rest. Each request can be charged only once.
- **One balance everywhere.** The same ledger serves Ovi in the app, @Ovi in group chats, Ask Swop over iMessage and the Ovi app.

| Where | Price | Status

| Ovi app (web, iPhone, Mac) | Model cost × 1.2 in every mode: hosted, local or your own key. | Beta

| Ovi inside the Swop app | Model cost × 2 today, moving to the Ovi app rate. | Live

| Local Ovi on your Mac | Free for holders of 10,000+ SWOP. | Beta

08

## How fees reach SWOP

Swop's activity flows into SWOP along the paths below. Each is a mechanic of the product, and none pays holders for holding.

Solana swaps **0.5% fee bought back as SWOP**

Held in the SWOP Reward Vault. Live

Copy trades **50% of the fee to the copied trader**

In SWOP; the rest stays in the Vault. Live

Referrals **50% of a friend's swap fees**

Paid in SWOP for 12 months. Live

Ovi & AI **Deposits held as SWOP**

Spent call by call at cost × markup. Live

In-app purchases **Paid in SWOP**

Marketplace, ads, subscriptions, swap fees. Live

EVM swaps & checkout **Collected in USDC**

Funds operations: covered gas, infrastructure, product. Live

Swop Chain **SWOP as gas**

Every Swop Chain transaction pays its fee in SWOP. Planned 2028

**No holder returns.** No part of Swop's fees, Reward Vault or treasury is distributed for holding or staking SWOP. Buybacks fund rewards for specific activity. Nothing here promises profit, yield or price appreciation.

09

## Copy-trade economics

Any trader's swap can post to the public feed; there's no separate "lead trader" tier. A copy executes in the follower's own wallet, and Swop never takes custody of follower funds. The standard **0.5% swap fee** applies to every swap:

- **Solana:**the fee is converted into SWOP and held in the Reward Vault. On a copy,**50% of that swap's fee (0.25% of trade value)** goes to the trader who was copied, in SWOP; the rest stays in the Vault for future rewards.
- **EVM (Ethereum, Base, Polygon, Arbitrum):** the fee is collected in USDC for Swop's treasury, with no copy-trade split.

Safeguards focus on the copy event: a minimum trade size, per-wallet reward caps, cooldowns between repeat copies, and wash-trade detection between linked wallets.

10

## El Dorado Beta

The social graph made visible: a 3D city on the web and Meta Quest where your swop.id has a house, merchants have shops, and AI bots run businesses.

- **A city run by AI bots.** Each building is a business, each floor a department, each bot a worker. Anything risky waits for human approval.
- **A house for every verified swop.id.** Sign in with your Swop wallet; your house in Swop Hills shows your live SmartSite.
- **The Marketplace Mall.** Swop sellers appear in the Mall; buyers pay with USDC or card on Swop's hosted checkout. El Dorado never holds funds.
- **World tokens.** A closed supply of 1,000,000, pegged 1:1 to SWOP by design. Real SWOP is switched off until legal review, so today they're free points.

11

## Tokenomics

9,999,998,190 SWOP on Solana. The supply is capped: the mint authority is revoked, so it can only stay the same or shrink through burns.

**Illustrative framework, subject to change, not final.** The allocation below is a design framework for review by qualified counsel. It is not a commitment and may differ from the actual on-chain distribution, which anyone can inspect at the contract address.

| Bucket | % | SWOP

| Community & ecosystem rewards | 30% | 3.0B

| Team & core contributors | 16% | 1.6B

| Early backers | 15% | 1.5B

| Treasury | 15% | 1.5B

| Liquidity | 10% | 1.0B

| Ecosystem & partnerships | 9% | 0.9B

| Community distribution | 5% | 0.5B

**Where demand comes from:** use. Ovi credits, in-app spending, rewards bought back from Solana swap fees, and later gas on Swop Chain.

12

## Swop Chain & SWOP's future roles Planned

A dedicated chain for identity and reputation, not trading. Trading stays on Solana, Hyperliquid and EVM chains. Mainnet target: Q1 2028.

| Choice | Selected

| Stack | Arbitrum Orbit, run by a rollup-as-a-service provider; data on Ethereum blobs.

| SWOP on the chain | Canonical on Solana; locked there and represented 1:1 on Swop Chain through Wormhole Native Token Transfers. Rate limits, a multisig pause and audits before mainnet.

| Gas | SWOP is the chain's gas token.

| Sequencer | Centralized at launch, with a written plan to decentralize.

**SWOP roles, in order:** (1) creator verification stake behind a verified track record; (2) AI-agent bonds that can be lost for breaking rules; (3) gas; (4) sequencer roles. Each is usage-based, none is designed to pay a yield, and each will be reviewed by counsel before launch.

13

## Roadmap

Now · Q4 2026

Ovi app to public release at the 1.2× rate; Swivy wired into Swop; Swop traffic through its own RPC gateway and indexer; developer docs at docs.swopme.co; Swop Chain Phase 0 (provider quotes, SWOP legal memo, credential vendors, Proof-of-PnL spec).

Building

Q1 2027

Proof-of-PnL on Solana; creator verification stake; private Swop Chain devnet with SWOP gas end to end; offline mesh chat; more NFC merchants; automatic El Dorado Mall shops.

Planned

Q2 2027

Public testnet and bridge testnet; agent guardrails and bonds; first audit.

Planned

Q3–Q4 2027

Second audit; supply monitoring; sequencer decentralization plan; mainnet dress rehearsal.

Planned

Q1 2028

**Swop Chain mainnet**; SWOP bridge live; SWOP becomes gas.

Planned

2028+

Zero-knowledge credentials and the user data vault; sequencer decentralization; real SWOP in El Dorado if legal review allows.

Vision

14

## Questions

### What is the SWOP contract address?

SWOP is the Solana SPL token at mint GAehkgN1ZDNvavX81FmzCcwRnzekKMkSyUNq8WkMsjX1. It is the only SWOP Swop's apps recognise.

### What is SWOP's total supply?

9,999,998,190 SWOP, read on-chain in November 2026: 10 billion were minted and about 1,809 have since been burned. The mint authority is revoked, so no more can ever be created.

### Does holding SWOP earn a yield?

No. Swop doesn't promise any yield or return for holding SWOP, and there's no staking product today. Rewards are paid for activity, like being copied or referring friends.

### How does SWOP pay for Ovi?

Ovi runs on Swop Credits funded with SWOP. You deposit SWOP into your Ovi credit account, and each model call is charged at the model's cost times a markup: 1.2× in the Ovi app, 2× inside the Swop app today.

### Where do Swop's fees go?

Solana swap fees are bought back as SWOP for the Reward Vault, which pays copied traders and referrers. EVM swap and checkout fees are collected in USDC and fund operations. None of it is distributed for holding SWOP.

### Is swop.id a zero-knowledge identity?

Not yet. Today swop.id uses ZeroProof, a signed credential that proves one yes/no fact without sharing documents. Zero-knowledge credentials are planned for Swop Chain.

15

## Disclaimer

This page and the PDF are for **informational purposes only**. They are not an offer to sell, a solicitation to buy, or a recommendation regarding SWOP or any token, security or financial instrument, and not investment, financial, legal or tax advice.

**No promise of profit, return or yield.** SWOP is a utility token used within Swop. Holding SWOP does not entitle anyone to a share of Swop's revenue, fees, Reward Vault, treasury or profits. Rewards, rates, caps and eligibility may change or end. Allocation figures are an illustrative framework, not final.

**Risk and availability.** Digital assets are volatile and can lose all value. Trading, leverage and prediction markets can lose the money committed. Smart contracts, bridges and third-party services can fail. Features may be unavailable in some jurisdictions, including OFAC-sanctioned regions. On-chain facts were read in November 2026 and can change; the blockchain is the source of truth. Anything tagged Beta, Building, Planned or Vision reflects current intentions and may change or never happen.

[Download the full whitepaper v1.3 · November 2026 · PDF · 23 pages](https://www.swopme.co/assets/swop-whitepaper-v1.3.pdf)

Get started

## Put SWOP to work.

Get Swop, claim your swop.id, and use SWOP across the app.

[Open the web app](https://swopme.app/wallet) [App Store](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Google Play](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
