// Single source for links and copy that must stay accurate.
export const REPO = "https://github.com/ddevSharma/IBM_Db2_TechX_Project_Submission_ShipSafe_AI_Landing_Page";
export const SOURCE = "https://github.com/ddevSharma/IBM_Db2_TechX_Project_Submission/tree/submission/shipsafe-ai/submissions/shipsafe-ai";
export const VERSION = "3.0.0";
export const VSIX = `shipsafe-${VERSION}.vsix`;
export const WHEEL = `shipsafe-${VERSION}-py3-none-any.whl`;
export const WHEEL_URL = `${REPO}/raw/main/public/downloads/${WHEEL}`;
export const DB2_EXTENSION = "https://marketplace.visualstudio.com/items?itemName=IBM.db2-for-luw";

export const TICKER = [
  "ShipSafe v3.0 is out",
  "Free · open source · Apache-2.0",
  "Works in IBM Bob, VS Code, Claude Code and Cursor",
  "100% local: Granite runs on your laptop",
  "Every check, fix and memory lives in IBM Db2",
  "Built for Db2Hack 2026",
];

export const TOOLS: { name: string; when: string; returns: string }[] = [
  { name: "shipsafe_check_code", when: "before every write", returns: "Verdict, issues with line, reason, fix and team policy" },
  { name: "shipsafe_fix_code", when: "after a block", returns: "Fixed file, unified diff and a verified flag" },
  { name: "shipsafe_check_sql", when: "before using SQL", returns: "Db2 validation, result columns, risky patterns" },
  { name: "shipsafe_db2_schema", when: "before writing SQL", returns: "Tables, columns, keys and indexes" },
  { name: "shipsafe_recall", when: "start of a task", returns: "Relevant project decisions from Db2" },
  { name: "shipsafe_remember", when: "after a decision", returns: "Stored memory id" },
  { name: "shipsafe_ask_standards", when: "when unsure", returns: "Answer with policy citations" },
  { name: "shipsafe_check_files", when: "on existing files", returns: "Per-file verdicts" },
  { name: "shipsafe_readiness_check", when: 'before saying "done"', returns: "Full gate: secrets, code, CVEs, tests, risk trend" },
  { name: "shipsafe_session_report", when: "on request", returns: "Checks, blocks and verified fixes per IDE" },
  { name: "shipsafe_status", when: "on request", returns: "Db2 and Granite health" },
];
