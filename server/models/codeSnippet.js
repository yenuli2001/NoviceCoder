import { Schema, model } from "mongoose";

const codeSnippetSchema = new Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CodeSnippet = model("CodeSnippet", codeSnippetSchema);

export default CodeSnippet;
