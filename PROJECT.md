# A2 Project Definition

## 1. Interaction Problem

People may find it difficult to decide whether to trust or rely on AI recommendations when the system does not clearly explain how it reaches its decisions.

## 2. Application Context

AI-assisted content moderation.

## 3. Target Users

The system is intended for both professional and non-professional content reviewers who use AI recommendations to support moderation decisions.

The initial prototype focuses on non-professional reviewers, while professional moderation is a potential application context.

## 4. Design Aim

To explore how AI explanations and verification prompts can support appropriate reliance on AI recommendations while avoiding unnecessary cognitive effort.

## 5. Initial Project Scope

An interactive prototype that allows users to review AI recommendations and make their own moderation decisions.

## 6. Development Record

### 24 November 2026 — Initial Project Definition

The interaction problem, application context, target users, design aim and initial project scope have been defined.

The next stage is to specify the system requirements and interaction design.

### 24 November 2026 — Interaction Mode Selection

Three interaction modes were selected for the prototype to maintain continuity with the proposed research in Assignment 1 and to demonstrate different approaches to AI-assisted decision-making.

The selection of moderation scenarios was deferred until the scenario design stage, as the examples need to be relevant to the interaction problem.

### 24 November 2026 — Policy Design Decision

I questioned whether a self-defined moderation policy
would provide a sufficiently realistic basis for the
prototype.

Following a comparison of existing social media policies,
Reddit was selected as the primary policy source, with
Meta and X as supporting references.

The policy was adapted to cover ethnicity, gender and
disability within a text-based moderation task.

This decision provides traceable policy evidence for
users to check AI recommendations while maintaining
a manageable implementation scope.

### 24 November 2026 - Moderation Case Design

I questioned whether the initial moderation example
was too obvious to demonstrate the value of AI
explanations and verification.

The case design was revised to include more
context-dependent expressions and implicit discrimination.

Six synthetic cases were developed across ethnicity,
gender and disability.

The cases cover both correct and incorrect AI
recommendations at high and low simulated confidence
levels.

This design allows the prototype to demonstrate normal
interaction, error recovery, verification effort
and the limitations of uncertainty-triggered verification.

### 24 November 2026 - Interaction Design Decisions

Four main screens and six functional areas within
the moderation workspace were selected.

Different verification mechanisms were considered,
including opening the policy, confirming that it
had been read, selecting relevant rules and writing
an explanation.

Policy rule selection was chosen to balance meaningful
verification with additional interaction effort.

All three interaction modes retain voluntary access
to the moderation policy.

Reference answers are revealed only after submission,
and users retain control over their final decisions.

The decision outcome categories were revised to
describe observable behaviour rather than imply
a validated measure of trust or appropriate reliance.

The interaction design is documented in INTERACTION.md.

Implementation and functional testing are pending.


### 24 November 2026 - Prototype Implementation and Testing

The initial design documents were committed
to the local Git repository as commit 225fbcf.

The prototype was implemented using HTML,
CSS and JavaScript.

Five application files were created:

- index.html
- styles.css
- data.js
- logic.js
- app.js

The data layer and verification logic were
tested using the browser Console.

All three interaction modes were manually
tested. A complete Mode C session was
documented through screenshots.

The Mode C summary was checked against
the six individual case decisions and
returned consistent results.

During testing, two potential usability
issues were identified:

1. Additional scrolling between case
   content and policy evidence.

2. The distinction between selecting
   policy rules and formally completing
   verification.

These observations informed the next
stage of interface refinement.

Detailed testing results and limitations
are documented in TESTING.md.

Generative AI assisted with code generation
and debugging guidance, while the developer
performed the local implementation and
functional checks.
