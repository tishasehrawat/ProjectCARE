export type ContextKey = "diagnosis" | "preop" | "postconsult" | "ot-icu";

export interface CareContext {
  key: ContextKey;
  title: string;
  subtitle: string;
  emoji: string;
  stages: { title: string; detail: string; estimate?: string }[];
  faqs: { q: string; a: string }[];
  questions: string[];
}

export const CONTEXTS: Record<ContextKey, CareContext> = {
  diagnosis: {
    key: "diagnosis",
    title: "Waiting for diagnosis or test results",
    subtitle: "The not-knowing is often heavier than the knowing.",
    emoji: "🔬",
    stages: [
      { title: "Sample or scan collected", detail: "Your test has been logged into the hospital system.", estimate: "Done" },
      { title: "Lab or imaging review", detail: "Specialists analyse the result, sometimes with a second opinion.", estimate: "Often a few hours to 1–2 days" },
      { title: "Doctor reviews findings", detail: "Your treating doctor reads the report alongside your history.", estimate: "Typically same day once received" },
      { title: "Conversation with you", detail: "The doctor explains what was found and what it may mean for next steps." },
    ],
    faqs: [
      { q: "Why is it taking so long?", a: "Some tests need careful review or a second specialist. A delay does not usually mean bad news — it often means thoroughness." },
      { q: "Can I ask for an update?", a: "Yes. Politely ask the front desk or your nurse for an estimated time. Hospitals expect this question." },
    ],
    questions: [
      "When can I expect to hear about the results?",
      "Who will explain them to me?",
      "What are the possible next steps depending on the outcome?",
    ],
  },
  preop: {
    key: "preop",
    title: "Pre-operation waiting",
    subtitle: "Your body is preparing. Let us help your mind prepare too.",
    emoji: "🩺",
    stages: [
      { title: "Final checks", detail: "Vitals, paperwork, and consent are confirmed." },
      { title: "Anaesthesia preparation", detail: "The anaesthetist will meet you to plan your comfort and safety." },
      { title: "Transfer to OT", detail: "You are gently moved to the operating area." },
      { title: "Recovery room", detail: "After surgery you wake here while your vitals stabilise." },
    ],
    faqs: [
      { q: "Will I feel pain?", a: "Modern anaesthesia is highly controlled. Tell the team about any past reactions or anxieties." },
      { q: "How long will my family wait?", a: "Surgery durations vary. Staff usually share updates at key milestones." },
    ],
    questions: [
      "How long is the surgery expected to take?",
      "What should my family do during the wait?",
      "What does recovery look like in the first 24 hours?",
    ],
  },
  postconsult: {
    key: "postconsult",
    title: "After a consultation",
    subtitle: "It is okay if not everything was clear the first time.",
    emoji: "💬",
    stages: [
      { title: "What was discussed", detail: "Try to recall the diagnosis name, the plan, and any medication mentioned." },
      { title: "Decisions to make", detail: "Note anything you were asked to think about or schedule." },
      { title: "Follow-up", detail: "Most plans include a follow-up visit, test, or check-in." },
    ],
    faqs: [
      { q: "I forgot what the doctor said. Is that bad?", a: "Very common. Stress narrows memory. Write down what you remember and ask staff to clarify the rest." },
      { q: "Can I ask for things in writing?", a: "Yes — you can request a printed summary or ask the nurse to repeat instructions." },
    ],
    questions: [
      "Can you write down the next steps for me?",
      "What symptoms should make me come back sooner?",
      "Are there side effects I should watch for?",
    ],
  },
  "ot-icu": {
    key: "ot-icu",
    title: "Family waiting outside OT or ICU",
    subtitle: "Waiting is hard work. You are doing it well.",
    emoji: "🤍",
    stages: [
      { title: "Procedure underway", detail: "The clinical team is fully focused. No news in this window is normal." },
      { title: "Periodic updates", detail: "A nurse or coordinator usually shares brief updates at milestones." },
      { title: "Stabilisation", detail: "After the procedure, the patient is observed before family is allowed in." },
      { title: "First visit", detail: "You will be guided in, often briefly, to see your loved one." },
    ],
    faqs: [
      { q: "Why hasn’t anyone updated us?", a: "Quiet stretches usually mean the team is concentrating, not that something is wrong. You may politely ask the coordinator." },
      { q: "What if it is taking longer than expected?", a: "Surgeries often take longer due to extra care, not complications. Ask for an estimated update window." },
    ],
    questions: [
      "Who can give us updates and when?",
      "When will we be allowed to see our family member?",
      "What should we prepare for the next stage?",
    ],
  },
};

export const FEAR_PROMPTS = [
  "How overwhelmed do you feel right now?",
  "How clear are you about what happens next?",
  "How supported do you feel in this moment?",
];
