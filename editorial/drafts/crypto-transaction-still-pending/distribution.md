# Distribution kit — `crypto-transaction-still-pending`

**A human posts all of this. QUILL never posts externally.**
Do not post any of it until the post is live at
`https://www.swopme.co/blog/crypto-transaction-still-pending` — every item links to it.

Tone rule for this one specifically: it is a reassurance post about a moment where people are
scared and are actively being targeted by scammers. Lead with the useful fact, not the product.
Nothing here should read as if we are pleased about the search volume.

---

## Reddit

**Suggested subreddits:** r/CryptoCurrency (primary — the question gets asked daily and the
replies are mostly noise) and r/ethdev or r/solana as a secondary, depending on which chain
angle is topical that week. **Not** r/CryptoMoonShots or any price-led sub; wrong audience.

Post as a text post, not a link post. Flair as discussion/help if the sub has it.

**Title:**
> "Pending" is a symmetrical state, and that's the part nobody explains when you ask

**Body:**
> Someone asks a version of "why is my transaction still pending" here every day, and the
> answers are usually either "just wait" or a DM from someone offering to fix it. Both are
> unhelpful, the second one actively so. The thing worth internalising is what pending
> actually *is*:
>
> You signed a transaction and broadcast it. The network hasn't written it into a block yet.
> That's it. Because the chain hasn't recorded it, **the funds haven't left the sending address
> and haven't arrived at the receiving one.** Nothing is in transit. There's no intermediate
> place holding your money, which is why "where is it" has no answer and why the lost-package
> mental model makes this feel so much worse than it is.
>
> Three things that follow:
>
> 1. **The app isn't the authority.** A wallet shows pending because that's the last thing it
> knows. Look the hash up on an explorer — plenty of "pending" transactions settled minutes ago.
> 2. **Replacing ≠ repeating.** A replacement reuses the same sequence number with a higher fee,
> so only one of the two can ever be included. A *new* transfer to the same address for the
> same amount is a second payment, and if the first one confirms you've paid twice. This is the
> most common way a pending transaction becomes an actual loss, and it's self-inflicted.
> 3. **"Failed" is good news.** A failed transaction was processed and rejected, so none of its
> effects applied — the amount is still at the sending address. You're out a network fee on
> chains that charge for the attempt. Losing a fee is not losing a transfer.
>
> Also, and I'd rather be boring about this than clever: nobody who replies to your public
> transaction hash can unstick it. Not with your seed phrase, not with an "accelerator" fee,
> not with a signature. Those replies arrive within minutes precisely because you're anxious.
>
> Wrote the long version up here, including why some chains queue transactions and others just
> let them expire: [link]
>
> (I work on Swop. The post has a section about our wallet at the end, clearly marked, and
> the rest is chain-general.)

**Note for whoever posts:** the self-disclosure line is not optional. Several of these subs ban
undisclosed affiliation, and the post is weaker without it anyway.

---

## X thread

**1/**
> "Why is my transaction still pending?"
>
> The answer nobody gives you: pending is *symmetrical*.
>
> The chain hasn't recorded it. So the funds haven't left the sender and haven't arrived at the
> recipient.
>
> Nothing is in transit. There's no in-between place holding your money.

**2/**
> This is why "where is it?" has no answer.
>
> You're using a lost-package model — somewhere out there, someone has it, trace it.
>
> Wrong model. There's a request the network hasn't acted on yet, and an address that still
> holds the balance. That's the whole situation.

**3/**
> The mistake that turns waiting into losing:
>
> Replace ≠ repeat.
>
> A replacement reuses the same sequence number + a higher fee. Only one can ever land.
>
> A new transfer to the same address is a SECOND PAYMENT. If the first confirms, you paid twice.
>
> Check the receiving address before you send anything again.

**4/**
> And "failed" is better news than it sounds.
>
> Failed = the network processed it and rejected it. None of its effects applied. The amount is
> still at the sending address.
>
> You're out a network fee. Losing a fee is not losing a transfer.
>
> Same for a reverted swap: you keep what you started with.

**5/**
> Last thing, and it matters more than the rest:
>
> Nobody replying to your public transaction hash can unstick it.
>
> Not with your seed phrase. Not with an "accelerator" fee. Not with a signature.
>
> They reply fast because you're scared. That's the whole product.
>
> Full guide: [link]

---

## Discord / Telegram recap

> New guide: why a crypto transaction sits on "pending" — and why it's a waiting state rather
> than a loss. Pending is symmetrical: the chain hasn't recorded it, so the funds haven't left
> the sender and haven't reached the recipient. Covers the three ways it can end (two of them
> fine), the replace-vs-repeat mistake that makes people pay twice, and why the "I can unstick
> it" replies show up within minutes of a public hash. [link]
