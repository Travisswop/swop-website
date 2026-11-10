---
title: "Tokenized Isn’t the Same as Yours: Custody Is the Real Variable in RWA Tokenization"
url: https://www.swopme.co/blog/tokenized-isnt-the-same-as-yours
description: "Tokenized real-world assets passed $32 billion in 2026 — and the largest category reverts if you send it to a wallet nobody approved. Custody, not the chain, decides who gets to participate."
published: 2026-10-13
updated: 2026-10-13
---

[Blog](https://www.swopme.co/blog) / Perspective

# Tokenized isn’t the same as yours

Tokenized real-world assets passed $32 billion this year. The largest category of them reverts if you send it to a wallet nobody approved — and that is a design choice, not a technical limit. Custody is the variable that decides what tokenization is actually for.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Oct 13, 2026 Updated Oct 13, 2026 9 min read Copy link [X](https://x.com/intent/tweet?text=Tokenized%20isn%27t%20the%20same%20as%20yours.&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Ftokenized-isnt-the-same-as-yours) [Farcaster](https://warpcast.com/~/compose?text=Tokenized%20isn%27t%20the%20same%20as%20yours&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Ftokenized-isnt-the-same-as-yours)

Contents $32 billion, and most of it can’t move The allowlist is the product Gold took a different road Custody is a dial Why the dial decides who gets in What self-custody doesn’t fix Where Swop fits FAQ

There is a sentence that gets repeated at every tokenization conference, and it is almost right: put the asset on a chain and anyone can own a piece of it.

Almost. The chain is the easy part. What determines whether anyone can own a piece of it is a decision the issuer makes about custody — and in 2026, for the biggest slice of the market, that decision has gone the other way.

## $32 billion, and most of it can’t move

The numbers are real and they are growing fast. On-chain value across tokenized real-world assets reached about **$32 billion at the end of June 2026**, excluding stablecoins — up from roughly $11.8 billion a year earlier, according to [RWA.xyz](https://app.rwa.xyz/). US Treasuries are the largest single category by a wide margin. Commodities are a much smaller slice, and gold is the large majority of that slice. Tokenized equities are small but growing quickly; tokenized real estate, despite being the example everybody reaches for, is still a rounding error.

One caution about those headline figures, because they get quoted loosely: trackers publish both the value of tokens actually distributed on-chain and the much larger value of assets merely represented there, and the gap between those two measures is enormous. Totals that fold in stablecoins are larger again and not comparable at all. Growth this fast attracts round numbers, and the round numbers are usually measuring different things.

But the size of the market is not the interesting fact. This is: **if you buy the largest category of tokenized asset and then try to move it to a wallet you control, the transfer fails.**

## The allowlist is the product

Tokenized Treasury funds — BlackRock’s BUIDL, [Ondo’s OUSG](https://ondo.finance/ousg), and their peers — run an on-chain allowlist. The issuer, or its transfer agent ( [Securitize](https://securitize.io/), in BUIDL’s case), adds a wallet address to that list only after the holder behind it clears identity checks, sanctions screening and investor-eligibility verification. A transfer to an address that is not on the list does not get flagged for review later. It reverts at the contract level, immediately, as a matter of code.

The practical consequence is worth stating plainly: move BUIDL to a new self-custody wallet and the transfer fails unless that new address has been approved first. Peer-to-peer transfer to someone who is not on the list is not difficult or discouraged. It is impossible by construction.

It is important to be fair about why. These are regulated securities offerings, and the exemptions they rely on genuinely restrict who may hold them — BUIDL is offered to qualified purchasers, a bar that in practice means institutional-scale money. The allowlist is simply how that legal restriction gets enforced in code instead of in a filing cabinet. It is doing a real job, honestly.

The point is not that the gate is illegitimate. The point is that **the gate now travels with the asset**. In the old world, the restriction lived in your relationship with a broker. Tokenizing it did not remove it; it compiled it into the thing itself.

## Gold took a different road

Compare Paxos’s [PAX Gold](https://www.paxos.com/pax-gold). It is an ordinary ERC-20 token: any Ethereum wallet can receive it, hold it and send it on, with no approval step and no list to be added to. A person with a phone and no banking relationship at all can hold a token backed by allocated gold.

That is a meaningfully different design, and it is worth not overselling it. PAXG is permissionlessly held, but it is not an unowned bearer instrument. The contract is centrally administered: per [Paxos’s own documentation](https://docs.paxos.com/), there are roles that can mint and burn supply, pause transfers and freeze balances where law requires it. And redemption — the thing that makes the token worth anything — runs through Paxos’s verified customers, with minimum sizes that put physical delivery well out of reach of a small holder.

So neither of these assets is simply “yours.” But the difference between them is not cosmetic. In one case you cannot hold the token without permission. In the other you can hold and move it freely, and the issuer’s controls sit at the edges — at issuance, at redemption, and at the legal exceptions. Those are different worlds for anybody who is not already inside the financial system.

Custody is a dial, not a property of being “on-chain.” Every tokenized asset sits somewhere on it, by design.

## Custody is a dial

This is the part that gets lost. “On-chain” is not one thing. Every tokenized asset makes two separate choices, and only one of them is about blockchains:

**Can the holder be anyone?** Either the token enforces a list of approved addresses, or it does not. This is a binary, it is written in the contract, and it decides whether participation requires a relationship with the issuer.

**Can the issuer intervene after the fact?** Pause, freeze, mint, burn, upgrade. Almost every asset-backed token keeps some of these powers, and for assets with a legal claim behind them, it is hard to see how it could be otherwise.

A tokenized Treasury fund answers “no” to the first and “yes” to the second. It is, functionally, a faster ledger at the same custodian — which is a genuine improvement for the institutions using it, and almost no change at all for everyone else. Tokenized gold answers “yes” and “yes.” A native crypto asset answers “yes” and “no,” and pays for it by having no redemption claim at all.

None of these is the right answer in the abstract. But notice that the technology does not pick. The issuer does.

## Why the dial decides who gets in

Here is why this matters more than the market-size chart.

The standard argument for tokenization is inclusion: fractional ownership, lower minimums, global access, a market open on a Sunday. Every part of that argument depends on the first dial being set to “anyone can hold it.” If the token requires an approved address, then the people it reaches are the people who can already get approved — which is roughly the set of people who could already buy the asset.

A tokenized Treasury fund with a qualified-purchaser gate and an institutional minimum has not widened access to Treasuries. It has made Treasury settlement faster for people who already hold Treasuries. That is worth doing. It is just not the thing the inclusion argument promised.

Whereas a person with a phone, no bank account and no accredited-investor letter can hold tokenized gold today. Not because gold is special, but because somebody designed that token so the holder did not need permission. That is the whole difference.

The word “tokenized” answers none of these. The issuer’s documentation and the token contract answer all three.

## What self-custody doesn’t fix

It would be easy to end here with self-custody as the answer to everything, and that would be dishonest.

Self-custody removes one specific risk: that an intermediary standing between you and your position blocks it, loses it, or goes away. That is not a small risk, and the last several years have been an extended demonstration of it.

What self-custody does not remove is the issuer. A tokenized gold or Treasury token is a claim. Its value rests on an entity continuing to hold the real asset and continuing to honour redemption. Hold the token in your own wallet and you have removed the custodian; you have not removed the counterparty. And as noted above, redemption usually runs through verified accounts and minimum sizes that a small holder will not clear — so for most people, the practical exit is selling the token to someone else, not redeeming it for the thing.

Self-custody also hands you the key problem. Lose the key and there is no support line that can restore it. That trade-off is the price of the gate being gone, and anyone advocating self-custody who does not say so plainly is selling something.

## Where Swop fits

Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them. That is the side of the dial we build on, and it is a deliberate choice rather than a technical accident.

Concretely: tokenized real-world assets that live on Swop’s supported chains — such as PAX Gold on Ethereum — can be swapped in the Swop app through its existing routing, the same as any other token. Swop runs on Solana, Ethereum, Base and Polygon, and transactions are gas-sponsored, so holding a tokenized asset does not require first acquiring the chain’s native token to pay a fee. Swop covers the network fee; it is a cost Swop absorbs, not a charge passed through to you.

What that adds up to is narrow and worth stating precisely: for the tokenized assets that were designed to be held without permission, Swop lets you hold and move them without a custodian, an approval queue, or a gas balance. It does not get you into an allowlisted fund — nothing can, except being the kind of holder that fund was offered to. And for completeness, in the spirit of the three questions above: Swop has not commissioned a third-party security audit to date.

The broader point is the one worth carrying out of this piece. The tokenization story is usually told as though the chain is the interesting part. It isn’t. The chain is settled technology. The open question for the next decade of this market is which way issuers set the custody dial — and that question is being answered, asset by asset, right now, mostly in favour of the people who were never locked out in the first place.

## FAQ

### If an asset is tokenized, can I hold it in my own wallet?

Sometimes, and it depends entirely on how the issuer designed the token rather than on the chain it runs on. Tokenized Treasury funds such as BUIDL and OUSG operate an on-chain allowlist: a wallet is added only after that holder clears identity, sanctions and investor-eligibility checks, and a transfer to an address that is not on the list fails at the contract level. Moving BUIDL to a new self-custody wallet means getting that new address approved first. Other tokens, such as PAX Gold, can be received and transferred by any ordinary Ethereum wallet with no approval step.

### How big is the tokenized real-world asset market in 2026?

Roughly $32 billion of on-chain value as of the end of June 2026, excluding stablecoins, up from about $11.8 billion a year earlier, per RWA.xyz. US Treasuries are the largest category; commodities are much smaller, and gold is most of that. Compare headline numbers carefully: trackers report both value actually distributed on-chain and the far larger value of assets merely represented there, and totals including stablecoins are not comparable.

### Why do tokenized Treasury funds use an allowlist at all?

Because they are regulated securities offerings and the exemption they rely on limits who may hold them — BUIDL is offered to qualified purchasers, which in practice means institutional-scale investors. The allowlist enforces that restriction in code rather than on paper. It is doing a real job; the point is that the restriction now travels with the token.

### Does self-custody make a tokenized asset risk-free?

No. It removes the risk that an intermediary blocks or loses your access. It does not remove the issuer. A tokenized asset is a claim, and that claim depends on the issuer holding the asset and honouring redemption — and redemption typically requires a verified account and a minimum size a small holder may not meet. Holding it yourself and being able to redeem it yourself are different things.

### What should I check before treating a tokenized asset as mine?

Whether it can be transferred to an address the issuer has not pre-approved; whether the issuer can freeze or pause balances, and under what conditions; and what redemption actually requires. Those answers are in the issuer’s documentation and the token contract, and they vary widely between assets all described as “tokenized.”

Self-custody

### Hold it yourself

Swop is self-custodial, runs on Solana, Ethereum, Base and Polygon, and sponsors gas — so holding a token doesn’t mean first buying one to pay a fee.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
