/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import UserCard from "./UserCard"; // Importing the UserCard component

const GithubGraph: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // Store the username
  const [submitted, setSubmitted] = useState<boolean>(false); // Track if the user has clicked "Go"
  const [error, setError] = useState<boolean>(false); // Track if there's an error (user not found)

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
        // Check if the username exists in GitHub
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
          <Button onClick={handleSubmit} size="lg" className="mt-3">
            Find Activity
          </Button>
          {error && (
            <div className="text-red-500 text-sm mt-2">
              User not found! Please check the username and try again.
            </div>
          )}
        </div>
      ) : (
        <div className="w-full px-2 mt-6 mb-10">
          <UserCard username={username} />{" "}
          {/* Display the UserCard component below the graph */}
          <div className="mt-4">
            <Button onClick={handleTryAgain} size="lg" variant="outline">
              Try Another Username 🔄
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubGraph;
