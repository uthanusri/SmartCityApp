import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Feedback = () => {
  const [amenity, setAmenity] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    if (!amenity || !comment || !rating) {
      alert("Please complete all fields");
      return;
    }

    const { error } = await supabase.from("feedback").insert([
      {
        amenity,
        comment,
        rating,
      },
    ]);

    if (error) {
      console.log("Supabase Insert Error (Feedback):", error);
      alert("Error submitting feedback");
    } else {
      alert("Feedback submitted!");
      setAmenity("");
      setComment("");
      setRating("");
    }
  };

  return (
    <div className="form-container">
      <h2>User Feedback</h2>
      <form onSubmit={submitFeedback}>
        <label>Amenity</label>
        <input
          type="text"
          placeholder="Which amenity?"
          value={amenity}
          onChange={(e) => setAmenity(e.target.value)}
        />

        <label>Comment</label>
        <textarea
          placeholder="Your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <label>Rating</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Select</option>
          <option value="1">1 </option>
          <option value="2">2 </option>
          <option value="3">3 </option>
          <option value="4">4 </option>
          <option value="5">5 </option>
        </select>

        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;