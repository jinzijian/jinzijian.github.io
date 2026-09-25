---
title: "From Execution to Selection: Who Decides What Comes Next?"
date: "2026-09-25"
description: "Learn to Do, then Learn What to Do — reflections on proactive exploration, learning from experience, and research taste, informed by ChainSWE."
lang: "en"
draft: false
---

*— Learn to Do, then Learn What to Do*

## 1. The Shifting Bottleneck: From Execution to Task Selection

At its core, the evolution of AI is a **shift in optimization objectives and in where decision-making matters most**:

- **The chat stage** (RLHF): optimizing instruction following in individual interactions.
- **The agent stage** (GRPO): using test pass rates and final task outcomes as rewards to optimize multi-step tool use and error correction — execution and verification.

As a system becomes better at execution, however, task selection becomes more consequential. With limited time and compute, finding a valuable problem may matter more than completing a collection of low-value tasks faster.

**The next major milestone in AI, then, will belong to proactive AI.**

This is more than another capability improvement. It is a fundamental change in how AI and humans work together:

- **Reactive AI** remains primarily a tool for execution. It relies on people to turn their needs into explicit task descriptions, then follows instructions correctly within a predefined frame. The human thinks; the AI acts.
- **Proactive AI** can move beyond waiting for explicit instructions. It continually observes a changing environment, understands long-term goals, and, amid uncertainty, **identifies bottlenecks, recognizes opportunities, and makes reasoned decisions about what is worth doing next**.

**The dividing line for future intelligence will involve two abilities: getting things done, and judging which things are worth doing.** AI cannot be trained only to become a more efficient executor. It must cross the threshold from **“Learn to Do”** to **“Learn What to Do.”** Whoever makes that transition first will hold a key to the next generation of general intelligence.

## 2. The Hidden Problem with Long Horizons: Experience Is Not Growth

Longer operating horizons and larger contexts are a natural direction for agent development.

Longer-horizon RL training **can meaningfully raise the ceiling of intelligence**. As the span of feedback increases, models can develop more complex planning, state tracking, and self-correction. This is not merely a theoretical argument; it is a trend that has been observed experimentally.

**But what we are doing today is still far from enough.**

The underlying issue is that **today’s “long-horizon tasks” are still fundamentally single-goal tasks**. A task may involve dozens of steps, yet its reward still asks only whether the current objective was ultimately completed. It overlooks the hidden costs incurred along the way and does not account for how current actions affect other, future goals.

The limitations of that reward become much more visible when a system works continuously across multiple tasks.

In our [ChainSWE](https://arxiv.org/abs/2607.02606v2) experiments, we observed a characteristic pattern: when an agent handles multiple tasks in the same repository, accumulated earlier changes can hurt later performance. Simply retaining the full conversation history does not consistently help either. A model that is good at a single repair does not automatically become good at maintaining a codebase over time.

To distinguish repository state from conversation history, ChainSWE uses three evaluation modes. **Oracle** starts from the correct patches for earlier tasks. **Seq** accumulates the model’s own code changes but resets the conversation between tasks. **Seq+Mem** retains both the code changes and the conversation history.

[![ChainSWE resolution rates by bug position under Oracle, Seq, and Seq+Mem, for Baseline, Summarize, and Sub-Agent configurations](/blog/from-execution-to-selection/chainswe-by-position.png)](/blog/from-execution-to-selection/chainswe-by-position.png)

*Accumulated earlier edits hurt subsequent repairs; retaining conversation history does not eliminate this trend.*

This reveals two central bottlenecks in current long-horizon training:

1. **State poisoning.** When rewards consider only completion of the current goal, models have an incentive to choose short-sighted solutions that pass tests quickly but leave longer-term problems behind. Technical debt from earlier tasks changes — and worsens — the conditions under which later tasks must be solved.
2. **Experience inefficiency.** History is not effectively distilled and incorporated into the next decision. Instead, it can become redundant or noisy context. The model has not learned through training how to turn the costs of its previous attempt into useful experience.

*It is important to distinguish experimental observations from explanations of their cause. ChainSWE measures changes in performance during continuous maintenance. The account of how rewards may encourage short-sighted behavior, and how training should change, is a research interpretation proposed here, not a causal conclusion directly established by that evaluation.*

**Simply letting a model run longer does not automatically solve either problem.**

For long-horizon capabilities to become useful in practice, the RL training paradigm must take another step: **from evaluating completion of a single goal to evaluating the total benefit of long-term state evolution across tasks and goals**. Avoiding problems for future work and turning experience into a basis for the next decision must themselves earn reward during training. Only then can sustained work become a learned capability, and experience become more than a historical record.

## 3. Two Paths to Proactive AI, and Research Taste

That still leaves the problem of task selection unanswered. A system may skillfully use experience to finish assigned work while rarely discovering new work on its own. We need AI to participate in deciding what might help next.

I see two paths for proactive AI:

### For Everyday Users: Implicit Intent Understanding

People do not promptly turn every need into an instruction. With deep, long-term context, AI can connect past conversations, personal preferences, and the present situation to recognize unexpressed needs and offer timely reminders or assistance.

### For Professional Users: Opportunity Recognition in Service of Long-Term Goals

The objective expands from implementing a specified method to continuously improving a system within defined constraints. The user provides a direction. The AI must discover bottlenecks, look for methods, choose experiments, and adjust subsequent work based on the results.

More importantly, as papers, tools, experimental results, and failure records keep arriving, can the AI judge which ones might help with its current goal? The same information has very different value for different goals. Judging its usefulness requires understanding the goal, the current state, and past experience together.

This is what I mean by **research taste**: **a search policy for judging whether a direction is worth pursuing before its outcome is known**.

Taste affects both the chance of success and what a failure can leave behind. An experiment that produces no immediate improvement may still sharpen later choices if it clarifies a bottleneck. Proactive exploration and learning from experience therefore form a loop: choose a worthwhile attempt, update understanding from its outcome, and use that understanding to choose the next attempt. Proactivity determines what the system experiences; learning determines what those experiences leave behind.

## 4. Evaluation Sets the Direction: Building a Proactive Benchmark

To train taste, we first need a benchmark that can measure value recognition and exploration strategy.

**My proposal is to give AI a working baseline with room for improvement, specify a goal and a budget, and then continuously supply a mixed stream of information**:

- **Information input:** include methods already known to be useful, alongside material that is relevant but inapplicable, offers limited benefit, or costs too much to use.
- **Autonomous decisions:** do not explicitly identify the solution. Let the system decide what to pay attention to, what to try, and what to adopt.
- **Evaluation:** measure actual improvements to the code or system, together with the tokens, time, and compute required to achieve them.

This preserves a real-world difficulty: useful information may already be available, but nobody has marked it as useful for you. The system must discover its relationship to the goal. If we can evaluate that judgment, we have a chance to establish a training objective for it. The logic of using optimization objectives to drive capability can extend further: **from answer quality, to task completion, to opportunity recognition and sustained progress**.

## 5. Three Gaps Proactive AI Must Cross

For proactive AI to explore reliably in real, open environments, and to propose and verify improvements over time, it must cross at least three important gaps.

### 1. Trajectory-Level Credit Assignment and Error Localization

Long-horizon tasks require a sequence of correct, interdependent decisions. Early mistakes can compound through later steps. One central challenge is enabling a model to reliably locate the first point of failure in a trajectory. If it does not know where things went wrong, it may not know where to begin correcting them. A system must be able both to carry out improvements and to diagnose and recover from errors in the improvement process.

### 2. Monotonic Experience Accumulation

We must test whether past experience improves later judgment under comparable task states and resource budgets. Useful experience should be retained, while outdated or incorrect experience needs a pruning mechanism. Only then can progress truly accumulate.

### 3. Value Extraction in Open Environments

External knowledge keeps growing, and the system does not know in advance what will help it. It must autonomously complete the loop of `Filter -> Verify -> Assimilate`, turning potentially useful information into opportunities for the next decision and action.

## Closing Thoughts

Whether this loop of proactive exploration and learning from experience can be sustained remains an experimental question. But it points to a clear research direction: **act reliably, make experience useful, and proactively discover new opportunities for improvement**.

The next generation of AI I hope to see will become better at taking on two responsibilities: completing the work in front of it, and offering well-founded choices about what should come next. People provide long-term goals. AI explores continuously, judges what is worth doing, and uses experience to make that judgment better over time.

---

**Figure source:** Qirui Jin et al., *ChainSWE: Benchmarking Coding Agents on Multi-Bug Software Maintenance*, [arXiv:2607.02606v2, Table 3](https://arxiv.org/html/2607.02606v2#S5.T3), 2026. Resolution rates are averaged across seven models over 97 three-bug chains; the three panels correspond to different context-management configurations. Redrawn from the reported data under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), with this adaptation noted. [Download the chart data](/blog/from-execution-to-selection/chainswe-data.csv).
