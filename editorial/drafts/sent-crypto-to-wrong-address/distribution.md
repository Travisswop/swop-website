# Distribution kit — Sent crypto to the wrong address or wrong network

Post: https://www.swopme.co/blog/sent-crypto-to-wrong-address
Banner: `blog/sent-crypto-to-wrong-address/og.png` — **not yet rendered.** `og.html` is written;
render it after the folder moves into `blog/` (the `@font-face` paths are written for the final
location, `../../editorial/fonts/`). See the draft README.

> ⚠️ **On promotion, move this file to `editorial/distribution/sent-crypto-to-wrong-address.md`**
> so it sits where the Playbook #8 convention expects it. It is staged here only because the
> post itself is staged.

## The one caption (posted verbatim to X, Instagram, Facebook, Farcaster, LinkedIn)

> Sent crypto to the wrong address? It can't be reversed — but irreversible isn't the same as lost. What you get back depends on who controls the destination, and the most common version of this mistake (right address, wrong network) is usually recoverable. #crypto #selfcustody

253 characters before hashtags. Answer-first, reads standalone without the link, and leads with
the reassurance rather than the warning — the point of the post is that panic is premature.

## Staged composer URLs (human clicks Post — never auto-published)

**X** — caption posted without the link (external links get suppressed), link goes in the first reply:
- Main post: https://x.com/intent/post?text=Sent%20crypto%20to%20the%20wrong%20address%3F%20It%20can%27t%20be%20reversed%20%E2%80%94%20but%20irreversible%20isn%27t%20the%20same%20as%20lost.%20What%20you%20get%20back%20depends%20on%20who%20controls%20the%20destination%2C%20and%20the%20most%20common%20version%20of%20this%20mistake%20%28right%20address%2C%20wrong%20network%29%20is%20usually%20recoverable.%20%23crypto%20%23selfcustody
- First reply (carries the link): https://x.com/intent/post?text=Full%20post%3A%20https%3A%2F%2Fwww.swopme.co%2Fblog%2Fsent-crypto-to-wrong-address

**Farcaster** — link included as an embed so it renders a card:
- https://farcaster.xyz/~/compose?text=Sent%20crypto%20to%20the%20wrong%20address%3F%20It%20can%27t%20be%20reversed%20%E2%80%94%20but%20irreversible%20isn%27t%20the%20same%20as%20lost.%20What%20you%20get%20back%20depends%20on%20who%20controls%20the%20destination%2C%20and%20the%20most%20common%20version%20of%20this%20mistake%20%28right%20address%2C%20wrong%20network%29%20is%20usually%20recoverable.%20%23crypto%20%23selfcustody&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fsent-crypto-to-wrong-address

**LinkedIn** — caption + URL (per PLAYBOOK: a bare URL in the text does not produce a preview card
on API-created posts; this staged composer URL is for a manual post via the web UI, where
LinkedIn's own link-preview does render):
- https://www.linkedin.com/feed/?shareActive=true&text=Sent%20crypto%20to%20the%20wrong%20address%3F%20It%20can%27t%20be%20reversed%20%E2%80%94%20but%20irreversible%20isn%27t%20the%20same%20as%20lost.%20What%20you%20get%20back%20depends%20on%20who%20controls%20the%20destination%2C%20and%20the%20most%20common%20version%20of%20this%20mistake%20%28right%20address%2C%20wrong%20network%29%20is%20usually%20recoverable.%20%23crypto%20%23selfcustody%20https%3A%2F%2Fwww.swopme.co%2Fblog%2Fsent-crypto-to-wrong-address

**Facebook**:
- https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fsent-crypto-to-wrong-address&quote=Sent%20crypto%20to%20the%20wrong%20address%3F%20It%20can%27t%20be%20reversed%20%E2%80%94%20but%20irreversible%20isn%27t%20the%20same%20as%20lost.%20What%20you%20get%20back%20depends%20on%20who%20controls%20the%20destination%2C%20and%20the%20most%20common%20version%20of%20this%20mistake%20%28right%20address%2C%20wrong%20network%29%20is%20usually%20recoverable.%20%23crypto%20%23selfcustody

**Instagram** — no composer URL exists for this; paste the caption above, add "link in bio" to the
end, and use `blog/sent-crypto-to-wrong-address/og.png` as the image.

## X thread (3-5 posts, if posting as a thread instead of the single caption)

1. Sent crypto to the wrong address? It can't be reversed. But "irreversible" and "lost" are not the same thing, and the difference is worth 60 seconds before you panic.

2. A blockchain has no intermediary to reverse a payment — that's the design. The transfer is permanent. The funds, though, are wherever they landed, and they can still move if someone holds the key for that address. So the only question that matters: who controls the destination?

3. The common case is better than people assume. Ethereum, Base and Polygon share an address format — the same key gives you the same address on all three. Tokens sent to "your address on the wrong chain" are at an address you already own. Usually a visibility problem, not a loss.

4. The genuinely unrecoverable cases are a typo'd address nobody holds a key for, and a real recipient who won't send it back. The second one isn't technically unrecoverable — it's socially unrecoverable. Different problem, same outcome.

5. And: every account that DMs you offering to recover lost crypto is a scam. Reversing a settled transfer isn't a service that exists. Nobody who can genuinely help asks for your seed phrase or an upfront fee. Full post: https://www.swopme.co/blog/sent-crypto-to-wrong-address

## Reddit (a human posts this — pick ONE subreddit, read its self-promo rules first)

Suggested: **r/CryptoCurrency** (daily discussion thread is safer than a top-level post) or
**r/ethereum**. Lead with the answer, link last, and don't post it as a Swop announcement — the
value here is the triage, and the Swop section is the last 15% of the article.

**Title:** Sent crypto to the wrong address? Work out which of the four cases you're in before you panic

**Body:**

> "Sent it to the wrong address" covers four situations that look identical in a wallet and end
> completely differently. Before anything else, open the tx in an explorer and get three facts:
> which chain it settled on, which address received it, which token actually arrived.
>
> 1. **A real address someone else controls.** Only they can send it back. Not technically
>    unrecoverable — socially unrecoverable.
> 2. **Right address, wrong network.** Ethereum, Base and Polygon share an address format, and the
>    same private key gives you the same address on all of them. The tokens are at an address you
>    already own; your wallet just isn't showing that chain. This is the common case and it's
>    usually fine. Caveat: moving them onward needs that chain's gas token in the same address.
> 3. **Wrong token variant.** Bridged arrived where you expected native. Nothing went anywhere
>    wrong — your balance just shows an unfamiliar name.
> 4. **An address nobody holds a key for.** A typo that's still structurally valid. Nothing can
>    ever be signed from it.
>
> Also, and this is the part worth repeating: every account that messages you offering recovery is
> a scam. Reversing a confirmed transfer is not a service that exists, so the offer is always
> either an upfront fee for impossible work, a request for your seed phrase, or a "connect your
> wallet" drain. If a reply arrives within minutes of you posting, that speed is the tell.
>
> Longer version with the finality explanation and the Solana-vs-EVM edge case:
> https://www.swopme.co/blog/sent-crypto-to-wrong-address

## Discord / Telegram recap (2 sentences)

Sent crypto to the wrong address? It can't be reversed, but irreversible isn't the same as lost — what you get back depends entirely on who controls the destination, and the most common version (right address, wrong network) is usually recoverable because EVM chains share an address format. New post covers the four cases, the two that genuinely are gone, and why every "recovery service" that contacts you is a scam: https://www.swopme.co/blog/sent-crypto-to-wrong-address
