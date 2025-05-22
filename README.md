# inkstats | KOReader Reading Statistics Viewer 📖📊

A privacy-first web app for visualizing your **reading statistics exported from KOReader**.

Built with **Next.js App Router** and **TypeScript**, this tool parses your KOReader SQLite export entirely **in your browser**, ensuring your data **never leaves your device**.

> **Note:** This project is not affiliated with the KOReader team.

---

## 🚀 Features

- 🧠 Client-side only: Your data is never uploaded or stored remotely.
- 📁 Upload your `reading-statistics.sqlite` file.
- 📊 Get beautiful visualizations of your reading habits.
- ⏱️ Fast, lightweight, and session-based — nothing is persisted after the tab is closed.

---

## 🔐 Privacy and Technical Design

- Uses [`sql.js`](https://github.com/sql-js/sql.js) to query the uploaded SQLite file in memory.
- The SQLite file is **stored temporarily in memory (not IndexedDB or LocalStorage)**.
- All calculations and charts are rendered based on this in-memory DB, ensuring:
    - ✅ Privacy: No uploads, no backend.
    - 🧽 Ephemeral data: Once you close the tab, everything is gone.
- File size soft-limit: ⚠️ Uploads above **10MB** are discouraged for performance reasons. The app is optimized for **1–3 years of logs (~3–9MB)**.

---

## 🛣️ Roadmap & Future Plans

- 📅 Time-filtering (e.g. monthly/weekly trends)
- 📈 More chart types (e.g. heatmaps, top books, active hours)
- 💾 Optional export for filtered summaries
- ⚙️ Light/dark theme toggle
- 📉 Graceful fallback for corrupted or unsupported files
- ✂️ Automatic trimming (e.g. show "last 3 years only")

---

## 🤝 Contributing

Pull requests and issues are **welcome**!

If you'd like to:
- Suggest a new feature
- Improve existing components or visualizations
- Report a bug or data parsing problem

...please [open an issue](https://github.com/your-repo/issues) or submit a PR.

---

## 📄 License

This project is licensed under the [CC BY-NC 4.0 License](https://creativecommons.org/licenses/by-nc/4.0/).  
You are free to use and deploy it non-commercially. Commercial use is not permitted.

---

## 🙏 Acknowledgements

- [KOReader](https://github.com/koreader/koreader) — for enabling access to reading stats
- [sql.js](https://github.com/sql-js/sql.js) — WebAssembly-based SQLite in the browser
