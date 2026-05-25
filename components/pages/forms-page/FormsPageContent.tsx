"use client";

import { useState } from "react";

import {
  FileText,
  Download,
  ShieldCheck,
  ClipboardList,
  Users,
  X,
  CheckCircle2,
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
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
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

                <button onClick={() => setOpenModal(true)}>
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
                  Complete and submit your registration forms directly inside
                  your dashboard without downloading PDFs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {openModal && (
        <div className="modal-overlay" onClick={() => setOpenModal(false)}>
          <div
            className="modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setOpenModal(false)}>
              <X size={20} />
            </button>

            <div className="modal-icon">
              <CheckCircle2 size={42} />
            </div>

            <h3>Registration Process</h3>

            <p className="modal-description">
              Follow these steps to complete your registration successfully.
            </p>

            <div className="modal-steps">
              <div className="modal-step">
                <span>1</span>
                <p>Create an account or login to your dashboard.</p>
              </div>

              <div className="modal-step">
                <span>2</span>
                <p>Go to Dashboard → Form section.</p>
              </div>

              <div className="modal-step">
                <span>3</span>
                <p>Select your registration form.</p>
              </div>

              <div className="modal-step">
                <span>4</span>
                <p>Complete the form and upload required documents.</p>
              </div>

              <div className="modal-step">
                <span>5</span>
                <p>Submit your registration for admin review.</p>
              </div>
            </div>

            <button
              className="modal-button"
              onClick={() => setOpenModal(false)}
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </>
  );
}
