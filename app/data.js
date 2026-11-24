/* ==========================================
   AI-assisted Moderation Prototype
   Structured Case and Policy Data

   Sources: POLICY.md and CASES.md
   All AI outputs are predefined simulations.
   ========================================== */


/* 1. Policy Sources */

const POLICY_SOURCES = [
    {
        id: "S01",
        name: "Reddit - Hate Policy",
        url: "https://support.reddithelp.com/hc/en-us/articles/360045715951-Hate",
        role: "Primary policy source"
    },
    {
        id: "S02",
        name: "Meta - Safety Policies",
        url: "https://www.meta.com/safety/topics/safety-basics/policies/",
        role: "Supporting policy source"
    },
    {
        id: "S03",
        name: "X - Hateful Conduct Policy",
        url: "https://help.x.com/en/rules-and-policies/hateful-conduct-policy",
        role: "Supporting policy source"
    }
];


/* 2. Adapted Moderation Rules */

const POLICY_RULES = [
    {
        id: "R01",
        title: "Identity-based Attack",
        text: "REMOVE content that demeans or attacks people based on ethnicity, gender or disability.",
        sourceIds: ["S01", "S02"]
    },
    {
        id: "R02",
        title: "Discrimination and Exclusion",
        text: "REMOVE content that promotes identity-based exclusion, unequal treatment or harmful stereotypes.",
        sourceIds: ["S01"]
    },
    {
        id: "R03",
        title: "Legitimate Criticism",
        text: "KEEP criticism of policies, ideas, institutions or behaviours when it does not constitute an identity-based attack or otherwise violate this prototype policy.",
        sourceIds: ["S01", "S02"]
    },
    {
        id: "R04",
        title: "Counter-speech",
        text: "KEEP content that discusses discriminatory statements to challenge or condemn them rather than endorse them, provided it does not otherwise violate the policy.",
        sourceIds: ["S01"]
    },
    {
        id: "R05",
        title: "Contextual Interpretation",
        text: "Consider the target, surrounding context and apparent intent rather than relying solely on keywords. This is an interpretation principle rather than a separate KEEP or REMOVE rule.",
        sourceIds: ["S01", "S03"]
    }
];


/* 3. Moderation Cases */

const CASES = [

    /* C01 - Identity-based Exclusion */

    {
        id: "C01",
        category: "Ethnicity",
        scenario: "Community festival",

        originalPost: "This year's community festival will include performances and activities organised by local residents from different ethnic backgrounds. Performers are assessed using the same eligibility criteria. No targeted positive-action scheme is involved.",

        comment: "I'd support a selection process that prioritises one ethnic background over others, even when applicants are equally qualified.",

        aiRecommendation: "REMOVE",

        aiExplanation: "The comment supports unequal treatment based on ethnicity, despite the applicants having equal qualifications.",

        confidence: "High",

        referenceDecision: "REMOVE",

        referenceRules: ["R02"],

        referenceRationale: "The comment supports unequal treatment based on ethnicity despite equal qualifications.",

        designPurpose: "Demonstrate appropriate acceptance of a correct AI recommendation and introduce the review interaction."
    },


    /* C02 - Cultural Discussion Misclassified */

    {
        id: "C02",
        category: "Ethnicity",
        scenario: "Cultural festival",

        originalPost: "The organisers are planning to group performances from several Asian communities under a single \"Asian Culture\" theme at this year's festival.",

        comment: "I don't think these communities should all be grouped together. They have different histories and traditions, and the festival programme should reflect those differences.",

        aiRecommendation: "REMOVE",

        aiExplanation: "The comment discourages grouping ethnic communities together and emphasises their differences, which may indicate support for ethnic separation.",

        confidence: "Low",

        referenceDecision: "KEEP",

        referenceRules: ["R03", "R05"],

        referenceRationale: "The comment criticises the classification of cultural performances rather than advocating ethnic exclusion.",

        designPurpose: "Demonstrate how policy verification can provide an opportunity to identify and override an incorrect AI recommendation."
    },


    /* C03 - Implicit Gender Discrimination */

    {
        id: "C03",
        category: "Gender",
        scenario: "Workplace recruitment",

        originalPost: "Our company is recruiting for a senior leadership position. Candidates will be assessed based on their experience, qualifications and leadership skills. The recruitment process does not involve a targeted positive-action scheme.",

        comment: "Leadership appointments should be based on merit. However, when two candidates are equally qualified, I think gender should determine who gets the position.",

        aiRecommendation: "KEEP",

        aiExplanation: "The comment discusses recruitment criteria and initially emphasises merit and equal qualifications. It does not contain explicit insults or hostile language.",

        confidence: "Low",

        referenceDecision: "REMOVE",

        referenceRules: ["R02", "R05"],

        referenceRationale: "The comment supports identity-based unequal treatment within the stated recruitment context.",

        designPurpose: "Demonstrate that an explanation may contain accurate observations while omitting information essential to the final decision."
    },


    /* C04 - High-confidence Misclassification */

    {
        id: "C04",
        category: "Gender",
        scenario: "Workplace gender equality discussion",

        originalPost: "A recent discussion has raised concerns about how gender stereotypes influence the way leadership skills are assessed in the workplace.",

        comment: "Apparently, assertiveness is considered leadership in men but aggression in women. That double standard says more about workplace culture than individual ability.",

        aiRecommendation: "REMOVE",

        aiExplanation: "The comment associates men with leadership and women with aggression, reinforcing gender-based stereotypes in professional settings.",

        confidence: "High",

        referenceDecision: "KEEP",

        referenceRules: ["R03", "R04", "R05"],

        referenceRationale: "The comment criticises gender-based double standards rather than endorsing gender stereotypes.",

        designPurpose: "Demonstrate the limitations of uncertainty-triggered verification and the importance of voluntary checking and human control."
    },


    /* C05 - Counter-speech and Accessibility */

    {
        id: "C05",
        category: "Disability",
        scenario: "Public transport accessibility",

        originalPost: "The city council is considering investing in more accessible buses and railway stations following complaints from passengers with disabilities.",

        comment: "Calling accessibility improvements a waste of money says more about our priorities than about the people who need them. Public transport should serve everyone.",

        aiRecommendation: "KEEP",

        aiExplanation: "Although the comment contains negative language about accessibility spending, its overall message supports equal access to public transport.",

        confidence: "Low",

        referenceDecision: "KEEP",

        referenceRules: ["R03", "R04", "R05"],

        referenceRationale: "The comment challenges opposition to accessibility improvements and supports equal access.",

        designPurpose: "Demonstrate that low confidence does not necessarily indicate an incorrect recommendation and that mandatory verification may introduce additional interaction effort."
    },


    /* C06 - Context-dependent Disability Discrimination */

    {
        id: "C06",
        category: "Disability",
        scenario: "University leadership programme",

        originalPost: "The university is introducing an inclusive student leadership programme. Students with disabilities are encouraged to apply, and reasonable adjustments will be available where needed.",

        comment: "Even if disabled students meet all the requirements, I think it would be kinder to offer them observer roles instead of leadership positions. This would protect them from unnecessary pressure.",

        aiRecommendation: "REMOVE",

        aiExplanation: "Although the comment uses sympathetic language, it advocates restricting leadership opportunities for students based on disability, even when they meet the eligibility requirements.",

        confidence: "High",

        referenceDecision: "REMOVE",

        referenceRules: ["R02", "R05"],

        referenceRationale: "The comment advocates restricting opportunities based on disability despite students meeting the requirements.",

        designPurpose: "Demonstrate the potential value of a correct AI explanation in a context-dependent moderation decision."
    }

];