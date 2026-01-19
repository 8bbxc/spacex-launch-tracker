import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// التأكد من أن ملفات الـ CSS يتم قراءتها من المجلد الصحيح
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.spacexdata.com/v4/launches/latest");
    const result = response.data;

    // نرسل البيانات باسم 'data' لكي يستقبلها ملف EJS
    res.render("index.ejs", { 
      data: result, 
      error: null 
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.render("index.ejs", { 
      data: null, 
      error: "فشل الاتصال بالخادم، يرجى المحاولة لاحقاً." 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});