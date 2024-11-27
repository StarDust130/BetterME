/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const GithubGraph = () => {
  const [username, setUsername] = useState(""); // Store the username
  const [submitted, setSubmitted] = useState(false); // Track if the user has clicked "Go"
  const [error, setError] = useState(false); // Track if there's an error (user not found)

  useEffect(() => {
    // Check if username is already saved in localStorage
    const storedUsername = localStorage.getItem("githubUsername");
    if (storedUsername) {
      setUsername(storedUsername); // Set the username from localStorage if available
      setSubmitted(true); // Automatically submit if username exists
    }
  }, []);

  const handleSubmit = async () => {
    if (username) {
      try {
        // Check if the username exists in GitHub (this is just a sample request; you can implement actual API logic here)
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (response.ok) {
          setError(false);
          setSubmitted(true); // Only submit if the username exists
          localStorage.setItem("githubUsername", username); // Store the username in localStorage
        } else {
          setError(true); // If not found, show error
        }
      } catch {
        setError(true); // Handle any fetch error
      }
    }
  };

  const handleTryAgain = () => {
    setSubmitted(false); // Reset and show input again
    setUsername(""); // Clear the username field
    setError(false); // Reset error state
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-10">
      {/* Input Section */}
      {!submitted ? (
        <div className="flex flex-col items-center gap-4">
          <input
            placeholder="Enter Github Username"
            type="text"
            className="input input-bordered w-64 sm:w-96 p-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update state on change
          />
          <Button
            onClick={handleSubmit}
            size="lg"
            className="mt-3"
          >
            Find Activity
          </Button>
          {error && (
            <div className="text-red-500 text-sm mt-2">
              User not found! Please check the username and try again.
            </div>
          )}
        </div>
      ) : (
        // Show GitHub Activity Graph
        <div className="w-full px-2 mt-6">
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=high-contrast`}
            alt="GitHub Activity Graph"
            className="mt-6  rounded-lg shadow-md w-full"
          />
          <Button
            onClick={handleTryAgain}
          className="mt-2"
          >
            Change Username
          </Button>
        </div>
      )}
    </div>
  );
};

export default GithubGraph;
