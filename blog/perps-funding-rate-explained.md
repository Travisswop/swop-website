---
title: "Perpetual Futures Funding Rate, Explained"
url: https://www.swopme.co/blog/perps-funding-rate-explained
description: "A funding rate is a recurring payment between long and short perpetual futures traders that keeps a contract's price anchored to the spot market."
published: 2026-09-10
updated: 2026-09-10
---

[Blog](https://www.swopme.co/blog) / Guides

# Perps funding rates, explained like you're new here

Perpetual futures don't expire, so exchanges use a periodic payment between longs and shorts to keep the contract's price tied to the spot market. Here's what decides which side pays.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Sep 10, 2026 Updated Sep 10, 2026 6 min read Copy link [X](https://x.com/intent/tweet?text=Perps%20funding%20rates%2C%20explained%20like%20you%27re%20new%20here&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fperps-funding-rate-explained) [Farcaster](https://warpcast.com/~/compose?text=Perps%20funding%20rates%2C%20explained%20like%20you%27re%20new%20here&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fperps-funding-rate-explained)

Contents Why perpetuals need a funding rate How the payment direction is decided What actually moves the rate Reading the rate before you trade Where Swop fits FAQ

A perpetual futures funding rate is a periodic payment exchanged directly between traders holding long and short positions — not a fee paid to the exchange — designed to keep a perpetual contract's price anchored to the underlying spot price. When the perpetual trades above spot, longs pay shorts; when it trades below spot, shorts pay longs. The payment recurs on a fixed schedule (commonly every 1, 4, or 8 hours, depending on the exchange) and its size scales with how far the contract has drifted from spot.

## Why perpetuals need a funding rate

A standard futures contract has an expiry date, and as that date approaches, its price naturally converges toward the underlying spot price — arbitrage closes the gap on its own. A perpetual futures contract, by design, never expires, so it has no such convergence mechanism built in. Without something to anchor it, a perpetual could trade meaningfully above or below spot indefinitely, especially in a crowded, one-sided market.

The funding rate is that anchor. It's a periodic transfer between position holders that makes it expensive to stay on the crowded side of the trade, which pulls demand back toward balance and the contract's price back toward spot — without ever needing an expiry date to force the issue.

## How the payment direction is decided

Exchanges calculate funding by comparing two numbers: the perpetual's own mark price and an index price built from spot prices across several external venues. When the mark price sits above the index price, the contract carries a positive premium — the market is paying up to be long — and longs pay shorts. When the mark price sits below the index, the premium is negative, and shorts pay longs instead.

The published rate is usually capped and smoothed with a small built-in interest-rate component, so it doesn't snap instantly to whatever the raw premium says at any given moment — it's an average taken over the funding interval, not a single price snapshot.

## What actually moves the rate

The premium between mark and index price is driven by order-book demand: when far more traders want to be long than short, buyers bid the perpetual above spot to get in, and funding turns positive to compensate the shorts willing to hold the other side of that crowded trade. The reverse happens in a market leaning heavily short.

Funding tends to spike hardest right after a fast, one-directional move, when positioning is most lopsided — which is also often the point where a reversal becomes more likely, since paying a steep periodic rate to stay in a crowded trade eventually pushes the least-convinced holders out.

## Reading the rate before you trade

Exchanges usually quote funding per interval — per 8 hours is common — rather than annualized, which understates how much it compounds over time. A rate of 0.01% paid every 8 hours works out to roughly 10.95% a year if it held steady: multiply the interval rate by the number of intervals in a year to get a rough annualized figure.

Quick way to annualize Interval rate × (24 ÷ hours per interval) × 365. For an 8-hour interval, that's interval rate × 1,095.

For a position held more than a few days, funding is a real, recurring cost — or income, if you're on the side collecting it — that belongs in the same mental bucket as a swap fee or a borrow rate, not as background noise.

## Where Swop fits

Swop's trading agent works across spot, perpetual futures, and prediction markets from inside the same wallet — reading a market's depth and recent flow, summarizing it in a paragraph instead of a dashboard, and proposing a trade you approve before anything signs. That confirmation model is the same one Swop uses everywhere it touches your funds: [the agent proposes, you approve, and nothing signs without a tap](https://www.swopme.co/blog/agentic-trading-is-live).

Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them — and it runs on Solana, Ethereum, Base, and Polygon. Transactions on Swop are gas-sponsored — you don't need to hold SOL or ETH to transact. If you also trade prediction markets and want the mechanics behind their pricing, see [Prediction markets 101](https://www.swopme.co/blog/prediction-markets-101). Swop is available on [iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) and [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp), and as a web app at [swopme.app](https://swopme.app).

## FAQ

### What is a funding rate in perpetual futures?

A funding rate is a periodic payment exchanged directly between traders holding long and short positions on a perpetual futures contract — not a fee paid to the exchange. It exists because perpetuals have no expiry date to force their price back to spot, so funding does that job instead by making it costly to stay on the crowded side of the trade.

### Who pays the funding rate — longs or shorts?

It depends on which side is more crowded. When the perpetual's price trades above the underlying spot (index) price, the rate is positive and longs pay shorts. When it trades below spot, the rate is negative and shorts pay longs instead. The payment flows directly between traders on opposite sides, not to the exchange.

### How often is funding paid?

It varies by exchange and by contract — common intervals are every 1, 4, or 8 hours, though some venues fund continuously. Exchanges typically quote the rate per interval rather than annualized, which can make a small-looking number add up to a meaningfully larger cost or return over weeks of holding a position.

### Can the funding rate be negative, and what does that mean?

Yes. A negative rate means the perpetual is trading below the spot price, usually because more traders are positioned short than long. In that case shorts pay longs, the reverse of the more commonly seen positive-rate scenario where longs are the crowded side.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
