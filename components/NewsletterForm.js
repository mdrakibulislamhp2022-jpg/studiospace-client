"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    toast.success("You're subscribed! Watch your inbox for new studio news.");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="join w-full">
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        className="input input-bordered join-item w-full"
        aria-label="Email address for newsletter"
      />
      <button type="submit" className="btn btn-primary join-item">
        Join
      </button>
    </form>
  );
}