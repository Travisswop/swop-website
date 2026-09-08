# Distribution kit — What is x402? The payment protocol for AI agents

Post: https://www.swopme.co/blog/what-is-x402

A human posts these. Claude never posts externally — click the staged links below to open a prefilled composer, review, then hit post/submit yourself.

## Reddit

**Suggested subreddits:** r/CryptoCurrency (primary — broad crypto audience, definition framing), r/AI_Agents (secondary — audience specifically interested in agentic commerce/payments)

### Option 1 — r/CryptoCurrency

**Title:** What is x402? The HTTP status code AI agents now use to pay for API calls

**Body:**
> HTTP has had a 402 "Payment Required" status code since HTTP/1.1 in the 90s. It was reserved for future use and then just... never used. x402 is the protocol that finally does something with it.
>
> The flow: a client requests a resource, the server responds 402 with a price + accepted asset + chain, the client signs a stablecoin payment authorization (EIP-3009 transferWithAuthorization on EVM chains) and retries with it attached, a "facilitator" verifies + settles it on-chain, and the server returns the resource. All within ordinary HTTP, no account or API key involved in the payment step.
>
> Coinbase shipped it in May 2025; it's since moved to open governance under the x402 Foundation (Linux Foundation). By 2026 there are integrations from Stripe, Cloudflare, and AWS, among others.
>
> Wrote up the full mechanics + an FAQ: https://www.swopme.co/blog/what-is-x402

**Staged submit URL:**
https://www.reddit.com/r/CryptoCurrency/submit?type=TEXT&title=What%20is%20x402%3F%20The%20HTTP%20status%20code%20AI%20agents%20now%20use%20to%20pay%20for%20API%20calls&text=HTTP%20has%20had%20a%20402%20%22Payment%20Required%22%20status%20code%20since%20HTTP/1.1%20in%20the%2090s.%20It%20was%20reserved%20for%20future%20use%20and%20then%20just...%20never%20used.%20x402%20is%20the%20protocol%20that%20finally%20does%20something%20with%20it.%0A%0AThe%20flow%3A%20a%20client%20requests%20a%20resource%2C%20the%20server%20responds%20402%20with%20a%20price%20%2B%20accepted%20asset%20%2B%20chain%2C%20the%20client%20signs%20a%20stablecoin%20payment%20authorization%20%28EIP-3009%20transferWithAuthorization%20on%20EVM%20chains%29%20and%20retries%20with%20it%20attached%2C%20a%20%22facilitator%22%20verifies%20%2B%20settles%20it%20on-chain%2C%20and%20the%20server%20returns%20the%20resource.%20All%20within%20ordinary%20HTTP%2C%20no%20account%20or%20API%20key%20involved%20in%20the%20payment%20step.%0A%0ACoinbase%20shipped%20it%20in%20May%202025%3B%20it%27s%20since%20moved%20to%20open%20governance%20under%20the%20x402%20Foundation%20%28Linux%20Foundation%29.%20By%202026%20there%20are%20integrations%20from%20Stripe%2C%20Cloudflare%2C%20and%20AWS%2C%20among%20others.%0A%0AWrote%20up%20the%20full%20mechanics%20%2B%20an%20FAQ%3A%20https%3A//www.swopme.co/blog/what-is-x402

### Option 2 — r/AI_Agents

**Title:** x402: the protocol letting AI agents pay per-API-call without a human in the loop

**Body:**
> If you've seen "x402" mentioned around agentic commerce and weren't sure what it actually does: it activates HTTP's long-dormant 402 status code so a server can tell a client (usually an AI agent) exactly what a resource costs, and the client can pay for it in the same request cycle — no subscription, no provisioned API key, no checkout form.
>
> Mechanically it's a 4-step exchange: request -> 402 with payment terms -> signed retry with a stablecoin payment authorization -> facilitator verifies and settles on-chain -> server returns the resource. It solves the payment plumbing, not what the agent should buy or whether the resource matches what was paid for.
>
> Full breakdown (with an FAQ) here: https://www.swopme.co/blog/what-is-x402
>
> (I work on Swop — we don't implement x402 ourselves, our AI agent uses a propose-then-you-approve model instead, mentioned briefly in the post for contrast.)

**Staged submit URL:**
https://www.reddit.com/r/AI_Agents/submit?type=TEXT&title=x402%3A%20the%20protocol%20letting%20AI%20agents%20pay%20per-API-call%20without%20a%20human%20in%20the%20loop&text=If%20you%27ve%20seen%20%22x402%22%20mentioned%20around%20agentic%20commerce%20and%20weren%27t%20sure%20what%20it%20actually%20does%3A%20it%20activates%20HTTP%27s%20long-dormant%20402%20status%20code%20so%20a%20server%20can%20tell%20a%20client%20%28usually%20an%20AI%20agent%29%20exactly%20what%20a%20resource%20costs%2C%20and%20the%20client%20can%20pay%20for%20it%20in%20the%20same%20request%20cycle%20%E2%80%94%20no%20subscription%2C%20no%20provisioned%20API%20key%2C%20no%20checkout%20form.%0A%0AMechanically%20it%27s%20a%204-step%20exchange%3A%20request%20-%3E%20402%20with%20payment%20terms%20-%3E%20signed%20retry%20with%20a%20stablecoin%20payment%20authorization%20-%3E%20facilitator%20verifies%20and%20settles%20on-chain%20-%3E%20server%20returns%20the%20resource.%20It%20solves%20the%20payment%20plumbing%2C%20not%20what%20the%20agent%20should%20buy%20or%20whether%20the%20resource%20matches%20what%20was%20paid%20for.%0A%0AFull%20breakdown%20%28with%20an%20FAQ%29%20here%3A%20https%3A//www.swopme.co/blog/what-is-x402%0A%0A%28I%20work%20on%20Swop%20%E2%80%94%20we%20don%27t%20implement%20x402%20ourselves%2C%20our%20AI%20agent%20uses%20a%20propose-then-you-approve%20model%20instead%2C%20mentioned%20briefly%20in%20the%20post%20for%20contrast.%29

Only post one of the two — pick whichever subreddit's rules allow it that day.

## X thread (4 posts)

1. What is x402? A 27-year-old HTTP status code that nobody used, now repurposed so AI agents can pay for API calls without a human filling out a checkout form 🧵
2. 1/ HTTP has had a "402 Payment Required" status since HTTP/1.1 in the 90s — reserved, and never actually used. x402 finally does something with it: a server can respond 402 with exactly what a resource costs, in a machine-readable way.
3. 2/ The flow: request -> 402 with price/asset/chain -> client signs a stablecoin payment authorization and retries -> a "facilitator" verifies + settles it on-chain -> server returns the resource. No account, no API key, no checkout form.
4. 3/ Coinbase shipped it May 2025; now governed by the x402 Foundation (Linux Foundation), with 2026 integrations from Stripe, Cloudflare, and AWS. Full breakdown + FAQ: https://www.swopme.co/blog/what-is-x402

**Staged composer URL (first post only — reply with 2-4 as a thread after posting):**
https://x.com/intent/post?text=What%20is%20x402%3F%20A%2027-year-old%20HTTP%20status%20code%20that%20nobody%20used%2C%20now%20repurposed%20so%20AI%20agents%20can%20pay%20for%20API%20calls%20without%20a%20human%20filling%20out%20a%20checkout%20form%20%F0%9F%A7%B5

## Discord / Telegram recap (2 sentences)

New on the Journal: what x402 actually is — a protocol that activates HTTP's long-unused 402 status code so an AI agent can pay for an API call in one request cycle, no account or checkout form needed. Covers the 4-step payment flow, who governs it now, and how it differs from Swop's own propose-then-you-approve AI agent model: https://www.swopme.co/blog/what-is-x402
