// ===== Firebase SDK imports (via CDN) =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ===== Firebase config =====
const firebaseConfig = {
  apiKey: "AIzaSyAEtdyYgFABdmWxBVQUmWXKNKE8Ae5dAKI",
  authDomain: "chessunlocked-3ffe1.firebaseapp.com",
  projectId: "chessunlocked-3ffe1",
  storageBucket: "chessunlocked-3ffe1.firebasestorage.app",
  messagingSenderId: "530515763757",
  appId: "1:530515763757:web:d0328b88329ca4009a4ea4",
  measurementId: "G-GBK1CXJ0N5"
};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ===== Sign in anonymously =====
const auth = getAuth();
signInAnonymously(auth)
  .then(() => console.log("✅ Signed in anonymously to Firebase"))
  .catch(err => console.error("❌ Firebase sign-in error:", err));

// ===== Gemini API key =====
const GEMINI_API_KEY = "PASTE-YOUR-GEMINI-API-KEY-HERE";

// ===== Run Gemini =====
async function runGemini() {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Write a short chess tip" }] }]
        })
      }
    );
    const data = await res.json();
    console.log("🤖 Gemini output:", data);
  } catch (err) {
    console.error("❌ Gemini error:", err);
  }
}

runGemini();
