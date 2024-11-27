/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import {
  User,
  Home,
  MapPin,
  Calendar,
  GitPullRequest,
  Code,
  User2,
  CalendarCheck,
} from "lucide-react"; // Lucide Icons

import { formatDate } from "@/lib/utils";
import { GitHubCard } from "./GitHubCard";

interface UserGitHubCardProps {
  username: string;
}

interface UserData {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  hireable: boolean;
  blog: string | null;
  location: string | null;
  company: string | null;
  created_at: string;
  updated_at: string;
  repos_url: string;
  repos: Repo[];
  starred_repos_count: number;
  watchers_count: number;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
}

const UserGitHubCard: React.FC<UserGitHubCardProps> = ({ username }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (response.ok) {
          const data: UserData = await response.json();
          setUserData(data);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="text-center text-gray-500">Loading user data...</div>
    );
  }

  if (error || !userData) {
    return <div className="text-center text-red-500">User not found!</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto  p-6 space-y-6  rounded-lg shadow-lg">
      {/* User Info Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-b rounded-lg text-black bg-gray-50">
        <img
          src={userData.avatar_url}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />
        <div>
          <h3 className="text-2xl text-black font-semibold ">
            {userData.name || userData.login}
          </h3>
          <p className="text-lg text-gray-600">
            {userData.bio || "No bio available"}
          </p>
        </div>
      </div>

      {/* Graph */}
      <img
        src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github`}
        alt="GitHub Activity Graph"
        className="w-full border rounded-lg shadow-lg"
      />

      {/* Main Data Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <GitHubCard
          icon={<GitPullRequest className="text-teal-500" />}
          title={`${userData.public_repos} Repositories`}
          buttonLink={userData.repos_url}
        />
        <GitHubCard
          icon={<User className="text-blue-500" />}
          title={`${userData.followers} Followers`}
          buttonLabel={`Follow ${userData.login}`}
        />
        <GitHubCard
          icon={<User className="text-green-500" />}
          title={`${userData.following} Following`}
        />
        <GitHubCard
          icon={<User2 className="text-purple-500" />}
          title={
            userData.hireable ? "Available for Hire" : "Not Available for Hire"
          }
        />
        <GitHubCard
          icon={<Code className="text-blue-600" />}
          title={
            userData.blog ? (
              <a
                href={userData.blog}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Portfolio Website
              </a>
            ) : (
              "No Portfolio Website"
            )
          }
        />
        <GitHubCard
          icon={<MapPin className="text-red-500" />}
          title={userData.location || "No Location Provided"}
        />
        <GitHubCard
          icon={<Home className="text-green-500" />}
          title={userData.company || "No Company"}
        />
        <GitHubCard
          icon={<Calendar className="text-purple-500" />}
          title={`Joined on ${formatDate(userData.created_at)}`}
        />
        <GitHubCard
          icon={<CalendarCheck className="text-orange-500" />}
          title={`Update at ${formatDate(userData.updated_at)}`}
        />
      </div>
    </div>
  );
};

export default UserGitHubCard;
