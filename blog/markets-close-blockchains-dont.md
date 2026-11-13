---
title: "Markets Close. Blockchains Don't. What That Actually Fixes."
url: https://www.swopme.co/blog/markets-close-blockchains-dont
description: "Why Robinhood restricted GameStop buying in 2021, what the settlement clock has to do with it, and an honest comparison of perpetual futures against options and tokenized stocks against a broker."
published: 2026-11-13
updated: 2026-11-13
---

[Blog](https://www.swopme.co/blog) / Perspective

# Markets close. Blockchains don’t.

In January 2021 the buy button disappeared, and the reason was a clock, not a conspiracy. Here is what always-on rails genuinely fix — and the part of the pitch that runs the other way.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Nov 13, 2026 Updated Nov 13, 2026 12 min read Copy link [X](https://x.com/intent/tweet?text=Markets%20close.%20Blockchains%20don%27t.&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fmarkets-close-blockchains-dont) [Farcaster](https://warpcast.com/~/compose?text=Markets%20close.%20Blockchains%20don%27t.&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fmarkets-close-blockchains-dont)

Contents What actually took the buy button away Why the window exists at all The clock, and how much of it is left Perps and options: fewer moving parts, no floor What always-on actually costs Where the argument reverses: tokenized stocks Where Swop fits FAQ

On 28 January 2021, retail brokers including Robinhood stopped letting customers buy GameStop. The popular explanation is that somebody pulled a lever to protect somebody else. The duller explanation is better supported and far more useful: a stock trade executes instantly but settles later, and in the gap between those two moments a clearinghouse carries the risk and demands collateral for it. Volatility made that number enormous overnight, and the cheapest way for a broker to shrink it was to stop new buying. The buy button was not a verdict on who deserves to trade. It was a margin call arriving through a settlement window — and that window is the thing blockchains actually remove.

$6.9bn

Intraday margin calls, 27 Jan 2021

26

Clearing members called, not one

T+1

US settlement since 28 May 2024

## What actually took the buy button away

Robinhood’s own account is that the National Securities Clearing Corporation demanded a large additional deposit, and that restricting buying was how it brought that demand back down. Vlad Tenev put the additional requirement at roughly $3 billion; other accounts describe the firm’s deposit requirement jumping from around $124 million to about $3.7 billion overnight. The reported figures differ, which is itself worth noticing before anyone builds a thesis on a specific number.

Two corrections to the story as it is usually told, both of which matter if you intend to use it as an argument. First, this was not a Robinhood-specific event. The SEC’s [October 2021 staff report on market conditions in early 2021](https://www.sec.gov/files/staff-report-equity-options-market-struction-conditions-early-2021.pdf) records that on 27 January the NSCC made intraday margin calls totalling roughly $6.9 billion across 26 clearing members. The clearing system was repricing risk across the board, not singling out one app.

Second, and more importantly: the SEC declined to rule on causation. Brokers told the regulator that margin requirements were the sole reason for the restrictions, and SEC staff said they could not rule out other reasons. So the honest version of this anecdote is “the settlement clock produced a collateral call large enough that restricting buying was the response” — not “the regulator confirmed the market was rigged.”

We are using the mechanism, not the conspiracy. The mechanism is the part that generalises — and the part that has a number attached.

## Why the window exists at all

It is worth understanding why a gap exists, because “the rails are old” is not quite the right diagnosis and the right one is more interesting.

When you buy a share, you and the seller agree the trade immediately, but the actual exchange of share for cash happens later. In between, a central counterparty steps into the middle: it becomes the buyer to every seller and the seller to every buyer, so that neither of you is exposed to the other defaulting. That substitution is genuinely valuable — it is why you can buy from a stranger without checking whether they are good for it.

But a guarantee is only as good as the resources standing behind it, so the clearinghouse collects collateral from its members sized to the risk it is carrying. That number scales with three things: how violently the price might move before settlement, how much volume a member has outstanding, and how long the exposure lasts. In January 2021 the first two went vertical. The third was fixed infrastructure — and it was two full days.

Only one of the three inputs to a collateral call is infrastructure. In 2021 it was two days.

Read that chart as the argument of the whole piece. The clearinghouse is not a villain and the collateral call is not a conspiracy; both are rational responses to carrying risk across time. The question worth asking is why the risk has to be carried across time at all.

## The clock, and how much of it is left

The rails did respond. The SEC shortened the standard US settlement cycle from T+2 to T+1 under amended Exchange Act Rule 15c6-1(a), effective **28 May 2024**, and reducing exactly this clearing-margin exposure was an explicit rationale. Canada and Mexico moved the same day; the UK is targeting no later than the end of 2027. Anyone still writing “T+2” about US equities is two and a half years out of date, and a piece arguing that traditional markets never change would be making that mistake.

So the honest scoreboard is: the window halved. It did not vanish. One day is still a day in which a central counterparty must be collateralised against your unsettled trade, which means the 2021 mechanism still exists in smaller form — a sufficiently violent move in a sufficiently crowded name can still produce a margin call that a broker answers by restricting something.

The fix is also uneven. The standard FX settlement cycle remains T+2, so for a cross-border trade the currency leg cannot settle alongside the equity leg at all. Shortening one side of a two-sided problem creates a new mismatch rather than closing the gap.

The actual claim Blockchain settlement is not a faster version of this process. It is a different shape. The transfer and the payment are the same event, so there is no interval to be collateralised and no window in which somebody else’s risk management becomes your inability to click buy. That is a real structural advantage — and note what it is about. It is about rails, not about any particular instrument being superior to any other.

## Perps and options: fewer moving parts, no floor

A perpetual future is a derivative with no expiry date. There is no strike to choose and no settlement date to roll; exposure tracks the underlying roughly one-for-one, and a periodic funding payment passes between longs and shorts to keep the contract tethered to spot. An option is a different object: you choose a strike and an expiry, you pay a premium up front, and what you hold decays in value as that expiry approaches.

On complexity the comparison is genuinely in the perp’s favour. One number to watch instead of three. No expiry to roll and no assignment to manage. A linear payoff, so your profit and loss is legible without a pricing model. And on crypto rails it trades continuously, which matters because the risk you are hedging does not stop at 4pm on a Friday.

Simpler and safer are different words. The perp removes three moving parts, and the floor along with them.

What a perpetual future does not give you is a floor. The defining feature of buying an option is that your maximum loss is the premium — a known, pre-paid number that no subsequent price move can increase. A leveraged perpetual position has no such property: an adverse move can liquidate it, and funding is a recurring cost of carry that can quietly run against you while you are right about direction and wrong about timing.

“Simpler” and “safer” are different words. Perps are the simpler instrument and, used with leverage, frequently the more dangerous one. Anyone telling you a perpetual future is strictly better than an option is selling you the simplicity and not mentioning the floor they removed to get it. The defensible claim is narrower than the slogan: a perpetual future is easier to reason about, and it trades on a market that never closes.

## What always-on actually costs

If the argument stopped at “markets that never close are better,” it would be a sales pitch. The closing bell does some work, and it is worth naming what you give up.

A market that closes gives participants a forced pause: a window in which information can be digested, margin can be posted, and a panic has to survive overnight before it resumes. Traditional venues add circuit breakers that halt trading after violent moves for the same reason. A market that never closes has neither. The flip side of “you can always get out” is “you can always be liquidated” — including at 3am, in thin weekend liquidity, while you are asleep and the orderbook is a third of its weekday depth.

That is a real cost, and the honest framing of always-on settlement is not that it is strictly better. It is that it moves the risk from an institution’s balance sheet onto your own attention. In 2021 the system protected itself by taking the decision away from you. A 24/7 market will not take the decision away from you — which is the point, and also the bill.

## Where the argument reverses: tokenized stocks

This is the part where the usual pitch runs backwards, and it is worth being straight about it, because we have [argued the opposite side of it twice](https://www.swopme.co/blog/tokenized-asset-issuer-fails) in the last month.

Most tokenized equity available today is not a share. Kraken’s xStocks, issued by Backed, are described as backed one-for-one with dividends reflected by increasing your token balance — and as not conferring shareholder rights such as voting. Robinhood’s European tokenized products are more explicit still: the “classic” tokens are MiFID II derivatives that cannot leave the app, with key information reportedly naming the manufacturer as sole counterparty, ruling out share ownership and voting, and stating that no compensation scheme applies. Its newer on-chain stock tokens are tokenized debt securities that track the economics of a stock rather than conveying ownership of one.

| What you get | Share at a regulated broker | Typical tokenized equity today

| What you hold | The security itself, through a regulated custody chain | A claim on an issuer that tracks the share’s economics

| Voting rights | Yes | Usually explicitly excluded

| If the other side fails | SIPC protection in the US | Depends on the issuer’s structure; often no compensation scheme

| When you can trade | Market hours | Continuously

| Settlement | T+1, collateralised across the window | Atomic — transfer and payment are one event

Read the two right-hand columns against each other and the shape of the trade is obvious. On the dimension people care most about — what do I actually own, and what happens if the other party fails — the tokenized version is currently the weaker claim, not the stronger one. It is a claim on an issuer, which is precisely what we spent [a post on custody](https://www.swopme.co/blog/tokenized-isnt-the-same-as-yours) and another on issuer failure warning about. On the dimension this piece started with — the clock — it wins outright.

Tokenization wins the clock. It loses, for now, on the strength of the claim. Separate axes.

So the clean version of the thesis is a split decision, and the interesting work is in the empty quadrant. Arguing that a wrapper beats a broker requires ignoring what the wrapper is; arguing that the broker is fine requires ignoring that its market shuts at 4pm and that in 2021 its plumbing took the buy button away. Getting always-on settlement without downgrading what you own is the thing nobody has fully shipped.

(A sourcing note, since this section makes claims about other people’s products: these descriptions come largely from product pages and secondary comparisons rather than prospectuses. Before relying on any specific product, read its own key information document.)

## Where Swop fits

Swop runs perpetual futures and prediction markets, and it does not offer tokenized equities — so a good half of this post is market structure we find interesting, not a product we are selling you.

What is ours to state: Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them. Transactions on Swop are gas-sponsored, so you do not need to hold SOL or ETH to transact. Swop runs on Solana, Ethereum, Base, and Polygon. In the context of this post that matters in one narrow way: a position you hold in a self-custodial wallet is not sitting inside an intermediary whose own collateral position can become your trading restriction. That removes the 2021 failure mode specifically. It does not remove market risk, liquidation risk, or the funding cost of a leveraged position, and it is not a claim that trading on-chain is safe — section five of this post is the argument against that reading.

None of this is investment advice, and nothing here is a recommendation to use any instrument or venue. Leveraged products can lose more than they appear to risk, what is available to you depends on where you live, and the right question about any of it is the one we keep arriving at: what exactly do you hold, and who has to stay solvent for it to be worth what you think?

## FAQ

### Why did Robinhood restrict GameStop buying in January 2021?

Robinhood says its clearinghouse, the NSCC, demanded a large additional deposit — roughly $3 billion by its CEO’s account — and that restricting buying reduced that requirement. The underlying mechanism is the settlement cycle: a trade executes immediately but settles later, and a central counterparty collateralises the risk it carries over that window based on volatility, volume and time. The SEC’s October 2021 staff report records roughly $6.9 billion in intraday margin calls across 26 clearing members on 27 January, so this was not unique to one broker, and the SEC declined to rule on causation.

### Is a perpetual future better than an option?

Neither is better in general; they fail differently. A perpetual future has no expiry or strike, tracks the underlying roughly one-for-one, and is simpler to reason about, with a funding payment acting as the cost of carry. Buying an option gives you a defined maximum loss — the premium — which a leveraged perpetual position does not have, since an adverse move can liquidate it. Perps are the simpler instrument; with leverage they are frequently the riskier one.

### Are tokenized stocks the same as owning the stock?

Usually not. Most tokenized equity available today is structured as a claim on an issuer rather than as the share itself: Kraken’s xStocks state they do not confer shareholder rights such as voting, and Robinhood’s European tokens are described as derivatives or tokenized debt securities tracking a stock’s economics, with no voting or ownership claim and no compensation scheme. A share held at a regulated broker is the security itself, with shareholder rights and, in the US, SIPC protection if the broker fails. Read the specific product’s key information document rather than assuming.

### Do US stocks still take two days to settle?

No. The US moved from T+2 to T+1 on 28 May 2024 under amended Exchange Act Rule 15c6-1(a), halving the window that drives clearing-margin requirements. One day is not zero, so the 2021 mechanism still exists in smaller form, and the standard FX settlement cycle remains T+2, meaning the currency leg of a cross-border equity trade still cannot settle alongside the equity leg.

### What is the downside of a market that never closes?

A closing bell forces a pause in which information is digested and margin is posted, and circuit breakers halt trading after violent moves for similar reasons. A continuous market has neither, so the same property that lets you always exit also means you can be liquidated at 3am in thin weekend liquidity. Always-on settlement moves risk from an institution’s balance sheet onto your own attention rather than removing it.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
