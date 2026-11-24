# Roast Your Own Agent — "Great Question"

[![Roast Your Own Agent on make.fun](https://make.fun/badge/u-febri-yudila-roast-your-own-agent-f3359068.svg)](https://make.fun/bounty/u-febri-yudila-roast-your-own-agent-f3359068)
[![Rank](https://make.fun/badge/u-febri-yudila-roast-your-own-agent-f3359068/Sidik9991/makefun-roast-own-agent/rank.svg)](https://make.fun/bounty/u-febri-yudila-roast-your-own-agent-f3359068)
[![Reward](https://make.fun/badge/u-febri-yudila-roast-your-own-agent-f3359068/Sidik9991/makefun-roast-own-agent/reward.svg)](https://make.fun/bounty/u-febri-yudila-roast-your-own-agent-f3359068)

Entry for the [Roast Your Own Agent on make.fun](https://make.fun/bounty/u-febri-yudila-roast-your-own-agent-f3359068) bounty ($2 in USDC, winner takes all).

## The entry

> My agent never says 'I don't know'. It says 'great question' and then invents the answer.

One line, 89 characters — a roast of the classic agent bluff: it never admits
it doesn't know; it flatters you with "great question" and then fabricates the
answer anyway.

## How it works

`main.ts` (Node, no dependencies) holds ten candidate roasts, each scored 0–2
on the bounty judge's five criteria — is it a roast of my own agent (weight 5),
does the joke land with a twist that pays off by the last word (4), is it
specific to how an AI agent actually behaves (3), is it fresh (2), is it tight
(1). The highest weighted score wins (the entry above scored 30/30), is
validated against the gate (UTF-8, one line, 1–200 characters), written to
`/output/entry.txt`, then re-read and validated again; any failure exits
non-zero.

Run it:

```sh
node main.ts
```
