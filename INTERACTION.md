# Interaction Design

## 1. Interaction Objectives

The prototype explores how AI explanations and
verification prompts can support appropriate reliance
on AI recommendations in social media moderation.

The interaction is designed to preserve human control
while balancing verification effort and opportunities
to detect incorrect AI recommendations.

## 2. Overall Interaction Flow

The prototype consists of four main screens.

### Screen 01 - Welcome

- Introduce the moderation task.
- Explain the purpose of the prototype.
- Explain that AI outputs and confidence levels are simulated.
- Inform users that AI recommendations may be incorrect.
- Explain that the final moderation decision belongs to the user.

### Screen 02 - Mode Selection

Allow users to select one of three interaction modes:

- Mode A: Explanation Only
- Mode B: Mandatory Verification
- Mode C: Selective Verification

Provide a short description of each mode before the
user starts the moderation session.

### Screen 03 - Moderation Workspace

Present one moderation case at a time.

The workspace contains six functional areas:

1. Content and context
2. AI recommendation, explanation and confidence
3. Verification prompt
4. Moderation policy and sources
5. Human decision
6. Decision feedback

Display case progress throughout the session.

### Screen 04 - Session Summary

Present a summary after all six cases are completed.

Allow the user to review their decision outcomes
and verification activity.

Allow the user to start a new session in another mode.

## 3. Interaction Modes

All three modes use the same moderation cases,
AI recommendations, explanations, confidence levels
and reference decisions.

All modes provide access to the same moderation policy.

### Mode A - Explanation Only

- Display the content and AI assessment.
- Allow voluntary policy verification.
- Do not require verification before a final decision.
- Allow the user to submit KEEP or REMOVE.

This mode provides a baseline without mandatory
verification prompts.

### Mode B - Mandatory Verification

- Display the content and AI assessment.
- Require policy verification for every case.
- Enable the decision controls after verification.
- Allow the user to submit KEEP or REMOVE.

### Mode C - Selective Verification

- Display the content and AI assessment.
- Require verification when simulated confidence is Low.
- Allow optional verification when confidence is High.
- Enable the decision controls when the verification
  requirement has been satisfied.
- Allow the user to submit KEEP or REMOVE.

## 4. Verification Trigger Logic

| Mode | High Confidence | Low Confidence |
|---|---|---|
| A | Optional | Optional |
| B | Required | Required |
| C | Optional | Required |

The verification requirement is determined by the
selected interaction mode and simulated confidence level.

It is not determined by the actual correctness of the
AI recommendation.

This allows the prototype to demonstrate both missed
high-confidence errors and additional verification
for correct low-confidence recommendations.

## 5. Policy-based Verification

The verification procedure requires the user to:

1. Open the moderation policy.
2. Review the available rules and policy sources.
3. Select one or more relevant rules, or select Not sure.
4. Complete verification.

Not sure is mutually exclusive with other rule selections.

The system does not require the user to select the
reference policy rules to complete verification.

No correctness feedback is provided during verification.

Users may edit their rule selections before submitting
their final decision. Editing invalidates the previous
verification completion until it is confirmed again.

Completing verification records an interaction action.
It does not prove that the user has understood the policy.

## 6. Human Decision and Control

The user makes the final moderation decision:

- KEEP
- REMOVE

Neither decision is preselected.

When verification is required, the decision controls
remain disabled until verification has been completed.

Both decision options become available after verification,
regardless of the rules selected by the user.

The user may change their selected decision before
submission.

A decision is recorded only after the user selects
Submit Decision.

The AI recommendation is advisory and cannot
automatically determine the user's final decision.

## 7. Decision Feedback

After submission, the system displays:

- AI recommendation
- User decision
- Reference decision
- Whether the user decision matches the reference
- Reference policy rules and rationale
- Verification status
- Selected policy rules, if applicable
- Decision outcome category

The reference decision and its rationale are not
revealed before submission.

The system distinguishes four decision outcomes:

- Correct AI accepted
- Incorrect AI accepted
- Correct AI overridden
- Incorrect AI overridden

These categories describe observable decision behaviour
rather than directly measuring trust or appropriate reliance.

Submitted decisions are locked to prevent accidental
changes or duplicate submissions.

The user can then proceed to the next case.

## 8. Interaction Data

The following information is recorded for each submitted
decision:

| Field | Description |
|---|---|
| caseId | Moderation case identifier |
| mode | Selected interaction mode |
| aiRecommendation | Simulated AI recommendation |
| confidence | Simulated confidence level |
| verificationRequired | Whether verification was required |
| verificationCompleted | Whether verification was completed |
| selectedRules | User-selected policy rules |
| userDecision | Final submitted decision |
| referenceDecision | Predefined reference decision |
| outcome | Decision outcome category |

The interaction state is reset when the user moves
to the next case.

Previously submitted decisions remain available
within the current session.

## 9. Session Summary

The summary presents:

- Number of completed cases
- Number of decisions matching the reference
- Number of completed mandatory verifications
- Number of completed voluntary verifications
- Distribution of the four decision outcome categories
- Individual case results

No artificial trust score or cognitive load score
is generated.

Starting a new session resets the previous session's
active interaction state and decision records.

## 10. Design Rationale

### D01 - Consistent Information Access

All modes provide access to the same content, AI
assessment and moderation policy.

This isolates the intended interaction difference:
the requirement to perform verification.

### D02 - Meaningful Verification

Selecting relevant policy rules was chosen instead
of simply opening a policy panel or confirming that
the policy had been read.

This encourages users to connect the moderation
rules with the content under review.

### D03 - Verification Effort

Rule selection was chosen instead of mandatory
written explanations to limit additional input effort.

### D04 - Independent Human Decision

Users are not required to identify the reference
rules before submitting their decisions.

This avoids revealing the expected answer during
verification and preserves the possibility of
independent judgement.

### D05 - Delayed Feedback

Reference decisions are revealed after submission
rather than during the decision-making process.

This prevents the reference answer from directly
guiding the current decision.

### D06 - Selective Verification Trade-off

Selective verification reduces the number of
mandatory checks in the designed case set.

However, it may fail to prompt users to check
incorrect high-confidence recommendations.

Voluntary verification therefore remains available.

## 11. Scope and Limitations

- AI recommendations, explanations and confidence
  levels are simulated.
- The prototype uses predefined moderation cases.
- Verification completion does not demonstrate
  actual policy comprehension.
- No initial independent human judgement is collected.
- Decision outcomes are not formal measures of
  appropriate reliance or trust.
- Verification counts are interaction measures,
  not validated measures of cognitive effort.
- Feedback may influence decisions in later cases.
- Repeating the same cases in different modes may
  introduce learning and memory effects.
- The interaction design is intended for demonstration
  and functional testing, not a controlled user study.

## 12. Implementation Status

The interaction described in this document is planned.

Implementation and functional testing will be
documented during the development stage.