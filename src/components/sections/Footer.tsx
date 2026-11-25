"use client";

import React from "react";
import Image from "next/image";
import { contactData } from "@/data/contact";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#0b1c11] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Contact Info */}
          <div className="flex flex-col gap-8">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0 rounded-full bg-white/10 p-1 border border-white/15">
                <Image
                  src="/logos/clsu-logo.png"
                  alt="CLSU Seal"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="relative h-10 w-10 flex-shrink-0 rounded-full bg-white/10 p-1 border border-white/15">
                <Image
                  src="/logos/crrdc-logo.png"
                  alt="CRRDC Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">
                  Crops and Resources Research &amp; Development Center
                </h3>
                <p className="text-xs text-neutral-300">
                  {contactData.parentUniversity}
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                  Address
                </p>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  {contactData.buildingLocation}
                  <br />
                  {contactData.cityProvince}, {contactData.postalCode}
                </p>
                <p className="mt-2 text-xs text-neutral-400">
                  {contactData.officeHours.days} · {contactData.officeHours.hours}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                    Contact
                  </p>
                  <p className="text-sm text-neutral-200">
                    <a
                      href={`mailto:${contactData.officialEmails.general}`}
                      className="transition hover:text-white hover:underline"
                    >
                      {contactData.officialEmails.general}
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-neutral-200">
                    <a
                      href="tel:+63444567200"
                      className="transition hover:text-white hover:underline"
                    >
                      {contactData.contactNumbers.trunkline}
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                    Follow
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={contactData.socialChannels.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="CRRDC CLSU Facebook"
                      className="rounded-full border border-white/20 p-2.5 text-neutral-300 transition hover:border-white/50 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Google Maps */}
          <div className="space-y-2">
            <div className="overflow-hidden rounded-2xl border border-white/15">
              <iframe
                title="CRRDC CLSU Location Map"
                src={contactData.mapsEmbedUrl}
                width="100%"
                height="340"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale transition duration-500 hover:grayscale-0"
              />
            </div>
            <div className="flex justify-end">
              <a
                href={contactData.mapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-300 hover:text-white hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#07130c]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-neutral-300 text-center sm:text-left">
              © {new Date().getFullYear()} CRRDC, Central Luzon State University. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-300">
              <a
                href={contactData.socialChannels.clsuPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                CLSU Portal
              </a>
              <a
                href="https://ovpre.clsu.edu.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                OVPRE CLSU
              </a>
              <span className="font-mono text-[11px] text-neutral-400">
                ISO 9001:2015 Certified University
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
