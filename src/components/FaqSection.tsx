import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem, Language } from '../types';

interface FaqSectionProps {
  faqList: FaqItem[];
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqList, lang }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="resources-faq-section" className="w-full px-4 lg:px-10 max-w-[840px] mx-auto py-16">
      <div className="text-center mb-10">
        <h2 className="font-['Hanken_Grotesk'] text-[28px] md:text-[32px] font-bold text-[#111111] mb-3">
          {lang === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}
        </h2>
        <p className="font-['Inter'] text-[15px] md:text-[16px] text-[#444748]">
          {lang === 'ko' 
            ? 'VPN 선택과 관련하여 가장 많이 묻는 질문들을 모았습니다.' 
            : 'Answers to the most common questions regarding VPN privacy and performance.'}
        </p>
      </div>

      <div className="flex flex-col border-t border-[#E0E0E0]">
        {faqList.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              id={faq.id}
              className="border-b border-[#E0E0E0] transition-colors"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full py-6 flex justify-between items-center text-left cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className={`font-['Hanken_Grotesk'] text-[18px] md:text-[20px] font-bold transition-colors ${
                  isOpen ? 'text-[#614abf]' : 'text-[#1a1c1c] group-hover:text-[#614abf]'
                }`}>
                  {lang === 'ko' ? faq.questionKo : faq.questionEn}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-[#e6deff] text-[#614abf]' : 'text-[#747878] group-hover:bg-[#f3f3f3]'
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {isOpen && (
                <div className="pb-6 text-['Inter'] text-[15px] text-[#444748] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                  {faq.highlightKo && lang === 'ko' && (
                    <p className="mb-2 font-bold text-[#111111]">
                      {faq.highlightKo}
                    </p>
                  )}
                  {faq.highlightEn && lang === 'en' && (
                    <p className="mb-2 font-bold text-[#111111]">
                      {faq.highlightEn}
                    </p>
                  )}
                  <p>{lang === 'ko' ? faq.answerKo : faq.answerEn}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
