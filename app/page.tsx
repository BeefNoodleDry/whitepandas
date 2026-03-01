"use client";

import { useState } from "react";
import Image from "next/image";

// --- Icons ---

function IconAll({ size = 14 }: { size?: number }) {
  const s = size * 0.46;
  const g = size * 0.08;
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="currentColor">
      <rect x="0" y="0" width="5.5" height="5.5" />
      <rect x="7.5" y="0" width="5.5" height="5.5" />
      <rect x="0" y="7.5" width="5.5" height="5.5" />
      <rect x="7.5" y="7.5" width="5.5" height="5.5" />
    </svg>
  );
}

function IconStar({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" />
    </svg>
  );
}

function IconHome({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 2,11 5,11 5,22 10,22 10,16 14,16 14,22 19,22 19,11 22,11" />
    </svg>
  );
}

function IconBolt({ size = 14 }: { size?: number }) {
  return (
    <svg width={size * 0.85} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13,2 4,14 11,14 9,22 20,10 13,10" />
    </svg>
  );
}

function IconPerson({ size = 14 }: { size?: number }) {
  return (
    <svg width={size * 0.93} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="8" y="2" width="8" height="9" />
      <path d="M3 23c0-5 3.8-8 9-8s9 3 9 8H3z" />
    </svg>
  );
}

function IconBriefcase({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.93} viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="8" width="20" height="13" />
      <path
        d="M9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

// --- Data ---

const PROMPTS = [
  "Go on, give it a tap. Your team will love you for it.",
  "One button. Infinite good vibes. Let's go.",
  "Your standup is about to get a whole lot more interesting.",
  "Hit the button — something great is waiting.",
  "Every good standup starts somewhere. Start here.",
  "Ready when you are. The button's been waiting all morning.",
  "Warming up the room starts with one tap.",
  "Don't be shy. Hit the button and break the ice.",
  "Something fun is one tap away — promise.",
  "The team's ready. Let's kick things off.",
  "Go ahead — make today's standup one to remember.",
  "Press it. Start the vibe. Make it a good one.",
];

type Page = "welcome" | "category" | "loading" | "question";
type Category = "all" | "work-wins" | "food-home" | "fun" | "personal" | "work-culture";

interface CategoryConfig {
  id: Category;
  label: string;
  tagline: string;
  Icon: ({ size }: { size?: number }) => React.ReactElement;
}

const CATEGORIES: CategoryConfig[] = [
  { id: "all",          label: "Surprise Me",   tagline: "A mix from all categories",        Icon: IconAll       },
  { id: "work-wins",    label: "Work & Wins",   tagline: "Celebrate progress & growth",      Icon: IconStar      },
  { id: "food-home",    label: "Food & Home",   tagline: "The good stuff outside of work",   Icon: IconHome      },
  { id: "fun",          label: "Fun",           tagline: "Hypotheticals & hot takes",         Icon: IconBolt      },
  { id: "personal",     label: "Personal",      tagline: "Get to know the real person",      Icon: IconPerson    },
  { id: "work-culture", label: "Work Culture",  tagline: "How we work best",                 Icon: IconBriefcase },
];

interface Question {
  text: string;
  category: Exclude<Category, "all">;
}

const QUESTIONS: Question[] = [
  // Work & Wins
  { text: "What's one personal win and one professional win from last week?",                        category: "work-wins" },
  { text: "What's something you learned recently that surprised you?",                               category: "work-wins" },
  { text: "What's one thing you're proud of shipping or completing lately?",                         category: "work-wins" },
  { text: "What's a challenge you overcame last week — big or small?",                              category: "work-wins" },
  { text: "What's a tool or habit that's made your work life significantly better?",                 category: "work-wins" },
  { text: "What's a skill you've Googled so many times you probably should have just learned it properly by now?", category: "work-wins" },
  { text: "What's the best piece of feedback you've ever received — the kind that actually stuck?",  category: "work-wins" },
  { text: "If you could give yourself one piece of advice on your first day at this company, what would it be?",   category: "work-wins" },
  { text: "What's a career path you seriously considered before ending up doing what you do now?",   category: "work-wins" },
  { text: "What's one work habit you've quietly borrowed from a colleague?",                         category: "work-wins" },

  // Food & Home
  { text: "If you had to eat only one dish for the rest of your life, what would it be?",            category: "food-home" },
  { text: "What was the one purchase you made for your home that changed everything?",               category: "food-home" },
  { text: "What's your go-to comfort meal after a rough day?",                                       category: "food-home" },
  { text: "What's the best restaurant you'd take any visitor to in your city?",                      category: "food-home" },
  { text: "What's the best thing in your fridge right now?",                                        category: "food-home" },
  { text: "What's a food you were convinced you hated as a kid that you actually love now?",         category: "food-home" },
  { text: "If you had to describe your cooking confidence as a movie title, what would it be?",      category: "food-home" },
  { text: "What's the most recent thing you ordered online that you're genuinely pleased about?",    category: "food-home" },
  { text: "What's a dish someone in your family makes that you've never successfully replicated?",   category: "food-home" },
  { text: "What's your go-to order when you genuinely cannot decide what you want?",                 category: "food-home" },

  // Fun & Hypotheticals
  { text: "If you could have dinner with anyone — alive or dead — who would it be?",                category: "fun" },
  { text: "If you could live anywhere in the world for a year, where would you go?",                category: "fun" },
  { text: "What's your unpopular opinion about something totally harmless?",                        category: "fun" },
  { text: "What's the most useful app on your phone right now?",                                   category: "fun" },
  { text: "What would you do with an extra hour every day?",                                       category: "fun" },
  { text: "You wake up tomorrow with one random skill at world-class level. What's the best and worst case for what it could be?", category: "fun" },
  { text: "If your life had a documentary made about it, what genre would it be and who would direct it?", category: "fun" },
  { text: "What's something you believed with complete confidence as a child that you now know is wrong?", category: "fun" },
  { text: "If you had to compete on a TV game show tomorrow, which one gives you the best odds of winning?", category: "fun" },
  { text: "You're dropped into any historical decade for one weekend — no consequences, you come back after. Which decade, and what's the plan?", category: "fun" },

  // Personal
  { text: "What's something most people don't know about you?",                                     category: "personal" },
  { text: "What's a skill you've always wanted to learn but haven't yet?",                          category: "personal" },
  { text: "What's a hobby you picked up in the last two years?",                                   category: "personal" },
  { text: "What's the best piece of advice you've ever received?",                                  category: "personal" },
  { text: "What's something you've been binge-watching or reading lately?",                         category: "personal" },
  { text: "What's something you do regularly that most people would be surprised to find out about you?", category: "personal" },
  { text: "What's a book, film, or show you think is genuinely underrated that almost nobody talks about?", category: "personal" },
  { text: "Free Saturday, no obligations, no guilt — what does it actually look like? Not the aspirational version, the real one.", category: "personal" },
  { text: "What's a place you visited with low expectations that genuinely surprised you?",          category: "personal" },
  { text: "What's something you've gotten dramatically better at simply through repetition and time?", category: "personal" },

  // Work Culture
  { text: "What's your ideal work environment — coffee shop, home, office, or something else?",     category: "work-culture" },
  { text: "Morning person or night owl — and has that changed over time?",                          category: "work-culture" },
  { text: "What's a meeting habit or ritual you wish every team had?",                              category: "work-culture" },
  { text: "What's one thing that makes you feel most productive?",                                  category: "work-culture" },
  { text: "What's the best job perk you've ever had?",                                             category: "work-culture" },
  { text: "What does your actual desk or workspace look like right now — and does it reflect how you like to work?", category: "work-culture" },
  { text: "What's a meeting norm from a previous job — good or bad — that you still think about?", category: "work-culture" },
  { text: "When you're in deep focus mode, what's most likely to pull you out of it — and does it actually bother you?", category: "work-culture" },
  { text: "What's the smallest, lowest-effort thing a team or manager has done that made you feel genuinely appreciated?", category: "work-culture" },
  { text: "Design your perfect work day — not ideal, just genuinely good. What's in it?",           category: "work-culture" },
];

interface CustomQuestion {
  text: string;
  author: string;
}

// --- Shared styles ---

const font = "Arial, Helvetica, sans-serif";

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        fontFamily: font,
        fontSize: "0.8rem",
        color: "#919191",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.3rem",
        letterSpacing: "0.05em",
      }}
      onMouseEnter={(e) => { (e.currentTarget).style.color = "#222222"; }}
      onMouseLeave={(e) => { (e.currentTarget).style.color = "#919191"; }}
    >
      ← Back
    </button>
  );
}

// --- Component ---

export default function Home() {
  const [page, setPage] = useState<Page>("welcome");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [question, setQuestion] = useState<string | null>(null);
  const [prompt] = useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const [recentHistory, setRecentHistory] = useState<string[]>([]);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [animating, setAnimating] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [customAuthor, setCustomAuthor] = useState("");
  const [showForm, setShowForm] = useState(false);

  function generate(categoryOverride?: Category, historyOverride?: string[]) {
    const cat = categoryOverride ?? selectedCategory;
    const history = historyOverride ?? recentHistory;
    const filtered = cat === "all" ? QUESTIONS : QUESTIONS.filter((q) => q.category === cat);
    const allTexts = [...filtered.map((q) => q.text), ...customQuestions.map((q) => q.text)];
    let available = allTexts.filter((q) => !history.includes(q));
    if (available.length === 0) available = allTexts;
    const next = available[Math.floor(Math.random() * available.length)];
    const newHistory = [next, ...history].slice(0, 5);

    setAnimating(true);
    setTimeout(() => {
      setQuestion(next);
      setRecentHistory(newHistory);
      setAnimating(false);
    }, 150);
  }

  function pickCategory(cat: Category) {
    setSelectedCategory(cat);
    setRecentHistory([]);
    setQuestion(null);
    generate(cat, []);
    setPage("loading");
    const duration = Math.floor(Math.random() * 1000) + 1500;
    setTimeout(() => setPage("question"), duration);
  }

  function addCustomQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!customInput.trim()) return;
    setCustomQuestions([
      ...customQuestions,
      { text: customInput.trim(), author: customAuthor.trim() || "Anonymous" },
    ]);
    setCustomInput("");
    setCustomAuthor("");
  }

  const currentCustom = question ? customQuestions.find((q) => q.text === question) : null;
  const currentCategoryConfig = CATEGORIES.find((c) => c.id === selectedCategory);

  // --- Header (shared) ---
  const Header = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
      <Image src="/rp-logo-icon.png" alt="RedPandas" width={81} height={81} style={{ marginBottom: "0.6rem" }} />
      <p style={{ fontFamily: font, fontSize: "0.7rem", fontWeight: "bold", letterSpacing: "0.25em", textTransform: "uppercase", color: "#222222" }}>
        RedPandas Digital
      </p>
    </div>
  );

  // =====================
  // WELCOME PAGE
  // =====================
  if (page === "welcome") {
    return (
      <main
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1rem",
        }}
      >
        {/* Background circle — Pale Cyan, top right */}
        <div style={{
          position: "absolute", top: "-110px", right: "-110px",
          width: "340px", height: "340px",
          borderRadius: "50%", backgroundColor: "#B6FCFF", zIndex: 0,
        }} />

        {/* Background circle — Beige, bottom left */}
        <div style={{
          position: "absolute", bottom: "-90px", left: "-90px",
          width: "300px", height: "300px",
          borderRadius: "50%", backgroundColor: "#FCE9E8", zIndex: 0,
        }} />

        {/* Sticker 1 — RP Red star, upper left */}
        <div style={{
          position: "absolute", top: "16%", left: "8%",
          color: "#E1241B", transform: "rotate(-12deg)", zIndex: 0,
        }}>
          <IconStar size={42} />
        </div>

        {/* Sticker 2 — Charcoal small star, lower right */}
        <div style={{
          position: "absolute", bottom: "18%", right: "9%",
          color: "#222222", transform: "rotate(22deg)", zIndex: 0,
        }}>
          <IconStar size={22} />
        </div>

        {/* Main content */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", maxWidth: "440px", width: "100%",
        }}>

          {/* Logo */}
          <div style={{ marginBottom: "0.75rem" }}>
            <Image src="/rp-logo-icon.png" alt="RedPandas" width={81} height={81} />
          </div>

          <p style={{
            fontFamily: font, fontSize: "0.7rem", fontWeight: "bold",
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#222222", marginBottom: "1rem",
          }}>
            RedPandas Digital
          </p>

          <h1 style={{
            fontFamily: "'Cooper Black', serif",
            fontSize: "3rem", lineHeight: "1.0",
            color: "#222222",
            marginBottom: "1rem",
            whiteSpace: "nowrap",
          }}>
            Standup Icebreaker
          </h1>

          <p style={{
            fontFamily: font, fontSize: "0.95rem", color: "#919191",
            marginBottom: "2.5rem", lineHeight: "1.6",
          }}>
            A question to kick off your standup<br />and get the team talking.
          </p>

          <button
            onClick={() => setPage("category")}
            style={{
              backgroundColor: "#E1241B", color: "#FFFFFF",
              borderRadius: "9999px", border: "none",
              padding: "0.85rem 3rem",
              fontFamily: font, fontSize: "0.75rem", fontWeight: "bold",
              textTransform: "uppercase", letterSpacing: "0.5em",
              cursor: "pointer", transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget).style.backgroundColor = "#222222"; }}
            onMouseLeave={(e) => { (e.currentTarget).style.backgroundColor = "#E1241B"; }}
          >
            Start
          </button>
        </div>
      </main>
    );
  }

  // =====================
  // CATEGORY PAGE
  // =====================
  if (page === "category") {
    return (
      <main
        className="min-h-screen flex flex-col items-center px-4 py-12"
        style={{ backgroundColor: "#FFFFFF", color: "#222222" }}
      >
        <div className="max-w-xl w-full">
          <BackButton onClick={() => setPage("welcome")} />

          <div style={{ textAlign: "center", margin: "2rem 0 2rem" }}>
            <Header />
            <h2
              style={{
                fontFamily: "'Cooper Black', serif",
                fontSize: "1.9rem",
                lineHeight: "1.1",
                color: "#222222",
                marginBottom: "0.4rem",
              }}
            >
              What kind of question?
            </h2>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: "#919191" }}>
              Pick a category and we'll find the perfect question.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
            }}
          >
            {CATEGORIES.map(({ id, label, tagline, Icon }) => (
              <button
                key={id}
                onClick={() => pickCategory(id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "1.5rem",
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #E9E9E9",
                  borderRadius: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 150ms ease, background-color 150ms ease",
                  minHeight: "130px",
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.borderColor = "#E1241B";
                  btn.style.backgroundColor = "#FCE9E8";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.borderColor = "#E9E9E9";
                  btn.style.backgroundColor = "#FFFFFF";
                }}
              >
                <div style={{ color: "#E1241B", marginBottom: "0.85rem" }}>
                  <Icon size={32} />
                </div>
                <p
                  style={{
                    fontFamily: font,
                    fontSize: "0.72rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "#222222",
                    marginBottom: "0.3rem",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: font,
                    fontSize: "0.78rem",
                    color: "#919191",
                    lineHeight: "1.4",
                  }}
                >
                  {tagline}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // =====================
  // LOADING PAGE
  // =====================
  if (page === "loading") {
    const loadingCategory = CATEGORIES.find((c) => c.id === selectedCategory);
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
          <Image
            src="/rp-logo-full.png"
            alt="RedPandas"
            width={220}
            height={73}
            style={{ animation: "rp-pulse 1.2s ease-in-out infinite" }}
          />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <p
              style={{
                fontFamily: font,
                fontSize: "0.7rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "#C8C8C8",
              }}
            >
              Generating your question
              <span style={{ animation: "rp-dot-blink 1.4s infinite", animationDelay: "0s" }}>.</span>
              <span style={{ animation: "rp-dot-blink 1.4s infinite", animationDelay: "0.2s" }}>.</span>
              <span style={{ animation: "rp-dot-blink 1.4s infinite", animationDelay: "0.4s" }}>.</span>
            </p>
            {loadingCategory && (
              <p style={{ fontFamily: font, fontSize: "0.72rem", color: "#E1241B", letterSpacing: "0.1em" }}>
                {loadingCategory.label}
              </p>
            )}
          </div>
        </div>
      </main>
    );
  }

  // =====================
  // QUESTION PAGE
  // =====================
  return (
    <main
      className="min-h-screen flex flex-col items-center px-4 py-12"
      style={{ backgroundColor: "#FFFFFF", color: "#222222" }}
    >
      <div className="max-w-xl w-full">
        <BackButton onClick={() => setPage("category")} />

        <div style={{ textAlign: "center", margin: "2rem 0 1.5rem" }}>
          <Header />

          {/* Category label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.3rem 0.85rem",
              border: "1.5px solid #E1241B",
              borderRadius: "9999px",
              marginBottom: "1.25rem",
              color: "#E1241B",
            }}
          >
            {currentCategoryConfig && <currentCategoryConfig.Icon size={12} />}
            <span
              style={{
                fontFamily: font,
                fontSize: "0.65rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              {currentCategoryConfig?.label}
            </span>
          </div>
        </div>

        {/* Question card */}
        <div
          style={{
            backgroundColor: "#FCE9E8",
            borderRadius: 0,
            border: "1px solid #E9E9E9",
            boxShadow: "4px 4px 0px #FCE9E8",
            padding: "2rem",
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            opacity: animating ? 0 : 1,
            transition: "opacity 150ms ease",
          }}
        >
          {question ? (
            <>
              <p style={{ fontFamily: font, fontSize: "1.2rem", lineHeight: "1.6", color: "#222222" }}>
                {question}
              </p>
              {currentCustom && (
                <p style={{ fontFamily: font, fontSize: "0.75rem", color: "#919191", letterSpacing: "0.25em", marginTop: "0.75rem" }}>
                  Added by {currentCustom.author}
                </p>
              )}
            </>
          ) : (
            <p style={{ fontFamily: font, color: "#919191" }}>{prompt}</p>
          )}
        </div>

        {/* Generate button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
          <button
            onClick={() => generate()}
            style={{
              backgroundColor: "#E1241B",
              color: "#FFFFFF",
              borderRadius: "9999px",
              border: "none",
              padding: "0.75rem 2rem",
              fontFamily: font,
              fontSize: "0.7rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.5em",
              cursor: "pointer",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget).style.backgroundColor = "#222222"; }}
            onMouseLeave={(e) => { (e.currentTarget).style.backgroundColor = "#E1241B"; }}
          >
            {question ? "Generate another" : "Generate question"}
          </button>
        </div>

        {/* Footer hint */}
        <p style={{ fontFamily: font, fontSize: "0.75rem", color: "#919191", marginTop: "1rem", textAlign: "center", minHeight: "1.2em" }}>
          {question ? "Don\u2019t love it? Generate another." : ""}
        </p>

        {/* Suggest a question */}
        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              fontFamily: font,
              fontSize: "0.75rem",
              color: "#919191",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            {showForm ? "Never mind" : "Suggest a question"}
          </button>

          {showForm && (
            <form
              onSubmit={addCustomQuestion}
              style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.75rem" }}
            >
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type your icebreaker question..."
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 0, border: "1px solid #C8C8C8", fontFamily: font, fontSize: "0.9rem", color: "#222222", backgroundColor: "#FFFFFF", outline: "none" }}
              />
              <input
                type="text"
                value={customAuthor}
                onChange={(e) => setCustomAuthor(e.target.value)}
                placeholder="Your name (optional)"
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 0, border: "1px solid #C8C8C8", fontFamily: font, fontSize: "0.9rem", color: "#222222", backgroundColor: "#FFFFFF", outline: "none" }}
              />
              <button
                type="submit"
                style={{
                  alignSelf: "flex-start",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "9999px",
                  border: "2px solid #222222",
                  backgroundColor: "transparent",
                  color: "#222222",
                  fontFamily: font,
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  cursor: "pointer",
                  transition: "background-color 150ms ease, color 150ms ease",
                }}
                onMouseEnter={(e) => { const b = e.currentTarget; b.style.backgroundColor = "#222222"; b.style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { const b = e.currentTarget; b.style.backgroundColor = "transparent"; b.style.color = "#222222"; }}
              >
                Add question
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
