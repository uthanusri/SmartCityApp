import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const ReportIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const submitIssue = async (e) => {
    e.preventDefault();

    if (!title || !description || !status) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase.from("report_issues").insert([
      {
        title,
        description,
        status: "pending",
      },
    ]);

    if (error) {
      console.log("Supabase Insert Error (ReportIssue):", error);
      alert("Error submitting issue");
    } else {
      alert("Issue reported successfully!");
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="form-container">
      <h2>Report an Issue</h2>
      <form onSubmit={submitIssue}>
        <label>Issue Title</label>
        <input
          type="text"
          placeholder="Enter issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
        </select>

        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
};

export default ReportIssue;