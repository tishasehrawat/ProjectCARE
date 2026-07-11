export type ContextKey =
  | "consultation"
  | "diagnosis"
  | "bloodtest"
  | "imaging"
  | "preop"
  | "ot"
  | "icu"
  | "discharge";

export interface CareStage {
  title: string;
  happens: string;
  whyWait?: string[];
  youCanDo?: string[];
  estimate?: string;
}

export interface CareContext {
  key: ContextKey;
  title: string;
  subtitle: string;
  emoji: string;
  stages: CareStage[];
  faqs: { q: string; a: string }[];
  questions: string[];
}

export const CONTEXTS: Record<ContextKey, CareContext> = {
  consultation: {
    key: "consultation",
    title: "Waiting for a consultation",
    subtitle: "The wait outside the doctor's room can feel long. Here's what usually shapes it.",
    emoji: "🗓️",
    stages: [
      {
        title: "Registration & vitals",
        happens: "Your details are confirmed and basic vitals may be recorded before you see the doctor.",
        whyWait: ["Front desk verifying records", "Insurance or billing checks"],
        youCanDo: ["Keep ID and prescriptions handy", "Take a slow breath before your turn"],
        estimate: "Usually 10–30 minutes",
      },
      {
        title: "Queue for the doctor",
        happens: "You wait in the corridor or a waiting area until the doctor is ready.",
        whyWait: ["A previous patient's consult ran long", "Emergency cases take priority", "Doctor is reviewing prior test results"],
        youCanDo: ["Jot down your top 3 questions", "Practice a 1-minute breathing exercise"],
        estimate: "Often 20 minutes to 2 hours",
      },
      {
        title: "Inside the consultation",
        happens: "The doctor speaks with you, examines if needed, and discusses next steps.",
        youCanDo: ["Read your questions from your phone", "Ask for anything you didn't follow to be repeated"],
      },
      {
        title: "After the consultation",
        happens: "You may be given prescriptions, test orders, or a follow-up date.",
        youCanDo: ["Write down what you were told", "Confirm names of medications with the pharmacy"],
      },
    ],
    faqs: [
      { q: "Why is the doctor running late?", a: "Consultations often overrun because a patient needed more time. It usually isn't personal — it means the same care will be given to you." },
      { q: "Can I ask for an updated wait time?", a: "Yes. The front desk or nurse can usually give you a rough estimate. Hospitals expect this question." },
    ],
    questions: [
      "About how much longer might the wait be?",
      "Should I take any medication or food while waiting?",
      "Is there anything I should prepare before going in?",
    ],
  },
  diagnosis: {
    key: "diagnosis",
    title: "Waiting for a diagnosis",
    subtitle: "The not-knowing is often heavier than the knowing.",
    emoji: "🔬",
    stages: [
      {
        title: "Sample or scan collected",
        happens: "Your test has been logged into the hospital system.",
        estimate: "Done",
      },
      {
        title: "Lab or imaging review",
        happens: "Specialists analyse the result, sometimes with a second opinion.",
        whyWait: ["Multiple samples processed together", "Specialist review needed", "Priority given to emergencies"],
        youCanDo: ["Rest", "Stay hydrated if allowed", "Write down anything you want to ask"],
        estimate: "Often a few hours to 1–2 days",
      },
      {
        title: "Doctor reviews the findings",
        happens: "Your treating doctor reads the report alongside your history.",
        estimate: "Typically same day once received",
      },
      {
        title: "Conversation with you",
        happens: "The doctor explains what was found and what it may mean for next steps.",
        youCanDo: ["Bring someone if possible", "Ask for things to be written down"],
      },
    ],
    faqs: [
      { q: "Why is it taking so long?", a: "Some tests need careful review or a second specialist. A delay does not usually mean bad news — it often means thoroughness." },
      { q: "Can I ask for an update?", a: "Yes. Politely ask the front desk or your nurse for an estimated time." },
    ],
    questions: [
      "When can I expect to hear about the results?",
      "Who will explain them to me?",
      "What are the possible next steps depending on the outcome?",
    ],
  },
  bloodtest: {
    key: "bloodtest",
    title: "Waiting for blood test results",
    subtitle: "Lab work follows a careful sequence — here's the usual flow.",
    emoji: "🩸",
    stages: [
      {
        title: "Sample collection",
        happens: "Your blood is collected, labelled, and sent to the laboratory.",
        estimate: "5–10 minutes",
      },
      {
        title: "Laboratory processing",
        happens: "Technicians run the tests and perform quality checks before results are released.",
        whyWait: ["Samples are batched to save resources", "Some tests need longer analysis", "Quality checks are repeated for accuracy"],
        youCanDo: ["Have a light snack if permitted", "Step outside for fresh air", "Try a breathing exercise"],
        estimate: "Usually 30 minutes to a few hours",
      },
      {
        title: "Doctor review",
        happens: "The doctor reads the report before discussing it with you.",
        estimate: "Same day, once report is out",
      },
    ],
    faqs: [
      { q: "Can I get the report directly?", a: "Many hospitals share reports by SMS, email, or portal. Ask the lab counter about your options." },
      { q: "Why do I need to fast for some tests?", a: "Certain results (like sugar or cholesterol) are affected by recent food. Fasting keeps the numbers reliable." },
    ],
    questions: [
      "How will I receive the report?",
      "Do I need to wait here or can I come back?",
      "Which values matter most for what we're checking?",
    ],
  },
  imaging: {
    key: "imaging",
    title: "Waiting for imaging (X-ray / CT / MRI)",
    subtitle: "Scans need calm bodies and careful reading. Here's what usually happens.",
    emoji: "🖥️",
    stages: [
      {
        title: "Preparation",
        happens: "You may be asked to change, remove metal items, or receive a contrast agent.",
        estimate: "10–20 minutes",
      },
      {
        title: "The scan",
        happens: "The technologist positions you and runs the scan. Staying still helps the images stay clear.",
        estimate: "5 minutes (X-ray) to 45 minutes (MRI)",
      },
      {
        title: "Radiologist review",
        happens: "A radiologist studies the images and writes a report for your doctor.",
        whyWait: ["Complex scans take longer to read", "Comparison with older scans may be needed"],
        youCanDo: ["Rest", "Sip water if allowed", "Practice grounding while you wait"],
        estimate: "Often a few hours to 1 day",
      },
      {
        title: "Doctor discussion",
        happens: "Your doctor explains what the images show and any next steps.",
      },
    ],
    faqs: [
      { q: "MRIs feel loud and enclosed — what helps?", a: "You can ask for earplugs, music, or a blanket. Breathing slowly and closing your eyes often helps." },
      { q: "Is contrast dye safe?", a: "It's used often and monitored carefully. Tell staff about any allergies or kidney issues." },
    ],
    questions: [
      "When will the report be ready?",
      "Who will explain the results to me?",
      "Is there anything I should avoid after the scan?",
    ],
  },
  preop: {
    key: "preop",
    title: "Pre-operation waiting",
    subtitle: "Your body is preparing. Let us help your mind prepare too.",
    emoji: "🩺",
    stages: [
      { title: "Final checks", happens: "Vitals, paperwork, and consent are confirmed.", estimate: "20–40 minutes" },
      { title: "Anaesthesia preparation", happens: "The anaesthetist meets you to plan your comfort and safety." },
      { title: "Transfer to OT", happens: "You are gently moved to the operating area." },
      { title: "Recovery room", happens: "After surgery you wake here while your vitals stabilise.", estimate: "Usually 30 minutes to a few hours" },
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
  ot: {
    key: "ot",
    title: "Family waiting outside the OT",
    subtitle: "Waiting is hard work. You are doing it well.",
    emoji: "🤍",
    stages: [
      { title: "Procedure underway", happens: "The clinical team is fully focused. No news in this window is normal." },
      {
        title: "Periodic updates",
        happens: "A nurse or coordinator usually shares brief updates at milestones.",
        whyWait: ["The team can't leave the OT mid-procedure", "Updates are given at safe pause points"],
        youCanDo: ["Eat something small", "Sit down and breathe slowly", "Take turns waiting if you can"],
      },
      { title: "Stabilisation", happens: "After the procedure, the patient is observed before family is allowed in.", estimate: "Often 30 minutes to a few hours" },
      { title: "First visit", happens: "You will be guided in, often briefly, to see your loved one." },
    ],
    faqs: [
      { q: "Why hasn't anyone updated us?", a: "Quiet stretches usually mean the team is concentrating, not that something is wrong. You may politely ask the coordinator." },
      { q: "What if it is taking longer than expected?", a: "Surgeries often take longer due to extra care, not complications. Ask for an estimated update window." },
    ],
    questions: [
      "Who can give us updates and when?",
      "Where should we wait so staff can reach us?",
      "What should we prepare for the next stage?",
    ],
  },
  icu: {
    key: "icu",
    title: "Family waiting outside the ICU",
    subtitle: "ICUs run on strict rhythms of monitoring and rest. Here's what shapes the wait.",
    emoji: "💙",
    stages: [
      { title: "Continuous monitoring", happens: "The patient is watched around the clock by nurses and machines." },
      {
        title: "Doctor rounds",
        happens: "Doctors review each patient at set times and update the plan.",
        whyWait: ["Rounds move patient by patient", "Family updates happen after rounds"],
        youCanDo: ["Ask the counter when the next update window is", "Keep one primary contact person"],
        estimate: "Updates often once or twice a day",
      },
      { title: "Visiting hours", happens: "Short visits are usually allowed at fixed times to protect rest." },
      { title: "Shift changes", happens: "Care handovers happen at shift changes — brief pauses in updates are normal." },
    ],
    faqs: [
      { q: "Why can't we stay inside longer?", a: "Rest, infection control, and equipment access all matter. Short focused visits often help recovery more." },
      { q: "How will we be told about changes?", a: "Usually one family contact is called. Keep your phone charged and nearby." },
    ],
    questions: [
      "When is the next update window?",
      "Who is our named contact person on the team?",
      "What should we bring or avoid bringing?",
    ],
  },
  discharge: {
    key: "discharge",
    title: "Going through discharge",
    subtitle: "Discharge takes more steps than it looks. Here's why the wait is normal.",
    emoji: "🚪",
    stages: [
      { title: "Doctor's discharge note", happens: "The doctor writes a summary of your stay, medicines, and follow-up.", estimate: "Often 1–2 hours" },
      {
        title: "Pharmacy & billing",
        happens: "Medications are dispensed and the final bill is prepared.",
        whyWait: ["Insurance approvals can take time", "Pharmacy queues build up mid-day"],
        youCanDo: ["Pack slowly", "Confirm follow-up date", "Ask for a printed instruction sheet"],
        estimate: "Often 1–3 hours",
      },
      { title: "Final check by nurse", happens: "A nurse reviews medicine timings, wound care, and warning signs with you." },
      { title: "Leaving the hospital", happens: "You're wheeled or walked out once everything is cleared." },
    ],
    faqs: [
      { q: "Why does discharge take so long?", a: "Many teams — doctor, pharmacy, billing, insurance — need to sign off. It's about safety, not delay." },
      { q: "What if I forget the instructions later?", a: "Ask for everything in writing. Take a photo of the instruction sheet as a backup." },
    ],
    questions: [
      "When exactly should I take each medicine?",
      "What symptoms should bring me back sooner?",
      "When is my follow-up, and with whom?",
    ],
  },
};

export const FEAR_PROMPTS = [
  "How overwhelmed do you feel right now?",
  "How clear are you about what happens next?",
  "How supported do you feel in this moment?",
];
