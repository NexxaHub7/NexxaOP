const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

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
  const keyDataUrl = "https://" + host + "/" + id + "/keydata";
  const verifyUrl = "https://" + host + "/" + id + "/verify";
  const realUrl = "https://" + host + "/" + id + "/real";

  if (!hasKeySystem) {
    return `--By Nexxa OP
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "NexxaOPProtected"
ScreenGui.ResetOnSpawn = false
ScreenGui.IgnoreGuiInset = true
pcall(function() ScreenGui.Parent = game:GetService("CoreGui") end)
if not ScreenGui.Parent then
  ScreenGui.Parent = Players.LocalPlayer:WaitForChild("PlayerGui")
end
local Frame = Instance.new("Frame")
Frame.Size = UDim2.new(0, 420, 0, 180)
Frame.Position = UDim2.new(0.5, -210, 0.5, -90)
Frame.BackgroundColor3 = Color3.fromRGB(15, 15, 15)
Frame.BorderSizePixel = 0
Frame.Parent = ScreenGui
Instance.new("UICorner", Frame).CornerRadius = UDim.new(0, 16)
local Stroke = Instance.new("UIStroke", Frame)
Stroke.Color = Color3.fromRGB(255, 140, 0)
Stroke.Thickness = 2
local Icon = Instance.new("ImageLabel")
Icon.Size = UDim2.new(0, 60, 0, 60)
Icon.Position = UDim2.new(0.5, -30, 0, 15)
Icon.BackgroundTransparency = 1
Icon.Image = "rbxassetid://88158601145345"
Icon.Parent = Frame
local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, 0, 0, 30)
Title.Position = UDim2.new(0, 0, 0, 85)
Title.BackgroundTransparency = 1
Title.Text = "Protected By Nexxa OP"
Title.TextColor3 = Color3.fromRGB(255, 140, 0)
Title.Font = Enum.Font.GothamBold
Title.TextSize = 20
Title.Parent = Frame
local Sub = Instance.new("TextLabel")
Sub.Size = UDim2.new(1, 0, 0, 20)
Sub.Position = UDim2.new(0, 0, 0, 120)
Sub.BackgroundTransparency = 1
Sub.Text = "Loading script..."
Sub.TextColor3 = Color3.fromRGB(180, 180, 180)
Sub.Font = Enum.Font.Gotham
Sub.TextSize = 13
Sub.Parent = Frame
task.wait(5)
ScreenGui:Destroy()
local notifyText = ""
pcall(function()
  local kd = HttpService:GetAsync("${keyDataUrl}")
  local decoded = HttpService:JSONDecode(kd)
  notifyText = decoded.notifyText or ""
end)
if notifyText ~= "" then
  local NS = Instance.new("ScreenGui")
  NS.Name = "NexxaOPNotify"
  NS.ResetOnSpawn = false
  NS.IgnoreGuiInset = true
  pcall(function() NS.Parent = game:GetService("CoreGui") end)
  if not NS.Parent then NS.Parent = Players.LocalPlayer:WaitForChild("PlayerGui") end
  local NF = Instance.new("Frame")
  NF.Size = UDim2.new(0, 300, 0, 80)
  NF.Position = UDim2.new(1, 320, 0, 20)
  NF.BackgroundColor3 = Color3.fromRGB(15, 15, 20)
  NF.BorderSizePixel = 0
  NF.Parent = NS
  Instance.new("UICorner", NF).CornerRadius = UDim.new(0, 12)
  local NS2 = Instance.new("UIStroke", NF)
  NS2.Color = Color3.fromRGB(255, 140, 0)
  NS2.Thickness = 2
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
  local NT2 = Instance.new("TextLabel")
  NT2.Size = UDim2.new(1, -20, 0, 20)
  NT2.Position = UDim2.new(0, 10, 0, 45)
  NT2.BackgroundTransparency = 1
  NT2.Text = "Nexxa OP"
  NT2.TextColor3 = Color3.fromRGB(150, 150, 150)
  NT2.Font = Enum.Font.Gotham
  NT2.TextSize = 12
  NT2.TextXAlignment = Enum.TextXAlignment.Left
  NT2.Parent = NF
  local TweenService = game:GetService("TweenService")
  TweenService:Create(NF, TweenInfo.new(0.4), {Position = UDim2.new(1, -320, 0, 20)}):Play()
  task.wait(5)
  TweenService:Create(NF, TweenInfo.new(0.4), {Position = UDim2.new(1, 320, 0, 20)}):Play()
  task.wait(0.5)
  NS:Destroy()
end
local codeOk, realCode = pcall(function()
  return HttpService:GetAsync("${realUrl}")
end)
if codeOk and realCode then
  local fn = loadstring(realCode)
  if fn then pcall(fn) end
end
`;
  }

  return `--By Nexxa OP
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "NexxaOPProtected"
ScreenGui.ResetOnSpawn = false
ScreenGui.IgnoreGuiInset = true
pcall(function() ScreenGui.Parent = game:GetService("CoreGui") end)
if not ScreenGui.Parent then
  ScreenGui.Parent = Players.LocalPlayer:WaitForChild("PlayerGui")
end
local Frame = Instance.new("Frame")
Frame.Size = UDim2.new(0, 420, 0, 180)
Frame.Position = UDim2.new(0.5, -210, 0.5, -90)
Frame.BackgroundColor3 = Color3.fromRGB(15, 15, 15)
Frame.BorderSizePixel = 0
Frame.Parent = ScreenGui
Instance.new("UICorner", Frame).CornerRadius = UDim.new(0, 16)
local Stroke = Instance.new("UIStroke", Frame)
Stroke.Color = Color3.fromRGB(255, 140, 0)
Stroke.Thickness = 2
local Icon = Instance.new("ImageLabel")
Icon.Size = UDim2.new(0, 60, 0, 60)
Icon.Position = UDim2.new(0.5, -30, 0, 15)
Icon.BackgroundTransparency = 1
Icon.Image = "rbxassetid://88158601145345"
Icon.Parent = Frame
local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, 0, 0, 30)
Title.Position = UDim2.new(0, 0, 0, 85)
Title.BackgroundTransparency = 1
Title.Text = "Protected By Nexxa OP"
Title.TextColor3 = Color3.fromRGB(255, 140, 0)
Title.Font = Enum.Font.GothamBold
Title.TextSize = 20
Title.Parent = Frame
local Sub = Instance.new("TextLabel")
Sub.Size = UDim2.new(1, 0, 0, 20)
Sub.Position = UDim2.new(0, 0, 0, 120)
Sub.BackgroundTransparency = 1
Sub.Text = "Loading..."
Sub.TextColor3 = Color3.fromRGB(180, 180, 180)
Sub.Font = Enum.Font.Gotham
Sub.TextSize = 13
Sub.Parent = Frame
task.wait(5)
ScreenGui:Destroy()
local keyData = {getKeyUrl = "", notifyText = ""}
pcall(function()
  local kd = HttpService:GetAsync("${keyDataUrl}")
  keyData = HttpService:JSONDecode(kd)
end)
local Screen2 = Instance.new("ScreenGui")
Screen2.Name = "NexxaOPKeySystem"
Screen2.ResetOnSpawn = false
Screen2.IgnoreGuiInset = true
pcall(function() Screen2.Parent = game:GetService("CoreGui") end)
if not Screen2.Parent then Screen2.Parent = Players.LocalPlayer:WaitForChild("PlayerGui") end
local Frame2 = Instance.new("Frame")
Frame2.Size = UDim2.new(0, 420, 0, 240)
Frame2.Position = UDim2.new(0.5, -210, 0.5, -120)
Frame2.BackgroundColor3 = Color3.fromRGB(15, 15, 15)
Frame2.BorderSizePixel = 0
Frame2.Parent = Screen2
Instance.new("UICorner", Frame2).CornerRadius = UDim.new(0, 16)
local Stroke2 = Instance.new("UIStroke", Frame2)
Stroke2.Color = Color3.fromRGB(255, 140, 0)
Stroke2.Thickness = 2
local Icon2 = Instance.new("ImageLabel")
Icon2.Size = UDim2.new(0, 50, 0, 50)
Icon2.Position = UDim2.new(0.5, -25, 0, 12)
Icon2.BackgroundTransparency = 1
Icon2.Image = "rbxassetid://88158601145345"
Icon2.Parent = Frame2
local Title2 = Instance.new("TextLabel")
Title2.Size = UDim2.new(1, 0, 0, 25)
Title2.Position = UDim2.new(0, 0, 0, 68)
Title2.BackgroundTransparency = 1
Title2.Text = "Protected By Nexxa OP"
Title2.TextColor3 = Color3.fromRGB(255, 140, 0)
Title2.Font = Enum.Font.GothamBold
Title2.TextSize = 18
Title2.Parent = Frame2
local Sub2 = Instance.new("TextLabel")
Sub2.Size = UDim2.new(1, 0, 0, 20)
Sub2.Position = UDim2.new(0, 0, 0, 92)
Sub2.BackgroundTransparency = 1
Sub2.Text = "Enter Key"
Sub2.TextColor3 = Color3.fromRGB(180, 180, 180)
Sub2.Font = Enum.Font.Gotham
Sub2.TextSize = 13
Sub2.Parent = Frame2
local KeyBox = Instance.new("TextBox")
KeyBox.Size = UDim2.new(1, -40, 0, 38)
KeyBox.Position = UDim2.new(0, 20, 0, 115)
KeyBox.BackgroundColor3 = Color3.fromRGB(5, 5, 10)
KeyBox.BorderSizePixel = 0
KeyBox.Text = ""
KeyBox.PlaceholderText = "Enter Key"
KeyBox.TextColor3 = Color3.fromRGB(255, 255, 255)
KeyBox.Font = Enum.Font.Code
KeyBox.TextSize = 14
KeyBox.ClearTextOnFocus = false
KeyBox.Parent = Frame2
Instance.new("UICorner", KeyBox).CornerRadius = UDim.new(0, 8)
local KS = Instance.new("UIStroke", KeyBox)
KS.Color = Color3.fromRGB(30, 58, 95)
KS.Thickness = 1
local GetBtn = Instance.new("TextButton")
GetBtn.Size = UDim2.new(0.5, -25, 0, 38)
GetBtn.Position = UDim2.new(0, 20, 0, 160)
GetBtn.BackgroundColor3 = Color3.fromRGB(255, 140, 0)
GetBtn.Text = "Get Key"
GetBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
GetBtn.Font = Enum.Font.GothamBold
GetBtn.TextSize = 14
GetBtn.Parent = Frame2
Instance.new("UICorner", GetBtn).CornerRadius = UDim.new(0, 8)
local ContinueBtn = Instance.new("TextButton")
ContinueBtn.Size = UDim2.new(0.5, -25, 0, 38)
ContinueBtn.Position = UDim2.new(0.5, 5, 0, 160)
ContinueBtn.BackgroundColor3 = Color3.fromRGB(79, 195, 247)
ContinueBtn.Text = "Continue"
ContinueBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
ContinueBtn.Font = Enum.Font.GothamBold
ContinueBtn.TextSize = 14
ContinueBtn.Parent = Frame2
Instance.new("UICorner", ContinueBtn).CornerRadius = UDim.new(0, 8)
local Msg = Instance.new("TextLabel")
Msg.Size = UDim2.new(1, -40, 0, 20)
Msg.Position = UDim2.new(0, 20, 0, 208)
Msg.BackgroundTransparency = 1
Msg.Text = ""
Msg.TextColor3 = Color3.fromRGB(231, 76, 60)
Msg.Font = Enum.Font.GothamBold
Msg.TextSize = 12
Msg.Parent = Frame2
local copied = false
GetBtn.MouseButton1Click:Connect(function()
  if keyData.getKeyUrl and keyData.getKeyUrl ~= "" then
    pcall(function()
      if setclipboard then
        setclipboard(keyData.getKeyUrl)
        copied = true
      end
    end)
    if copied then
      GetBtn.Text = "✅ Copied!"
    else
      GetBtn.Text = "❌ Error"
    end
    task.wait(1.5)
    GetBtn.Text = "Get Key"
  else
    GetBtn.Text = "❌ No Link"
    task.wait(1.5)
    GetBtn.Text = "Get Key"
  end
end)
ContinueBtn.MouseButton1Click:Connect(function()
  local k = KeyBox.Text
  if k == "" then return end
  ContinueBtn.Text = "Verifying..."
  ContinueBtn.BackgroundColor3 = Color3.fromRGB(100, 100, 100)
  Msg.Text = ""
  local ok, res = pcall(function()
    return HttpService:PostAsync("${verifyUrl}", HttpService:JSONEncode({key = k}), Enum.HttpContentType.ApplicationJson)
  end)
  if not ok or not res then
    Msg.Text = "Incorrect Password"
    ContinueBtn.Text = "Continue"
    ContinueBtn.BackgroundColor3 = Color3.fromRGB(79, 195, 247)
    return
  end
  local parsed
  pcall(function() parsed = HttpService:JSONDecode(res) end)
  if not parsed or not parsed.ok then
    Msg.Text = "Incorrect Password"
    ContinueBtn.Text = "Continue"
    ContinueBtn.BackgroundColor3 = Color3.fromRGB(79, 195, 247)
    return
  end
  Screen2:Destroy()
  if keyData.notifyText and keyData.notifyText ~= "" then
    local NS = Instance.new("ScreenGui")
    NS.Name = "NexxaOPNotify"
    NS.ResetOnSpawn = false
    NS.IgnoreGuiInset = true
    pcall(function() NS.Parent = game:GetService("CoreGui") end)
    if not NS.Parent then NS.Parent = Players.LocalPlayer:WaitForChild("PlayerGui") end
    local NF = Instance.new("Frame")
    NF.Size = UDim2.new(0, 300, 0, 80)
    NF.Position = UDim2.new(1, 320, 0, 20)
    NF.BackgroundColor3 = Color3.fromRGB(15, 15, 20)
    NF.BorderSizePixel = 0
    NF.Parent = NS
    Instance.new("UICorner", NF).CornerRadius = UDim.new(0, 12)
    local NS2 = Instance.new("UIStroke", NF)
    NS2.Color = Color3.fromRGB(255, 140, 0)
    NS2.Thickness = 2
    local NT = Instance.new("TextLabel")
    NT.Size = UDim2.new(1, -20, 0, 30)
    NT.Position = UDim2.new(0, 10, 0, 10)
    NT.BackgroundTransparency = 1
    NT.Text = keyData.notifyText
    NT.TextColor3 = Color3.fromRGB(255, 140, 0)
    NT.Font = Enum.Font.GothamBold
    NT.TextSize = 16
    NT.TextXAlignment = Enum.TextXAlignment.Left
    NT.Parent = NF
    local NT2 = Instance.new("TextLabel")
    NT2.Size = UDim2.new(1, -20, 0, 20)
    NT2.Position = UDim2.new(0, 10, 0, 45)
    NT2.BackgroundTransparency = 1
    NT2.Text = "Nexxa OP"
    NT2.TextColor3 = Color3.fromRGB(150, 150, 150)
    NT2.Font = Enum.Font.Gotham
    NT2.TextSize = 12
    NT2.TextXAlignment = Enum.TextXAlignment.Left
    NT2.Parent = NF
    local TS = game:GetService("TweenService")
    TS:Create(NF, TweenInfo.new(0.4), {Position = UDim2.new(1, -320, 0, 20)}):Play()
    task.wait(5)
    TS:Create(NF, TweenInfo.new(0.4), {Position = UDim2.new(1, 320, 0, 20)}):Play()
    task.wait(0.5)
    NS:Destroy()
  end
  local codeOk, realCode = pcall(function()
    return HttpService:GetAsync("${realUrl}?k=" .. HttpService:UrlEncode(k))
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

  if (providedKey === masterKey) return res.json({ ok: true, via: "master" });
  if (scriptKey && providedKey === scriptKey) return res.json({ ok: true, via: "script" });
  return res.json({ ok: false, provided: providedKey, expected: scriptKey });
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

app.post("/:id/debug", (req, res) => {
  const id = req.params.id.replace(/[^a-f0-9]/gi, "");
  const folder = path.join(UPLOADS, id);
  if (!fs.existsSync(folder)) return res.status(404).json({ error: "Not found" });
  const scriptKeyFile = path.join(folder, "scriptkey.txt");
  const scriptKey = fs.existsSync(scriptKeyFile) ? fs.readFileSync(scriptKeyFile, "utf-8").trim() : "";
  const getkeyFile = path.join(folder, "getkey.txt");
  const getKeyUrl = fs.existsSync(getkeyFile) ? fs.readFileSync(getkeyFile, "utf-8").trim() : "";
  const notifyFile = path.join(folder, "notify.txt");
  const notifyText = fs.existsSync(notifyFile) ? fs.readFileSync(notifyFile, "utf-8").trim() : "";
  res.json({ id, scriptKey, getKeyUrl, notifyText, masterKey: getMasterKey() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Nexxa OP en puerto " + PORT + " | Master: " + getMasterKey()));
