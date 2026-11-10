---
title: "The Unbanked Don't Need a Bank. They Need a Ledger."
url: https://www.swopme.co/blog/banking-the-unbanked-self-custody
description: "1.3 billion adults have no financial account while 86% own a phone. That gap is not technology — it is unit economics. Tokenization is what changes the math."
published: 2026-10-06
updated: 2026-10-06
---

[Blog](https://www.swopme.co/blog) / Perspective

# The unbanked don’t need a bank. They need a ledger.

1.3 billion adults have no financial account. 86% of adults own a phone. The gap between those two numbers is not a technology problem — and tokenization is what finally changes the arithmetic underneath it.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Oct 6, 2026 Updated Oct 6, 2026 9 min read Copy link [X](https://x.com/intent/tweet?text=The%20unbanked%20don%27t%20need%20a%20bank.%20They%20need%20a%20ledger.&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fbanking-the-unbanked-self-custody) [Farcaster](https://warpcast.com/~/compose?text=The%20unbanked%20don%27t%20need%20a%20bank&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fbanking-the-unbanked-self-custody)

Contents Two numbers that don't fit together Why banks don't serve them What an account costs to open The part tokenization changes What a wallet still can't do Where this is actually going FAQ

Two numbers from the same World Bank survey. **1.3 billion adults have no account**at a bank, a financial institution, or a mobile money provider.**86% of adults worldwide own a mobile phone.** Put those side by side and the usual explanation falls apart: whatever is keeping a billion people out of the financial system, it is not that they lack a device, and it has not been for years.

The honest answer is less comfortable than a technology gap. It is arithmetic. A bank account costs a fixed amount to open and run, that cost does not shrink with the balance, and below a certain balance the account loses money. Nobody is being excluded out of malice. They are being excluded by a spreadsheet.

World Bank Global Findex 2025. The device arrived a decade ago; the account didn’t follow.

## Two numbers that don’t fit together

More than half of those 1.3 billion adults live in just eight countries — Bangladesh, China, Egypt, India, Indonesia, Mexico, Nigeria and Pakistan. These are not places without infrastructure, banks or smartphones. They are places where a large share of people sit below the line at which a conventional account makes commercial sense.

And the cost of being below that line is measurable. Sending money home through a bank averages **9.50%**in fees globally, against**3.65%** through digital providers. The people least able to absorb a 10% haircut are the ones most likely to be routed through the channel that charges it, because it is the one that will have them.

## Why banks don’t serve them

It is worth being precise about the mechanism, because “banks exclude the poor” is both true and uselessly vague.

Opening an account requires identity verification, sanctions screening and ongoing compliance monitoring. Those costs are close to fixed: verifying a customer with forty dollars costs roughly what it costs to verify one with forty thousand. Add branch overhead, card issuance, dormancy handling and regulatory capital, and the economics only work above a balance threshold. Below it, every account is a small recurring loss.

Mobile money moved that threshold down considerably, which is why account ownership has climbed for fifteen years. But it moved the threshold; it did not remove it. There is still an institution deciding whether you clear a bar, still a counterparty holding the balance, and still a jurisdiction where that institution either operates or doesn’t.

The structural point Every model that improves access by making the institution cheaper still ends with an institution granting permission. The threshold moves. It never reaches zero, because a company that loses money per account will eventually stop opening them.

## What an account costs to open

A self-custodial wallet is a keypair. Generating one costs nothing, requires nobody’s approval, and carries no minimum balance, because there is no institution bearing a per-account cost that needs recovering. There is no application to be rejected, because there is no application.

That is the structural difference, and it is worth separating from the usual rhetoric. The claim is not that self-custody is better than banking. It is narrower and harder to argue with: **the cost of issuing one more account is effectively zero, so the economics that excluded a billion people stop applying.** Whether the resulting thing is useful is a separate question — and for most of crypto’s history, the honest answer was “not very.”

## The part tokenization changes

Here is what actually changed, and why this argument is stronger in 2026 than it was in 2021.

For most of the last decade, a wallet gave someone access to volatile assets. Telling a person living on an uncertain income that they can now hold something that might fall 40% in a month is not financial inclusion. It is a different kind of exclusion with better branding.

Tokenization changes what the wallet can hold. Stablecoins put dollars in it. Tokenized Treasuries put government debt in it — Ondo’s USDY, backed mainly by short-term US Treasuries, runs to roughly $2.1 billion. Tokenized gold puts allocated metal in it: each PAX Gold token represents one fine troy ounce of LBMA Good Delivery gold vaulted in London. Tokenized equities put index exposure in it, with Ondo’s stock products spanning more than 440 US stocks and ETFs.

Not “hold this volatile asset” — hold what wealthy people hold to store value, in an account nobody had to approve.

So the pitch stops being “hold this volatile asset” and starts being **“hold the same things wealthy people hold to store value — dollars, Treasuries, gold — in an account nobody had to approve.”** That is a materially different proposition, and it is the one that makes the inclusion argument serious rather than aspirational.

It is also already happening without anyone’s permission. Roughly **$33 trillion** in stablecoin transfers settled on public blockchains in 2025, up 72% year over year, and 71% of Latin American firms now report using stablecoins for cross-border settlement — the highest rate anywhere. People are not waiting for a product launch. They are routing around a system that didn’t want their balance.

## What a wallet still can’t do

An argument like this is only worth making if it survives its own counterexamples, so here are the ones that matter.

- **No credit.** A wallet holds value; it does not extend any. Much of what makes a bank relationship valuable — a mortgage, a working-capital loan, an overdraft that covers a bad week — has no self-custodial equivalent, and pretending otherwise would be dishonest.
- **No recourse.** There is no chargeback, no fraud department, no reversal of a mistaken transfer. The same property that removes the gatekeeper removes the safety net.
- **Key loss is real.** This is the serious one. A seed phrase is a secret a person must protect perfectly, forever, and losing it means losing everything. Recovery design is the weakest part of this story industry-wide, and any version of “self-custody banks the unbanked” that skips past it is selling something.
- **Local law still applies.** A rail does not override a jurisdiction. Some countries restrict this activity outright, and a wallet does not change what is permitted where you live.

Those are not footnotes. They are the reason the honest framing is a ledger entry you control rather than “a bank in your pocket.” It does fewer things than a bank. It does them for everyone.

## Where this is actually going

The direction of travel is that an account stops being something granted and becomes something generated — and that what sits inside it stops being a bet and becomes an asset.

Two things have to keep improving for that to matter at scale, and both are tractable. The first is recovery: wallets have to stop asking ordinary people to protect a secret perfectly forever. The second is cost at the edges — a person cannot be expected to acquire a network’s gas token before they can touch the money they already hold.

That is the part of this Swop is built around. You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today. And losing your phone doesn’t mean losing your funds: log in with your email on any phone and your Swop wallet comes back with it, and you can save your private key and open your assets in any wallet you choose. Transactions are gas-sponsored, so you don’t need to hold SOL or ETH to transact. Swop runs on Solana, Ethereum, Base, and Polygon, and tokenized real-world assets that live on those chains — PAX Gold on Ethereum, for instance — can be swapped in the app through its existing routing, the same as any other token.

None of which is a claim that the problem is solved. It is a claim about which problem is worth working on. The world has spent twenty years trying to make the institution cheap enough to serve everyone. The more interesting bet is that the account doesn’t need an institution at all — and that what you can hold in it is now worth holding.

## FAQ

### Why are 1.3 billion adults unbanked if most of them own a phone?

Because the barrier is unit economics, not technology. A bank account carries fixed costs — identity verification, compliance, servicing — that do not shrink with the balance, so an account holding forty dollars costs more to run than it earns and does not get offered. The World Bank’s Global Findex 2025 counts 1.3 billion adults with no account at a bank, financial institution or mobile money provider, while 86% of adults worldwide own a mobile phone.

### What does tokenization have to do with financial inclusion?

It changes what someone without a bank account can actually hold. A wallet used to mean access mainly to volatile crypto. The same wallet can now hold tokenized dollars, Treasuries and gold — the instruments people use to store value rather than speculate. Access to a wallet becomes access to savings, not just to a trade.

### Is a self-custody wallet really an alternative to a bank account?

It replaces some functions and not others. It holds value, receives payment and moves money with no minimum, no documentation and nobody’s approval. It does not provide credit, deposit insurance or recourse, and the responsibility for keys sits with the holder. It is a ledger entry you control, not a banking relationship.

### What is the biggest risk for someone using a wallet instead of a bank?

Key loss, and the absence of recourse. No support line can reverse a mistaken transfer or restore a wallet whose recovery was never set up. Recovery design is the weakest part of this industry-wide, and any version of this argument that treats it as a footnote is selling something.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
