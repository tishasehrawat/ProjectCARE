import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "hi" | "kn";

export const LANG_NAMES: Record<Lang, string> = {
  en: "English",
  hi: "हिन्दी",
  kn: "ಕನ್ನಡ",
};

type Dict = Record<string, string>;

const STRINGS: Record<Lang, Dict> = {
  en: {
    "nav.checkin": "Check-in",
    "nav.pathways": "Pathways",
    "nav.comfort": "Comfort",
    "nav.ask": "Ask your doctor",
    "nav.notes": "Notes",
    "nav.journal": "Journal",
    "tagline": "Calm · Clarity · Comfort",
    "disclaimer.short": "Project CARE offers general guidance and emotional support. It is not medical advice.",
    "disclaimer.long": "Project CARE provides general guidance about hospital processes and emotional support. It does not diagnose, interpret reports, or replace advice from your healthcare team.",
    "cta.begin": "Begin a check-in",
    "cta.skip": "Skip to what I need",
    "footer.note": "A note on safety",
    "footer.body": "CARE is a supportive companion — it does not provide diagnosis or medical advice. If you feel unsafe or unable to cope, please contact hospital staff immediately.",
    "lang.label": "Language",
  },
  hi: {
    "nav.checkin": "चेक-इन",
    "nav.pathways": "प्रक्रिया",
    "nav.comfort": "आराम",
    "nav.ask": "डॉक्टर से पूछें",
    "nav.notes": "नोट्स",
    "nav.journal": "डायरी",
    "tagline": "शांति · स्पष्टता · सुकून",
    "disclaimer.short": "Project CARE केवल सामान्य जानकारी और भावनात्मक सहायता देता है। यह चिकित्सा सलाह नहीं है।",
    "disclaimer.long": "Project CARE अस्पताल की प्रक्रियाओं की सामान्य जानकारी और भावनात्मक सहायता देता है। यह निदान, रिपोर्ट की व्याख्या या आपके डॉक्टर की सलाह का विकल्प नहीं है।",
    "cta.begin": "चेक-इन शुरू करें",
    "cta.skip": "सीधे मदद तक जाएँ",
    "footer.note": "सुरक्षा नोट",
    "footer.body": "CARE एक सहायक साथी है — यह चिकित्सा सलाह नहीं देता। यदि आप असुरक्षित महसूस करें, तो कृपया तुरंत अस्पताल के कर्मचारियों से संपर्क करें।",
    "lang.label": "भाषा",
  },
  kn: {
    "nav.checkin": "ಚೆಕ್-ಇನ್",
    "nav.pathways": "ಹಂತಗಳು",
    "nav.comfort": "ಆರಾಮ",
    "nav.ask": "ವೈದ್ಯರನ್ನು ಕೇಳಿ",
    "nav.notes": "ಟಿಪ್ಪಣಿಗಳು",
    "nav.journal": "ಡೈರಿ",
    "tagline": "ಶಾಂತಿ · ಸ್ಪಷ್ಟತೆ · ಸಾಂತ್ವನ",
    "disclaimer.short": "Project CARE ಸಾಮಾನ್ಯ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಭಾವನಾತ್ಮಕ ಬೆಂಬಲವನ್ನಷ್ಟೇ ನೀಡುತ್ತದೆ. ಇದು ವೈದ್ಯಕೀಯ ಸಲಹೆ ಅಲ್ಲ.",
    "disclaimer.long": "Project CARE ಆಸ್ಪತ್ರೆಯ ಪ್ರಕ್ರಿಯೆಗಳ ಸಾಮಾನ್ಯ ಮಾಹಿತಿ ಮತ್ತು ಭಾವನಾತ್ಮಕ ಬೆಂಬಲವನ್ನು ನೀಡುತ್ತದೆ. ಇದು ರೋಗ ಪತ್ತೆ, ವರದಿ ವಿಶ್ಲೇಷಣೆ ಅಥವಾ ನಿಮ್ಮ ವೈದ್ಯರ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.",
    "cta.begin": "ಚೆಕ್-ಇನ್ ಪ್ರಾರಂಭಿಸಿ",
    "cta.skip": "ನೇರವಾಗಿ ಸಹಾಯಕ್ಕೆ ಹೋಗಿ",
    "footer.note": "ಸುರಕ್ಷತೆ ಬಗ್ಗೆ",
    "footer.body": "CARE ಒಂದು ಬೆಂಬಲಿತ ಸಂಗಾತಿ — ಇದು ವೈದ್ಯಕೀಯ ಸಲಹೆ ನೀಡುವುದಿಲ್ಲ. ನೀವು ಅಸುರಕ್ಷಿತ ಎಂದೆನಿಸಿದರೆ ದಯವಿಟ್ಟು ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಯ ಸಿಬ್ಬಂದಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    "lang.label": "ಭಾಷೆ",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LangCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("care.lang") as Lang | null;
      if (saved && saved in STRINGS) setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("care.lang", l); } catch {}
  };

  const t = (k: string) => STRINGS[lang][k] ?? STRINGS.en[k] ?? k;
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useI18n = () => useContext(LangCtx);
