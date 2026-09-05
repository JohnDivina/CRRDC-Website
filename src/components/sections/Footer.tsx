"use client";

import React from "react";
import Image from "next/image";

export function Footer() {
  return (
    <footer id="contact" className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left — Contact Info */}
          <div className="flex flex-col gap-8">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/logos/clsu-logo.png"
                  alt="CLSU Seal"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/logos/crrdc-logo.png"
                  alt="CRRDC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">
                  Crops and Resources Research &amp; Development Center
                </h3>
                <p className="text-xs text-neutral-400">
                  Central Luzon State University
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
                  Address
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Science City of Muñoz, Nueva Ecija
                  <br />
                  Philippines 3119
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
                  Contact
                </p>
                <p className="text-sm text-neutral-300">
                  <a
                    href="mailto:crrdc@clsu.edu.ph"
                    className="transition hover:text-[#47c76a]"
                  >
                    crrdc@clsu.edu.ph
                  </a>
                </p>
                <p className="text-sm text-neutral-300">
                  <a
                    href="tel:+63441234567"
                    className="transition hover:text-[#47c76a]"
                  >
                    (044) 456 0107
                  </a>
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
                  Follow
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/CLSUCRRDC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-neutral-700 p-2.5 text-neutral-400 transition hover:border-[#47c76a] hover:text-[#47c76a]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Google Maps */}
          <div className="overflow-hidden rounded-2xl border border-neutral-700">
            <iframe
              title="CRRDC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3841.0!2d120.907!3d15.737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQ0JzEzLjIiTiAxMjDCsDU0JzI1LjIiRQ!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale transition duration-500 hover:grayscale-0"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} CRRDC, Central Luzon State University. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-neutral-500">
              <a href="#" className="transition hover:text-neutral-300">Privacy Policy</a>
              <a href="#" className="transition hover:text-neutral-300">Terms</a>
              <a href="#" className="transition hover:text-neutral-300">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
