// ✅ Cấu hình Google Sheet ID
const SHEET_ID = "1rDIGPG9BvJh42Yp1COEJBKQzukYxGmo5p_9NpsPlryk";

// ✅ Dùng proxy để vượt qua CORS của Google (hoạt động tốt trên iPhone)
const SHEET_URL = `https://api.allorigins.win/raw?url=https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

// 🧠 Hàm tải danh sách key từ Google Sheet
async function fetchKeys() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    // Bỏ dòng đầu tiêu đề, tách từng dòng key
    return text.split('\n')
               .slice(1)
               .map(line => line.trim())
               .filter(Boolean);
  } catch (error) {
    console.error("❌ Lỗi khi tải key:", error);
    return [];
  }
}

// 🟢 Xử lý nút Đăng nhập
document.getElementById("loginBtn").addEventListener("click", async () => {
  const inputKey = document.getElementById("keyInput").value.trim();
  const msg = document.getElementById("loginMsg");

  msg.textContent = "⏳ Đang kiểm tra...";
  const keys = await fetchKeys();

  if (keys.includes(inputKey)) {
    msg.textContent = "✅ Đăng nhập thành công!";
    document.querySelector(".container").style.display = "none";
    document.getElementById("menu").style.display = "block";
  } else {
    msg.textContent = "❌ Key không hợp lệ!";
  }
});
