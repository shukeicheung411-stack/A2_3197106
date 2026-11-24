# System Requirements

## 1. Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| FR01 | Content Presentation | Display online content for the reviewer to assess. |
| FR02 | AI Recommendation | Provide a suggested moderation decision. |
| FR03 | AI Explanation | Explain the reasons behind the AI recommendation. |
| FR04 | Uncertainty Information | Communicate uncertainty associated with the AI recommendation. |
| FR05 | Verification Mechanism | Support three different verification modes. |
| FR06 | Human Decision Control | Allow users to accept or override the AI recommendation. |
| FR07 | Decision Feedback | Provide feedback on the user's moderation decision. |

## 2. Interaction Modes

### Mode A: Explanation Only

Provide an AI recommendation and explanation without mandatory verification.

### Mode B: Mandatory Verification

Require users to verify every recommendation before making a final decision.

### Mode C: Selective Verification

Require verification when a predefined uncertainty condition is met. Allow voluntary verification in other cases.

## 3. Design Constraints

- The final decision remains under human control.
- AI recommendations may be incorrect.
- Explanations do not guarantee correctness.
- Verification should avoid unnecessary cognitive effort.
- Implemented, simulated and planned functionality must be clearly distinguished.

## 4. Outstanding Design Decisions

- Moderation scenarios and example content.
- Moderation rules and reference decisions.
- Detailed verification interaction.
- Uncertainty representation and triggering conditions.
- Technical implementation.