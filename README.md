```markdown
# پیش‌نمایش استاتیک حسابرس‌یار (GitHub Pages)

این مخزن یک پیش‌نمایش استاتیک از رابط "حسابرِس‌یار" را منتشر می‌کند. نکته: API و دیتابیس فعال نیستند؛ داده‌ها از فایل public/clients.json بارگذاری می‌شوند.

نحوهٔ راه‌اندازی محلی:
1. npm install
2. npm run dev
3. باز کردن http://localhost:3000

نحوهٔ انتشار روی GitHub Pages:
1. یک مخزن جدید در GitHub ایجاد کن (مثلاً hesabsar-yar).
2. کدها را به شاخه main push کن:
   git init
   git add .
   git commit -m "Initial"
   git branch -M main
   git remote add origin https://github.com/<your-username>/hesabsar-yar.git
   git push -u origin main
3. پس از push، GitHub Actions فایل .github/workflows/deploy.yml را اجرا می‌کند، سایت ساخته و شاخه gh-pages ایجاد شده و محتویات out در آن منتشر می‌شود.

4. در قسمت Settings → Pages ممکن است لازم باشد Source را روی gh-pages تنظیم کنی، ولی معمولاً بعد از push اتوماتیک قابل مشاهده خواهد بودecho "# test" >> README.md
git add README.md
git commit -m "Trigger workflow"
git push


اگر می‌خواهی من همین ساختار را طوری آماده کنم که APIها روی Vercel کار کنند (Prisma + Postgres)، بگو تا فایل‌های مورد نیاز برای deploy به Vercel را هم آماده کنم.
```
