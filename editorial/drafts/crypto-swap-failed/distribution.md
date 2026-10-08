# Distribution kit — `crypto-swap-failed`

**A human posts all of this. QUILL never posts externally.**
Do not post any of it until the post is live at
`https://www.swopme.co/blog/crypto-swap-failed` — every item links to it.

Tone rule for this one specifically: the search behind it ("swap failed but money gone") is a
panic query, and the people typing it are being actively farmed by "recovery" scammers. Lead
with the mechanism, never with the product. The post's own best line is that a revert is a
guardrail working — that is the share-worthy idea, not Swop.

One framing to avoid everywhere below: do **not** imply that swaps on Swop don't fail. They
can, and the post says so. The claim is that a same-chain failure is a non-event, which is a
statement about chain atomicity and true of every wallet.

---

## Reddit

**Suggested subreddits:** r/CryptoCurrency (primary — the question recurs constantly and the
replies are mostly "you got sandwiched" noise), r/solana or r/defi as secondary. **Not** any
price-led or moonshot sub.

Post as a text post, not a link post. Flair as discussion/help if available.

**Title:**
> A failed swap and a bad fill are opposite problems, and only one of them is fixable

**Body:**
> Two very different things get called "my swap failed", and the advice for them is inverted,
> so it's worth separating them before it costs you something.
>
> **1. The swap reverted.** On a single chain, a swap is *one transaction* holding both sides of
> the trade. Chains apply a transaction completely or not at all — so there's no state where the
> leg that takes your input token succeeded and the leg that delivers the output didn't. If it
> reverted, your input never moved. You're out a network fee on chains that charge for the
> attempt, and a fee is not the trade amount. **This is safe to retry** (get a fresh quote, the
> old one is stale).
>
> Most reverts are also not bugs. The usual cause is the price moving past your slippage
> tolerance while the transaction was in flight, so the trade **refused itself** rather than
> fill at a much worse number. That's the guardrail working. The alternative wasn't a better
> price — it was being filled at whatever the market had drifted to.
>
> **2. The swap succeeded and you got less than the quote.** Not a failure. A quote is a price
> at a moment; slippage tolerance is the range you agreed to accept around it. Filling at the
> bad end of that range is a completed trade. And this is the one that actually matters,
> because **it's the only one of the two that's final.** No wallet, support desk or chain
> unwinds a successful trade because you didn't like the number.
>
> Which means all the leverage is before you sign, and it's mostly one habit: **read the output
> quantity, not the rate.** If your wallet shows a "minimum received", that's the real
> commitment — it's the worst outcome you're agreeing to.
>
> The genuine exception to all of the above is **cross-chain**. Two chains can't share one
> atomic transaction, so there's a real window where funds have left the source side and not
> arrived at the destination. There, patience is correct and resending is the mistake — the
> source side already happened.
>
> And the thing that makes this query dangerous: a public tx hash attracts "accelerators" and
> "recovery specialists" within minutes. Nobody can move a settled transaction with your
> recovery phrase. The phrase request *is* the attack.
>
> Longer version with the full revert-cause list: https://www.swopme.co/blog/crypto-swap-failed

---

## X / Twitter thread

Post from @swoplabs. Six posts. No engagement bait, no "🧵" emoji opener.

**1/**
> "My swap failed and my money is gone" describes something a single chain can't actually do.
>
> A same-chain swap is one transaction holding both sides of the trade. Chains apply a
> transaction completely, or not at all.

**2/**
> So there's no state where the half that takes your input succeeded and the half that
> delivers the output didn't.
>
> If it failed: your input token never moved. It's still at your address.

**3/**
> Most reverts aren't bugs either.
>
> Usual cause: price moved past your slippage tolerance while the tx was in flight, so the
> trade refused itself instead of filling at a worse number.
>
> That's the guardrail working.

**4/**
> The case that actually costs people money is the opposite one:
>
> the swap *succeeded*, at the bad end of your tolerance.
>
> It's final. Nothing unwinds a successful trade because you didn't like the number.

**5/**
> Which puts all the leverage before you sign.
>
> Read the output quantity, not the rate. If your wallet shows "minimum received", that's the
> real commitment — the worst outcome you're agreeing to.

**6/**
> One real exception: cross-chain. Two chains can't share one atomic transaction, so there IS a
> window where funds have left and not arrived.
>
> There, waiting is right and resending is the mistake.
>
> Full guide: https://www.swopme.co/blog/crypto-swap-failed

---

## Farcaster

Single cast, /crypto or /base channel.

> Two different things get called "my swap failed":
>
> → It reverted. One transaction, both sides, all-or-nothing. Your input never moved. Retry
> safely.
> → It filled at the bottom of your slippage tolerance. That's a success, and it's final.
>
> The second one is the expensive one, and it's the one nobody warns you about.
>
> https://www.swopme.co/blog/crypto-swap-failed

---

## Newsletter slot

Use in the next Swop Daily "From the Journal" (Article 02) if this ships before the following
issue is built. Suggested copy:

> **Why a failed swap isn't a lost swap.** A same-chain swap is one transaction carrying both
> sides of the trade, which means it can't half-happen — if it reverted, your input token never
> moved. The case worth actually worrying about is the swap that *worked*, at the bad end of
> your slippage tolerance, because that one is final. New guide on telling them apart, and on
> the one habit that prevents the expensive version.

---

## Internal links to add from existing posts

Both are one-line edits in a live post, and both are the natural next question rather than a
cross-promotion:

| Post | Where | Why |
|---|---|---|
| `blog/solana-wallet-with-built-in-swap` | §s3, near the slippage/quote discussion | It explains what a swap is and never says what happens when one fails. This is that answer. |
| `blog/cross-chain-swap-wallet` | §s4, the "failure behaviour" checklist bullet | That bullet currently tells the reader to *find out* what a wallet does with a half-finished route. This post answers it. |

Do **not** add a link from `usdc-vs-usdce` — this post already links *to* it, and a reciprocal
link there would be the weaker direction.
