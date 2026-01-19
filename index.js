import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    // 1. المحاولة: نطلب البيانات من الـ API
    const response = await axios.get("https://api.spacexdata.com/v4/launches/latest");
    const result = response.data;

    // 2. النجاح: نرسل البيانات للصفحة، ونرسل الخطأ كـ null (لا يوجد خطأ)
    res.render("index.ejs", { 
      data: result, 
      error: null 
    });

  } catch (error) {
    // 3. الفشل (Catch): حدث خطأ ما!
    
    console.error("Error fetching data:", error.message); // نطبعه في التيرمينال لنا كمبرمجين

    // نحدد رسالة خطأ مناسبة للمستخدم
    let errorMessage = "فشل الاتصال بالخادم، يرجى المحاولة لاحقاً.";

    // إذا كان الخطأ من الـ API نفسه (مثلاً 404 Not Found)
    if (error.response) {
        errorMessage = `خطأ من المصدر: ${error.response.status} - ${error.response.statusText}`;
    }

    // نرسل الصفحة لكن مع رسالة الخطأ وبدون بيانات
    res.render("index.ejs", { 
      data: null, 
      error: errorMessage 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});