import React, { useState, useMemo } from 'react';
import { Search, Globe, Check, Volume2, ArrowRight, Sparkles, Languages } from 'lucide-react';
import { INDIAN_LANGUAGES } from '../data/languages';
import { LanguageItem } from '../types';
import { getTranslation } from '../data/translations';
import { SwasthaLogo } from './SwasthaLogo';

interface LanguageSelectionScreenProps {
  selectedLanguageId: string;
  onSelectLanguage: (langId: string) => void;
  onConfirmLanguage: () => void;
}

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  selectedLanguageId,
  onSelectLanguage,
  onConfirmLanguage
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingLangId, setPlayingLangId] = useState<string | null>(null);

  const t = getTranslation(selectedLanguageId);

  // Filter languages by name, native script, or region
  const filteredLanguages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return INDIAN_LANGUAGES;
    return INDIAN_LANGUAGES.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.greeting.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q) ||
        l.script.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Audio greeting playback using browser Web Speech API
  const handlePlayGreeting = (lang: LanguageItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(lang.greeting);
      if (lang.speechCode) {
        utterance.lang = lang.speechCode;
      }
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      setPlayingLangId(lang.id);
      utterance.onend = () => setPlayingLangId(null);
      utterance.onerror = () => setPlayingLangId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const selectedLanguageObj =
    INDIAN_LANGUAGES.find(l => l.id === selectedLanguageId) || INDIAN_LANGUAGES[0];

  return (
    <div id="language-page-container" className="w-full max-w-2xl mx-auto relative z-10 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Brand Header */}
      <div className="text-center pt-1 pb-3">
        <SwasthaLogo size="sm" showSubtitle={false} />
      </div>

      <div className="rounded-3xl bg-white/90 border border-purple-200/80 p-5 sm:p-7 backdrop-blur-xl shadow-xl shadow-purple-950/5 relative overflow-hidden">
        
        {/* Header section */}
        <div className="text-center max-w-xl mx-auto mb-4 relative z-10">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Languages className="w-6 h-6 text-purple-600" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mb-1">
            {t.languageHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.languageSubheading}
          </p>
        </div>

        {/* Search Bar & Stats */}
        <div className="relative mb-4 max-w-md mx-auto z-10">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              id="language-search-input"
              type="text"
              placeholder={t.searchLanguage}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-purple-100 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-700 text-xs px-1.5 py-0.5 rounded bg-slate-200"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex justify-between items-center px-2 mt-1.5 text-[11px] text-slate-500 font-medium">
            <span>{filteredLanguages.length} Indian Major Languages</span>
            <span>Touch card to select</span>
          </div>
        </div>

        {/* Language Grid */}
        <div 
          id="indian-languages-grid" 
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar z-10 relative mb-4"
        >
          {filteredLanguages.map((lang) => {
            const isSelected = selectedLanguageId === lang.id;
            return (
              <div
                key={lang.id}
                id={`lang-card-${lang.id}`}
                onClick={() => onSelectLanguage(lang.id)}
                className={`group relative p-3 rounded-2xl cursor-pointer transition-all duration-200 border-2 flex flex-col justify-between select-none ${
                  isSelected
                    ? 'bg-purple-50/90 border-purple-600 shadow-md shadow-purple-500/10 scale-[1.01]'
                    : 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200 hover:border-purple-300'
                }`}
              >
                {/* Selection Radio / Check Indicator */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <div className="text-base font-black text-slate-900 group-hover:text-purple-800 transition-colors flex items-center gap-2">
                      <span>{lang.nativeName}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {lang.name} <span className="text-slate-400">• {lang.script}</span>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-sm scale-110'
                        : 'bg-slate-200 text-transparent group-hover:border group-hover:border-slate-400'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Cultural Greeting & Region Details */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md">
                      {lang.greeting}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handlePlayGreeting(lang, e)}
                      title={`Listen to greeting`}
                      className={`p-1 rounded hover:bg-purple-100 text-slate-400 hover:text-purple-700 transition-colors ${
                        playingLangId === lang.id ? 'text-purple-600 animate-pulse bg-purple-200' : ''
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-400 truncate max-w-[110px]" title={lang.region}>
                    {lang.region.split(',')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Language Bottom Bar & Confirm to Home Button */}
        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 z-10 relative">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 font-bold">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Preference Selected:</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="text-purple-700">{selectedLanguageObj.nativeName}</span>
                <span className="text-slate-500">({selectedLanguageObj.name})</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            id="confirm-language-selection-btn"
            onClick={onConfirmLanguage}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 text-white bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 shadow-md shadow-purple-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{t.continueBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
