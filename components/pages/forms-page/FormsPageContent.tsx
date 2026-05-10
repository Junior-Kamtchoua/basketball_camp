import {
  FileText,
  Download,
  ShieldCheck,
  ClipboardList,
  HeartPulse,
  Users,
} from "lucide-react";

const forms = [
  {
    title: "Player Registration Form",
    description:
      "Complete the official academy registration process for new players.",
    icon: <ClipboardList size={28} />,
    file: "PDF Document",
  },
  {
    title: "Medical Clearance Form",
    description:
      "Required health and medical information to ensure player safety.",
    icon: <HeartPulse size={28} />,
    file: "PDF Document",
  },
  {
    title: "Parent Agreement Form",
    description:
      "Guidelines, responsibilities and academy policies for parents.",
    icon: <Users size={28} />,
    file: "PDF Document",
  },
];

export default function FormsPageContent() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-content-center">
          <span className="page-tag">FBA DOCUMENTS</span>

          <h2 className="page-title">Academy Forms & Resources</h2>

          <p className="page-text page-text--center">
            Access all important registration documents, agreements and academy
            forms required for participation in Friendship Basketball Academy
            programs.
          </p>
        </div>

        <div className="forms-grid">
          {forms.map((form, index) => (
            <div className="form-card" key={index}>
              <div className="form-card__icon">{form.icon}</div>

              <span className="form-card__file">{form.file}</span>

              <h3>{form.title}</h3>

              <p className="form-card__description">{form.description}</p>

              <button>
                <Download size={18} />
                Download PDF
              </button>
            </div>
          ))}
        </div>

        <div className="forms-info">
          <div className="forms-info__card">
            <div className="forms-info__icon">
              <ShieldCheck size={26} />
            </div>

            <div>
              <h3>Secure Documents</h3>

              <p>
                All academy forms and player information are protected and
                securely managed.
              </p>
            </div>
          </div>

          <div className="forms-info__card">
            <div className="forms-info__icon">
              <FileText size={26} />
            </div>

            <div>
              <h3>Easy Access</h3>

              <p>
                Download, print and complete forms before attending training
                sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
