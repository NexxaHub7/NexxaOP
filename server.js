const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const UPLOADS = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS)) fs.mkdirSync(UPLOADS);

const MASTER_FILE = path.join(__dirname, "master.txt");
function getMasterKey() {
  if (fs.existsSync(MASTER_FILE)) {
    const k = fs.readFileSync(MASTER_FILE, "utf-8").trim();
    if (k.length === 40) return k;
  }
  const newKey = crypto.randomBytes(20).toString("hex");
  fs.writeFileSync(MASTER_FILE, newKey, "utf-8");
  return newKey;
}

function genId() {
  return crypto.randomBytes(3).toString("hex");
}

app.post("/upload", (req, res) => {
  const { code, customKey, getKeyUrl, notifyText } = req.body;
  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Codigo vacio" });
  }

  let id = genId();
  let folder = path.join(UPLOADS, id);
  let intentos = 0;
  while (fs.existsSync(folder) && intentos < 10) {
    id = genId();
    folder = path.join(UPLOADS, id);
    intentos++;
  }

  const scriptKey = (customKey && customKey.trim().length > 0) ? customKey.trim() : "";

  try {
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, "code.lua"), code, "utf-8");
    fs.writeFileSync(path.join(folder, "scriptkey.txt"), scriptKey, "utf-8");
    fs.writeFileSync(path.join(folder, "getkey.txt"), getKeyUrl || "", "utf-8");
    fs.writeFileSync(path.join(folder, "notify.txt"), notifyText || "", "utf-8");

    const host = req.get("host");
    return res.json({
      id,
      hasKeySystem: scriptKey !== "",
      scriptKey: scriptKey,
      masterKey: getMasterKey(),
      hasNotify: (notifyText || "") !== "",
      notifyText: notifyText || "",
      getKeyUrl: getKeyUrl || "",
      url: "https://" + host + "/" + id + "/raw",
      viewUrl: "https://" + host + "/" + id
    });
  } catch (e) {
    return res.status(500).json({ error: "Error al guardar" });
  }
});

app.get("/master", (req, res) => {
  res.json({ key: getMasterKey() });
});

app.get("/:id/keydata", (req, res) => {
  const id = req.params.id.replace(/[^a-f0-9]/gi, "");
  const folder = path.join(UPLOADS, id);
  if (!fs.existsSync(folder)) {
    return res.status(404).json({ error: "Not found" });
  }
  const getkeyFile = path.join(folder, "getkey.txt");
  const notifyFile = path.join(folder, "notify.txt");
  const getKeyUrl = fs.existsSync(getkeyFile) ? fs.readFileSync(getkeyFile, "utf-8").trim() : "";
  const notifyText = fs.existsSync(notifyFile) ? fs.readFileSync(notifyFile, "utf-8").trim() : "";
  res.json({ getKeyUrl, notifyText });
});

app.post("/:id/verify", (req, res) => {
  const id = req.params.id.replace(/[^a-f0-9]/gi, "");
  const folder = path.join(UPLOADS, id);
  if (!fs.existsSync(folder)) {
    return res.status(404).json({ ok: false, error: "Not found" });
  }
  const providedKey = (req.body.key || "").trim();
  const scriptKeyFile = path.join(folder, "scriptkey.txt");
  const scriptKey = fs.existsSync(scriptKeyFile) ? fs.readFileSync(scriptKeyFile, "utf-8").trim() : "";
  const masterKey = getMasterKey();

  if (providedKey === masterKey) {
    return res.json({ ok: true, via: "master" });
  }
  if (scriptKey && providedKey === scriptKey) {
    return res.json({ ok: true, via: "script" });
  }
  return res.json({ ok: false });
});

app.get("/:id/raw", (req, res) => {
  const id = req.params.id.replace(/[^a-f0-9]/gi, "");
  const folder = path.join(UPLOADS, id);
  const codeFile = path.join(folder, "code.lua");

  if (!fs.existsSync(folder) || !fs.existsSync(codeFile)) {
    return res.status(404).send("-- Not found");
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(fs.readFileSync(codeFile, "utf-8"));
});

app.get("/:id", (req, res) => {
  const id = req.params.id.replace(/[^a-f0-9]/gi, "");
  const folder = path.join(UPLOADS, id);
  const codeFile = path.join(folder, "code.lua");

  if (!fs.existsSync(folder) || !fs.existsSync(codeFile)) {
    return res.status(404).send("-- Not found");
  }

  res.sendFile(path.join(__dirname, "enterkey.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Nexxa OP en puerto " + PORT + " | Master: " + getMasterKey()));
