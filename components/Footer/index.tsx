export default function Footer() {
  return (
    <footer className="container flex flex-row flex-wrap justify-between gap-2 py-6">
      <p className="text-muted-foreground text-sm">
        Made with 💙 by{" "}
        <a
          href="https://github.com/iibarbari"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-4"
        >
          Ilknur
        </a>
      </p>

      <p className="text-muted-foreground text-sm">
        Analytics by{" "}
        <a
          href="https://www.poeticmetric.com/s?d=inkstats.ilknur.sari.me"
          target="_blank"
          className="anchor-link underline"
          rel="noopener"
        >
          PoeticMetric
        </a>{" "}
        | Monitored by{" "}
        <a
          href="https://www.webgazer.io/s?id=522"
          target="_blank"
          className="anchor-link underline"
          rel="noopener"
        >
          WebGazer
        </a>
      </p>
    </footer>
  );
}
