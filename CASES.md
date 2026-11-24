# Moderation Case Design

## 1. Case Design Principles

Six synthetic moderation cases are designed to demonstrate
different challenges in AI-assisted decision-making.

The cases cover ethnicity, gender and disability.

All social media posts, comments, AI recommendations,
explanations and confidence levels are constructed for
prototype demonstration.

Reference decisions are based on the adapted moderation
policy in POLICY.md.

The cases are not a representative dataset and do not
constitute empirical evidence of AI performance or
user behaviour.

## 2. Case Overview

| ID | Category | AI Recommendation | Reference Decision | Confidence |
|---|---|---|---|---|
| C01 | Ethnicity | REMOVE | REMOVE | High |
| C02 | Ethnicity | REMOVE | KEEP | Low |
| C03 | Gender | KEEP | REMOVE | Low |
| C04 | Gender | REMOVE | KEEP | High |
| C05 | Disability | KEEP | KEEP | Low |
| C06 | Disability | REMOVE | REMOVE | High |

## 3. Moderation Cases

### C01 - Identity-based Exclusion

**Identity category:** Ethnicity

**Scenario:** Community festival

**Original post:**

This year's community festival will include performances
and activities organised by local residents from different
ethnic backgrounds.

Performers are assessed using the same eligibility criteria.
No targeted positive-action scheme is involved.

**Comment under review:**

I'd support a selection process that prioritises one
ethnic background over others, even when applicants
are equally qualified.

**Reference decision:** REMOVE

**Policy evidence:** R02

The comment supports unequal treatment based on ethnicity
despite equal qualifications.

**Simulated AI recommendation:** REMOVE

**Simulated AI explanation:**

The comment supports unequal treatment based on ethnicity,
despite the applicants having equal qualifications.

**Simulated confidence:** High

**AI correctness:** Correct

**Design purpose:**

Demonstrate appropriate acceptance of a correct AI
recommendation and introduce the review interaction.

---

### C02 - Cultural Discussion Misclassified

**Identity category:** Ethnicity

**Scenario:** Cultural festival

**Original post:**

The organisers are planning to group performances from
several Asian communities under a single "Asian Culture"
theme at this year's festival.

**Comment under review:**

I don't think these communities should all be grouped
together. They have different histories and traditions,
and the festival programme should reflect those differences.

**Reference decision:** KEEP

**Policy evidence:** R03, R05

The comment criticises the classification of cultural
performances rather than advocating ethnic exclusion.

**Simulated AI recommendation:** REMOVE

**Simulated AI explanation:**

The comment discourages grouping ethnic communities
together and emphasises their differences, which may
indicate support for ethnic separation.

**Simulated confidence:** Low

**AI correctness:** Incorrect

**AI error type:** Context misinterpretation

**Design purpose:**

Demonstrate how policy verification can provide an
opportunity to identify and override an incorrect
AI recommendation.

---

### C03 - Implicit Gender Discrimination

**Identity category:** Gender

**Scenario:** Workplace recruitment

**Original post:**

Our company is recruiting for a senior leadership position.
Candidates will be assessed based on their experience,
qualifications and leadership skills.

The recruitment process does not involve a targeted
positive-action scheme.

**Comment under review:**

Leadership appointments should be based on merit.
However, when two candidates are equally qualified,
I think gender should determine who gets the position.

**Reference decision:** REMOVE

**Policy evidence:** R02, R05

The comment supports identity-based unequal treatment
within the stated recruitment context.

**Simulated AI recommendation:** KEEP

**Simulated AI explanation:**

The comment discusses recruitment criteria and initially
emphasises merit and equal qualifications.
It does not contain explicit insults or hostile language.

**Simulated confidence:** Low

**AI correctness:** Incorrect

**AI error type:** Omission of relevant semantic evidence

**Design purpose:**

Demonstrate that an explanation may contain accurate
observations while omitting information essential to
the final decision.

---

### C04 - High-confidence Misclassification

**Identity category:** Gender

**Scenario:** Workplace gender equality discussion

**Original post:**

A recent discussion has raised concerns about how
gender stereotypes influence the way leadership skills
are assessed in the workplace.

**Comment under review:**

Apparently, assertiveness is considered leadership in
men but aggression in women. That double standard says
more about workplace culture than individual ability.

**Reference decision:** KEEP

**Policy evidence:** R03, R04, R05

The comment criticises gender-based double standards
rather than endorsing gender stereotypes.

**Simulated AI recommendation:** REMOVE

**Simulated AI explanation:**

The comment associates men with leadership and women
with aggression, reinforcing gender-based stereotypes
in professional settings.

**Simulated confidence:** High

**AI correctness:** Incorrect

**AI error type:** Misinterpretation of speaker's stance

**Design purpose:**

Demonstrate the limitations of uncertainty-triggered
verification and the importance of voluntary checking
and human control.

---

### C05 - Counter-speech and Accessibility

**Identity category:** Disability

**Scenario:** Public transport accessibility

**Original post:**

The city council is considering investing in more
accessible buses and railway stations following
complaints from passengers with disabilities.

**Comment under review:**

Calling accessibility improvements a waste of money
says more about our priorities than about the people
who need them. Public transport should serve everyone.

**Reference decision:** KEEP

**Policy evidence:** R03, R04, R05

The comment challenges opposition to accessibility
improvements and supports equal access.

**Simulated AI recommendation:** KEEP

**Simulated AI explanation:**

Although the comment contains negative language about
accessibility spending, its overall message supports
equal access to public transport.

**Simulated confidence:** Low

**AI correctness:** Correct

**Design purpose:**

Demonstrate that low confidence does not necessarily
indicate an incorrect recommendation and that mandatory
verification may introduce additional interaction effort.

---

### C06 - Context-dependent Disability Discrimination

**Identity category:** Disability

**Scenario:** University leadership programme

**Original post:**

The university is introducing an inclusive student
leadership programme. Students with disabilities are
encouraged to apply, and reasonable adjustments will
be available where needed.

**Comment under review:**

Even if disabled students meet all the requirements,
I think it would be kinder to offer them observer roles
instead of leadership positions. This would protect
them from unnecessary pressure.

**Reference decision:** REMOVE

**Policy evidence:** R02, R05

The comment advocates restricting opportunities based
on disability despite students meeting the requirements.

**Simulated AI recommendation:** REMOVE

**Simulated AI explanation:**

Although the comment uses sympathetic language, it
advocates restricting leadership opportunities for
students based on disability, even when they meet
the eligibility requirements.

**Simulated confidence:** High

**AI correctness:** Correct

**Design purpose:**

Demonstrate the potential value of a correct AI
explanation in a context-dependent moderation decision.

## 4. Case Coverage

- Three correct and three incorrect AI recommendations.
- Three KEEP and three REMOVE reference decisions.
- Three high-confidence and three low-confidence cases.
- Two cases for each identity category.
- Coverage of normal interaction, error recovery,
  additional verification effort and system limitations.

## 5. Limitations

The cases are manually constructed.

The reference decisions are specific to the adapted
prototype policy and have not been independently validated.

The confidence levels are simulated and are not calibrated
probabilities.

The difficulty of the cases has not been evaluated
through user testing.

The cases do not demonstrate actual model accuracy,
fairness or improvements in appropriate reliance.