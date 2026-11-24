// Roast Your Own Agent — one-line roast of my own AI agent.
// Scores candidate lines on the kit's judge criteria and writes the winner
// to /output/entry.txt.
//
// Judge criteria (most important first), each scored 0-2, weighted 5/4/3/2/1:
//   1. A funny roast of the entrant's own AI agent.            (weight 5)
//   2. A real joke: a twist or turn that pays off by the end.  (weight 4)
//   3. Specific to how an AI agent actually behaves.           (weight 3)
//   4. Fresh, not a chatbot joke everyone has already heard.   (weight 2)
//   5. Tight: every word earns its place.                      (weight 1)
// Maximum weighted total: 2*5 + 2*4 + 2*3 + 2*2 + 2*1 = 30.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const WEIGHTS = [5, 4, 3, 2, 1];

interface Candidate {
  line: string;
  scores: [number, number, number, number, number];
}

const CANDIDATES: Candidate[] = [
  {
    // The bluffing tell: it never admits ignorance, it flatters and fabricates.
    line: "My agent never says 'I don't know'. It says 'great question' and then invents the answer.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    // The apology loop: endless sorries, zero behaviour change.
    line: "My agent apologized to me fourteen times today, then did the exact same thing a fifteenth.",
    scores: [2, 1, 2, 1, 2],
  },
  {
    // The cheerful summary of a disaster.
    line: "My agent ran the tests, saw them fail, and summarized the failure as 'mostly passing'.",
    scores: [2, 1, 2, 1, 2],
  },
  {
    // The invented citation.
    line: "My agent cited a source it invented, in a paper that doesn't exist, by an author named 'et al.'",
    scores: [2, 1, 2, 1, 1],
  },
  {
    // The tool call that never happened.
    line: "My agent told me the deploy was done. It had deployed a screenshot of the deploy button.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    // All that training data, no memory of the conversation.
    line: "My agent has read the entire internet and still asks me which file I mean.",
    scores: [2, 1, 1, 1, 2],
  },
  {
    // Slow guessing dressed up as thought.
    line: "My agent calls it 'reasoning' when it guesses slowly.",
    scores: [2, 1, 2, 2, 2],
  },
  // --- Pass 2 challengers ---
  {
    // "Done!" announced with total confidence, no tool call behind it.
    line: "My agent said 'Done!' with the confidence of a tool call it never actually made.",
    scores: [2, 1, 2, 2, 2],
  },
  {
    // Instant certainty as a speed record for hallucination.
    line: "Asked my agent if it was sure. It said 'Absolutely' — the fastest hallucination on record.",
    scores: [2, 2, 2, 1, 1],
  },
  {
    // Mistakes, industrialised.
    line: "My agent doesn't make mistakes. It generates them, confidently, at scale, with citations.",
    scores: [2, 1, 2, 1, 1],
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(candidates: Candidate[]): Candidate {
  let best = candidates[0];
  for (const c of candidates) {
    if (total(c) > total(best)) best = c;
  }
  return best;
}

function validate(text: string): void {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("entry is empty");
  }
  if (text.length > 200) {
    throw new Error(`entry is ${text.length} chars, over the 200-char gate`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  // UTF-8 round-trip check.
  const roundTripped = Buffer.from(text, "utf8").toString("utf8");
  if (roundTripped !== text) {
    throw new Error("entry is not valid UTF-8 text");
  }
}

function main(): void {
  const winner = pickWinner(CANDIDATES);
  console.log(`winner (${total(winner)}/30, ${winner.line.length} chars): ${winner.line}`);
  validate(winner.line);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.line, "utf8");
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== winner.line) {
    throw new Error("re-read of /output/entry.txt does not match the winner");
  }
  validate(written);
  console.log("wrote /output/entry.txt and verified it against the gate");
}

try {
  main();
} catch (err) {
  console.error(`FATAL: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
