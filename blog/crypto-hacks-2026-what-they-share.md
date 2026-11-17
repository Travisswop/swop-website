---
title: "Recent Crypto Hacks: What They Share, and What to Ask"
url: https://www.swopme.co/blog/crypto-hacks-2026-what-they-share
description: "Binance, Keplr and Across were each hit through something around the keys, not the cryptography. What they share, and six questions to ask any wallet."
published: 2026-11-17
updated: 2026-11-17
---

[Blog](https://www.swopme.co/blog) / Perspective

# The hacks didn’t break the math.

Binance, Keplr’s wallets and Across lost control of different things within two weeks. What they share is not a smart-contract bug. It is the layer around the keys — and what that means for judging any wallet, ours included.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Nov 17, 2026 Updated Nov 17, 2026 10 min read Copy link [X](https://x.com/intent/tweet?text=The%20hacks%20didn%27t%20break%20the%20math.&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fcrypto-hacks-2026-what-they-share) [Farcaster](https://warpcast.com/~/compose?text=The%20hacks%20didn%27t%20break%20the%20math.&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fcrypto-hacks-2026-what-they-share)

Contents Three incidents, three different doors What the three have in common Six questions to ask any wallet What Swop has shipped against them What we have not done Where this goes next FAQ

The three biggest security incidents of the past three weeks — the Binance breach on 29 October, the Keplr wallet incident traced to its provider Web3Auth in early November, and the hijack of Across’s domain on 10 November — did not, on what has been disclosed so far, involve anyone breaking cryptography. Each went in through something that sits around the keys: an engineering laptop and the signing path behind it, a wallet-infrastructure provider, a domain registrar. So the useful question about any wallet is not “is it secure?” but three narrower ones: what can cause it to sign, who can change where you are sent, and whether you can leave. This post covers what happened, what to ask — and, in the part where we are the subject, what Swop has shipped and what it has not.

As of 17 November 2026 All three incidents were still developing when this was written. Every figure below is attributed to whoever produced it — the company, a named analytics firm, or a news outlet — and may be revised. Where a company has not said something, we say so rather than fill the gap.

$6.3bn

Binance’s own figure for the impact, 29 Oct

$5.6M

Moved by Web3Auth into 12 recovery addresses (The Block, on-chain)

$350K

GoPlus’s estimate of Across user losses; Across has published none

## Three incidents, three different doors

| Incident | When | The door | What the company said

| Binance | 29 Oct | A compromised engineer’s laptop and what it could reach (Binance’s preliminary finding) | About $6.3bn impact; it will absorb the loss, not its users

| Keplr / Web3Auth | Early Nov | A wallet-infrastructure provider’s systems | Not a hack of Keplr’s code; wallets secured by a recovery phrase or hardware wallet were not affected

| Across | 10 Nov | The domain registrar account | Affected users will be made whole; post-mortem to follow

**Binance.** On 29 October Binance disclosed a breach and put its total impact at about $6.3 billion; [CoinDesk called it](https://www.coindesk.com/business/2026/10/29/potential-multi-billion-binance-hack-hitting-crypto-markets) the largest crypto hack to date. Binance’s preliminary finding was that a compromised DevOps engineer’s laptop may have given access to a service container and enabled unauthorized withdrawals, and it said it found no evidence of a wallet private-key leak. A Binance co-CEO later said the attack was more complex than a single compromised account, and an outside researcher, Blockaid’s CEO, [described it](https://cointelegraph.com/news/binance-hack-may-involve-private-key-misuse-not-theft-blockaid-ceo) as looking more like a compromise of signing infrastructure than theft of a key. Binance said it would absorb the loss rather than its users and, on 31 October, [said it had replaced about 90%](https://www.coindesk.com/business/2026/10/31/binance-says-it-has-replaced-90-of-stolen-crypto-after-massive-usd6-3-billion-breach) of the affected assets. In those reports Binance had not named who was responsible, and the investigation was ongoing.

**Keplr and Web3Auth.** Keplr, a crypto wallet, [said](https://x.com/keplrwallet/status/2118926087615045807) accounts created with Google or Apple login had seen unauthorized transactions. Its co-founder wrote that this was not a hack of Keplr’s code: the incident originated at Web3Auth, a provider Keplr uses to create wallets from social logins. Web3Auth [said](https://x.com/Web3Auth/status/2119110953975635985) it had identified a security issue in its infrastructure affecting certain embedded wallets used by Keplr, paused its social-login service, and moved assets out of vulnerable wallets into recovery addresses; [The Block](https://www.theblock.co/news/defi/2026-11-08-web3auth-says-it-frontran-hackers-by-moving-5-6-million-out-of-exposed-keplr-wallets-436029), reviewing on-chain data, counted about $5.6 million in 12 of them. Keplr said wallets set up with a recovery phrase or a hardware wallet were not affected, and told Google and Apple login users to stop sending funds to those accounts. As of The Block’s 8 November report, Web3Auth had not said how many wallets were hit and had given no specific cause beyond a flaw in its own systems. That report was also the only detailed one we found, so treat the specifics as provisional.

**Across.** At about 18:45 UTC on 10 November, Across [said](https://x.com/AcrossProtocol/status/2120278803318489362), a social-engineering attack on its domain registrar, Namecheap, gave an attacker control of the Across domain. Visitors were sent to a phishing page, which [GoPlus said](https://www.theblock.co/news/defi/2026-11-11-crosschain-protocol-across-restores-systems-after-domain-hijack-437843) was built to get people to sign fake token approvals that drain wallets. Across took the site down, regained control the next day, and [said](https://cointelegraph.com/news/across-protocol-restores-website-after-hackers-hijack-domain) affected users would be made whole, with a post-mortem to follow. GoPlus estimated about $350,000 in user losses across six chains; Across has not published a figure. Across said third-party integrations and API users were not affected.

## What the three have in common

Dependency and access problems, not cryptography problems. Based on the companies’ own accounts as of 17 Nov 2026.

Put them side by side and the pattern is hard to miss: in none of the three was the thing that failed the lock. It was the layer between a person and a signature.

At Binance, on its own account, the path started at a machine where people build and run systems, and from there reached a way to move funds. At Keplr, it was a vendor that sits in the path of turning a social login into a wallet key. At Across, it was the address book: whoever controls a domain controls where the name sends you, whatever the contract behind it does.

The cryptography did what it was asked. The failures were in who got to ask.

Each of those is outside what a smart-contract audit is built to examine, and none of them is fixed by a nicer wallet interface. They are access and dependency problems, and they get managed the way those always are: narrower access, fewer single points of failure, logs you can check, and an exit that does not depend on the party that was just breached.

The Keplr detail is the instructive one. Same app, same week; wallets whose keys were set up with a recovery phrase or a hardware wallet were not affected, and wallets set up through the provider’s social login were. What differed was who could reconstruct the key.

## Six questions to ask any wallet

These apply to every wallet and exchange, including ours. The answers are more useful than any adjective.

- **What can cause a signature?** List every party and process that can: you, the wallet vendor, any key-infrastructure provider, any automated agent. If the answer includes “an employee’s laptop” or “a service account,” ask what limits it.
- **Is there a provider between you and your key, and can you take the key out?** If you can export it, an incident at the provider is a migration. If you cannot, it is a wait.
- **How do you know the site is the site?** Bookmark the real address, and after any incident treat links as suspect until the project confirms it has regained control. If you signed anything during an incident window, revoke those approvals.
- **How much authority does anything automated have, and is it written down?** An agent that can act should have a ceiling that only you can raise, and a log that cannot be quietly edited.
- **What does the company hold that an attacker would want?** Data a company does not keep cannot be taken from it.
- **What has it committed to in writing, before anything goes wrong?** Binance and Across both said users would be made whole, and both said it after the incident. Look for what a provider has committed to in advance.

## What Swop has shipped against them

We cannot tell you this could not happen to us, and neither can anyone else. What follows is what exists today, set against the questions above, using only wording we have verified. The section after it is the list of what we have not done.

### Who can sign, and can you leave

You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today. Losing your phone doesn’t mean losing your funds: log in with your email on any phone and your Swop wallet comes back with it. You can also save your private key, which lets you open your assets in any wallet you choose.

That last sentence is the one the Keplr incident makes concrete. A wallet that runs on a provider inherits some of that provider’s risk — that is simply what a dependency is — and an exported key is the part of the arrangement you can carry out of it. See also [how recovery works without a seed phrase](https://www.swopme.co/blog/recover-wallet-without-seed-phrase) and [what “safe” means for Swop](https://www.swopme.co/blog/is-swop-safe).

### How much an automated agent can do

Swop’s agent proposes; you approve. Nothing signs without a tap, and the agent never holds keys. Swop’s Goldman trading agent runs under an ERC-8196-inspired policy layer: each vault carries a versioned policy, expanding a policy’s authority requires the owner’s EIP-712 signature, and every enforcement decision is written to a per-vault hash-chained audit log. Risk-reducing actions — exits, cancels, and withdrawals back to the owner — are never blocked by the policy layer. The owner can always get out. More in [the policy-layer write-up](https://www.swopme.co/blog/erc-8196-agent-policy) and [the agent safety checklist](https://www.swopme.co/blog/ai-agent-wallet-safety-checklist).

### Holding less of what an attacker wants

On the card rail, the sensitive data is identity documents. Card-rail verification runs through Stripe. Stripe holds the identity documents; Swop keeps only a revocable record of the decision, not the evidence behind it. Swop never writes verification data to ENS, an NFT, or any public chain, and card proceeds never touch a Swop wallet — Stripe holds the fiat balance and pays the merchant’s bank.

## What we have not done

A security post that lists only strengths is a press release, so here is the other column.

- **No third-party audit.** Swop has not commissioned a third-party security audit to date. Everything above is our own account of our own systems.
- **A provider sits under the wallet.** Wallets run on Privy today, so the security of Swop wallets includes the security of that provider. We are saying so in the open because the Keplr incident is a good example of why it matters.
- **The policy layer is a backend control, not an on-chain guarantee.** Enforcement happens at Swop’s backend signing seam — the point every agent transaction must pass to be signed — and the audit chain makes any violation provable. It is not an on-chain guarantee. [NEEDS FACT: policy-layer rollout stage. Last verified 28 Aug 2026: “shipped Aug 28, 2026 and is running in shadow (observe-and-log) mode while it soaks; enforcement mode follows.” Confirm the current stage and state it here, or delete this marker.]

## Where this goes next

The direction we are working in is the one the incidents argue for: keep the key with the person and keep an exit that does not depend on us; give anything automated a ceiling the owner controls and a log nobody can quietly rewrite; and hold as little as possible of what an attacker would want. Some of that is shipped, some of it is still being rolled out, and some of it is a promise we would rather you judge on delivery than on this paragraph.

None of this is investment or security advice, and nothing here is a guarantee that any wallet or exchange, ours included, cannot be breached. If you take one thing from it, take the six questions.

## FAQ

### What did the Binance breach involve?

Binance disclosed the breach on 29 October 2026 and put its total impact at about $6.3 billion. Its preliminary finding, as reported by CoinDesk and Cointelegraph, was that a compromised DevOps engineer’s laptop may have given access to a service container and enabled unauthorized withdrawals; it said it found no evidence of a wallet private-key leak. A co-CEO later said the attack was more complex than a single compromised account. Binance said it would absorb the loss rather than its users, and the investigation was ongoing at the time of those reports.

### Was the Keplr incident a hack of Keplr?

Keplr’s co-founder said it was not a hack of Keplr’s code: the incident originated at Web3Auth, a provider Keplr uses to create wallets from Google and Apple logins. Keplr said wallets set up with a recovery phrase or a hardware wallet were not affected. Web3Auth said it had identified a security issue in its infrastructure and moved assets out of vulnerable wallets into recovery addresses. As of The Block’s 8 November report, the number of wallets affected and the root cause had not been published.

### Are email or social-login wallets less safe than recovery-phrase wallets?

They fail differently rather than in a fixed order. A social-login wallet adds a provider that helps create or reconstruct your key, which is the dependency the Keplr incident exposed. A recovery phrase removes that provider but puts the whole burden on you, and a phrase that is lost, photographed or phished is gone. The practical test is whether you can take your key out and use it somewhere else if your provider has a bad day. On Swop you can export your private key.

### Has Swop had a third-party security audit?

Swop has not commissioned a third-party security audit to date.

### Does Swop hold my keys?

You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
