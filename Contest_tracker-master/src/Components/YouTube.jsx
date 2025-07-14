
 
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function YouTube() {
  const { contestName } = useParams();
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  // const TLE_CHANNEL_ID = "UC0tRdbXVDbhaPvj1VFsH3Vg";

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const query = `${decodeURIComponent(contestName)} solution`;
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              q: query,
              type: "video",
              // channelId: import.meta.env.VITE_CHANNEL_ID,
              key: AIzaSyAE24MX2_WR0XPXKuluaqcu7rCZxaelrTA,
              maxResults: 1,
            },
          }
        );
        const firstVideo = response.data.items[0];
        if (firstVideo) {
          setVideoId(firstVideo.id.videoId);
        }
      } catch (err) {
        console.error("Failed to fetch YouTube video", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [contestName]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Solution for: {decodeURIComponent(contestName)}
      </h2>
      {videoId ? (
        <iframe
          width="100%"
          height="400"
          className="rounded-lg shadow-md"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Video Solution"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="text-red-500">No video found!</p>
      )}
    </div>
  );
}
