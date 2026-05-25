"use client";

import Image from "next/image";

import { useState } from "react";

import { Loader2, Send } from "lucide-react";

import toast from "react-hot-toast";

import styles from "./BasketballCampForm.module.css";

export default function BasketballCampForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    age: "",
    gender: "",

    parentGuardianName: "",
    contactEmail: "",
    contactPhone: "",

    emergencyContactName1: "",
    emergencyRelationship1: "",
    emergencyPhone1: "",

    emergencyContactName2: "",
    emergencyRelationship2: "",
    emergencyPhone2: "",

    dismissalMethod: "",
    authorizedPickupName1: "",
    authorizedPickupNumber1: "",
    authorizedPickupRelationship1: "",

    authorizedPickupName2: "",
    authorizedPickupNumber2: "",
    authorizedPickupRelationship2: "",

    allergies: "",
    medicalConditions: "",

    tshirtSize: "",
    basketballExperience: "",

    heardAboutCamp: "",
    additionalInformation: "",

    parentName: "",
    parentSignature: "",
    parentSignatureDate: "",

    liabilityGuardianName: "",
    liabilityChildName: "",
    liabilityGuardianSignature: "",
    liabilityDate: "",
    liabilityWitness: "",
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
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
          formType: "CAMP",
          data: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      toast.success("Camp registration submitted successfully");
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
          alt="Butterfly Basketball Academy"
          width={180}
          height={180}
          priority
        />
      </div>

      <div className={styles.hero}>
        <h1>Basketball Camp Registration Form</h1>

        <p>
          Please complete the official Butterfly Basketball Academy camp
          registration form.
        </p>
      </div>

      {/* CHILD INFO */}

      <div className={styles.section}>
        <h2>Child Information</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Birth Date</label>

            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
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
              required
            >
              <option value="">Select Gender</option>

              <option value="Male">Male</option>

              <option value="Female">Female</option>

              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Parent / Guardian Name</label>

            <input
              type="text"
              name="parentGuardianName"
              value={formData.parentGuardianName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Contact Email</label>

            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Contact Phone</label>

            <input
              type="text"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* EMERGENCY */}

      <div className={styles.section}>
        <h2>Emergency Contact Information</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Emergency Contact Name</label>

            <input
              type="text"
              name="emergencyContactName1"
              value={formData.emergencyContactName1}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Relationship To Child</label>

            <input
              type="text"
              name="emergencyRelationship1"
              value={formData.emergencyRelationship1}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Emergency Phone Number</label>

            <input
              type="text"
              name="emergencyPhone1"
              value={formData.emergencyPhone1}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Second Emergency Contact</label>

            <input
              type="text"
              name="emergencyContactName2"
              value={formData.emergencyContactName2}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Relationship</label>

            <input
              type="text"
              name="emergencyRelationship2"
              value={formData.emergencyRelationship2}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Emergency Phone</label>

            <input
              type="text"
              name="emergencyPhone2"
              value={formData.emergencyPhone2}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* MEDICAL */}

      <div className={styles.section}>
        <h2>Medical Information</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Allergies</label>

            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <div className={styles.field}>
            <label>Medical Conditions</label>

            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              rows={5}
            />
          </div>
        </div>
      </div>

      {/* CAMP PREFERENCES */}

      <div className={styles.section}>
        <h2>Camp Preferences</h2>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>T-Shirt Size</label>

            <select
              name="tshirtSize"
              value={formData.tshirtSize}
              onChange={handleChange}
            >
              <option value="">Select Size</option>

              <option value="S">S</option>

              <option value="M">M</option>

              <option value="L">L</option>

              <option value="XL">XL</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Basketball Experience</label>

            <textarea
              name="basketballExperience"
              value={formData.basketballExperience}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* ADDITIONAL */}

      <div className={styles.section}>
        <h2>Additional Information</h2>

        <div className={styles.field}>
          <label>How Did You Hear About Our Camp?</label>

          <textarea
            name="heardAboutCamp"
            value={formData.heardAboutCamp}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className={styles.field}>
          <label>Additional Information</label>

          <textarea
            name="additionalInformation"
            value={formData.additionalInformation}
            onChange={handleChange}
            rows={5}
          />
        </div>
      </div>

      {/* LIABILITY */}

      <div className={styles.section}>
        <h2>Liability Waiver</h2>

        <div className={styles.warningBox}>
          <p>
            By submitting this form, you acknowledge and accept the Butterfly
            Basketball Academy liability waiver and participation terms.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Guardian Name</label>

            <input
              type="text"
              name="liabilityGuardianName"
              value={formData.liabilityGuardianName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Child Full Name</label>

            <input
              type="text"
              name="liabilityChildName"
              value={formData.liabilityChildName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Guardian Signature</label>

            <input
              type="text"
              name="liabilityGuardianSignature"
              value={formData.liabilityGuardianSignature}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Date</label>

            <input
              type="date"
              name="liabilityDate"
              value={formData.liabilityDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={20} className={styles.spinner} />
            Submitting Registration...
          </>
        ) : (
          <>
            <Send size={20} />
            Submit Camp Registration
          </>
        )}
      </button>
    </form>
  );
}
