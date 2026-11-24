# Functional Testing and Development Evidence

## 1. Testing Overview

Date: 24 November 2026

The purpose of testing was to check whether the
implemented prototype behaved consistently with
the interaction design and system requirements.

Testing focused on:

- Interface loading and navigation.
- Structured case and policy data.
- Verification requirements.
- Human decision control.
- Policy selection and editing.
- Decision feedback.
- Session recording and summary.
- Differences between the three interaction modes.

This was developer-led functional testing,
not a controlled user study.


## 2. Testing Environment

- Operating system: Windows.
- Development environment: Visual Studio Code.
- Browser: Google Chrome.
- Execution: Local HTML file.
- Testing methods: Browser interaction,
  JavaScript Console and manual inspection.
- AI behaviour: Predefined simulated outputs.


## 3. Data Loading Tests

| Test | Expected | Actual | Result |
|---|---|---|---|
| CASES.length | 6 | 6 | Pass |
| POLICY_RULES.length | 5 | 5 | Pass |
| POLICY_SOURCES.length | 3 | 3 | Pass |

The three data arrays were successfully loaded
and inspected using the browser Console.

These tests confirmed data availability and
array sizes, rather than the validity of
every individual data field.


## 4. Verification Logic Tests

| Mode | Confidence | Expected | Actual | Result |
|---|---|---|---|---|
| A | High | false | false | Pass |
| A | Low | false | false | Pass |
| B | High | true | true | Pass |
| B | Low | true | true | Pass |
| C | High | false | false | Pass |
| C | Low | true | true | Pass |

The requiresVerification function returned
the expected result for all six combinations.

An additional invalid input, "LOW", produced
the expected "Invalid confidence level" error.

This confirmed that unsupported confidence
values were rejected.


## 5. Mode C End-to-End Testing

All six moderation cases were completed
during a manual test session.

Different decisions were deliberately selected
to exercise all four outcome categories.

| Case | AI | User | Reference | Verification | Outcome |
|---|---|---|---|---|---|
| C01 | REMOVE | KEEP | REMOVE | None | Correct AI overridden |
| C02 | REMOVE | KEEP | KEEP | Mandatory | Incorrect AI overridden |
| C03 | KEEP | KEEP | REMOVE | Mandatory | Incorrect AI accepted |
| C04 | REMOVE | KEEP | KEEP | Not completed | Incorrect AI overridden |
| C05 | KEEP | KEEP | KEEP | Mandatory | Correct AI accepted |
| C06 | REMOVE | REMOVE | REMOVE | Voluntary | Correct AI accepted |

### Additional Observations

C02 demonstrated mandatory verification and
the ability to override an incorrect recommendation.

The Not sure option was selected during the
completed verification in C02.

C03 demonstrated that completing verification
does not guarantee a reference-matching decision.

In C04, policy rules were selected but
verification was not recorded as completed.
The system still permitted submission because
verification was optional.

C06 confirmed that voluntary verification
could be completed and recorded successfully.


## 6. Session Summary Verification

The final Mode C summary was checked against
the individual case feedback.

| Measure | Expected | Actual | Result |
|---|---|---|---|
| Cases completed | 6 | 6 | Pass |
| Reference-matching decisions | 4 | 4 | Pass |
| Mandatory verifications | 3 | 3 | Pass |
| Voluntary verifications | 1 | 1 | Pass |
| Correct AI accepted | 2 | 2 | Pass |
| Incorrect AI accepted | 1 | 1 | Pass |
| Correct AI overridden | 1 | 1 | Pass |
| Incorrect AI overridden | 2 | 2 | Pass |

All six individual case records were also
displayed in the summary table.

The results were consistent with the decisions
recorded during the test session.


## 7. Interaction Function Tests

| Function | Result | Evidence |
|---|---|---|
| Welcome screen loading | Pass | Screenshot |
| Mode selection | Pass | Manual operation |
| Case navigation | Pass | Screenshots |
| Mandatory decision locking | Pass | Screenshot |
| Multiple policy rule selection | Pass | Screenshot |
| Not sure mutual exclusion | Pass | Screenshot |
| Verification completion | Pass | Screenshot |
| Decision unlocking | Pass | Screenshot |
| Editing verification and re-locking | Pass | Developer confirmation |
| Voluntary verification | Pass | Screenshot |
| Decision submission | Pass | Screenshot |
| Post-submission button locking | Pass | Screenshot |
| Decision feedback | Pass | Screenshot |
| Session summary | Pass | Screenshots |
| Starting a new session | Pass | Developer confirmation |
| Mode A complete session | Pass | Developer confirmation |
| Mode B complete session | Pass | Developer confirmation |
| Mode C complete session | Pass | Screenshots |

Mode A and Mode B were manually tested
by the developer and confirmed as working.

Their final numerical summaries were not
independently checked against screenshots.


## 8. Debugging Record

### Issue 1 - JavaScript data initially unavailable

Observation:

The browser Console initially returned
ReferenceError messages for the data arrays.

Action:

The project files were saved, the browser
was refreshed, and the commands were repeated.

Result:

The data arrays subsequently returned
the expected lengths of 6, 5 and 3.

The exact cause of the initial loading
problem was not independently isolated.


### Issue 2 - Incorrect Console input

Observation:

Some test commands contained incorrect
capitalisation or missing characters.

Examples:

- CASE instead of CASES.
- Policy_Rules instead of POLICY_RULES.
- requireVerification instead of requiresVerification.
- LOW instead of Low.

Action:

The command spelling and capitalisation
were corrected.

Result:

The corrected commands returned the
expected results.

These were testing input errors rather
than confirmed defects in the implementation.


### Issue 3 - Browser translation messages

Observation:

The Console displayed resource-loading
errors associated with Google Translate.

Result:

These messages did not prevent the successful
completion of the tested moderation workflow.

They were distinguished from errors
associated with the prototype code.


## 9. Usability Observations

### Observation 1 - Vertical navigation effort

Opening the moderation policy creates
a relatively long page.

The reviewer may need to scroll between
the original content, AI assessment,
policy evidence and final decision.

This may introduce additional interaction
effort during policy verification.

Possible improvement:

Improve access to the case context and
policy evidence during verification.


### Observation 2 - Verification completion clarity

During the C04 test, policy rules were
selected but verification was recorded
as not completed.

This highlighted a possible distinction
between selecting rules and explicitly
completing verification that may not
be sufficiently clear to the reviewer.

Possible improvement:

Provide clearer feedback when rules
have been selected but verification
has not yet been completed.

These observations arose during developer
testing and have not been evaluated
through a formal usability study.


## 10. Testing Limitations

- No external participants were recruited.
- The moderation cases were predefined.
- AI recommendations and confidence levels
  were simulated.
- Reference decisions were not independently
  validated.
- The tests do not establish actual model
  performance or moderation fairness.
- Verification counts do not measure
  cognitive effort directly.
- Decision outcomes do not directly measure
  trust or appropriate reliance.
- External policy links and accessibility
  have not been comprehensively tested.
- Cross-browser compatibility has not
  been established.


## 11. AI Assistance and Human Checking

Generative AI was used to assist with
implementation code, debugging guidance
and test documentation.

The developer reviewed the design proposals,
created and saved the project files,
executed test commands, interacted with
the prototype and inspected its outputs.

The test record distinguishes observed
results, developer-confirmed results
and proposed improvements.

The documented observations should not
be interpreted as independently validated
research findings.

## 12. Design Iteration and Regression Testing

### Iteration 01 - Verification State Feedback

Problem identified:

During the C04 test, policy rules were selected
but verification was not recorded as completed.

Design change:

A dynamic status message was added to distinguish
rule selection from verification completion.

The interface now provides textual and visual
feedback about the current verification state
and the next available action.

Files modified:

- index.html
- app.js
- styles.css

Observed results:

- Selecting R02 displayed the selected rule count.
- Incomplete verification displayed an amber message.
- Completed verification displayed a green message.
- The Edit Selected Rules button remained available.
- Final decision buttons were unlocked after
  completing mandatory verification.

These states were checked through browser screenshots.

### Iteration 02 - Information Accessibility

Problem identified:

The original vertical policy layout required
additional scrolling between case information
and moderation policy evidence.

Design change:

A responsive two-column policy layout was added
for wider browser windows.

An expandable Review Case Context section was
introduced within the policy panel.

This section provides access to:

- Original post.
- Comment under review.
- Simulated AI recommendation and confidence.
- Simulated AI explanation.

Files modified:

- index.html
- app.js
- styles.css

Observed results:

- The two-column policy layout was displayed.
- The Not sure option occupied a separate row.
- The case context section was displayed.
- The verification status feedback remained visible.
- Existing policy source links remained visible.

The revised interface was inspected through
a browser screenshot and developer-led testing.

The screenshot shows the collapsed context section.
Expanded content and case transitions were not
independently verified through screenshots.

### Interpretation and Limitations

The changes were informed by developer testing
and HCI principles relating to feedback,
attention, working memory and recognition
rather than recall.

The intended benefit is to reduce unnecessary
information-seeking effort and improve the
visibility of verification states.

No formal usability study was conducted.

The changes do not establish a measured reduction
in cognitive effort or an improvement in trust
or decision accuracy.