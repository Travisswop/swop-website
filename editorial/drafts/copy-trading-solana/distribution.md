# Distribution kit — `copy-trading-solana`

**A human posts all of this. QUILL never posts externally.**
Hold until the post is live at `https://www.swopme.co/blog/copy-trading-solana` — every item
below links to it.

⚠️ **Tone constraint specific to this post.** This one is not mid-panic, it is
mid-*consideration* — someone is deciding whether to point money at a stranger's wallet. The
risk is the opposite of the troubleshooting posts: a skeptical piece about copy trading,
published by a wallet, reads as "our competitor's feature is dangerous" unless it is
scrupulously about mechanics. **Keep every item below about the mechanism, never about a
named product, and never imply Swop has a better copy-trading feature** — the post makes no
claim about Swop's copy-trade product at all, and the social copy must not outrun it.

The one line that carries this post everywhere: **your copy is a second, later, separate
trade.** Lead with it.

---

## Reddit

**Subreddits, in order of fit:**

1. **r/CryptoCurrency** — "is copy trading worth it" is a weekly question and the answers are
   usually either shilling or "it's a scam". A mechanical breakdown is genuinely missing.
   Check current rules on link posts; if restricted, post the text version and put the URL in
   a first comment.
2. **r/CryptoTechnology** — the three-custody-models section is the part that fits here. Lead
   with the delegation/scope framing rather than the leaderboard statistics.
3. **r/algotrading** — *only* the leaderboard-selects-for-variance argument, and only as a
   comment in an existing thread. That sub will eat a link post from a wallet alive, and
   rightly. The survivorship point is one they already agree with and will engage on.

Do **not** post this to r/solana. A critical-sounding copy-trading post from a multi-chain
wallet reads as positioning against Solana-native products, which is not what it is.

**Title:**
> Copy trading doesn't copy anything — your order is a second, later, separate trade. That gap is where the money goes.

**Body:**
> Nothing is actually mirrored when you "copy" a trade. Software notices a public wallet traded
> and submits a *different* transaction from your account — later, at your size, at whatever
> price exists by then, with your costs. Two transactions, two prices, two outcomes.
>
> Which is why the common experience is the one nobody warns you about: the trader you followed
> was **right** and you still lost. Five mechanisms do that:
>
> - **You buy their impact.** On a thin token, their buy is part of why the price moved. Your
>   order lands after it. The thinner the token, the bigger the gap — so it's worst in exactly
>   the trades that look best on a leaderboard.
> - **Predictable flow gets picked off.** A known buyer, in a known direction, a known moment
>   later, is a weak position to bid from. It costs you a worse price, not a visible fee, which
>   is why almost nobody attributes it correctly.
> - **Size isn't risk.** Them putting 2% of a big book in, you putting 40% of a small one in —
>   same token, different bet. Being right about the token doesn't rescue the sizing.
> - **Exits mirror worse than entries.** An entry is one clean detectable buy. Exits are staged,
>   partial, routed elsewhere. Most of the *result* in trading is in exits; most of the
>   *reliability* in copying is in entries.
> - **Costs accrue per trade, not per good trade.** 40 round trips a week for them is 80 for
>   you, including the ones that netted them nothing.
>
> And on picking someone: a leaderboard sorted by short-window return is ranking by variance,
> because that's what short-window return maximises. The wallets that swung hardest fill *both*
> ends of the distribution and you're shown one end — the ones who swung just as hard and lost
> dropped off the page instead of appearing next to them with a warning. It's a list of
> survivors presented as a list of experts.
>
> The useful filters are the dull ones: does the record cover a bad month, how deep was the
> worst drawdown, how many trades is it built on, one lucky token or something repeated. Then
> ask who pays that trader and on what basis — if it's a share of follower volume, their income
> rises with activity and is indifferent to your result. Not an accusation, just an incentive.
>
> Full version, including the three custody models and what to actually check before granting
> any permission: [link]

---

## X / Twitter — thread

Post from `@swoplabs`. Seven posts. No cashtags, no engagement bait, no "🧵" in post 1.

**1/**
> Copy trading doesn't copy anything.
>
> Software sees a public wallet trade, then submits a *different* transaction from your account.
> Later. At your size. At whatever price exists by then.
>
> Two trades, two prices, two outcomes. That gap is the whole story.

**2/**
> Which is why the normal disappointment isn't "the trader was wrong."
>
> It's "the trader was right and I still lost."

**3/**
> You buy their impact.
>
> On a token without deep liquidity, their buy is part of *why* the price went up. Your order
> arrives after it.
>
> Thinner token = bigger gap. So it's largest in exactly the trades that look most exciting on
> a leaderboard.

**4/**
> Size isn't risk.
>
> 2% of a large book vs 40% of a small one, into the same token, is not the same bet.
>
> Being right about the token doesn't save you from being wrong about the size.

**5/**
> Exits mirror worse than entries.
>
> An entry is one clean buy, easy to detect. Exits are staged, partial, routed elsewhere.
>
> Most of the result in trading lives in exits. Most of the reliability in copying lives in
> entries. Nobody's in a hurry to fix that.

**6/**
> On leaderboards: ranking by short-window return is ranking by variance, because that's what
> short-window return maximises.
>
> The biggest swings fill both ends of the distribution. You see one end. The other end dropped
> off the page.
>
> Survivors, presented as experts.

**7/**
> Before you grant anything, answer one question: who can move the money?
>
> If you deposit, withdrawing is a *request*. If it's a scoped permission, your exposure is
> whatever you permitted — so read the scope and find the revoke button before you need it.
>
> [link]

---

## Hacker News

Submit only if someone is in the mood to defend it in comments for an hour; HN is hostile to
crypto posts and this one's strongest section is the statistics, not the crypto.

**Title:**
> Copy trading leaderboards rank by variance, not skill

Point the submission at the post and let `#s4` carry it. The survivorship-bias argument is the
part HN will actually engage with, and the thread will be about selection effects in ranked
leaderboards generally. **Do not editorialise in a submission comment.** If the thread turns
into "why is a wallet company writing this", the honest answer is the correct one: the post
makes no claim about our own copy-trade product, and §s6 is about custody and delegated
authority.

---

## SmartSite / swop.id cross-post

Short form, link out. **No claim about a Swop copy-trade feature.**

> **Copy trading on Solana: how it works and where it goes wrong**
> Your copy is a second, later, separate trade — not a mirror. Why the trader you followed can
> be right while you lose, why return-ranked leaderboards select for luck, and the one question
> that sorts every one of these products: who can move the money.

---

## Newsletter — "From the Journal" slot

Use as the Journal article the next issue after this goes live (it would be the first
non-fallback Journal slot since #95; #98 had to use the Swop Spotlight because the blog was
dark). Eyebrow `02 &mdash; From the Journal`.

**Dek for the issue:**
> Nothing is copied when you copy a trade — software submits a second, later, separate order
> from your account. We wrote down the five ways that gap costs you money even when the trader
> you followed was right, and why a leaderboard sorted by return is a list of survivors rather
> than a list of experts.

⚠️ Keep the newsletter version free of any Swop copy-trade claim too — the same FACTS.md
constraint applies to the issue as to the post.
