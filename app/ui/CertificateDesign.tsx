"use client";

import { Award } from "lucide-react";

export type CertificateDesignProps = {
  certificateId: string;
  learnerName: string;
  courseTitle: string;
  issued: string;
  duration: string;
  score: string;
  instructor: string;
  director?: string;
};

export function CertificateDesign({
  certificateId,
  learnerName,
  courseTitle,
  issued,
  duration,
  score,
  instructor,
  director = "Ifeoma Kalu",
}: CertificateDesignProps) {
  const instructorSignature = instructor.split(" ")[0].replace(/^(Dr\.|Barr\.)$/i, instructor.split(" ")[1] ?? "Instructor");
  const directorSignature = director.split(" ")[0];

  return <div className="certificate-wrap">
    <article>
      <div className="certificate-brand">
        <div className="journey-brand"><span><i/><i/><i/></span><strong>Von Newman <b>Atlas</b></strong></div>
        <span>FEDERAL SERVICE<br/>LEARNING DIRECTORATE</span>
      </div>
      <small>CERTIFICATE OF COMPLETION</small>
      <p>This certifies that</p>
      <h2>{learnerName}</h2>
      <p>has successfully completed</p>
      <h3>{courseTitle}</h3>
      <div className="certificate-meta">
        <span><b>{issued}</b><small>Date issued</small></span>
        <span><b>{duration}</b><small>Learning time</small></span>
        <span><b>{score}</b><small>Final score</small></span>
      </div>
      <div className="certificate-sign">
        <span><i>{instructorSignature}</i><small>{instructor}<br/>Course instructor</small></span>
        <strong><Award/></strong>
        <span><i>{directorSignature}</i><small>{director}<br/>Learning director</small></span>
      </div>
      <footer><span>Certificate ID: {certificateId}</span><span>verify.atlas.demo/{certificateId}</span></footer>
    </article>
  </div>;
}
