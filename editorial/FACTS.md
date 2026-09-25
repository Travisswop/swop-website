# Verified Proof Points

The ONLY numbers and claims the writer may state about Swop. Anything not on this list
gets a `[NEEDS FACT: description]` marker in the draft instead of a made-up value.
**Token claims stay mechanical.** A SWOP row now exists (agent pricing). Describe how value routes and nothing more — no price, return, yield, appreciation or "accrual" language, and no comparison implying an investment case. Competitor fee comparisons must cite that competitor's own published fee documentation.\n\n**Never publish internal implementation detail.** The KYC/identity work is documented internally with environment variable names, OIDC scopes, service endpoints, infra (ECS/RDS/ALB), code paths and signing key ids. None of that belongs in a post. Describe behaviour, never configuration.

**Negative claims count too:** never assert Swop LACKS or "doesn't implement/support"
something unless a Verified row says so — absence of a row is not evidence of absence
(a post shipped 2026-09-02 wrongly claiming "Swop doesn't implement x402" when every
SmartSite is an x402 storefront). Unknown either way → [NEEDS FACT] marker.
Each row has a source and a verified-on date. Travis adds/verifies rows; the agent never does.

## Verified
| Claim | Exact wording to use | Source | Verified |
|---|---|---|---|
| Self-custody | "Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them." | swopme.co product | 2026-08-26 |
| Sponsored gas | "Transactions on Swop are gas-sponsored — you don't need to hold SOL or ETH to transact." | swopme.co landing ("Free transactions") | 2026-08-26 |
| Chains live | "Swop runs on Solana, Ethereum, Base, and Polygon." | swopme.co landing (live ticker) | 2026-08-26 |
| Checkout fee | "SwopPay checkout charges a 0.5% fee." | Travis, 2026-08-26 | 2026-08-26 |
| Platforms | iOS App Store + Google Play + web app at swopme.app | store listings | 2026-08-26 |
| App Store rating | "Swop is rated 5.0 out of 5 on the iOS App Store." (don't cite the ratings count — 35, still small; link the listing) | apps.apple.com listing | 2026-08-26 |
| AI agent model | "Swop's agent proposes; you approve. Nothing signs without a tap, and the agent never holds keys." | /blog/agentic-trading-is-live | 2026-08-26 |
| Agent policy layer | "Swop's Goldman trading agent runs under an ERC-8196-inspired policy layer: each vault carries a versioned policy, expanding a policy's authority requires the owner's EIP-712 signature, and every enforcement decision is written to a per-vault hash-chained audit log." | Travis, 2026-08-28 | 2026-08-28 |
| x402 SmartSite storefront | "Every SmartSite is an x402 storefront: any product a user adds is automatically payable by AI agents in USDC over the x402 protocol, with payout going directly on-chain to the seller." | Travis, 2026-09-02 (backend v5 x402 storefront, live) | 2026-09-02 |
| Phone loss / recovery | "Losing your phone doesn't mean losing your funds: log in with your email on any phone and your Swop wallet comes back with it. You can also save your private key, which lets you open your assets in any wallet you choose." | Travis, 2026-09-01 | 2026-09-01 |
| No third-party audit (honest) | "Swop has not commissioned a third-party security audit to date." (state plainly when the topic comes up; never imply an audit exists) | Travis, 2026-09-01 | 2026-09-01 |
| Policy exits always open | "Risk-reducing actions — exits, cancels, and withdrawals back to the owner — are never blocked by the policy layer. The owner can always get out." | Travis, 2026-08-28 | 2026-08-28 |
| Policy enforcement seam (honest framing) | "Enforcement happens at Swop's backend signing seam — the point every agent transaction must pass to be signed — and the audit chain makes any violation provable. It is not an on-chain guarantee." | Travis, 2026-08-28 | 2026-08-28 |
| Built-in swap | "Swop has a built-in swap: you get a quote and sign inside the app, without sending funds to an exchange or connecting to a separate site." | Travis, 2026-09-21 (live quote endpoint) | 2026-09-21 |
| Swap routing | "Swop routes Solana swaps through Jupiter and EVM swaps through LiFi." | Travis, 2026-09-21 | 2026-09-21 |
| Default slippage | "Swop quotes Solana swaps with a 50 bps default slippage tolerance." (a DEFAULT, not a cap — don't imply it can't be changed) | Travis, 2026-09-21 | 2026-09-21 |
| RWA tokens swappable | "Tokenized real-world assets that live on Swop's supported chains — such as PAX Gold (PAXG) on Ethereum — can be swapped in the Swop app through its existing routing, the same as any other token on that chain." | Travis, 2026-09-21 (live quote 2026-09-17) | 2026-09-21 |
| Card payments live | "Swop accepts card payments, and Tap to Pay is live on Android." (iOS Tap to Pay is NOT live — dev distribution only. Never claim it.) | Travis, 2026-09-23 (CONNECT_CARD_MODE=live since 2026-09-17; Android build 8.4.72, 2026-09-18) | 2026-09-23 |
| Two rails, one rule | "Crypto and x402 payments on Swop are never identity-gated — a seller is payable in USDC the moment they list a product. Only the card rail requires merchant verification." | Travis, 2026-08-31 / 2026-09-23 | 2026-09-23 |
| Who holds the documents | "Card-rail verification runs through Stripe. Stripe holds the identity documents; Swop keeps only a revocable record of the decision, not the evidence behind it." | Travis, 2026-09-23 | 2026-09-23 |
| Card proceeds | "Card proceeds never touch a Swop wallet — Stripe holds the fiat balance and pays the merchant's bank." | Travis, 2026-09-23 | 2026-09-23 |
| Nothing on-chain | "Swop never writes verification data to ENS, an NFT, or any public chain." | Travis, 2026-09-23 | 2026-09-23 |
| ZeroProof status (honest) | "ZeroProof is not live. It is in development and disabled in production." Describe it only in the future tense, and never call it a zero-knowledge proof — today's design is a signed, short-lived, per-verifier credential; circuit-friendly attestation work is in progress. | Travis, 2026-09-23 | 2026-09-23 |
| Checkout fee, both rails | "SwopPay checkout charges a 0.5% fee, and the rate is the same on the card rail and the crypto rail." | Travis, 2026-09-24 | 2026-09-24 |
| ~~Referral share (WRONG — superseded 2026-09-25)~~ | Previously recorded as half of the SwopPay CHECKOUT fee. That was wrong: the share is on SWAP fees. See the corrected row above. Kept as a warning, do not cite. | — | superseded |
| Agent is paid in SWOP | "Swop's AI agent is paid for in the SWOP token: users pay for agent actions in SWOP." | Travis, 2026-09-24 | 2026-09-24 |
| Gas is absorbed | "Swop covers the network fee. It is a cost Swop absorbs, not a charge passed through to you." | Travis, 2026-09-25 | 2026-09-25 |
| Referral share (CORRECTED) | "A referrer earns half of the swap fees generated by the people they refer, for 12 months after that person signs up." NOT the checkout fee — the share is on SWAP fees, net of any copy-trade payout on the same transaction. Default 5000 bps over a 12-month window. | Travis 2026-09-25 + referral.service.js / RewardSettings.js | 2026-09-25 |
| Referral rewards paid in SWOP | "Referral rewards are paid in SWOP: the fees collected are used to buy SWOP, which is credited to the referrer." Keep this MECHANICAL — describe the routing, never imply a price or value effect. | Travis, 2026-09-25 | 2026-09-25 |
| Agent credits | "Swop's AI agent runs on credits denominated in the SWOP utility token — users pay for agent actions in SWOP." | Travis, 2026-09-25 | 2026-09-25 |
| No perps/predictions fee (negative, verified) | "Swop does not charge a fee on perpetual futures or prediction markets today." Travis has verified this negative; he notes it is under consideration, so re-check before reusing. | Travis, 2026-09-25 | 2026-09-25 |
| Policy rollout stage | "The policy layer shipped Aug 28, 2026 and is running in shadow (observe-and-log) mode while it soaks; enforcement mode follows." | Travis, 2026-08-28 | 2026-08-28 |

## Needs verification (do NOT cite until moved up)
| Claim | Notes |
|---|---|
| Solana dApp Store review count | Get the real number + link before citing |
| Swap fee rate | A 0.5% swap fee exists (privyWalletService.js references it, and the referral share is computed on it). The exact PUBLIC wording is still unconfirmed — ask Travis before stating a swap-fee number in a post. Previously recorded as fully unconfirmed. The CHECKOUT fee (0.5%, both rails), the referral share (0.25%) and agent pricing (SWOP) were verified 2026-09-24 and moved up; the swap fee was not. Do not infer it from the checkout rate. |
| User / transaction counts | No public number exists yet — never estimate |
| SWOP token — any claim at all | **No token row exists. Blocks cb204 "Copy trading on Solana" (Tue 9/23) and the parked "Swop is the people's network" post.** Proposed wording below — Travis to confirm, correct, or reject each line, then they move up to Verified. |

### Proposed token rows — awaiting Travis (drafted 2026-09-15)

Researched against `swop-app-backend/docs/REWARDS_ARCHITECTURE.md`. **Nothing here may be
published until Travis promotes it.** Note the conflict flagged on 2026-09-11: the
"swap buyback" model is no longer current, so the people's-network post cannot be
written the way it was originally described.

| Proposed claim | Draft wording | Basis |
|---|---|---|
| Swap fee | "Swaps on Swop carry a 0.5% fee." | REWARDS_ARCHITECTURE.md |
| Fee split | "Of that 0.5%, half is paid to the copied trader as a reward and half is retained by Swop." | REWARDS_ARCHITECTURE.md (0.25% / 0.25%) |
| Who earns | "Users earn SWOP by being copy-traded — the earner is the trader being copied, not the person doing the swap." | Product rule confirmed with owner, 2026-07-01 |
| Buyback mechanism | "Each copy-trade reward payout buys SWOP on the open market via Jupiter before it is paid out." | Per-payout Jupiter buyback, signed by a Privy server wallet |
| Ordinary swaps (negative claim) | "Ordinary swaps do not earn SWOP." | Fee-pool batch buyback was REMOVED 2026-07-01. Required because negative claims need a Verified row too. |
| Token identity | Mint `GAehkgN1ZDNvavX81FmzCcwRnzekKMkSyUNq8WkMsjX1`, 9 decimals, Solana | REWARDS_ARCHITECTURE.md |
| Staking | **Do not mention.** Exists only as unmerged branch `origin/wt/swop-staking`. | Not shipped |

Two editorial constraints that apply once these are promoted: keep buyback/value-accrual
framing **mechanical** (how fees route) with no price, return, or appreciation language —
it is investment-adjacent otherwise; and any competitor comparison (Coinbase et al.) must
cite that competitor's own published fee documentation, never our characterisation of it.

## Primary sources to link in posts
- Product: https://www.swopme.co · Web app: https://swopme.app
- Support/docs: https://support.swop.id
- iOS: https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322
- Android: https://play.google.com/store/apps/details?id=com.travisheron.swopapp
- X: https://x.com/swoplabs
