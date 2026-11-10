---
title: "Agentic trading is live — Swop"
url: https://www.swopme.co/blog/agentic-trading-is-live
description: "Astro reads the book, sizes the position, and asks before it acts. How Swop built an agent for spot, perps, and prediction markets that confirms before it moves money."
published: 2026-08-19
updated: 2026-08-19
---

[Blog](https://www.swopme.co/blog) / Product

# Agentic trading is live: your wallet can now hold an opinion

Astro reads the book, sizes the position, and asks before it acts. We spent nine months making an agent that is boring in exactly the right places.

MK Myron Kaplan Aug 19, 2026 11 min read Copy link [X](https://x.com/intent/tweet?text=Agentic%20trading%20is%20live%20on%20Swop&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fagentic-trading-is-live) [Farcaster](https://warpcast.com/~/compose?text=Agentic%20trading%20is%20live%20on%20Swop&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fagentic-trading-is-live)

Contents What shipped Why an agent, and why now The confirmation model What it will not do What's next

Most crypto automation to date has been a script with a marketing page. You set a trigger, it fires, and you find out what happened when your balance changes. That model works right up until the market does something the script has never seen, which is roughly every third week.

Astro is our attempt at the other thing: an agent that carries context between sessions, forms a position on what it is looking at, and comes back to you before it moves money. It has been running in private beta since March. Today it is available to everyone on Swop.

## What shipped

Three surfaces, all backed by the same agent. You can reach it from the wallet home screen, from any market page, and from Messenger — the context follows you between them.

- **Position sizing.** Tell Astro your risk tolerance once. It sizes every proposal against your actual balance, not a percentage you have to compute in your head.
- **Market reads.** Ask about a pair, a perp, or a prediction market and get depth, funding, and the last four hours of flow, summarized in a paragraph rather than a dashboard.
- **Standing intents.** "If SOL funding flips negative for six hours, tell me." The agent watches; it does not act on its own.

9 mo

In development

41k

Beta proposals

400ms

Median response

## Why an agent, and why now

The honest answer is that the interface stopped scaling. A wallet that holds spot, perps, prediction markets, and yield positions has too many surfaces for a person to check with any discipline. We watched beta users open the app, glance at four screens, and close it without having actually understood anything. That is a design failure, and no amount of chart polish fixes it.

An agent is not a feature we added to the wallet. It is the admission that the wallet had become too big to read.

The second reason is that models finally got good enough at the boring part. Not at picking trades — at reading state. Astro's job is mostly reconciliation: what do you hold, what changed since you last looked, what does that imply about the thing you said you cared about last week. That is a task where being reliable matters far more than being clever, and it is the task we optimized for.

## The confirmation model

Every action that moves value goes through the same gate. Astro drafts the transaction, shows you the exact amounts, the slippage assumption, and the reasoning in two sentences. Nothing signs without a tap.

We debated an autonomous mode for months and did not ship one. The failure mode is not that the agent makes a bad trade — humans make those constantly. It is that a bad autonomous trade is unattributable. You cannot learn from a decision you did not watch being made.

Security note Astro never holds keys. Proposals are unsigned transaction objects rendered in the app; signing happens locally in your wallet, exactly as it does when you tap Swap. Revoking the agent's read access takes one toggle in Settings and takes effect immediately.

### What the gate looks like in practice

A proposal card carries four things: the action, the size, the assumption it is built on, and the thing that would make it wrong. That last field was the hardest to get right, and it is the one beta users told us they read first.

## What it will not do

Astro will not open positions unprompted, will not compound without asking, and will not recommend an asset because someone paid us. There is no sponsored inventory in the agent and there will not be. If that ever changes, it will change in a post like this one, before it ships.

It is also not a research terminal. It reads state and explains it. For deep fundamental work, use a tool built for that — we would rather Astro be exactly right about your portfolio than approximately right about everything.

## What's next

Multi-step intents are in testing: chains of conditional actions that still confirm at every value-moving step. After that, shared agents for teams, so a fund's operator and its analyst can look at the same context without sharing a seed phrase.

If you find a case where Astro is confidently wrong, send it to us. Those reports shaped most of what made the release.

MK

Myron Kaplan

Co-founder at Swop. Writes about product decisions, market structure, and the parts of building an exchange nobody warns you about.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
