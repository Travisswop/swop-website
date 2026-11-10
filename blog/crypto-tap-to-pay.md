---
title: "Crypto Tap to Pay: How In-Person Payments Work"
url: https://www.swopme.co/blog/crypto-tap-to-pay
description: "Crypto tap-to-pay lets you pay in person with NFC or a QR code instead of a card. Here's how the request, price lock, and on-chain settlement actually work."
published: 2026-09-04
updated: 2026-09-04
---

[Blog](https://www.swopme.co/blog) / Guides

# Crypto tap to pay: how in-person payments work

Tapping a phone to pay with crypto looks identical to tapping a contactless card. Underneath, a request, a price lock, and an on-chain settlement all happen in the few seconds your hand is near the terminal.

ST [Swop Team](https://www.swopme.co/blog/authors/swop-team) Sep 4, 2026 Updated Sep 4, 2026 6 min read Copy link [X](https://x.com/intent/tweet?text=How%20crypto%20tap-to-pay%20actually%20works&url=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fcrypto-tap-to-pay) [Farcaster](https://warpcast.com/~/compose?text=How%20crypto%20tap-to-pay%20actually%20works&embeds[]=https%3A%2F%2Fwww.swopme.co%2Fblog%2Fcrypto-tap-to-pay)

Contents How a tap-to-pay payment works NFC vs QR: two ways to trigger it What the merchant actually receives Fees, and who pays them Where Swop fits FAQ

Crypto tap-to-pay lets you pay at a physical checkout with crypto instead of a card: you hold your phone near an NFC terminal or scan a QR code, the wallet converts your crypto to the amount shown at the current price, and the payment settles on-chain in seconds. No card, no cash, and no separate step to convert crypto to fiat before you can spend it. Merchants accept it either directly, by running a wallet or point-of-sale app that receives crypto, or indirectly, through a card-linked flow that pays them in ordinary currency.

## How a tap-to-pay payment actually works

The terminal or a printed code first has to tell the payer's wallet what to pay: the amount, the currency it's priced in, and where it should go. NFC does this over a short-range radio handshake the instant a phone gets close enough — usually a couple of centimeters. A QR code does the same job without any radio at all; the phone's camera reads the payment details out of the code instead. Either way, the wallet ends up holding the same three facts before anything moves: how much, in what, and to whom.

From there the flow is identical to any other crypto transaction. The wallet locks in a price for the conversion, builds the transaction, and shows it to you before it signs anything — the amount, the recipient, and what you're actually spending, since the price shown at checkout is usually in fiat terms even though you're paying in a token. You approve, the wallet signs locally, and the network confirms it. The "tap" is just the handshake that starts this; the payment itself is a normal signed transaction like any other.

## NFC vs QR: two ways to trigger the same payment

NFC is the closer analog to tapping a contactless card — it needs a terminal with an NFC reader, works with the phone still in a pocket or wallet case in some setups, and is the faster motion at a busy counter. It also needs hardware on the merchant's side that's built for it.

QR codes need nothing but a printed or displayed code and a camera, which is why they show up more at smaller vendors, market stalls, and anywhere a dedicated payment terminal isn't worth the cost. The tradeoff is a couple more seconds — open the camera, frame the code, wait for the app to parse it — versus a single tap. Neither method changes what happens after the code or handshake is read; they're just different ways of handing the wallet the same payment request.

## What the merchant actually receives

This is where implementations genuinely differ, and it's worth checking before you assume "accepts crypto" means one specific thing. Some setups pay the merchant in crypto directly — the funds land in a wallet the business controls, and the business decides whether to hold or convert it later. Others convert at the moment of sale, so the merchant is paid in fiat and never has to think about custody, price movement, or which chain the payment arrived on; the conversion happens on the processing side, invisibly to them.

Neither model is strictly better — a merchant who wants crypto exposure prefers the first, one who just wants to get paid reliably prefers the second. What matters for the shopper is that both look the same at the register: tap or scan, confirm, done.

## Fees, and who pays them

A crypto tap-to-pay transaction can carry up to three separate costs, and they don't always land on the same party. There's the network fee for the on-chain transaction itself, a processing or checkout fee the payment provider charges for the conversion and settlement, and — on chains that don't sponsor gas — a requirement to hold that chain's native token just to pay the network fee, on top of whatever you're actually spending. A wallet that sponsors gas removes that third cost entirely; the checkout fee is a separate, explicit line either way.

## Where Swop fits

Swop's in-person payment feature is SwopPay, and SwopPay checkout charges a 0.5% fee. You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today, and transactions on Swop are gas-sponsored, so paying in person doesn't require holding SOL or ETH first. Swop runs on Solana, Ethereum, Base, and Polygon.

Swop is available on [iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) and [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp), and as a web app at [swopme.app](https://swopme.app). For the mechanics of NFC data exchange that underlie any phone-based tap payment, Android's [NFC developer documentation](https://developer.android.com/guide/topics/connectivity/nfc/nfc) is a useful primary reference, and Swop's own [support docs](https://support.swop.id) cover setup on the wallet side.

## FAQ

### Do both sides need a crypto wallet for tap to pay to work?

The shopper does. The merchant doesn't necessarily — some point-of-sale setups receive crypto directly into a wallet, while others route through a card network so the merchant is paid in ordinary fiat and never touches crypto at all. The shopper's wallet is what has to support the tap or scan.

### Is a crypto tap-to-pay payment reversible if something goes wrong?

No. Once a transaction is signed and confirmed on-chain, it's final — there's no chargeback process like there is with a card network. That makes accuracy at the point of confirmation the entire safety net: check the amount and the recipient before you approve, because there is no undo after.

### Do I need to hold SOL or ETH to pay gas on an in-person crypto payment?

On most wallets, yes — the network fee is paid in the chain's native token, on top of whatever you're actually spending. Some wallets sponsor that fee instead. Transactions on Swop are gas-sponsored — you don't need to hold SOL or ETH to transact.

### Does Swop support in-person crypto payments?

Yes, through SwopPay, Swop's in-person payment feature. SwopPay checkout charges a 0.5% fee. You control your Swop wallet: nothing moves without your approval, you can export your private key, and Swop never holds your keys. Wallets run on Privy today, and transactions are gas-sponsored, so paying in person doesn't require holding SOL or ETH first.

ST

[Swop Team](https://www.swopme.co/blog/authors/swop-team)

Written by the Swop product team. Editorial rules: a direct answer up front, no invented statistics, dates on everything, and links to primary sources.

### One email, every other Tuesday.

Releases, market notes, and what we got wrong. No growth-hacking, no referral loops.

Swop App

### Reading about it is the slow way.

[Download for iOS](https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322) [Android](https://play.google.com/store/apps/details?id=com.travisheron.swopapp)
