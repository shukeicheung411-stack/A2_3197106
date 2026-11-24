# Moderation Policy

## 1. Policy Scope

This prototype supports AI-assisted hate speech moderation
of social media text.

It focuses on three identity categories:

- Ethnicity
- Gender
- Disability

The policy is adapted from existing social media policies
rather than designed entirely from scratch.

The prototype is not affiliated with or integrated into
any existing social media platform.

## 2. Policy Sources

### S01 - Reddit: Hate Policy

Primary policy source.

https://support.reddithelp.com/hc/en-us/articles/360045715951-Hate

### S02 - Meta: Safety Policies

Supporting source for distinguishing identity-based
attacks from criticism of ideas and institutions.

https://www.meta.com/safety/topics/safety-basics/policies/

### S03 - X: Hateful Conduct Policy

Supporting source for contextual interpretation.

https://help.x.com/en/rules-and-policies/hateful-conduct-policy

Accessed: 24 November 2026.

## 3. Adapted Moderation Rules

### R01 - Identity-based Attack

REMOVE content that demeans or attacks people based
on ethnicity, gender or disability.

Sources: S01, S02.

### R02 - Discrimination and Exclusion

REMOVE content that promotes identity-based exclusion,
unequal treatment or harmful stereotypes.

Source: S01.

### R03 - Legitimate Criticism

KEEP criticism of policies, ideas, institutions or
behaviours when it does not constitute an identity-based
attack or otherwise violate this prototype policy.

Sources: S01, S02.

### R04 - Counter-speech

KEEP content that discusses discriminatory statements
to challenge or condemn them rather than endorse them,
provided it does not otherwise violate the policy.

Source: S01.

### R05 - Contextual Interpretation

Consider the target, surrounding context and apparent
intent rather than relying solely on keywords.

This is an interpretation principle rather than a
separate KEEP or REMOVE rule.

Sources: S01, S03.

## 4. Decision Options

- KEEP: The content does not violate the prototype policy.
- REMOVE: The content violates the prototype policy.

These are simplified demonstration decisions, not
actual platform enforcement actions.

## 5. Reference Decisions

Each moderation case will have a predefined reference
decision supported by the adapted rules.

Reference decisions are specific to this prototype
and are not independently validated ground truth.

## 6. Decision Outcomes

| AI Recommendation | User Response | Outcome |
|---|---|---|
| Correct | Accept | Correct AI accepted |
| Incorrect | Accept | Incorrect AI accepted |
| Correct | Override | Correct AI overridden |
| Incorrect | Override | Incorrect AI overridden |

These categories describe observable final decision
behaviour within the binary prototype task.

They are related to the concept of appropriate reliance
but do not constitute a formal measure of it.

The prototype does not collect an initial independent
human judgement before displaying the AI recommendation.

The outcomes do not directly measure trust, cognitive
effort or changes in user reliance.

## 7. Scope and Limitations

- Only text-based content is included.
- Only three identity categories are covered.
- Account history and community-specific rules are excluded.
- Further human escalation is outside the initial scope.
- Cases must provide sufficient context for a reference decision.
- The policy is a simplified adaptation, not a complete
  representation of Reddit, Meta or X policies.
- The prototype does not perform real platform enforcement.