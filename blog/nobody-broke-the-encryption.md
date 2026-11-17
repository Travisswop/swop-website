---
title: "Nobody Broke the Encryption. The Logins Broke."
url: https://www.swopme.co/blog/nobody-broke-the-encryption
description: "Almost every major breach is an authentication failure, not a cryptography failure. What email-era logins get wrong, what public-key auth actually fixes, and why post-quantum Ethereum solves a different problem on a different clock."
published: 2026-11-17
updated: 2026-11-17
---

[Blog](https://www.swopme.co/blog) / Perspective

# Nobody broke the encryption. The logins broke.

Almost nothing that got breached this year was breached by defeating cryptography. The maths held. The way we prove who we are did not — and the fix being sold for the next decade addresses a different problem entirely.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Nov 17, 2026 Updated Nov 17, 2026 15 min read Copy link [X](https://x.com/intent/tweet?text=Nobody%20broke%20the%20encryption.%20The%20logins%20broke.&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fnobody-broke-the-encryption) [Farcaster](https://warpcast.com/~/compose?text=Nobody%20broke%20the%20encryption.%20The%20logins%20broke.&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fnobody-broke-the-encryption)

Contents What actually goes wrong Email is the skeleton key What a takeover actually looks like What public-key auth actually fixes Why legacy systems keep losing this fight The quantum question, honestly What wallets do not fix Where Swop actually stands today FAQ

Almost nothing that got breached this year was breached by defeating cryptography. Nobody factored a key or broke a cipher. They phished an employee, exploited an unpatched server, stole a live session, or asked a password-reset link to be sent to an inbox they already controlled. The maths held; the way we prove who we are did not. That distinction matters, because the fix most often sold for the next decade — post-quantum cryptography — addresses the part that is currently working.

31%

Breaches starting with a software vulnerability

39%

Breaches with credential abuse somewhere in the chain

~2029

Target for Ethereum’s core post-quantum work

## What actually goes wrong

Verizon’s [2026 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/), covering incidents from November 2024 to October 2025, contains a finding worth sitting with: **31% of breaches now start with a software vulnerability**, which Verizon describes as beating stolen passwords as the top way attackers get in.

That is a genuine change, and it cuts against the lazy version of this argument. “Passwords are the whole problem” is no longer true at the point of entry. Credentials remain enormous — as reported from the same report, credential abuse appears somewhere in roughly 39% of breaches and stolen credentials in 36%, with phishing steady at around 16% of initial access and the human element in roughly 62% — but the single most common front door is now unpatched software.

Initial-access vectors, Verizon DBIR 2026 (incidents from Nov 2024 to Oct 2025). The 31% figure is Verizon’s own; the others are as reported from the report.

Notice what is absent from that list. There is no row for “defeated the encryption,” because it effectively does not happen. The cryptography is the one component performing to specification. Everything failing around it is authentication, patching and human judgement.

We spend our anxiety on the one part of the stack that is working, and our budget on the parts that are not.

## Email is the skeleton key

Here is the structural problem with the login model most of the internet still runs on. Whatever you use to sign in, there is almost always a path that ends at your email: forgot password, magic link, one-time code, “confirm it’s you.” That makes your inbox the root of trust for everything else you own — and an inbox is a shared-secret account, reachable from anywhere, recoverable by a support process, and protected by a password and perhaps an SMS code that can be redirected with a SIM swap.

Email was designed in the era of trusted networks. It was never built to be the custodian of every other account you hold; it became that by accident, because it was the one identifier everybody already had. The consequence is that your security is not the strength of your strongest login. It is the strength of your weakest recovery path, and for most people that path is a mail account that has been compromised somewhere already.

## What a takeover actually looks like

Described abstractly, “account takeover” sounds like a single dramatic event. In practice it is a chain of small, individually reasonable steps, and seeing the chain is what makes the structural argument land.

It usually begins somewhere unrelated to the thing being stolen. An address and password surface in an old breach dump from a service nobody thinks about any more. Reused anywhere else, that pair now works in more than one place. If it does not, there is a second route: a convincing message, a login page that looks right, and credentials typed straight into the attacker’s form. Neither step requires defeating anything.

Then comes the second factor, which is often weaker than it feels. A code read aloud to someone impersonating support, a push notification approved at the eighth attempt by a tired person, or a phone number ported to a new SIM so the codes simply arrive somewhere else. The defining weakness of a one-time code is that it is a shared secret with a short life — and a secret you can be persuaded to repeat is a secret an attacker can use.

With the inbox, the rest follows mechanically. Password resets for every other account are requested and approved. Recovery addresses are changed so the real owner cannot reverse it. Session tokens, which skip the login entirely, are harvested and replayed. At no point in the sequence was any cryptography attacked. The system worked exactly as designed, for the wrong person.

| Method | What the service stores | What an attacker needs

| Password | A hash it must keep safe | The password — phished, reused or cracked offline

| SMS / email code | A channel it trusts | Control of the channel, or for you to read the code aloud

| Authenticator app | A shared seed | The current code, which you can still be talked into giving

| Passkey | Only a public key | Your device and its biometric — a fake site cannot replay the signature

| Wallet key | Nothing at all | The private key, or your signature on something you misread

Read the middle column downwards. The amount the service has to keep safe on your behalf shrinks to nothing, and the attacker’s job changes from stealing a secret at scale to compromising one person’s device or judgement. That is the entire structural argument, and it is why one breach stops meaning millions of accounts.

## What public-key auth actually fixes

The alternative is older than the problem and is finally arriving at scale: stop sharing secrets. In a key-pair model you keep a private key and the service keeps only the matching public key. You prove who you are by signing a challenge. The service never holds anything an attacker can use.

Passkeys and crypto wallets are the same idea applied to different objects: prove possession of a private key, never hand over a secret.

This is what passkeys do, and the adoption numbers are no longer small — FIDO Alliance reporting puts the installed base in the billions, with Google describing more than 800 million accounts actively using them. Crucially, a passkey signature is bound to the site that requested it, so a convincing fake cannot replay it. That removes phishing as a mechanism rather than asking users to be better at spotting it.

It is also, structurally, exactly what a crypto wallet does. A wallet is a key pair with a balance attached; signing a transaction and signing a login challenge are the same operation applied to different objects. The reason to notice this is not tribal. It is that the industry arrived at the same answer twice, independently, for the same reason: the only secret that cannot be stolen from a server is one the server never had.

## Why legacy systems keep losing this fight

It would be easy to say legacy systems are simply old. That is not the problem, and saying so makes the argument weaker than it should be. The problem is that they are **custodial by design**, and custody creates an override.

If a provider can restore your access when you lose it, then there exists a procedure — a support agent, a reset flow, a recovery channel — that transfers control of your account to whoever completes it convincingly. That override is the product feature people most rely on and the single most reliable thing to attack. You cannot fully patch it, because removing it means telling a locked-out customer that nothing can be done. Every large consumer platform resolves that tension in favour of recoverability, which is why social engineering keeps working against companies with excellent engineering.

A blockchain account is structurally different, not incrementally better. The account is the key pair. There is no administrator, so there is no override to socially engineer, no reset flow to subvert, and no credential database to breach — because there is no database. That is a real architectural advantage and it is why the model is worth building on.

It is also why it is unforgiving, and any honest version of this argument has to say so in the same breath: the absence of an override means that when a key is gone, it is gone. The industry’s actual task is not choosing between those two models. It is building recovery that does not reintroduce a skeleton key — which is precisely the thing nobody, including us, has completely solved.

## The quantum question, honestly

Which brings us to the claim doing the most work in crypto security marketing right now, and the one that deserves the most scepticism.

**Ethereum is not quantum-resistant today.**Account signatures use elliptic-curve cryptography that a sufficiently large quantum computer would break; Google Quantum AI research published in March 2026 estimated roughly 1,200 logical qubits to break 256-bit elliptic curve cryptography. The Ethereum Foundation has a serious, public [post-quantum roadmap](https://pq.ethereum.org/) — account-level signature abstraction so accounts can adopt new schemes, hash-based signatures replacing validator BLS on the consensus side, and proof systems to handle the much larger signatures post-quantum schemes require. It targets core post-quantum infrastructure around**2029**, with ecosystem migration continuing beyond that.

Ethereum’s published post-quantum roadmap targets core infrastructure around 2029. Nothing on either line fixes the other.

So: real work, credible people, genuinely the right direction. And it has close to nothing to do with the breaches in the first half of this post. Post-quantum cryptography protects against a future adversary who can break today’s maths. It does not protect against a phishing page, an unpatched server, a stolen session cookie, or a support agent who believed a convincing story. Anyone selling quantum resistance as the answer to the current security crisis is answering a different question on a different clock.

The one place the two timelines genuinely touch is “harvest now, decrypt later” — data captured today and decrypted when the hardware exists. That is a real reason to migrate in advance, and it is an argument about long-lived secrets, not about logins.

## What wallets do not fix

If this piece stopped here it would be a sales pitch, so here is the other side. Moving to keys deletes a category of attack and creates two more.

The first is that you can now lose the key, permanently, with no appeal. The second is that attackers followed. The dominant attack on wallet users is not cracking keys; it is persuading people to sign something — a transaction that grants spending approval, a message that authorises a transfer. The cryptography works perfectly and signs exactly what it was asked to. Phishing did not disappear when the industry moved to keys. It moved from “give me your password” to “approve this,” which is harder to spot, because the thing you are approving is often unreadable.

Keys change who can be attacked, from the provider’s database to the individual’s judgement at the moment of signing. That is an improvement at scale — one breach stops meaning millions of accounts — and it is not the end of the problem.

## Where Swop actually stands today

It would be convenient to end with a product claim. Instead, here is our own position, including the uncomfortable part, because a post arguing that email is the weak link should say where its author sits.

Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them. Wallets run on Privy today. You can export your private key, which is the only recovery path in this entire post that does not depend on a company, an inbox or a password manager.

And then the honest part. Swop supports sign-in passkeys — Face ID, Touch ID, Windows Hello or a hardware key instead of an email code. But **adding a passkey does not switch email off.** It adds a second door rather than closing the first, and an attacker will always take the weaker one. By itself, it is a convenience upgrade, not a security boundary. That is not a Swop quirk; it is the most common way passkey rollouts across the industry end up delivering less than they appear to.

If you use Swop, do this The setting that actually changes your exposure is **Transaction Security**, in Wallet Settings — passkey verification on transactions. It is a separate setting from sign-in passkeys, and it is off unless you turn it on. With it on, someone who gets into your account still cannot move funds without your passkey. If you read one sentence of this post as an instruction, make it that one. And for completeness, as we have said before: Swop has not commissioned a third-party security audit to date.

Where this is going, and what we think the industry owes people, is the same thing: recovery that does not reintroduce a skeleton key. It is worth being concrete about what that means rather than gesturing at a future. That means a passkey that makes email insufficient rather than merely optional, step-up verification on the actions that actually move value, and a real self-custody backstop for anyone who wants out of trusting a provider at all. The last of those exists today. The first two are the work.

None of this is security advice for your specific situation, and nothing here is a guarantee. The useful question to carry away is the one the breach reports keep answering: not “is the encryption strong,” because it is, but “who can get my access without my key, and what procedure would they have to complete?”

## FAQ

### Are most hacks caused by broken encryption?

No. In Verizon’s 2026 Data Breach Investigations Report, 31% of breaches start with exploitation of a software vulnerability — which Verizon says has overtaken stolen passwords as the leading way in — and credential abuse appears somewhere in roughly 39% of breaches. Defeating cryptography is not a meaningful category. Attackers go around the maths rather than through it, by phishing people, exploiting unpatched systems and stealing live sessions.

### How do hackers actually take over an account?

Usually as a chain of small steps rather than one dramatic break. Credentials surface in an old breach dump or are typed into a convincing fake login page; a second factor is then bypassed by reading a code aloud to someone impersonating support, approving a repeated push notification, or porting the phone number to a new SIM. Once the inbox is controlled, password resets for every other account follow mechanically, recovery addresses are changed so the owner cannot reverse it, and session tokens are replayed to skip login entirely. No cryptography is attacked at any point.

### Why is email a security weak point?

Because it is the recovery path for almost everything else. Forgotten passwords, magic links and one-time codes all end at your inbox, which makes it the root of trust for every other account you hold. Your security therefore equals the strength of your weakest recovery path rather than your strongest login, and email was never designed to be a custodian for everything else.

### Do passkeys stop phishing?

A passkey signature is cryptographically bound to the site that requested it, so a fake site cannot replay it — that removes phishing as a mechanism rather than relying on users to spot a fake. The common failure is that adding a passkey often does not disable the older email or password path, so an attacker simply uses the weaker one. A passkey only becomes a security boundary when the alternatives are removed or downgraded.

### Is Ethereum quantum-resistant?

Not today. Account signatures use elliptic-curve cryptography that a sufficiently large quantum computer could break, and Google Quantum AI research in March 2026 estimated roughly 1,200 logical qubits to break 256-bit elliptic curve cryptography. The Ethereum Foundation has a published post-quantum roadmap — signature abstraction at the account level, hash-based signatures for validators, and proof systems for the larger signatures — targeting core infrastructure around 2029, with ecosystem migration beyond that.

### Would post-quantum cryptography have prevented recent breaches?

No. Post-quantum cryptography defends against a future adversary capable of breaking current cryptography. It does nothing about phishing, unpatched software, stolen sessions or social engineering, which is what actually causes breaches today. The one genuine overlap is “harvest now, decrypt later” — encrypted data captured today and decrypted once the hardware exists — which is a real reason to migrate early, but an argument about long-lived secrets rather than about logins.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
