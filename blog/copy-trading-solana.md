---
title: "Copy trading on Solana: how it works and where it goes wrong"
url: https://www.swopme.co/blog/copy-trading-solana
description: "Copy trading mirrors someone else's public wallet into yours. Here is what you are delegating, why your fill is never their fill, and what to check before you copy anyone."
published: 2026-11-13
updated: 2026-11-13
---

[Blog](https://www.swopme.co/blog) / Guides

# Copy trading on Solana: how it works and where it goes wrong

Copying someone is a delegation, not a strategy. Your copy is a second, later, separate trade — and almost everything that disappoints people about copy trading flows from that one gap.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Nov 13, 2026 Updated Nov 13, 2026 8 min read Copy link [X](https://x.com/intent/tweet?text=Copy%20trading%20on%20Solana%3A%20how%20it%20works%20and%20where%20it%20goes%20wrong&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fcopy-trading-solana) [Farcaster](https://warpcast.com/~/compose?text=Copy%20trading%20on%20Solana%3A%20how%20it%20works%20and%20where%20it%20goes%20wrong&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fcopy-trading-solana)

Contents What copy trading actually is on Solana Three models, and who can move the money Five ways a mirrored trade loses money Why leaderboards select for luck The questions to ask before you copy anyone Where Swop fits FAQ

Copy trading is sold as a shortcut past having a strategy: find someone who is good at this, point your money at them, go back to your life. The mechanics underneath are less obliging. Nothing is actually copied. Software watches a wallet, notices it traded, and submits a different transaction from your account — later, at your size, at whatever price exists by then, with your costs. Two transactions, two prices, two outcomes. Before you evaluate a single leaderboard, it is worth being precise about that gap, because it is where the money goes.

Solana is where this pattern became ordinary, for a structural reason: every trade on a public chain is visible the moment it settles, so following a stranger’s trading needs no permission, no agreement and no cooperation from the stranger. That cuts both ways, and the second way is the one that rarely gets said out loud — unless a product runs a formal programme, the trader you are copying has not agreed to anything, owes you nothing, and may not know you exist.

## What copy trading actually is on Solana

Strip the branding and there are three moving parts. A **signal**: a wallet you have chosen to watch does something, and that something is public. A**rule**: how that signal becomes an instruction for your money — which tokens, what size, with what limits. And an**authority**: whatever lets a trade be signed on your behalf, or prompts you to sign it. Every copy-trading product is a particular set of answers to those three, and the answers vary far more than the marketing does.

Notice that the signal is the easy part and the only part the leaderboard describes. Public chain data tells you exactly what a wallet bought, when, and at what price. It does not tell you why, what the trade was hedging, how much of that person’s net worth was behind it, whether the wallet is one of several they run, or whether the position was opened as part of something that happens somewhere else entirely. A record of trades is not a record of a strategy. It is the footprints, not the walk.

The rule and the authority are where your outcome is actually decided, and they are usually described in a sentence, if at all.

The leaderboard is the last thing to look at. This is the first.

## Three models, and who can move the money

Products that let you follow someone else’s trading come in three shapes. They are not degrees of the same thing — they fail in genuinely different ways.

- **You deposit, they trade.** Your money sits in an account, vault or program balance that someone else operates. This is the simplest to build and the one where a bad outcome can be total, because the failure does not have to be a bad trade. The question that settles it is not whether withdrawals are allowed but whether withdrawing is an action you take or a request you make. If there is any circumstance in which you ask and wait, you are a creditor of whoever runs it, in addition to being exposed to their trading.
- **You keep custody, you grant a permission.** The funds stay at your own address and you approve a scoped on-chain permission that lets a program trade them. Nobody can send your tokens to themselves, which removes the worst case — but “non-custodial” is doing a lot of work in that sentence, and the scope is the entire safety story. What instructions can it sign? Over which tokens? Up to what size? For how long? And can you end it in one action, by yourself? A permission with no size bound and no expiry is not much narrower than custody.
- **It proposes, you sign.** Software spots the trade and asks you to approve a matching one. This is the safest arrangement available and it is honest about the trade-off: you cannot be both the sole signer of every transaction and faster than a bot. Each approval is a round trip through a human, and the gap between the leader’s fill and yours widens accordingly. It also quietly defeats the thing copy trading is marketed on, which is being asleep.

Pick which of those you actually want, then be suspicious of any product that claims the control of the third with the responsiveness of the second. Authority and speed trade against each other, always, and a design that appears to escape the trade-off has usually just moved the authority somewhere you did not read.

## Five ways a mirrored trade loses money

The disappointing case is not the one where the trader you followed was wrong. It is the one where they were right and you still lost, which happens often enough to be the normal experience rather than an unlucky one. Five mechanisms, roughly in order of how much they cost:

- **You buy their impact.** On a token without deep liquidity, a sizeable buy is part of why the price went up. The signal you are following is generated by the very order that moved the market, and your order arrives afterwards. The thinner the token, the bigger that difference — which means it is largest in exactly the trades that look most exciting on a leaderboard.
- **Predictable flow gets picked off.** A trade on a public chain is visible immediately, and so is the wave of copies that reliably follows a popular wallet. Being a known buyer, in a known direction, a known moment later is a weak position to bid from. The cost arrives as a worse price rather than as a fee, which is why people rarely notice it and almost never attribute it correctly.
- **Size is not risk.** Mirroring an amount is not mirroring a bet. Someone putting two per cent of a large book into a position and you putting forty per cent of a small one into the same token are not doing the same thing, and being right about the token does not rescue you from being wrong about the size. Any product that copies a fixed amount, or a fraction that is not the trader’s own fraction, is handing you a different trade with the same name.
- **Exits mirror worse than entries.** An entry is one clean buy and easy to detect. Exits are frequently staged, partial, routed somewhere else, or expressed by an instrument the mirror does not watch — and a mirror that misses a partial exit leaves you holding a position the trader you copied has already reduced. Most of the result in trading is decided by exits, and most of the reliability in copying lives in entries. That asymmetry is not a bug anyone is in a hurry to fix.
- **Costs accrue per mirrored trade, not per good one.** Every copy is a transaction with its own spread, its own slippage and its own network fee. A trader doing forty round trips a week generates eighty of yours, and the round trips that net to nothing for them are not free for you. Activity is the cost base; only some of it is the strategy.

And the trader can change The wallet that earned a record is not under contract to keep doing the thing that earned it. It can start chasing an incentive programme, test something new, run a second strategy from the same address, or begin selling into the flow that follows it. Nothing notifies you, and the leaderboard will keep showing yesterday’s record for a while.

## Why leaderboards select for luck

Sort a large number of wallets by return over a short window and the top of that list is mostly noise. This is not cynicism about traders, it is arithmetic: return over weeks is maximised by concentration and leverage, which is another way of saying it is maximised by variance. The wallets that took the biggest swings fill both ends of the distribution. You are shown one end.

What the ranking hides is everyone who is no longer in it. Take ten thousand wallets trading volatile tokens, rank them after a month, and the leaders will look extraordinary whether or not a single one of them has an edge — because the ones who swung just as hard and lost have dropped off the page rather than appearing next to them with a warning. A leaderboard is a list of survivors presented as a list of experts.

The filters that carry information are the dull ones, and they are usually available if you are willing to click past the headline figure. How long is the record, and does it include a month the market was unkind? How deep was the worst drawdown, and did the person keep trading the same way through it? How many trades is the result built on — a dozen is a coin flip with a chart attached. Did the return come from one token that worked, or from something that happened repeatedly? Is the record on-chain and reproducible by you, or is it a figure inside an app and a screenshot?

Then ask the question almost nobody asks: who pays this trader, and for what? If the answer is a share of the volume their followers generate, you have hired someone whose income rises with activity and is indifferent to your net result. That is not an accusation of bad faith. It is a description of an incentive, and incentives are more predictable than people.

## The questions to ask before you copy anyone

Everything above compresses into a short list. It is worth answering all of it in writing, before any money moves, because every one of these questions is harder to think about during a drawdown.

- **Custody.** Can I move my funds right now, by myself, with nobody’s cooperation? If not, who is my counterparty and what happens to me if they fail?
- **Scope.** What exactly is the permission allowed to sign — which tokens, which actions, what maximum size, over what period? Say the limit out loud. If you cannot, you have not found it.
- **Revocation.** Which single action actually ends this, is it in my control alone, and do I know where it is before I need it? Turning a toggle off in an app is not necessarily the same as revoking an on-chain permission.
- **Sizing.** Is my position proportional to my account or a fixed number? What does it do when a mirrored trade is larger than I can afford?
- **Exits.** Does it mirror partial exits and stop-outs with the same reliability as entries? If the answer is vague, assume it does not.
- **The record.** Long enough to include a bad month, deep enough in trade count to mean something, and verifiable on-chain rather than asserted.
- **The incentive.** Who pays the trader, who pays the platform, and on what basis.
- **Blast radius.** If this goes as badly as it reasonably can, at the worst possible moment, what fraction of my money was inside it? That fraction is the real position size, not the one in the interface.

A revoked permission is the only one you don’t have to trust Standing approvals outlive your interest in them. An arrangement you stopped thinking about six months ago can still be allowed to act, and the calm-day habit of reviewing what each of your wallets is approved to spend is worth more than any single decision about who to follow. The general version of that discipline is in our [wallet safety checklist](https://www.swopme.co/blog/ai-agent-wallet-safety-checklist).

## Where Swop fits

Swop runs on Solana, Ethereum, Base, and Polygon, and on the first question in this article it has only one answer available to it: You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today. There is no account balance to be let out of, because there is no account balance. That is not a feature we can turn off for a particular product, and it is the reason the deposit model above is not something we can offer you even if it would be easier to build.

The same key property is what makes the exit from us boring, which is the part worth caring about: losing your phone doesn’t mean losing your funds — log in with your email on any phone and your Swop wallet comes back with it. You can also save your private key, which lets you open your assets in any wallet you choose. An app that holds your key is a place your money can be stuck. An app that doesn’t is a reader of the chain that you can walk away from.

Two smaller mechanics matter to anyone whose trades are being generated by something other than their own attention. Swop has a built-in swap: you get a quote and sign inside the app, without sending funds to an exchange or connecting to a separate site — so following a strategy does not require a trip to a venue that would hold your funds while you were there. And Swop routes Solana swaps through Jupiter and EVM swaps through LiFi, quoting Solana swaps with a 50 bps default slippage tolerance. That is a default rather than a ceiling, and it is adjustable, which matters here specifically: slippage tolerance is the setting that decides what a late fill is allowed to cost you, and a late fill is the defining feature of a copied trade.

On delegated authority, the thing we have actually built and written down is the AI agent, and it is worth describing precisely rather than by analogy. Swop’s agent proposes; you approve. Nothing signs without a tap, and the agent never holds keys — the third model above, by construction. Underneath it, Swop’s Goldman trading agent runs under an [ERC-8196-inspired policy layer](https://www.swopme.co/blog/erc-8196-agent-policy): each vault carries a versioned policy, expanding a policy’s authority requires the owner’s EIP-712 signature, and every enforcement decision is written to a per-vault hash-chained audit log. In other words, the scope question from the checklist has a written answer, widening the scope needs your signature rather than a setting, and the record of what was allowed is append-only.

Two honest limits on that, because a delegation page without them is marketing. Enforcement happens at Swop’s backend signing seam — the point every agent transaction must pass to be signed — and the audit chain makes any violation provable. It is not an on-chain guarantee. And the policy layer shipped Aug 28, 2026 and is running in shadow (observe-and-log) mode while it soaks; enforcement mode follows. Separately, and relevant to anyone deciding how much to trust any of this: Swop has not commissioned a third-party security audit to date. We would rather you knew that while you were reading the paragraph above than after.

Swop is on [iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322), [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp), and the web at [swopme.app](https://swopme.app). For what any particular feature does today, [support.swop.id](https://support.swop.id) is the official channel — and it is the only one. Anyone who messages you first offering to trade on your behalf is not us.

## FAQ

### Is copy trading on Solana safe?

The trading is as risky as the trades. The part you can actually control is the arrangement around it, and that comes down to one question: who is able to move your money. If you deposit into an account someone else trades, withdrawing is a request you make to a counterparty. If the funds stay at your own address and you grant a scoped permission instead, nobody can send them anywhere else, and your exposure is whatever that permission allows. Read the permission before you read the leaderboard.

### Why did my copied trade lose money when the trader I copied made money?

Because you did not make their trade. You made a second, later, separate trade in the same token. You filled after them, often at a price their own buying helped create; your position was a different size relative to your account than theirs was to theirs; and the exit may have mirrored less reliably than the entry did. On a thin token those gaps are large enough to turn their gain into your loss without anything malfunctioning.

### Does copy trading mean giving someone my private key?

It should never mean that, and no legitimate product asks for it. A private key or recovery phrase is total, permanent control of everything at that address, and handing it over is not a delegation, it is a transfer. Real designs either custody funds you deposit, or ask you to approve a scoped on-chain permission, or ask you to sign each mirrored trade yourself. Anyone who needs your key or your seed phrase to copy trades for you is stealing from you.

### How do I pick someone to copy?

Not by sorting the leaderboard by return. A short window ranked by return puts the wallets that took the wildest swings at the top, and the ones that took equally wild swings and lost simply stop being shown to you. The filters worth using are the dull ones: how long the record is and whether it covers a bad month, how deep the worst drawdown went, how many trades it rests on, and whether the result came from one lucky token or from something repeated. Then ask who pays that trader and on what basis, because someone paid on the volume they generate has a reason to trade more than is good for you.

### Can I stop copy trading at any time?

That depends on the model, and it is worth knowing before you start rather than during a drawdown. Turning a feature off inside an app is not the same as revoking an on-chain permission, and a standing permission does not expire when you lose interest in it. Find out which action actually ends the arrangement, confirm you can take it without anyone else’s cooperation, and know where it is before you need it. Reviewing what every wallet of yours is approved to spend is a calm-day habit.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### Something not adding up?

Email us and paste the transaction hash or the link you used. That one string is how anyone — you, us, any block explorer — finds out what actually happened instead of guessing.

[Email support@swopme.co](mailto:support@swopme.co) [Follow @swoplabs](https://x.com/swoplabs)

Swop App

### Delegate the work. Keep the key.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
