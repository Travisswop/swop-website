# Verified Proof Points

The ONLY numbers and claims the writer may state about Swop. Anything not on this list
gets a `[NEEDS FACT: description]` marker in the draft instead of a made-up value.
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
| Policy rollout stage | "The policy layer shipped Aug 28, 2026 and is running in shadow (observe-and-log) mode while it soaks; enforcement mode follows." | Travis, 2026-08-28 | 2026-08-28 |

## Needs verification (do NOT cite until moved up)
| Claim | Notes |
|---|---|
| Solana dApp Store review count | Get the real number + link before citing |
| Swap fee / pricing details beyond checkout | Confirm public wording with Travis. **Blocks cb201 "How does Swop make money?" (Mon 9/22).** |
| User / transaction counts | No public number exists yet — never estimate |
| SWOP token — any claim at all | **No token row exists. Blocks cb204 "Copy trading on Solana" (Tue 9/23) and the parked "Swop is the people's network" post.** Proposed wording below — Travis to confirm, correct, or reject each line, then they move up to Verified. |

### Proposed RWA row — awaiting Travis (drafted 2026-09-17)

The 9/17 RWA post had to ship with a deliberately generic Swop section, because no
row covers this. Worse, the draft originally asserted the NEGATIVE ("Swop does not
currently list, support, or custody any specific tokenized real-world asset") — which
was caught in review and, on checking, is **false**.

**Evidence gathered 2026-09-17:** a live swap quote through Swop's own engine routed
PAXG → USDC on Ethereum (LiFi, via Bitget), 1 PAXG ≈ 4,355 USDC. So PAXG is at minimum
quotable and routable in-app today.

| Proposed claim | Draft wording | Basis |
|---|---|---|
| RWA tokens are swappable | "Tokenized real-world assets that live on Swop's supported chains — such as PAX Gold (PAXG) on Ethereum — can be swapped in the Swop app through its existing routing, the same as any other token on that chain." | Live quote, 2026-09-17 |

Travis to confirm the wording and how broadly to state it (PAXG specifically vs "any
ERC-20/SPL on a supported chain"), and whether holding/receiving — as distinct from
swapping — should be claimed. Once promoted, `/blog/tokenized-real-world-assets`
should have its "Where Swop fits" section rewritten from generic infrastructure to
something concrete.

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
