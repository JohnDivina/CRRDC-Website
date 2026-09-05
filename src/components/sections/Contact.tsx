"use client";

import React, { useState } from "react";
import { contactData } from "@/data/contact";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
} from "lucide-react";

export function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    inquiryType: "General Institutional Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission state
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#fbfcf9] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008736]/10 text-[#008736] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Location & Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Connect With CRRDC at CLSU Main Campus
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            Located within the Research, Extension & Training complex of Central Luzon State University in the Science City of Muñoz, Nueva Ecija.
          </p>
        </div>

        {/* Top Info Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#008736]/10 text-[#008736] flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Physical Location
            </h3>
            <p className="text-xs font-semibold text-neutral-900 mt-1">
              CRRDC Complex, RET Avenue
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              CLSU Main Campus, Muñoz, Nueva Ecija
            </p>
            <span className="inline-block mt-2 font-mono text-[10px] text-[#008736] bg-[#008736]/10 px-1.5 py-0.5 rounded">
              {contactData.plusCode}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#008736]/10 text-[#008736] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Office Hours
            </h3>
            <p className="text-xs font-semibold text-neutral-900 mt-1">
              {contactData.officeHours.days}
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              {contactData.officeHours.hours} (PST)
            </p>
            <p className="text-[10px] text-neutral-500 mt-1">
              {contactData.officeHours.lunchBreak}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#008736]/10 text-[#008736] flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Telecommunications
            </h3>
            <p className="text-xs font-semibold text-neutral-900 mt-1 font-mono">
              {contactData.contactNumbers.trunkline}
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              {contactData.contactNumbers.extensions}
            </p>
            <p className="text-[10px] text-neutral-500 mt-1 font-mono">
              Telefax: {contactData.contactNumbers.telefax}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#008736]/10 text-[#008736] flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Official Inquiries
            </h3>
            <p className="text-xs font-semibold text-neutral-900 mt-1 font-mono">
              {contactData.officialEmails.general}
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5 font-mono">
              Seed: {contactData.officialEmails.seedOrders}
            </p>
            <p className="text-[11px] text-neutral-600 font-mono">
              Lab: {contactData.officialEmails.labServices}
            </p>
          </div>
        </div>

        {/* Map & Inquiry Form Row */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Verified Google Map Embed */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-[#fbfcf9]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#008736]" />
                <span className="text-xs font-bold text-neutral-900">
                  Google Maps Satellite & Street View Embed
                </span>
              </div>
              <a
                href={contactData.mapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#008736] hover:underline flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embed container */}
            <div className="w-full h-80 sm:h-96 relative bg-neutral-100">
              <iframe
                title="CRRDC CLSU Location Map"
                src={contactData.mapsEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-4 bg-neutral-50/70 border-t border-neutral-200 text-xs text-neutral-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-semibold text-neutral-900">Coordinates: </span>
                <span className="font-mono">{contactData.coordinates.lat}° N, {contactData.coordinates.lng}° E</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-900">Campus Entry Protocol: </span>
                <span>Visitors check in via CLSU Main Gate</span>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Contact Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-7 shadow-sm">
            <h3 className="text-base font-bold text-neutral-900">
              Official Center Communication Desk
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Submit formal collaboration requests, seed inquiries, or laboratory service appointments.
            </p>

            {formSubmitted ? (
              <div className="mt-6 p-5 rounded-xl bg-[#e8f5e9] border border-[#008736]/30 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#008736] text-white mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#124d26]">
                  Inquiry Dispatched to CRRDC Records
                </h4>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Thank you, <strong>{formData.name || "Colleague"}</strong>. Your communication has been routed to the appropriate CRRDC division officer. A confirmation with tracking reference will be sent to <strong>{formData.email}</strong> during standard administrative hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-1.5 rounded bg-white text-xs font-semibold text-[#008736] border border-[#008736]/30 hover:bg-neutral-50"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Inquiry Classification *
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#008736]/40"
                    required
                  >
                    <option value="General Institutional Inquiry">General Institutional Inquiry</option>
                    <option value="Academic Research & Joint Grants">Academic Research & Joint Grants</option>
                    <option value="Certified Seed Allocation & Orders">Certified Seed Allocation & Orders</option>
                    <option value="Laboratory Analytical Services Booking">Laboratory Analytical Services Booking</option>
                    <option value="Farmer Cooperative Training / Visit">Farmer Cooperative Training / Visit</option>
                    <option value="Technology Licensing & IP Inquiries">Technology Licensing & IP Inquiries</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Maria Santos"
                      className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#008736]/40"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Institution / Farm Org
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Nueva Ecija Farmers Coop"
                      className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#008736]/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@agency.gov.ph"
                      className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#008736]/40"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(+63) 9xx-xxx-xxxx"
                      className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#008736]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Formal Message / Purpose of Communication *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify the details of your requested collaboration, seed volume, or laboratory service..."
                    className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#008736]/40"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#008736] hover:bg-[#124d26] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Official Communication</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Division Communication Directory Table */}
        <div className="mt-12 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-neutral-200 bg-[#fbfcf9]">
            <h3 className="text-sm font-bold text-neutral-900">
              Institutional Division Communication Directory
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Direct telephone extensions and operational emails for university administrative units.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-neutral-50 text-[11px] font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-200">
                <tr>
                  <th className="py-3 px-4">Operating Unit</th>
                  <th className="py-3 px-4">Officer in Charge</th>
                  <th className="py-3 px-4">Direct Contact</th>
                  <th className="py-3 px-4 hidden md:table-cell">Primary Mandate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {contactData.directory.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-neutral-900">{entry.title}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-600">{entry.nameOrOffice}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-[11px] text-[#008736]">{entry.email}</div>
                      <div className="text-[10px] text-neutral-400">{entry.telephoneExt}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-neutral-500 hidden md:table-cell">
                      {entry.serviceDescription}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
