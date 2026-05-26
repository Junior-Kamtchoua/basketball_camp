import "./page-banner.css";

type Props = {
  title: string;
  subtitle: string;
};

export default function PageBanner({ title, subtitle }: Props) {
  return (
    <section className="page-banner">
      <div className="page-banner__overlay"></div>

      <div className="page-banner__content">
        <span className="page-banner__subtitle">BBA ACADEMY</span>

        <h1>{title}</h1>

        <p>{subtitle}</p>
      </div>
    </section>
  );
}
