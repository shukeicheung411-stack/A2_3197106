/* ==========================================
   AI-assisted Moderation Prototype
   Core Verification and Decision Logic

   Source: INTERACTION.md
   ========================================== */


/* 1. Verification requirement */

function requiresVerification(mode, confidence) {

    if (!["A", "B", "C"].includes(mode)) {
        throw new Error("Invalid interaction mode.");
    }

    if (!["High", "Low"].includes(confidence)) {
        throw new Error("Invalid confidence level.");
    }

    if (mode === "A") {
        return false;
    }

    if (mode === "B") {
        return true;
    }

    if (mode === "C") {
        return confidence === "Low";
    }
}


/* 2. Verification selection */

function isValidVerification(selectedRules) {

    if (!Array.isArray(selectedRules)) {
        return false;
    }

    if (selectedRules.length === 0) {
        return false;
    }

    if (selectedRules.includes("Unsure")) {
        return selectedRules.length === 1;
    }

    const validRuleIds = POLICY_RULES.map(rule => rule.id);

    return selectedRules.every(
        ruleId => validRuleIds.includes(ruleId)
    );
}


/* 3. Decision availability */

function isDecisionAvailable(
    mode,
    confidence,
    verificationCompleted,
    submitted = false
) {

    if (submitted) {
        return false;
    }

    const required = requiresVerification(mode, confidence);

    return !required || verificationCompleted;
}


/* 4. Submission eligibility */

function canSubmitDecision(
    mode,
    confidence,
    verificationCompleted,
    userDecision,
    submitted = false
) {

    const validDecision =
        userDecision === "KEEP" ||
        userDecision === "REMOVE";

    return validDecision && isDecisionAvailable(
        mode,
        confidence,
        verificationCompleted,
        submitted
    );
}


/* 5. Decision outcome classification */

function getDecisionOutcome(
    aiRecommendation,
    userDecision,
    referenceDecision
) {

    const validDecisions = ["KEEP", "REMOVE"];

    if (
        !validDecisions.includes(aiRecommendation) ||
        !validDecisions.includes(userDecision) ||
        !validDecisions.includes(referenceDecision)
    ) {
        throw new Error("Invalid moderation decision.");
    }

    const aiCorrect =
        aiRecommendation === referenceDecision;

    const userAcceptedAI =
        userDecision === aiRecommendation;

    if (aiCorrect && userAcceptedAI) {
        return "Correct AI accepted";
    }

    if (!aiCorrect && userAcceptedAI) {
        return "Incorrect AI accepted";
    }

    if (aiCorrect && !userAcceptedAI) {
        return "Correct AI overridden";
    }

    return "Incorrect AI overridden";
}


/* 6. Session summary calculation */

function calculateSessionSummary(records) {

    const outcomes = {
        "Correct AI accepted": 0,
        "Incorrect AI accepted": 0,
        "Correct AI overridden": 0,
        "Incorrect AI overridden": 0
    };

    let referenceMatches = 0;
    let mandatoryChecks = 0;
    let voluntaryChecks = 0;

    records.forEach(record => {

        if (
            record.userDecision ===
            record.referenceDecision
        ) {
            referenceMatches++;
        }

        if (record.verificationCompleted) {

            if (record.verificationRequired) {
                mandatoryChecks++;
            } else {
                voluntaryChecks++;
            }
        }

        outcomes[record.outcome]++;
    });

    return {
        completedCases: records.length,
        referenceMatches: referenceMatches,
        mandatoryChecks: mandatoryChecks,
        voluntaryChecks: voluntaryChecks,
        outcomes: outcomes
    };
}
