# Distribution kit — `token-not-showing-in-wallet`

**A human posts all of this. QUILL never posts externally.**
Hold until the post is live at `https://www.swopme.co/blog/token-not-showing-in-wallet` —
every item below links to it.

⚠️ **Tone constraint specific to this post.** The audience for these queries is mid-panic.
Everything here leads with the reassurance and the one concrete step, and none of it opens
with Swop. A help-shaped post promoted in a sales-shaped voice reads as bait and gets removed
by moderators, correctly.

---

## Reddit

**Subreddits, in order of fit:**

1. **r/CryptoCurrency** — "Why your token isn't showing" is evergreen there and gets asked
   several times a week. Check the current rules on link posts first; if link posts are
   restricted, post the text version below and put the URL in a first comment.
2. **r/CryptoTechnology** — smaller but tolerant of explainers. The display-layer-vs-ledger
   framing is the part that fits this sub; lead with that rather than the troubleshooting list.

Do **not** post this to r/solana, r/ethereum or chain-specific subs as a link — they read
multi-chain wallet posts as promotion. If someone asks the question there, answer it in a
comment in your own words and link only if asked.

**Title:**
> Your token isn't missing — your wallet is looking in the wrong place. One check tells you which.

**Body:**
> A token vanishing from your balance list is one of the most common panics in crypto, and it's
> almost never a lost transfer. Your wallet's balance list is a *display* built on top of the
> chain. It can be incomplete while the chain underneath is completely correct.
>
> So before you reinstall anything or message anyone: paste the receiving address into a block
> explorer for the network the transfer actually settled on.
>
> - **Explorer shows the tokens** → display problem. They're at your address, your key signs for
>   them, nothing needs recovering. You're fixing a view.
> - **Explorer shows nothing** → different problem entirely. Work from the transaction hash, not
>   from the app.
>
> The five causes, roughly in order of how often they're the answer: it landed on a different
> network; it's a different variant of the token than you expected (the USDC vs USDC.e thing);
> the app has no entry for the token and needs the contract address; it hasn't confirmed yet;
> or you're looking at a different account than the one that received it. Compare the *whole*
> address string, not the first and last four characters — that shortcut is exactly what hides
> the last one.
>
> Two things worth saying out loud because they cost people real money:
>
> **Don't reinstall first.** It's the instinct and it's the one step that can turn a cosmetic
> problem into a real one. Confirm on the explorer that your funds are fine, and confirm you can
> actually restore access, before you remove anything.
>
> **Get contract addresses from the explorer or the project's own docs.** Anyone can deploy a
> token called USDC. Search ads, DMs and replies to help posts are routinely seeded with
> impostor contracts, and adding one shows you a balance that looks right and is worthless.
>
> Full write-up with the decision tree: https://www.swopme.co/blog/token-not-showing-in-wallet
>
> (I work on Swop, a self-custody wallet — the post has a section on where we fit, but the first
> four sections are wallet-agnostic because the explorer check is the same regardless of what
> you hold your keys in.)

The disclosure line is not optional. Both subs will find it anyway, and volunteering it is the
difference between a post that stays up and a ban.

---

## X thread (4 posts)

**1/**
> Your token isn't missing. Your wallet is looking in the wrong place.
>
> A balance list is a *display* over the chain. It can be wrong while the chain underneath is
> perfectly correct.
>
> One check tells you which problem you have.

**2/**
> Paste the receiving address into a block explorer — on the network the transfer actually
> settled on.
>
> Explorer shows the tokens → display problem. They're yours, your key signs for them, nothing
> needs recovering.
>
> Explorer shows nothing → different problem. Start from the tx hash.

**3/**
> The five usual causes:
>
> → landed on a different network
> → different variant of the token than you expected
> → app has no entry for it, needs the contract address
> → not confirmed yet
> → you're looking at a different account
>
> Compare the whole address. Not the first and last four.

**4/**
> Two that cost real money:
>
> Don't reinstall first. Confirm funds on the explorer, and confirm you can restore access,
> before removing anything.
>
> Get contract addresses from the explorer or the project's docs. Never a DM.
>
> https://www.swopme.co/blog/token-not-showing-in-wallet

---

## Discord / Telegram recap (2 sentences)

> If a token isn't showing in your wallet, check the receiving address on a block explorer for
> the chain it settled on before doing anything else — if the explorer shows the balance, your
> funds are fine and you're only fixing a display.
> New guide walks the five usual causes and the two mistakes that turn this into a real loss:
> https://www.swopme.co/blog/token-not-showing-in-wallet

**Pin-worthy in a support channel.** This is the most-asked question in any wallet community, and
a pinned answer beats answering it individually every week. If it does get pinned, the one-line
version is: *the explorer is the source of truth, the app is a view of it.*
