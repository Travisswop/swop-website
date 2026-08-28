# Distribution kit — Gasless crypto: how sponsored transactions work

Post: https://www.swopme.co/blog/gasless-crypto-wallet

A human posts these. Claude never posts externally — click the staged links below to open a prefilled composer, review, then hit post/submit yourself.

## Reddit

**Suggested subreddits:** r/solana (primary — Solana-specific audience, mechanics framing), r/CryptoCurrency (secondary — broader audience, definition framing)

### Option 1 — r/solana

**Title:** How "gasless" wallets actually work (it's not that fees disappear)

**Body:**
> Every transaction on a public chain costs something — validators get paid to process it, which is what stops spam. "Gasless" doesn't mean that cost goes away, it means someone other than you pays it. Usually the app.
>
> On Solana specifically, every transaction names a "fee payer" account, and that account doesn't have to be the same one authorizing the transfer. An app can run a funded fee-payer wallet and cover the SOL cost itself. Ethereum/L2s do the equivalent with ERC-4337 "paymasters."
>
> Worth knowing before you assume a wallet is gasless for everything: sponsorship is usually scoped (per-action, rate-limited, or chain-specific), and it's completely separate from custody — a wallet can sponsor gas and still be fully self-custodial, or not.
>
> Wrote up the full mechanics with an FAQ: https://www.swopme.co/blog/gasless-crypto-wallet
>
> (I work on Swop, a self-custodial Solana/ETH/Base/Polygon wallet with gas-sponsored transactions — mentioned it in the post, but the mechanics apply generally.)

**Staged submit URL:**
https://www.reddit.com/r/solana/submit?type=TEXT&title=How%20%22gasless%22%20wallets%20actually%20work%20%28it%27s%20not%20that%20fees%20disappear%29&text=Every%20transaction%20on%20a%20public%20chain%20costs%20something%20-%20validators%20get%20paid%20to%20process%20it%2C%20which%20is%20what%20stops%20spam.%20%22Gasless%22%20doesn%27t%20mean%20that%20cost%20goes%20away%2C%20it%20means%20someone%20other%20than%20you%20pays%20it.%20Usually%20the%20app.%0A%0AOn%20Solana%20specifically%2C%20every%20transaction%20names%20a%20%22fee%20payer%22%20account%2C%20and%20that%20account%20doesn%27t%20have%20to%20be%20the%20same%20one%20authorizing%20the%20transfer.%20An%20app%20can%20run%20a%20funded%20fee-payer%20wallet%20and%20cover%20the%20SOL%20cost%20itself.%20Ethereum/L2s%20do%20the%20equivalent%20with%20ERC-4337%20%22paymasters.%22%0A%0AWorth%20knowing%20before%20you%20assume%20a%20wallet%20is%20gasless%20for%20everything%3A%20sponsorship%20is%20usually%20scoped%20%28per-action%2C%20rate-limited%2C%20or%20chain-specific%29%2C%20and%20it%27s%20completely%20separate%20from%20custody%20-%20a%20wallet%20can%20sponsor%20gas%20and%20still%20be%20fully%20self-custodial%2C%20or%20not.%0A%0AWrote%20up%20the%20full%20mechanics%20with%20an%20FAQ%3A%20https%3A//www.swopme.co/blog/gasless-crypto-wallet%0A%0A%28I%20work%20on%20Swop%2C%20a%20self-custodial%20Solana/ETH/Base/Polygon%20wallet%20with%20gas-sponsored%20transactions%20-%20mentioned%20it%20in%20the%20post%2C%20but%20the%20mechanics%20apply%20generally.%29

### Option 2 — r/CryptoCurrency

**Title:** "Gasless crypto wallet" gets thrown around a lot — here's what's actually happening under the hood

**Body:**
> Quick definition: a gasless wallet doesn't eliminate the network fee, it routes it to a different payer than you — usually the app itself. The network still gets paid for every transaction; that's what keeps it from being spammed into uselessness.
>
> The mechanism differs by chain (Solana has always supported a separate "fee payer" account; Ethereum/L2s use ERC-4337 paymasters), but the idea is the same everywhere: separate who signs a transaction from who pays for it.
>
> A few things worth checking before trusting any wallet's gasless claim: which actions are actually sponsored (all of them, or just onboarding?), which chains it covers, and whether sponsorship has anything to do with custody (it shouldn't — they're independent).
>
> Full writeup with an FAQ: https://www.swopme.co/blog/gasless-crypto-wallet
>
> Disclosure: I'm on the Swop team (self-custodial wallet, gas-sponsored, Solana/ETH/Base/Polygon). Posting because the mechanics are useful regardless of which wallet you use.

**Staged submit URL:**
https://www.reddit.com/r/CryptoCurrency/submit?type=TEXT&title=%22Gasless%20crypto%20wallet%22%20gets%20thrown%20around%20a%20lot%20-%20here%27s%20what%27s%20actually%20happening%20under%20the%20hood&text=Quick%20definition%3A%20a%20gasless%20wallet%20doesn%27t%20eliminate%20the%20network%20fee%2C%20it%20routes%20it%20to%20a%20different%20payer%20than%20you%20-%20usually%20the%20app%20itself.%20The%20network%20still%20gets%20paid%20for%20every%20transaction%3B%20that%27s%20what%20keeps%20it%20from%20being%20spammed%20into%20uselessness.%0A%0AThe%20mechanism%20differs%20by%20chain%20%28Solana%20has%20always%20supported%20a%20separate%20%22fee%20payer%22%20account%3B%20Ethereum/L2s%20use%20ERC-4337%20paymasters%29%2C%20but%20the%20idea%20is%20the%20same%20everywhere%3A%20separate%20who%20signs%20a%20transaction%20from%20who%20pays%20for%20it.%0A%0AA%20few%20things%20worth%20checking%20before%20trusting%20any%20wallet%27s%20gasless%20claim%3A%20which%20actions%20are%20actually%20sponsored%20%28all%20of%20them%2C%20or%20just%20onboarding%3F%29%2C%20which%20chains%20it%20covers%2C%20and%20whether%20sponsorship%20has%20anything%20to%20do%20with%20custody%20%28it%20shouldn%27t%20-%20they%27re%20independent%29.%0A%0AFull%20writeup%20with%20an%20FAQ%3A%20https%3A//www.swopme.co/blog/gasless-crypto-wallet%0A%0ADisclosure%3A%20I%27m%20on%20the%20Swop%20team%20%28self-custodial%20wallet%2C%20gas-sponsored%2C%20Solana/ETH/Base/Polygon%29.%20Posting%20because%20the%20mechanics%20are%20useful%20regardless%20of%20which%20wallet%20you%20use.

Only post one of the two — pick whichever subreddit's rules allow it that day.

## X thread (3-5 posts)

1. "Gasless crypto wallet" gets thrown around a lot. Here's what's actually happening under the hood 🧵
2. 1/ The network fee doesn't disappear on a "gasless" wallet — someone else pays it, usually the app. Validators still get paid for every transaction; that's what stops the network from being spammed.
3. 2/ Solana transactions have always named a separate "fee payer" account — it doesn't have to match the signer. Ethereum/L2s do the equivalent with ERC-4337 "paymasters." Different chains, same trick: separate who signs from who pays.
4. 3/ "Gasless" ≠ custody. A wallet can sponsor your gas and still be fully self-custodial (keys stay on your device), or not. They're independent design choices — always check both.
5. 4/ Full breakdown, with an FAQ: https://www.swopme.co/blog/gasless-crypto-wallet

**Staged composer URL (first post only — reply with 2-5 as a thread after posting):**
https://x.com/intent/post?text=%22Gasless%20crypto%20wallet%22%20gets%20thrown%20around%20a%20lot.%20Here%27s%20what%27s%20actually%20happening%20under%20the%20hood%20%F0%9F%A7%B5

## Discord / Telegram recap (2 sentences)

New on the Journal: how "gasless" crypto wallets actually work — the network fee doesn't disappear, it just gets paid by someone other than you (usually the app), via Solana's fee-payer accounts or Ethereum's ERC-4337 paymasters. Includes what to check before trusting any wallet's gasless claim, plus an FAQ: https://www.swopme.co/blog/gasless-crypto-wallet
