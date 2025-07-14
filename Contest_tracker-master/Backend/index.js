const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Enable CORS to allow requests from frontend
app.use(cors());
app.use(express.json());

//  Fetch LeetCode Contests
app.get("/api/leetcode-contests", async (req, res) => {
  try {
    const graphqlQuery = {
      query: `
        query {
          allContests {
            title
            titleSlug
            startTime
            duration
          }
        }
      `,
    };

    const response = await axios.post(
      "https://leetcode.com/graphql",
      graphqlQuery,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      }
    );

    if (!response.data?.data?.allContests) {
      return res.status(500).json({ error: "Invalid response from LeetCode API" });
    }

    const allContests = response.data.data.allContests;
    const now = Math.floor(Date.now() / 1000);

    const contests = allContests.map((contest) => ({
      name: contest.title,
      platform: "LeetCode",
      startTime: new Date(contest.startTime * 1000).toISOString(),
      duration: Math.floor(contest.duration / 60),
      url: `https://leetcode.com/contest/${contest.titleSlug}`,
      status: contest.startTime > now ? "upcoming" : "past",
    }));

    res.json(contests);
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error.message);
    res.status(500).json({ error: "Failed to fetch contests" });
  }
});

// ✅ Fetch CodeChef Contests
app.get("/api/codechef-contests", async (req, res) => {
  try {
    const response = await axios.get("https://www.codechef.com/api/list/contests/all", {
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });

    if (!response.data?.future_contests || !response.data?.past_contests) {
      return res.status(500).json({ error: "Invalid response from CodeChef API" });
    }

    const formatContest = (contest, status) => ({
      name: contest.contest_name,
      platform: "CodeChef",
      startTime: new Date(contest.contest_start_date_iso).toISOString(),
      duration: Math.floor(contest.contest_duration / 60),
      url: `https://www.codechef.com/${contest.contest_code}`,
      status,
    });

    const upcomingContests = response.data.future_contests.map((contest) =>
      formatContest(contest, "upcoming")
    );

    const pastContests = response.data.past_contests.map((contest) =>
      formatContest(contest, "past")
    );

    res.json([...upcomingContests, ...pastContests]);
  } catch (error) {
    console.error("Error fetching CodeChef contests:", error.message);
    res.status(500).json({ error: "Failed to fetch contests" });
  }
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
