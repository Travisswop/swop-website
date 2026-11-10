---
title: "Swivy: wallets and login for every app, by Swop"
url: https://www.swopme.co/swivy
description: "Swivy is Swop's own wallet and identity platform for developers: email and passkey login, EVM and Solana wallets at sign-up, signing, gas sponsorship, agent permissions and Sign in with Swop. In development."
---

S.01 · Swivy by Swop Building

# Wallets and login, for every app.

Swivy is Swop's own wallet and identity platform. Your users sign in with an email or a passkey and **get EVM and Solana wallets on the spot**, with no seed phrase.

[Request early access](mailto:support@swopme.co?subject=Swivy%20early%20access) Sign in with Swop, explained [Developer console (preview)](https://console-staging.5-161-244-56.sslip.io/)

Email + passkey login EVM + Solana Agent permissions OIDC

Three things to know

## Swivy, in three lines.

### Wallets, login and signing.

Everything an app needs to give people a wallet, the way Privy does it, built and run by Swop.

EVM and Solana · web, React, Expo, Node

### One swop.id, every app.

With Sign in with Swop, people bring the same name and the same wallet to each app that adds the button.

El Dorado, Chalk and Decentrabet planned first

### Building, in staging.

Not in production yet, and Swop itself still runs on Privy today. Developers can ask for early access.

Building [Request access](mailto:support@swopme.co?subject=Swivy%20early%20access)

In 30 seconds

## Sign-in and wallets, done for you.

Every app that touches crypto needs two hard things: a way for people to sign in, and a safe place for their wallet keys. Swivy is Swop's service that does both, so an app doesn't have to build them itself.

What it is

A wallet-as-a-service: login, wallets and signing for other apps, built by Swop. Status: building. It runs in staging only. Swop's own app still uses an outside provider (Privy) today; Swivy is built to replace it.

Who it's for

Developers building games, marketplaces, AI agents or any app whose users need a wallet. Later, Swop's own apps.

What it costs

Not available yet, so there's no price. Early access is by request.

What you need

An app and a developer on your team. You add an SDK for web, React, Expo or Node.

How it works

STEP 01

#### Add it to your app

Drop in the SDK and your app gets a sign-in screen and wallet tools.

STEP 02

#### Your user signs in

Email code or passkey, or one tap on Sign in with Swop. An EVM and a Solana wallet are created on the spot, no seed phrase.

STEP 03

#### Your app asks to sign

The rules you set are checked first (limits, allowed chains), then an isolated signer signs, and your server gets a webhook.

**Wallet-as-a-service** A company runs wallet sign-in and key storage for your app, so you don't build it yourself.

**OIDC** OpenID Connect, the standard behind “Sign in with Google”. Swivy uses it for “Sign in with Swop”.

**Passkey** A login stored on your phone or laptop and unlocked with Face ID or a fingerprint. Nothing to type or forget.

**Custody** Who holds the keys that control a wallet. Swivy has two modes: keys kept in an isolated signer, or split between the user's device and Swivy.

**Signer** The locked-down part of the system that holds keys and approves transactions. It runs separately from everything else.

**Webhook** A message Swivy sends to your server when something happens, like a transaction going through.

S.02 · How it works

## From hello to signed.

What happens behind the scenes, from the moment someone signs in to your app to the moment a transaction is signed. Screens below are illustrations of the developer console.

01 · Login

### Email code. Then a passkey.

Users sign in with an email code, with passkey, authenticator app or SMS as a second factor. No wallet popups, no extensions.

02 · Wallets

### Wallets appear at sign-up.

An EVM wallet and a Solana wallet are created the moment someone logs in. Keys live in an isolated signer or are split with the user's device.

03 · Sign

### Intents in, webhooks out.

Sign messages, EIP-712 data and transactions on EVM and Solana. Queue transaction intents, sponsor gas, and get a webhook when it lands.

04 · Agents

### Give AI a key, not the keys.

Delegated session grants let an AI agent or a backend worker act for a user, inside limits the user set, and stop when they say so.

S.03 · Sign in with Swop

## One swop.id. Every app.

Swivy is an OpenID Connect provider. An app adds a "Sign in with Swop" button, and people arrive with their name, avatar and, if they allow it, the same wallet they use in Swop.

01 · App **Tap "Sign in with Swop"**

The app sends people to Swop's hosted login.

`/.well-known/openid-configuration`

02 · Swop **Log in, then consent**

Passkey or email code, then a clear screen of what the app is asking for.

`scope: openid profile wallets.read`

03 · Token **Name, avatar, wallet**

The app gets a signed ID token it can check against Swop's public keys.

`JWKS · refresh tokens`

04 · Same wallet **Signing with consent**

Payments ask for a passkey step-up and stay inside a per-app limit the person sets.

`per-app policy`

Planned first El Dorado Chalk Game Film AI Decentrabet Your app

S.04 · The platform

## Everything a wallet app needs, in one place.

### Two ways to hold keys

Pick per app. Neither shows users a seed phrase.

`managed_tee`

Keys live in an isolated signer built for AWS Nitro Enclaves.

`split_custody`

Created in the browser. The device keeps one share; Swivy stores only encrypted data.

### Gas sponsorship

Pay your users' network fees from sponsor wallets, set per network.

### RPC routing per environment

Choose where each environment talks to the chain, including Swop's own RPC gateway.

Base Ethereum Arbitrum Optimism Polygon Solana

### SDKs and a CLI

Drop-in shapes for web and mobile, a policy engine, and an agent CLI for wallets, funding and signing.

`web``react``expo``node`

S.05 · Why build it

## Renting it today, owning it next.

Swop uses Privy today. Swivy is how Swop moves that layer in-house, and offers it to other apps.

#### Privy today

- Pricing that grows with every person who signs up
- The wallet and identity layer sits with a vendor
- Signing depends on a vendor's quotas and uptime

#### Swivy

- **Costs follow signing and storage,** not head count
- **Swop owns** the wallet and identity layer, and Sign in with Swop
- **The same SDK shape**, so moving an app over is a swap, not a rewrite

Ready to try it? Start with the [React quickstart](https://docs.swopme.co/swivy/react-quickstart) or [Sign in with Swop](https://docs.swopme.co/swivy/sign-in-with-swop).

**6** networks, EVM and Solana

**4** SDKs: web, React, Expo, Node

**2** custody modes

**0** seed phrases to write down

**1** swop.id for every app

S.06 · Honest status

## Built, not shipped yet.

Swivy runs in staging today. It is not in production, and the Swop app still uses Privy for login and wallets.

Building now

- **API, console, isolated signer and worker**, running in staging.
- **Login, wallets, signing, intents, webhooks** and gas sponsorship.
- **Sign in with Swop** (OIDC) and delegated grants for AI agents.
- **SDKs** for web, React, Expo and Node, plus the agent CLI.

Next

- **Production** on Swop's own infrastructure.
- **Swop moves over**: new users on Swivy, existing users migrate.
- **Public docs** and early-access projects.
- **Sign in with Swop** in El Dorado, Chalk, Game Film AI and Decentrabet.

Later

- **Outside security audits.**
- **Threshold signing** and device-first keys with recovery.
- **Signers in more regions.**

S.07 · Plugs into

## The layer under all of Swop.

S.08 · Questions

## Asked and answered.

### Can I use Swivy today?

Not in production yet. Swivy runs in staging while we finish the production deploy. Invited preview partners can sign in to the [developer console (preview)](https://console-staging.5-161-244-56.sslip.io/); it's staging, so don't use it for real funds. Everyone else: request early access and we'll reach out when projects open.

### Does the Swop app use Swivy?

Not yet. Swop runs on Privy today. The plan is a dual stack: new users on Swivy first, then existing users migrate.

### Who holds the keys?

You choose per app. In managed mode keys live in an isolated signer built for AWS Nitro Enclaves. In split custody the user's device keeps one share and Swivy stores only encrypted data, so Swivy can't sign alone.

### Is it audited?

Not yet. Swivy has not had an outside security audit. That is on the list before it holds real users' funds.

### What is Sign in with Swop?

A standard OpenID Connect login. Apps get a person's swop.id name and avatar, and with permission their wallet addresses, without building auth themselves.

For developers [Swivy docs](https://docs.swopme.co/swivy) [Sign in with Swop](https://docs.swopme.co/swivy/sign-in-with-swop) [React quickstart](https://docs.swopme.co/swivy/react-quickstart)

For developers

## Build on Swop's rails.

Tell us what you're building. We'll bring early projects on as Swivy reaches production. Already invited? Sign in to the developer console preview.

[Request early access](mailto:support@swopme.co?subject=Swivy%20early%20access) [Developer console (preview)](https://console-staging.5-161-244-56.sslip.io/) [Use Swop from AI today](https://www.swopme.co/mcp)

More from Swop
