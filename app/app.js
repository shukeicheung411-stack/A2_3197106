/* ==========================================
   AI-assisted Moderation Prototype
   Interaction Controller

   Sources: INTERACTION.md and ARCHITECTURE.md
   ========================================== */


/* 1. Application state */

const MODE_NAMES = {
    A: "Explanation Only",
    B: "Mandatory Verification",
    C: "Selective Verification"
};

const state = {
    mode: null,
    caseIndex: 0,
    selectedRules: [],
    verificationCompleted: false,
    userDecision: null,
    submitted: false,
    records: []
};


/* 2. Interface helper functions */

function byId(id) {
    return document.getElementById(id);
}

function setText(id, text) {
    byId(id).textContent = text;
}

function currentCase() {
    return CASES[state.caseIndex];
}

function focusHeading(containerId) {
    const heading = byId(containerId)
        .querySelector("h2, h3");

    if (heading) {
        heading.tabIndex = -1;
        heading.focus();
    }
}

function showScreen(screenId) {

    const screens = [
        "welcome-screen",
        "mode-screen",
        "review-screen",
        "summary-screen"
    ];

    screens.forEach(id => {
        byId(id).hidden = id !== screenId;
    });

    focusHeading(screenId);
    window.scrollTo(0, 0);
}


/* 3. Session management */

function startSession(mode) {

    state.mode = mode;
    state.caseIndex = 0;
    state.records = [];

    showScreen("review-screen");
    loadCase();
}

function resetCaseState() {

    state.selectedRules = [];
    state.verificationCompleted = false;
    state.userDecision = null;
    state.submitted = false;
}


/* 4. Load moderation content */

function loadCase() {

    resetCaseState();

    const item = currentCase();

    setText(
        "current-mode",
        "Mode " + state.mode + " - " +
        MODE_NAMES[state.mode]
    );

    setText(
        "case-progress",
        "Case " + (state.caseIndex + 1) +
        " of " + CASES.length +
        " | " + item.id
    );

    setText("original-post", item.originalPost);
    setText("review-comment", item.comment);

    setText("ai-recommendation", item.aiRecommendation);
    setText("ai-confidence", item.confidence);
    setText("ai-explanation", item.aiExplanation);

    byId("ai-confidence").dataset.level =
        item.confidence;

    byId("policy-panel").hidden = true;

    byId("policy-button")
        .setAttribute("aria-expanded", "false");

    setText(
        "policy-button",
        "Review Moderation Policy"
    );

    byId("feedback-panel").hidden = true;
    byId("feedback-content").replaceChildren();

    delete byId("feedback-content").dataset.match;

    renderPolicy();
    updateControls();

    focusHeading("review-screen");
    window.scrollTo(0, 0);
}


/* 5. Render moderation policy */

function renderPolicy() {

    const container = byId("policy-rules");

    container.replaceChildren();

    POLICY_RULES.forEach(rule => {

        const label = document.createElement("label");

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.value = rule.id;

        checkbox.addEventListener("change", () => {
            changeRuleSelection(
                rule.id,
                checkbox.checked
            );
        });

        const title = document.createElement("strong");

        title.textContent =
            rule.id + " - " + rule.title;

        const description =
            document.createElement("span");

        description.textContent =
            " " + rule.text +
            " (Sources: " +
            rule.sourceIds.join(", ") + ")";

        label.append(
            checkbox,
            title,
            document.createElement("br"),
            description
        );

        container.appendChild(label);
    });

    /* Not sure option */

    const unsureLabel =
        document.createElement("label");

    const unsureInput =
        document.createElement("input");

    unsureInput.type = "checkbox";
    unsureInput.value = "Unsure";

    unsureInput.addEventListener("change", () => {
        changeRuleSelection(
            "Unsure",
            unsureInput.checked
        );
    });

    unsureLabel.append(
        unsureInput,
        document.createTextNode(
            "Not sure - I am unsure which rule is relevant."
        )
    );

    container.appendChild(unsureLabel);

    renderPolicySources();
}


/* 6. Render policy sources */

function renderPolicySources() {

    const container = byId("policy-sources");

    container.replaceChildren();

    const heading = document.createElement("p");

    heading.textContent =
        "Adapted policy sources (external links):";

    container.appendChild(heading);

    POLICY_SOURCES.forEach(source => {

        const link = document.createElement("a");

        link.href = source.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        link.textContent =
            source.id + " - " + source.name;

        container.appendChild(link);
    });
}


/* 7. Open and close policy panel */

function togglePolicy() {

    const panel = byId("policy-panel");
    const opening = panel.hidden;

    panel.hidden = !opening;

    byId("policy-button").setAttribute(
        "aria-expanded",
        String(opening)
    );

    setText(
        "policy-button",
        opening
            ? "Hide Moderation Policy"
            : "Review Moderation Policy"
    );
}


/* 8. Policy rule selection */

function changeRuleSelection(ruleId, checked) {

    if (
        state.submitted ||
        state.verificationCompleted
    ) {
        return;
    }

    if (checked) {

        if (ruleId === "Unsure") {

            state.selectedRules = ["Unsure"];

        } else {

            state.selectedRules =
                state.selectedRules.filter(
                    id => id !== "Unsure"
                );

            if (!state.selectedRules.includes(ruleId)) {
                state.selectedRules.push(ruleId);
            }
        }

    } else {

        state.selectedRules =
            state.selectedRules.filter(
                id => id !== ruleId
            );
    }

    updateControls();
}


/* 9. Complete or edit verification */

function completeVerification() {

    if (state.submitted) {
        return;
    }

    if (!isValidVerification(state.selectedRules)) {
        return;
    }

    state.verificationCompleted = true;

    updateControls();
    focusHeading("decision-panel");
}

function editVerification() {

    if (state.submitted) {
        return;
    }

    state.verificationCompleted = false;

    updateControls();

    const firstRule =
        byId("policy-rules").querySelector("input");

    if (firstRule) {
        firstRule.focus();
    }
}


/* 10. Update interface controls */

function updateControls() {

    const item = currentCase();

    const required = requiresVerification(
        state.mode,
        item.confidence
    );

    const available = isDecisionAvailable(
        state.mode,
        item.confidence,
        state.verificationCompleted,
        state.submitted
    );

    const verificationPanel =
        byId("verification-panel");

    if (state.verificationCompleted) {

        verificationPanel.dataset.status =
            "completed";

        setText(
            "verification-status",
            "Verification completed."
        );

    } else if (required) {

        verificationPanel.dataset.status =
            "required";

        const reason = state.mode === "B"
            ? "This mode requires verification for every case."
            : "The simulated AI confidence is Low.";

        setText(
            "verification-status",
            "Verification required. " + reason +
            " Select relevant policy rules before deciding."
        );

    } else {

        verificationPanel.dataset.status =
            "optional";

        setText(
            "verification-status",
            "Verification optional. You may review the policy before deciding."
        );
    }

    /* Synchronise rule checkboxes */

    document.querySelectorAll(
        "#policy-rules input"
    ).forEach(input => {

        input.checked =
            state.selectedRules.includes(input.value);

        input.disabled =
            state.verificationCompleted ||
            state.submitted;
    });

    byId("verify-button").disabled =
        !isValidVerification(state.selectedRules) ||
        state.verificationCompleted ||
        state.submitted;

    byId("verify-button").hidden =
        state.verificationCompleted ||
        state.submitted;

    byId("edit-rules-button").hidden =
        !state.verificationCompleted ||
        state.submitted;

    /* Synchronise decision buttons */

    byId("keep-button").disabled = !available;
    byId("remove-button").disabled = !available;

    byId("keep-button").setAttribute(
        "aria-pressed",
        String(state.userDecision === "KEEP")
    );

    byId("remove-button").setAttribute(
        "aria-pressed",
        String(state.userDecision === "REMOVE")
    );

    byId("submit-button").disabled =
        !canSubmitDecision(
            state.mode,
            item.confidence,
            state.verificationCompleted,
            state.userDecision,
            state.submitted
        );

    if (state.submitted) {

        setText(
            "decision-status",
            "Decision submitted: " +
            state.userDecision
        );

    } else if (!available) {

        setText(
            "decision-status",
            "Complete verification to unlock your decision."
        );

    } else if (state.userDecision) {

        setText(
            "decision-status",
            "Selected decision: " +
            state.userDecision
        );

    } else {

        setText(
            "decision-status",
            "Choose KEEP or REMOVE. The final decision is yours."
        );
    }
}


/* 11. Select a moderation decision */

function selectDecision(decision) {

    const item = currentCase();

    if (!["KEEP", "REMOVE"].includes(decision)) {
        return;
    }

    if (!isDecisionAvailable(
        state.mode,
        item.confidence,
        state.verificationCompleted,
        state.submitted
    )) {
        return;
    }

    state.userDecision = decision;

    updateControls();
}


/* 12. Submit and record a decision */

function submitDecision() {

    const item = currentCase();

    if (!canSubmitDecision(
        state.mode,
        item.confidence,
        state.verificationCompleted,
        state.userDecision,
        state.submitted
    )) {
        return;
    }

    const record = {

        caseId: item.id,

        mode: state.mode,

        aiRecommendation: item.aiRecommendation,

        confidence: item.confidence,

        verificationRequired: requiresVerification(
            state.mode,
            item.confidence
        ),

        verificationCompleted:
            state.verificationCompleted,

        selectedRules: [...state.selectedRules],

        userDecision: state.userDecision,

        referenceDecision: item.referenceDecision,

        outcome: getDecisionOutcome(
            item.aiRecommendation,
            state.userDecision,
            item.referenceDecision
        )
    };

    state.submitted = true;

    state.records.push(record);

    updateControls();
    renderFeedback(record, item);
}


/* 13. Feedback rendering */

function addDetail(container, label, value) {

    const paragraph = document.createElement("p");
    const title = document.createElement("strong");

    title.textContent = label + ": ";

    paragraph.append(
        title,
        document.createTextNode(String(value))
    );

    container.appendChild(paragraph);
}

function renderFeedback(record, item) {

    const container = byId("feedback-content");

    container.replaceChildren();

    const matches =
        record.userDecision ===
        record.referenceDecision;

    container.dataset.match = String(matches);

    addDetail(
        container,
        "Result",
        matches
            ? "Your decision matches the reference."
            : "Your decision differs from the reference."
    );

    addDetail(
        container,
        "AI recommendation",
        record.aiRecommendation
    );

    addDetail(
        container,
        "Your decision",
        record.userDecision
    );

    addDetail(
        container,
        "Reference decision",
        record.referenceDecision
    );

    addDetail(
        container,
        "Decision outcome",
        record.outcome
    );

    const verificationText =
        record.verificationCompleted
            ? (
                record.verificationRequired
                    ? "Mandatory - completed"
                    : "Voluntary - completed"
            )
            : "Not completed";

    addDetail(
        container,
        "Verification",
        verificationText
    );

    addDetail(
        container,
        "Selected rules",
        record.selectedRules.join(", ") || "None"
    );

    addDetail(
        container,
        "Reference policy",
        item.referenceRules.join(", ")
    );

    addDetail(
        container,
        "Reference rationale",
        item.referenceRationale
    );

    addDetail(
        container,
        "Note",
        "The reference decision is predefined under the prototype policy and is not independently validated ground truth."
    );

    byId("feedback-panel").hidden = false;

    setText(
        "next-button",
        state.caseIndex === CASES.length - 1
            ? "View Session Summary"
            : "Next Case"
    );

    focusHeading("feedback-panel");
}


/* 14. Move to the next case */

function nextCase() {

    if (!state.submitted) {
        return;
    }

    if (state.caseIndex < CASES.length - 1) {

        state.caseIndex++;

        loadCase();

    } else {

        renderSummary();
    }
}


/* 15. Session summary */

function renderSummary() {

    const summary = calculateSessionSummary(
        state.records
    );

    const container = byId("summary-content");

    container.replaceChildren();

    addDetail(
        container,
        "Interaction mode",
        "Mode " + state.mode + " - " +
        MODE_NAMES[state.mode]
    );

    addDetail(
        container,
        "Cases completed",
        summary.completedCases + " / " +
        CASES.length
    );

    addDetail(
        container,
        "Reference-matching decisions",
        summary.referenceMatches + " / " +
        summary.completedCases
    );

    addDetail(
        container,
        "Mandatory verifications completed",
        summary.mandatoryChecks
    );

    addDetail(
        container,
        "Voluntary verifications completed",
        summary.voluntaryChecks
    );

    const heading = document.createElement("h3");

    heading.textContent = "Decision Outcomes";

    container.appendChild(heading);

    Object.entries(summary.outcomes).forEach(
        ([outcome, count]) => {
            addDetail(container, outcome, count);
        }
    );

    addDetail(
        container,
        "Interpretation",
        "These records describe decision and verification behaviour. They do not directly measure trust or cognitive effort."
    );

    renderCaseResults();
    showScreen("summary-screen");
}


/* 16. Individual case results */

function renderCaseResults() {

    const container = byId("case-results");

    container.replaceChildren();

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headers = [
        "Case",
        "AI",
        "Your decision",
        "Reference",
        "Verification",
        "Outcome"
    ];

    const headerRow = document.createElement("tr");

    headers.forEach(text => {

        const th = document.createElement("th");

        th.scope = "col";
        th.textContent = text;

        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    state.records.forEach(record => {

        const row = document.createElement("tr");

        const verification =
            record.verificationCompleted
                ? (
                    record.verificationRequired
                        ? "Mandatory"
                        : "Voluntary"
                )
                : "None";

        const values = [
            record.caseId,
            record.aiRecommendation,
            record.userDecision,
            record.referenceDecision,
            verification,
            record.outcome
        ];

        values.forEach(value => {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    table.append(thead, tbody);

    container.appendChild(table);
}


/* 17. Restart the session */

function restartSession() {

    state.mode = null;
    state.caseIndex = 0;
    state.records = [];

    resetCaseState();

    showScreen("mode-screen");
}


/* 18. Connect user actions to functions */

byId("start-button").addEventListener(
    "click",
    () => showScreen("mode-screen")
);

byId("mode-a").addEventListener(
    "click",
    () => startSession("A")
);

byId("mode-b").addEventListener(
    "click",
    () => startSession("B")
);

byId("mode-c").addEventListener(
    "click",
    () => startSession("C")
);

byId("policy-button").addEventListener(
    "click",
    togglePolicy
);

byId("verify-button").addEventListener(
    "click",
    completeVerification
);

byId("edit-rules-button").addEventListener(
    "click",
    editVerification
);

byId("keep-button").addEventListener(
    "click",
    () => selectDecision("KEEP")
);

byId("remove-button").addEventListener(
    "click",
    () => selectDecision("REMOVE")
);

byId("submit-button").addEventListener(
    "click",
    submitDecision
);

byId("next-button").addEventListener(
    "click",
    nextCase
);

byId("restart-button").addEventListener(
    "click",
    restartSession
);
