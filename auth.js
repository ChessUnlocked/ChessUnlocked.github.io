// auth.js
// Handles authentication UI and logic for ChessUnlocked

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithCustomToken,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export function setupAuthUI({ navSignupBtn, navSignoutBtn, signupCard, config }) {
  const auth = getAuth();
  const db = getFirestore();

  function setLockedState(locked) {
    document.querySelectorAll('[data-requires-auth]').forEach(el => {
      if (locked) { el.classList.add('locked'); el.setAttribute('aria-hidden', 'true'); }
      else { el.classList.remove('locked'); el.removeAttribute('aria-hidden'); }
    });
  }

  function showSignedInUI(user) {
    const isFullUser = user && !user.isAnonymous;
    if (isFullUser) {
      navSignupBtn?.classList.add('hidden');
      navSignoutBtn?.classList.remove('hidden');
      if (signupCard) {
        const emailText = user?.email || 'User';
        signupCard.innerHTML = `
          <h2 class="text-3xl font-extrabold mb-6 text-green-600 dark:text-green-400">Welcome back!</h2>
          <p class="text-gray-700 dark:text-gray-300">You're all set. Start exploring the features above or sign out.</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">Signed in as ${emailText}</p>
        `;
      }
    } else {
      showSignedOutUI();
    }
    setLockedState(!isFullUser);
  }

  function showSignedOutUI() {
    navSignupBtn?.classList.remove('hidden');
    navSignoutBtn?.classList.add('hidden');
    if (!signupCard) return;
    signupCard.innerHTML = `
      <h2 class="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Join ChessUnlocked Today</h2>
      <p id="signup-prompt" class="mb-6 text-gray-700 dark:text-gray-300">
        Sign up for free to start mastering openings with personalized drills, master games, and community insights.
      </p>
      <form id="signupForm" class="flex flex-col space-y-4" novalidate>
        <input type="email" id="emailInput" placeholder="Your email address" required>
        <input type="password" id="passwordInput" placeholder="Choose a password" required>
        <button type="submit" id="signupButton">Create Account</button>
        <p id="formMessage" role="alert"></p>
      </form>
      <hr>
      <form id="signinForm" class="flex flex-col space-y-4" novalidate>
        <input type="email" id="signinEmailInput" placeholder="Email address" required>
        <input type="password" id="signinPasswordInput" placeholder="Password" required>
        <button type="submit" id="signinButton">Sign In</button>
        <a id="forgotPasswordLink" href="#">Forgot password?</a>
        <form id="forgotPasswordForm" class="hidden" novalidate>
          <input type="email" id="forgotPasswordEmailInput" placeholder="Enter your email address" required>
          <button type="submit" id="forgotPasswordButton">Send Reset Link</button>
          <p id="forgotPasswordFormMessage" role="alert"></p>
        </form>
        <p id="signinFormMessage" role="alert"></p>
      </form>
    `;
    document.getElementById('signupForm')?.addEventListener('submit', handleSignup);
    document.getElementById('signinForm')?.addEventListener('submit', handleSignin);
    document.getElementById('forgotPasswordLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('forgotPasswordForm').classList.toggle('hidden');
    });
    document.getElementById('forgotPasswordForm')?.addEventListener('submit', handleForgotPassword);
    setLockedState(true);
  }

  async function handleSignup(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const formMessage = document.getElementById('formMessage');
    if (password.length < 6) {
      formMessage.textContent = 'Password must be at least 6 characters.';
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (db) {
        const userDocRef = doc(db, `artifacts/${config.APP_ID}/users/${user.uid}/profile`, 'data');
        await setDoc(userDocRef, { email: user.email, createdAt: new Date().toISOString() });
      }
    } catch (error) {
      formMessage.textContent = error.message || 'Signup failed.';
    }
  }

  async function handleSignin(e) {
    e.preventDefault();
    const email = document.getElementById('signinEmailInput').value.trim();
    const password = document.getElementById('signinPasswordInput').value;
    const formMessage = document.getElementById('signinFormMessage');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      formMessage.textContent = error.message || 'Sign in failed.';
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgotPasswordEmailInput').value.trim();
    const formMessage = document.getElementById('forgotPasswordFormMessage');
    try {
      await sendPasswordResetEmail(auth, email);
      formMessage.textContent = 'Password reset email sent! Check your inbox.';
    } catch (error) {
      formMessage.textContent = error.message || 'Failed to send reset email.';
    }
  }

  onAuthStateChanged(auth, user => {
    if (user) showSignedInUI(user);
    else showSignedOutUI();
  });

  navSignoutBtn?.addEventListener('click', () => {
    signOut(auth);
  });
}
