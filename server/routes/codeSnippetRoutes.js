import express from "express";
import {
  saveCodeSnippet,
  getAllCodeSnippets,
  getCodeSnippetById,
  updateCodeSnippet,
  deleteCodeSnippet,
} from "../controllers/codeController.js";

const router = express.Router();

router.post("/codes", saveCodeSnippet);
router.get("/codes", getAllCodeSnippets);
router.get("/codes/:id", getCodeSnippetById);
router.put("/codes/:id", updateCodeSnippet);
router.delete("/codes/:id", deleteCodeSnippet);

export default router;
