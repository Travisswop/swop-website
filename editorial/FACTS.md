# Verified Proof Points

The ONLY numbers and claims the writer may state about Swop. Anything not on this list
gets a `[NEEDS FACT: description]` marker in the draft instead of a made-up value.
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
| Policy exits always open | "Risk-reducing actions — exits, cancels, and withdrawals back to the owner — are never blocked by the policy layer. The owner can always get out." | Travis, 2026-08-28 | 2026-08-28 |
| Policy enforcement seam (honest framing) | "Enforcement happens at Swop's backend signing seam — the point every agent transaction must pass to be signed — and the audit chain makes any violation provable. It is not an on-chain guarantee." | Travis, 2026-08-28 | 2026-08-28 |
| Policy rollout stage | "The policy layer shipped Aug 28, 2026 and is running in shadow (observe-and-log) mode while it soaks; enforcement mode follows." | Travis, 2026-08-28 | 2026-08-28 |

## Needs verification (do NOT cite until moved up)
| Claim | Notes |
|---|---|
| Solana dApp Store review count | Get the real number + link before citing |
| Swap fee / pricing details beyond checkout | Confirm public wording with Travis |
| User / transaction counts | No public number exists yet — never estimate |

## Primary sources to link in posts
- Product: https://www.swopme.co · Web app: https://swopme.app
- Support/docs: https://support.swop.id
- iOS: https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322
- Android: https://play.google.com/store/apps/details?id=com.travisheron.swopapp
- X: https://x.com/swoplabs
