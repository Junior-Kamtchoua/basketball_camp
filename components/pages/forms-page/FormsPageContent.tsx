"use client";

import {
  FileText,
  Download,
  ShieldCheck,
  ClipboardList,
  Users,
} from "lucide-react";

import "./FormsPageContent.css";

const forms = [
  {
    title: "Basketball Camp Registration Form",

    description:
      "Complete the official basketball camp registration directly inside your dashboard after logging into your account.",

    icon: <ClipboardList size={28} />,

    file: "Online Registration",
  },

  {
    title: "Basketball Club Registration Form",

    description:
      "Complete the official basketball club registration directly inside your dashboard after logging into your account.",

    icon: <Users size={28} />,

    file: "Online Registration",
  },
];

export default function FormsPageContent() {
  const handleOpenInfo = () => {
    alert(
      "To complete your registration:\n\n1. Create an account or login\n2. Go to Dashboard → Payments\n3. Select your registration form\n4. Complete the form online\n5. Submit your registration for admin review",
    );
  };

  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-content-center">
          <span className="page-tag">FBA DOCUMENTS</span>

          <h2 className="page-title">Academy Forms & Resources</h2>

          <p className="page-text page-text--center">
            Access all important registration documents and academy forms
            required for participation in Friendship Basketball Academy
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

              <button onClick={handleOpenInfo}>
                <Download size={18} />
                Complete Registration
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
              <h3>Easy Online Submission</h3>

              <p>
                Complete and submit your registration forms directly inside your
                dashboard without downloading PDFs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
