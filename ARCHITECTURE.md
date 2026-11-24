# System Architecture

## 1. Technology Stack

The prototype is designed as a lightweight
browser-based interactive system.

- HTML: interface structure.
- CSS: visual layout and interaction states.
- JavaScript: interaction control and decision logic.
- Structured JavaScript data: cases and moderation rules.
- Git and GitHub: version control and development evidence.

No backend server, database or external AI API
is required for the initial prototype.

## 2. System Components

### User Interface

Presents the welcome screen, mode selection,
moderation workspace and session summary.

### Case and Policy Data

Stores the six predefined moderation cases,
simulated AI outputs, confidence labels,
reference decisions and moderation rules.

### Interaction Controller

Manages the current screen, interaction mode,
case progress, user actions and interface updates.

### Verification Logic

Determines whether policy verification is required
based on the interaction mode and simulated confidence.

### Decision Logic

Compares the submitted user decision with the
AI recommendation and predefined reference decision.

### Session State

Stores verification activity, selected rules,
submitted decisions and outcome categories
within the current browser session.

## 3. Information and Control Flow

1. The user selects an interaction mode.
2. The controller loads the current case.
3. The verification logic evaluates the mode
   and simulated confidence.
4. The interface displays the case and AI assessment.
5. The user completes verification if required.
6. The user submits a final moderation decision.
7. The decision logic determines the outcome.
8. The controller displays feedback and stores
   the decision record.
9. The next case is loaded or the session summary
   is displayed.

## 4. Planned File Structure

| File | Responsibility |
|---|---|
| app/index.html | Interface structure |
| app/styles.css | Visual presentation |
| app/data.js | Case and policy data |
| app/logic.js | Verification and decision logic |
| app/app.js | Interaction control and rendering |

## 5. Intelligent Behaviour

The AI recommendations, explanations and confidence
levels are predefined simulations.

The system uses deterministic rules to adapt
verification requirements to the selected mode
and simulated uncertainty.

The verification logic does not use the reference
decision to determine whether verification is required.

No live AI inference or model training is performed.

## 6. Technical Design Rationale

A client-side architecture was selected to reduce
implementation complexity and focus development
on the human-AI interaction.

Separating data, decision logic and interface control
supports maintainability and functional testing.

Using predefined AI outputs allows consistent
demonstration of correct and incorrect recommendations.

The same cases can be presented under different
verification conditions.

## 7. Technical Limitations

- No live moderation model is connected.
- Confidence labels are simulated.
- Reference answers are stored on the client.
- Reference answers are hidden by the interface,
  not protected by server-side access control.
- Session records are stored in browser memory
  and are lost when the page is reloaded.
- No real platform enforcement is performed.

## 8. Implementation Status

This document describes the planned architecture.

The components and their behaviour will be checked
during implementation and functional testing.