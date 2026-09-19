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

function genLoader(host, id, hasKeySystem) {
  const rawUrl = "https://" + host + "/" + id + "/raw";
  const realUrl = "https://" + host + "/" + id + "/real";
  const keyDataUrl = "https://" + host + "/" + id + "/keydata";

  if (!hasKeySystem) {
    return `--By Nexxa OP
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "NexxaOPProtection"
ScreenGui.ResetOnSpawn = false
ScreenGui.IgnoreGuiInset = true
pcall(function() ScreenGui.Parent = game:GetService("CoreGui") end)
if not ScreenGui.Parent then
  ScreenGui.Parent = game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui")
end
local Frame = Instance.new("Frame")
Frame.Size = UDim2.new(0, 420, 0, 160)
Frame.Position = UDim2.new(0.5, -210, 0.5, -80)
Frame.BackgroundColor3 = Color3.fromRGB(15, 15, 15)
Frame.BorderSizePixel = 0
Frame.Parent = ScreenGui
Instance.new("UICorner", Frame).CornerRadius = UDim.new(0, 16)
local Stroke = Instance.new("UIStroke", Frame)
Stroke.Color = Color3.fromRGB(255, 140, 0)
Stroke.Thickness = 2
local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, 0, 0, 40)
Title.Position = UDim2.new(0, 0, 0, 40)
Title.BackgroundTransparency = 1
Title.Text = "Protected By Nexxa OP"
Title.TextColor3 = Color3.fromRGB(255, 140, 0)
Title.Font = Enum.Font.GothamBold
Title.TextSize = 22
Title.Parent = Frame
local Sub = Instance.new("TextLabel")
Sub.Size = UDim2.new(1, 0, 0, 30)
Sub.Position = UDim2.new(0, 0, 0, 90)
Sub.BackgroundTransparency = 1
Sub.Text = "Ejecutando script..."
Sub.TextColor3 = Color3.fromRGB(180, 180, 180)
Sub.Font = Enum.Font.Gotham
Sub.TextSize = 14
Sub.Parent = Frame
task.wait(5)
ScreenGui:Destroy()
local ok, code = pcall(function()
  return game:GetService("HttpService"):GetAsync("${realUrl}")
end)
if ok and code then
  local fn = loadstring(code)
  if fn then pcall(fn) end
end
`;
  }

  return `--By Nexxa OP
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "NexxaOPProtection"
ScreenGui.ResetOnSpawn = false
ScreenGui.IgnoreGuiInset = true
pcall(function() ScreenGui.Parent = game:GetService("CoreGui") end)
if not ScreenGui.Parent then
  ScreenGui.Parent = game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui")
end
local Frame = Instance.new("Frame")
Frame.Size = UDim2.new(0, 420, 0, 240)
Frame.Position = UDim2.new(0.5, -210, 0.5, -120)
Frame.BackgroundColor3 = Color3.fromRGB(15, 15, 15)
Frame.BorderSizePixel = 0
Frame.Parent = ScreenGui
Instance.new("UICorner", Frame).CornerRadius = UDim.new(0, 16)
local Stroke = Instance.new("UIStroke", Frame)
Stroke.Color = Color3.fromRGB(255, 140, 0)
Stroke.Thickness = 2
local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, 0, 0, 40)
Title.Position = UDim2.new(0, 0, 0, 20)
Title.BackgroundTransparency = 1
Title.Text = "Protected By Nexxa OP"
Title.TextColor3 = Color3.fromRGB(255, 140, 0)
Title.Font = Enum.Font.GothamBold
Title.TextSize = 22
Title.Parent = Frame
local Sub = Instance.new("TextLabel")
Sub.Size = UDim2.new(1, 0, 0, 20)
Sub.Position = UDim2.new(0, 0, 0, 65)
Sub.BackgroundTransparency = 1
Sub.Text = "Enter Key"
Sub.TextColor3 = Color3.fromRGB(180, 180, 180)
Sub.Font = Enum.Font.Gotham
Sub.TextSize = 14
Sub.Parent = Frame
local KeyBox = Instance.new("TextBox")
KeyBox.Size = UDim2.new(1, -40, 0, 40)
KeyBox.Position = UDim2.new(0, 20, 0, 95)
KeyBox.BackgroundColor3 = Color3.fromRGB(5, 5, 10)
KeyBox.BorderSizePixel = 0
KeyBox.Text = ""
KeyBox.PlaceholderText = "Enter Key"
KeyBox.TextColor3 = Color3.fromRGB(255, 255, 255)
KeyBox.Font = Enum.Font.Code
KeyBox.TextSize = 14
KeyBox.Parent = Frame
Instance.new("UICorner", KeyBox).CornerRadius = UDim.new(0, 8)
local KeyStroke = Instance.new("UIStroke", KeyBox)
KeyStroke.Color = Color3.fromRGB(30, 58, 95)
KeyStroke.Thickness = 1
local GetBtn = Instance.new("TextButton")
GetBtn.Size = UDim2.new(0.5, -25, 0, 40)
GetBtn.Position = UDim2.new(0, 20, 0, 150)
GetBtn.BackgroundColor3 = Color3.fromRGB(255, 140, 0)
GetBtn.Text = "Get Key"
GetBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
GetBtn.Font = Enum.Font.GothamBold
GetBtn.TextSize = 14
GetBtn.Parent = Frame
Instance.new("UICorner", GetBtn).CornerRadius = UDim.new(0, 8)
local ContinueBtn = Instance.new("TextButton")
ContinueBtn.Size = UDim2.new(0.5, -25, 0, 40)
ContinueBtn.Position = UDim2.new(0.5, 5, 0, 150)
ContinueBtn.BackgroundColor3 = Color3.fromRGB(79, 195, 247)
ContinueBtn.Text = "Continue"
ContinueBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
ContinueBtn.Font = Enum.Font.GothamBold
ContinueBtn.TextSize = 14
ContinueBtn.Parent = Frame
Instance.new("UICorner", ContinueBtn).CornerRadius = UDim.new(0, 8)
local Msg = Instance.new("TextLabel")
Msg.Size = UDim2.new(1, -40, 0, 20)
Msg.Position = UDim2.new(0, 20, 0, 200)
Msg.BackgroundTransparency = 1
Msg.Text = ""
Msg.TextColor3 = Color3.fromRGB(231, 76, 60)
Msg.Font = Enum.Font.GothamBold
Msg.TextSize = 12
Msg.Parent = Frame
local HttpService = game:GetService("HttpService")
local keyDataOk, keyData = pcall(function()
  return HttpService:GetAsync("${keyDataUrl}")
end)
local getKeyUrl = ""
local notifyText = ""
if keyDataOk and keyData then
  local decoded = HttpService:JSONDecode(keyData)
  getKeyUrl = decoded.getKeyUrl or ""
  notifyText = decoded.notifyText or ""
end
GetBtn.MouseButton1Click:Connect(function()
  if getKeyUrl ~= "" then
    pcall(function() setclipboard(getKeyUrl) end)
    GetBtn.Text = "Copied!"
    task.wait(1.5)
    GetBtn.Text = "Get Key"
  end
end)
ContinueBtn.MouseButton1Click:Connect(function()
  local k = KeyBox.Text
  if k == "" then return end
  ContinueBtn.Text = "Verifying..."
  ContinueBtn.BackgroundColor3 = Color3.fromRGB(100, 100, 100)
  local body = HttpService:JSONEncode({key = k})
  local verifyOk, verifyRes = pcall(function()
    return HttpService:PostAsync("https://${host}/${id}/verify", body, Enum.HttpContentType.ApplicationJson)
  end)
  if not verifyOk or not verifyRes then
    Msg.Text = "Incorrect Password"
    ContinueBtn.Text = "Continue"
    ContinueBtn.BackgroundColor3 = Color3.fromRGB(79, 195, 247)
    return
  end
  local vd = HttpService:JSONDecode(verifyRes)
  if not vd.ok then
    Msg.Text = "Incorrect Password"
    ContinueBtn.Text = "Continue"
    ContinueBtn.BackgroundColor3 = Color3.fromRGB(79, 195, 247)
    return
  end
  Msg.Text = ""
  ScreenGui:Destroy()
  if notifyText ~= "" then
    local N = Instance.new("ScreenGui")
    N.Name = "NexxaOPNotify"
    N.ResetOnSpawn = false
    N.IgnoreGuiInset = true
    pcall(function() N.Parent = game:GetService("CoreGui") end)
    if not N.Parent then
      N.Parent = game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui")
    end
    local NF = Instance.new("Frame")
    NF.Size = UDim2.new(0, 300, 0, 80)
    NF.Position = UDim2.new(1, 320, 0, 20)
    NF.BackgroundColor3 = Color3.fromRGB(15, 15, 20)
    NF.BorderSizePixel = 0
    NF.Parent = N
    Instance.new("UICorner", NF).CornerRadius = UDim.new(0, 12)
    local NS = Instance.new("UIStroke", NF)
    NS.Color = Color3.fromRGB(255, 140, 0)
    NS.Thickness = 2
    local NT = Instance.new("TextLabel")
    NT.Size = UDim2.new(1, -20, 0, 30)
    NT.Position = UDim2.new(0, 10, 0, 10)
    NT.BackgroundTransparency = 1
    NT.Text = notifyText
    NT.TextColor3 = Color3.fromRGB(255, 140, 0)
    NT.Font = Enum.Font.GothamBold
    NT.TextSize = 16
    NT.TextXAlignment = Enum.TextXAlignment.Left
    NT.Parent = NF
    local NS2 = Instance.new("TextLabel")
    NS2.Size = UDim2.new(1, -20, 0, 20)
    NS2.Position = UDim2.new(0, 10, 0, 45)
    NS2.BackgroundTransparency = 1
    NS2.Text = "Nexxa OP"
    NS2.TextColor3 = Color3.fromRGB(150, 150, 150)
    NS2.Font = Enum.Font.Gotham
    NS2.TextSize = 12
    NS2.TextXAlignment = Enum.TextXAlignment.Left
    NS2.Parent = NF
    task.spawn(function()
      local TweenService = game:GetService("TweenService")
      TweenService:Create(NF, TweenInfo.new(0.4, Enum.EasingStyle.Quint), {Position = UDim2.new(1, -320, 0, 20)}):Play()
      task.wait(5)
      TweenService:Create(NF, TweenInfo.new(0.4, Enum.EasingStyle.Quint), {Position = UDim2.new(1, 320, 0, 20)}):Play()
      task.wait(0.5)
      N:Destroy()
    end)
  end
  local codeOk, realCode = pcall(function()
    return HttpService:GetAsync("https://${host}/${id}/real?k=" .. HttpService:UrlEncode(k))
  end)
  if codeOk and realCode then
    local fn = loadstring(realCode)
    if fn then pcall(fn) end
  end
end)
`;
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
    return res.status(404).json({ ok: false });
  }
  const providedKey = (req.body.key || "").trim();
  const scriptKeyFile = path.join(folder, "scriptkey.txt");
  const scriptKey = fs.existsSync(scriptKeyFile) ? fs.readFileSync(scriptKeyFile, "utf-8").trim() : "";
  const masterKey = getMasterKey();

  if (providedKey === masterKey) return res.json({ ok: true });
  if (scriptKey && providedKey === scriptKey) return res.json({ ok: true });
  return res.json({ ok: false });
});

app.get("/:id/real", (req, res) => {
  const id = req.params.id.replace(/[^a-f0-9]/gi, "");
  const folder = path.join(UPLOADS, id);
  const codeFile = path.join(folder, "code.lua");
  if (!fs.existsSync(folder) || !fs.existsSync(codeFile)) {
    return res.status(404).send("-- Not found");
  }
  const providedKey = req.query.k || "";
  const scriptKeyFile = path.join(folder, "scriptkey.txt");
  const scriptKey = fs.existsSync(scriptKeyFile) ? fs.readFileSync(scriptKeyFile, "utf-8").trim() : "";
  const masterKey = getMasterKey();
  if (scriptKey && providedKey !== scriptKey && providedKey !== masterKey) {
    return res.status(403).send("-- Incorrect Password");
  }
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(fs.readFileSync(codeFile, "utf-8"));
});

app.get("/:id/raw", (req, res) => {
  const id = req.params.id.replace(/[^a-f0-9]/gi, "");
  const folder = path.join(UPLOADS, id);
  if (!fs.existsSync(folder)) {
    return res.status(404).send("-- Not found");
  }
  const scriptKeyFile = path.join(folder, "scriptkey.txt");
  const scriptKey = fs.existsSync(scriptKeyFile) ? fs.readFileSync(scriptKeyFile, "utf-8").trim() : "";
  const loader = genLoader(req.get("host"), id, scriptKey !== "");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(loader);
});

app.get("/:id", (req, res) => {
  const id = req.params.id.replace(/[^a-f0-9]/gi, "");
  const folder = path.join(UPLOADS, id);
  const codeFile = path.join(folder, "code.lua");

  if (!fs.existsSync(folder) || !fs.existsSync(codeFile)) {
    return res.status(404).send("-- Not found");
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(fs.readFileSync(codeFile, "utf-8"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Nexxa OP en puerto " + PORT + " | Master: " + getMasterKey()));
