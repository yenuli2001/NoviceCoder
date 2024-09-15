import CodeSnippet from "../models/codeSnippet.js";

export async function saveCodeSnippet(req, res) {
  const { title, code, language } = req.body;

  const codeSnippet = new CodeSnippet({
    title,
    code,
    language,
    createdAt: new Date(),
  });

  try {
    const newCodeSnippet = await codeSnippet.save();
    res.status(201).json(newCodeSnippet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getAllCodeSnippets(req, res) {
  try {
    const codeSnippets = await CodeSnippet.find();
    res.json(codeSnippets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getCodeSnippetById(req, res) {
  try {
    const codeSnippet = await CodeSnippet.findById(req.params.id);
    if (!codeSnippet) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(codeSnippet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateCodeSnippet(req, res) {
  const { id } = req.params;
  const { title, code, language } = req.body;

  try {
    const updatedCodeSnippet = await CodeSnippet.findByIdAndUpdate(
      id,
      { title, code, language, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedCodeSnippet) {
      return res.status(404).json({ message: "Code snippet not found" });
    }

    res.json(updatedCodeSnippet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteCodeSnippet(req, res) {
  try {
    const codeSnippet = await CodeSnippet.findByIdAndDelete(req.params.id);
    if (!codeSnippet) {
      return res.status(404).json({ message: "Code snippet not found" });
    }
    res.json({ message: "Code snippet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
