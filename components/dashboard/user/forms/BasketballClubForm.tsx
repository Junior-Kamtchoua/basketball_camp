"use client";

import Image from "next/image";

import { useState } from "react";

import { Loader2, Send } from "lucide-react";

import toast from "react-hot-toast";

import styles from "./BasketballClubForm.module.css";

type FormDataType = {
  playerFullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;

  address: string;
  city: string;
  state: string;
  zipCode: string;

  schoolName: string;
  gradeLevel: string;
  playerPhotoAttached: string;

  parentFullName: string;
  relationshipToPlayer: string;
  primaryPhone: string;
  secondaryPhone: string;

  emailAddress: string;

  emergencyContactName: string;
  emergencyContactPhone: string;

  allergies: string;
  allergiesExplanation: string;

  medicalConditions: string;
  currentMedications: string;

  insuranceProvider: string;
  physicianName: string;
  physicianPhone: string;

  previousInjuries: string;

  medicalAuthorizationInitials: string;

  yearsExperience: string;
  primaryPosition: string;
  secondaryPosition: string;
  height: string;
  weight: string;

  previousTeams: string;
  achievements: string;

  programSelection: string[];

  ageGroup: string;

  practiceDays: string[];

  jerseySize: string;
  shortsSize: string;
  shoeSize: string;
  preferredJerseyNumber: string;

  liabilityWaiver: boolean;
  codeOfConduct: boolean;
  photoRelease: string;
  transportationPermission: string;
  concussionAcknowledgment: boolean;

  registrationFee: string;

  playerSignature: string;
  playerSignatureDate: string;

  parentSignature: string;
  parentSignatureDate: string;

  volunteerInterest: string;
  scholarshipRequest: string;
  academicInformation: string;
  socialMediaConsent: string;

  requiredDocuments: string[];
};

export default function BasketballClubForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    playerFullName: "",
    dateOfBirth: "",
    age: "",
    gender: "",

    address: "",
    city: "",
    state: "",
    zipCode: "",

    schoolName: "",
    gradeLevel: "",
    playerPhotoAttached: "",

    parentFullName: "",
    relationshipToPlayer: "",
    primaryPhone: "",
    secondaryPhone: "",

    emailAddress: "",

    emergencyContactName: "",
    emergencyContactPhone: "",

    allergies: "",
    allergiesExplanation: "",

    medicalConditions: "",
    currentMedications: "",

    insuranceProvider: "",
    physicianName: "",
    physicianPhone: "",

    previousInjuries: "",

    medicalAuthorizationInitials: "",

    yearsExperience: "",
    primaryPosition: "",
    secondaryPosition: "",
    height: "",
    weight: "",

    previousTeams: "",
    achievements: "",

    programSelection: [],

    ageGroup: "",

    practiceDays: [],

    jerseySize: "",
    shortsSize: "",
    shoeSize: "",
    preferredJerseyNumber: "",

    liabilityWaiver: false,
    codeOfConduct: false,
    photoRelease: "",
    transportationPermission: "",
    concussionAcknowledgment: false,

    registrationFee: "",

    playerSignature: "",
    playerSignatureDate: "",

    parentSignature: "",
    parentSignatureDate: "",

    volunteerInterest: "",
    scholarshipRequest: "",
    academicInformation: "",
    socialMediaConsent: "",

    requiredDocuments: [],
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const target = event.target as HTMLInputElement;

    const { name, value, type, checked } = target;

    if (type === "checkbox") {
      if (name === "programSelection") {
        setFormData((prev) => ({
          ...prev,

          programSelection: checked
            ? [...prev.programSelection, value]
            : prev.programSelection.filter((item) => item !== value),
        }));

        return;
      }

      if (name === "practiceDays") {
        setFormData((prev) => ({
          ...prev,

          practiceDays: checked
            ? [...prev.practiceDays, value]
            : prev.practiceDays.filter((item) => item !== value),
        }));

        return;
      }

      if (name === "requiredDocuments") {
        setFormData((prev) => ({
          ...prev,

          requiredDocuments: checked
            ? [...prev.requiredDocuments, value]
            : prev.requiredDocuments.filter((item) => item !== value),
        }));

        return;
      }

      setFormData((prev) => ({
        ...prev,

        [name]: checked,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/admin/forms/submit", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          formType: "CLUB",

          data: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      toast.success("Club registration submitted successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to submit form");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.logoWrapper}>
        <Image
          src="/images/logo1.png"
          alt="Friendship Basketball Academy"
          width={180}
          height={180}
          priority
        />
      </div>

      <div className={styles.hero}>
        <h1>Basketball Club Registration Form</h1>

        <p>
          Complete the official Friendship Basketball Academy registration form.
        </p>
      </div>

      {/* ① PLAYER INFORMATION */}

      <div className={styles.section}>
        <h2>① Player Information</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Player Full Name</label>

            <input
              type="text"
              name="playerFullName"
              value={formData.playerFullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Date Of Birth</label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Age</label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>

              <option value="Male">Male</option>

              <option value="Female">Female</option>

              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Address</label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>City</label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>State</label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>ZIP Code</label>

            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>School Name</label>

            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Grade Level</label>

            <input
              type="text"
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Player Photo Attached</label>

            <select
              name="playerPhotoAttached"
              value={formData.playerPhotoAttached}
              onChange={handleChange}
            >
              <option value="">Select Option</option>

              <option value="YES">Yes</option>

              <option value="NO">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* ② PARENT / GUARDIAN DETAILS */}

      <div className={styles.section}>
        <h2>② Parent / Guardian Details</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Parent / Guardian Full Name</label>

            <input
              type="text"
              name="parentFullName"
              value={formData.parentFullName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Relationship To Player</label>

            <input
              type="text"
              name="relationshipToPlayer"
              value={formData.relationshipToPlayer}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Primary Phone Number</label>

            <input
              type="text"
              name="primaryPhone"
              value={formData.primaryPhone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Secondary Phone Number</label>

            <input
              type="text"
              name="secondaryPhone"
              value={formData.secondaryPhone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Email Address</label>

            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Emergency Contact Name</label>

            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Emergency Contact Phone Number</label>

            <input
              type="text"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* ③ EMERGENCY & MEDICAL INFORMATION */}

      <div className={styles.section}>
        <h2>③ Emergency & Medical Information</h2>

        <div className={styles.field}>
          <label>Does The Player Have Any Allergies?</label>

          <textarea
            name="allergiesExplanation"
            value={formData.allergiesExplanation}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Medical Conditions</label>

            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label>Current Medications</label>

            <textarea
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label>Insurance Provider</label>

            <input
              type="text"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Physician Name</label>

            <input
              type="text"
              name="physicianName"
              value={formData.physicianName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Physician Phone Number</label>

            <input
              type="text"
              name="physicianPhone"
              value={formData.physicianPhone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Previous Injuries Or Surgeries</label>

            <textarea
              name="previousInjuries"
              value={formData.previousInjuries}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label>Medical Authorization Initials</label>

            <input
              type="text"
              name="medicalAuthorizationInitials"
              value={formData.medicalAuthorizationInitials}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* ④ ATHLETIC EXPERIENCE */}

      <div className={styles.section}>
        <h2>④ Athletic Experience</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Years Of Basketball Experience</label>

            <input
              type="text"
              name="yearsExperience"
              value={formData.yearsExperience}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Primary Position</label>

            <input
              type="text"
              name="primaryPosition"
              value={formData.primaryPosition}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Secondary Position</label>

            <input
              type="text"
              name="secondaryPosition"
              value={formData.secondaryPosition}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Height</label>

            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Weight</label>

            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Previous Teams Or Clubs</label>

            <textarea
              name="previousTeams"
              value={formData.previousTeams}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label>Awards / Achievements</label>

            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* ⑤ PROGRAM SELECTION */}

      <div className={styles.section}>
        <h2>⑤ Program Selection</h2>

        <div className={styles.checkboxGrid}>
          {[
            "Recreational Team",
            "Competitive Team",
            "Elite Training Program",
            "Summer Camp",
            "Skills Development Program",
            "Tournament Team",
            "Private Training Sessions",
          ].map((program) => (
            <label className={styles.checkbox} key={program}>
              <input
                type="checkbox"
                name="programSelection"
                value={program}
                checked={formData.programSelection.includes(program)}
                onChange={handleChange}
              />

              <span>{program}</span>
            </label>
          ))}
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Age Group / Division</label>

            <input
              type="text"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.practiceDays}>
          <h3>Preferred Practice Days</h3>

          <div className={styles.checkboxGrid}>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <label className={styles.checkbox} key={day}>
                <input
                  type="checkbox"
                  name="practiceDays"
                  value={day}
                  checked={formData.practiceDays.includes(day)}
                  onChange={handleChange}
                />

                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ⑥ UNIFORM & EQUIPMENT INFORMATION */}

      <div className={styles.section}>
        <h2>⑥ Uniform & Equipment Information</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Jersey Size</label>

            <select
              name="jerseySize"
              value={formData.jerseySize}
              onChange={handleChange}
            >
              <option value="">Select Size</option>

              <option value="XS">XS</option>

              <option value="S">S</option>

              <option value="M">M</option>

              <option value="L">L</option>

              <option value="XL">XL</option>

              <option value="XXL">XXL</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Shorts Size</label>

            <select
              name="shortsSize"
              value={formData.shortsSize}
              onChange={handleChange}
            >
              <option value="">Select Size</option>

              <option value="XS">XS</option>

              <option value="S">S</option>

              <option value="M">M</option>

              <option value="L">L</option>

              <option value="XL">XL</option>

              <option value="XXL">XXL</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Shoe Size (Optional)</label>

            <input
              type="text"
              name="shoeSize"
              value={formData.shoeSize}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Preferred Jersey Number (Optional)</label>

            <input
              type="text"
              name="preferredJerseyNumber"
              value={formData.preferredJerseyNumber}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* ⑦ WAIVER, RELEASE & CONSENT SECTION */}

      <div className={styles.section}>
        <h2>⑦ Waiver, Release & Consent Section</h2>

        <div className={styles.checkboxGrid}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="liabilityWaiver"
              checked={formData.liabilityWaiver}
              onChange={handleChange}
            />

            <span>Liability Waiver Agreement</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="codeOfConduct"
              checked={formData.codeOfConduct}
              onChange={handleChange}
            />

            <span>Code Of Conduct Agreement</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="concussionAcknowledgment"
              checked={formData.concussionAcknowledgment}
              onChange={handleChange}
            />

            <span>Concussion Awareness Acknowledgment</span>
          </label>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Photo And Video Release</label>

            <select
              name="photoRelease"
              value={formData.photoRelease}
              onChange={handleChange}
            >
              <option value="">Select Option</option>

              <option value="YES">Yes</option>

              <option value="NO">No</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Transportation Permission</label>

            <select
              name="transportationPermission"
              value={formData.transportationPermission}
              onChange={handleChange}
            >
              <option value="">Select Option</option>

              <option value="YES">Yes</option>

              <option value="NO">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* ⑧ PAYMENT INFORMATION */}

      <div className={styles.section}>
        <h2>⑧ Payment Information</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Registration Fee</label>

            <input
              type="text"
              name="registrationFee"
              value={formData.registrationFee}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Payment Method</label>

            <input type="text" value="Zelle" disabled />
          </div>
        </div>

        <div className={styles.instructionsBox}>
          <p>All payments must be completed through Zelle.</p>

          <p>
            Parents / Guardians must upload proof of payment inside the
            dashboard after completing the Zelle transfer.
          </p>
        </div>
      </div>

      {/* ⑨ SIGNATURE SECTION */}

      <div className={styles.section}>
        <h2>⑨ Signature Section</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Player Signature</label>

            <input
              type="text"
              name="playerSignature"
              value={formData.playerSignature}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Date</label>

            <input
              type="date"
              name="playerSignatureDate"
              value={formData.playerSignatureDate}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Parent / Guardian Signature</label>

            <input
              type="text"
              name="parentSignature"
              value={formData.parentSignature}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Date</label>

            <input
              type="date"
              name="parentSignatureDate"
              value={formData.parentSignatureDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* ⑩ OPTIONAL INFORMATION */}

      <div className={styles.section}>
        <h2>⑩ Optional Information</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Academic Information (Optional)</label>

            <textarea
              name="academicInformation"
              value={formData.academicInformation}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.checkboxGrid}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.volunteerInterest === "YES"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,

                  volunteerInterest: e.target.checked ? "YES" : "NO",
                }))
              }
            />

            <span>Volunteer Interest</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.scholarshipRequest === "YES"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,

                  scholarshipRequest: e.target.checked ? "YES" : "NO",
                }))
              }
            />

            <span>Scholarship Request</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.socialMediaConsent === "YES"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,

                  socialMediaConsent: e.target.checked ? "YES" : "NO",
                }))
              }
            />

            <span>Social Media Consent</span>
          </label>
        </div>
      </div>

      {/* REQUIRED DOCUMENTS */}

      <div className={styles.section}>
        <h2>Required Documents Checklist</h2>

        <div className={styles.checkboxGrid}>
          {[
            "Birth Certificate",
            "Medical Clearance Form",
            "Insurance Card Copy",
            "Recent Player Photo",
            "Signed Registration Form",
            "Zelle Payment Proof Upload In Dashboard",
          ].map((doc) => (
            <label key={doc} className={styles.checkbox}>
              <input
                type="checkbox"
                name="requiredDocuments"
                value={doc}
                checked={formData.requiredDocuments.includes(doc)}
                onChange={handleChange}
              />

              <span>{doc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* IMPORTANT */}

      <div className={styles.instructionsBox}>
        <h3>⚠ Important Document Upload Instructions</h3>

        <div className={styles.exampleBox}>
          <div className={styles.correct}>
            <strong>✅ Correct:</strong>

            <p>1 combined PDF containing all required documents.</p>
          </div>

          <div className={styles.incorrect}>
            <strong>❌ Incorrect:</strong>

            <p>5 or 6 separate PDF files uploaded individually.</p>
          </div>
        </div>

        <p>
          Payment proof must be uploaded separately in the Payments section of
          the dashboard after completing the Zelle transfer.
        </p>
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={18} className={styles.spinner} />
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            Continue Registration
          </>
        )}
      </button>
    </form>
  );
}
